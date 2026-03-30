import { auth, db } from "./firebase-init.js";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const CHUNK_CHARS = 150000;
const MAX_CHUNKS = 12;
const MAX_TOTAL_BYTES = 3600000;
const SNAPSHOT_KEY = "driver_quiz_pre_sync_snapshot_v1";
const UPLOAD_META_KEY = "driver_quiz_cloud_upload_meta_v1";
const MIN_UPLOAD_INTERVAL_MS = 60000;

function requireUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入 Google。");
  return user;
}

function explainError(error) {
  const msg = error?.message || String(error || "");
  if (/Missing or insufficient permissions/i.test(msg)) {
    return "你已登入，但尚未被加入 allowlist 白名單，或 app_config/global.syncEnabled 不是 true。";
  }
  return msg || "未知錯誤";
}

function splitIntoChunks(text, chunkChars = CHUNK_CHARS) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkChars) chunks.push(text.slice(i, i + chunkChars));
  return chunks.length ? chunks : [""];
}

async function sha256Hex(text) {
  const encoded = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function chunkId(index) {
  return `chunk_${String(index).padStart(4, "0")}`;
}

function nowIso() {
  return new Date().toISOString();
}

export function getAnsweredCountFromPayload(payload) {
  const direct = Number(payload?.progress?.meta?.totalAnswered || 0);
  if (Number.isFinite(direct) && direct > 0) return direct;
  const byQuestion = payload?.progress?.byQuestion;
  if (byQuestion && typeof byQuestion === "object") {
    let total = 0;
    for (const item of Object.values(byQuestion)) {
      total += Number(item?.totalSeen || 0);
    }
    return total;
  }
  return 0;
}

export function readLocalUploadMeta() {
  try {
    return JSON.parse(localStorage.getItem(UPLOAD_META_KEY) || "{}");
  } catch {
    return {};
  }
}

export function writeLocalUploadMeta(meta) {
  try {
    localStorage.setItem(UPLOAD_META_KEY, JSON.stringify({
      checksum: String(meta?.checksum || ""),
      answeredCount: Number(meta?.answeredCount || 0),
      uploadedAt: String(meta?.uploadedAt || nowIso()),
    }));
  } catch {}
}

export function savePreSyncSnapshot(buildPayloadFn) {
  if (typeof buildPayloadFn !== "function") throw new Error("找不到完整資料匯出函式。");
  const payload = buildPayloadFn();
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ savedAt: nowIso(), payload }));
  } catch (err) {
    console.warn("savePreSyncSnapshot failed", err);
  }
  return payload;
}

export function getPreSyncSnapshotInfo() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || "null");
    if (!parsed?.payload) return null;
    return {
      savedAt: String(parsed.savedAt || ""),
      answeredCount: getAnsweredCountFromPayload(parsed.payload),
    };
  } catch {
    return null;
  }
}

export function restorePreSyncSnapshot(applyPayloadFn) {
  if (typeof applyPayloadFn !== "function") throw new Error("找不到完整資料匯入函式。");
  const raw = localStorage.getItem(SNAPSHOT_KEY);
  if (!raw) throw new Error("目前沒有可還原的同步前本機備份。");
  const parsed = JSON.parse(raw);
  if (!parsed?.payload) throw new Error("同步前本機備份內容無效。");
  return applyPayloadFn(parsed.payload, true);
}

export async function getCloudBackupMetaSummary() {
  try {
    const user = requireUser();
    const metaRef = doc(db, "users", user.uid, "sync", "meta");
    const metaSnap = await getDoc(metaRef);
    if (!metaSnap.exists()) return { exists: false };
    const meta = metaSnap.data() || {};
    return {
      exists: true,
      checksum: String(meta.checksum || ""),
      chunkCount: Number(meta.chunkCount || 0),
      payloadBytes: Number(meta.payloadBytes || 0),
      updatedBy: String(meta.updatedBy || ""),
      updatedUid: String(meta.updatedUid || ""),
      updatedAt: meta.updatedAt?.toDate ? meta.updatedAt.toDate().toISOString() : String(meta.updatedAt || ""),
      version: Number(meta.version || 1),
      answeredCount: Number(meta.answeredCount || 0),
    };
  } catch (error) {
    throw new Error(explainError(error));
  }
}

export async function uploadFullMemoryBackup(buildPayloadFn) {
  try {
    const user = requireUser();
    if (typeof buildPayloadFn !== "function") throw new Error("找不到完整資料匯出函式。");

    const localMeta = readLocalUploadMeta();
    const lastAt = Date.parse(String(localMeta.uploadedAt || ""));
    if (Number.isFinite(lastAt) && Date.now() - lastAt < MIN_UPLOAD_INTERVAL_MS) {
      throw new Error("距離上次成功上傳不到 60 秒，請稍後再試，避免重複寫入。");
    }

    const payload = buildPayloadFn();
    const json = JSON.stringify(payload);
    const payloadBytes = new TextEncoder().encode(json).length;
    if (payloadBytes > MAX_TOTAL_BYTES) {
      throw new Error(`完整資料備份偏大（${payloadBytes} bytes），為避免第三方託管資源被過度占用，目前雲端同步上限約 ${MAX_TOTAL_BYTES} bytes。請先改用本機 JSON 匯出。`);
    }
    const checksum = await sha256Hex(json);
    const chunks = splitIntoChunks(json);
    if (chunks.length > MAX_CHUNKS) {
      throw new Error(`完整資料備份分塊後超過 ${MAX_CHUNKS} 塊，請先改用本機 JSON 匯出。`);
    }
    const answeredCount = getAnsweredCountFromPayload(payload);
    const metaRef = doc(db, "users", user.uid, "sync", "meta");

    const metaSnap = await getDoc(metaRef);
    const previousMeta = metaSnap.exists() ? (metaSnap.data() || {}) : {};
    if (previousMeta.checksum === checksum) {
      writeLocalUploadMeta({ checksum, answeredCount, uploadedAt: nowIso() });
      return {
        ok: true,
        skipped: true,
        message: `雲端內容與本機相同，略過上傳。\nchecksum=${checksum.slice(0, 12)}…`,
      };
    }

    for (let i = 0; i < chunks.length; i += 1) {
      await setDoc(doc(db, "users", user.uid, "sync_chunks", chunkId(i)), {
        index: i,
        checksum,
        data: chunks[i],
      }, { merge: false });
    }

    const oldChunkCount = Number(previousMeta.chunkCount || 0);
    for (let i = chunks.length; i < oldChunkCount; i += 1) {
      await deleteDoc(doc(db, "users", user.uid, "sync_chunks", chunkId(i)));
    }

    await setDoc(metaRef, {
      app: "driver-quiz-pwa",
      type: "full-memory-export",
      version: Number(payload?.version || 1),
      schemaVersion: 1,
      checksum,
      chunkCount: chunks.length,
      payloadBytes,
      updatedAt: serverTimestamp(),
      updatedBy: user.email || "",
      updatedUid: user.uid,
      answeredCount,
    }, { merge: true });

    writeLocalUploadMeta({ checksum, answeredCount, uploadedAt: nowIso() });

    return {
      ok: true,
      skipped: false,
      checksum,
      chunkCount: chunks.length,
      payloadBytes,
      answeredCount,
      message: `雲端備份已上傳。\nchunks=${chunks.length} | bytes=${payloadBytes} | checksum=${checksum.slice(0, 12)}…`,
    };
  } catch (error) {
    throw new Error(explainError(error));
  }
}

export async function downloadFullMemoryBackup() {
  try {
    const user = requireUser();
    const metaRef = doc(db, "users", user.uid, "sync", "meta");
    const metaSnap = await getDoc(metaRef);
    if (!metaSnap.exists()) throw new Error("雲端尚無完整資料備份。");

    const meta = metaSnap.data() || {};
    const chunkCount = Number(meta.chunkCount || 0);
    if (!Number.isFinite(chunkCount) || chunkCount <= 0) throw new Error("雲端備份資訊無效：chunkCount 異常。");

    const pieces = [];
    for (let i = 0; i < chunkCount; i += 1) {
      const snap = await getDoc(doc(db, "users", user.uid, "sync_chunks", chunkId(i)));
      if (!snap.exists()) throw new Error(`雲端備份缺少 chunk ${i}。`);
      const data = snap.data() || {};
      pieces.push(String(data.data || ""));
    }

    const json = pieces.join("");
    const checksum = await sha256Hex(json);
    if (meta.checksum && checksum !== meta.checksum) {
      throw new Error("雲端備份校驗失敗：checksum 不一致。");
    }

    return {
      ok: true,
      checksum,
      payload: JSON.parse(json),
      meta: {
        checksum: String(meta.checksum || checksum),
        chunkCount,
        payloadBytes: Number(meta.payloadBytes || new TextEncoder().encode(json).length),
        updatedBy: String(meta.updatedBy || ""),
        updatedUid: String(meta.updatedUid || ""),
        updatedAt: meta.updatedAt?.toDate ? meta.updatedAt.toDate().toISOString() : String(meta.updatedAt || ""),
        answeredCount: Number(meta.answeredCount || 0),
      },
      message: `雲端備份已下載。\nchunks=${chunkCount} | checksum=${String(meta.checksum || checksum).slice(0, 12)}…`,
    };
  } catch (error) {
    throw new Error(explainError(error));
  }
}
