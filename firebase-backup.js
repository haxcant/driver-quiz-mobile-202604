import { auth, db } from "./firebase-init.js";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const CHUNK_CHARS = 150000;

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

export async function uploadFullMemoryBackup(buildPayloadFn) {
  try {
    const user = requireUser();
    if (typeof buildPayloadFn !== "function") throw new Error("找不到完整資料匯出函式。");

    const payload = await buildPayloadFn();
    const json = JSON.stringify(payload);
    const checksum = await sha256Hex(json);
    const payloadBytes = new TextEncoder().encode(json).length;
    const chunks = splitIntoChunks(json);
    const metaRef = doc(db, "users", user.uid, "sync", "meta");

    const metaSnap = await getDoc(metaRef);
    const previousMeta = metaSnap.exists() ? (metaSnap.data() || {}) : {};
    if (previousMeta.checksum === checksum) {
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
    }, { merge: true });

    return {
      ok: true,
      skipped: false,
      checksum,
      chunkCount: chunks.length,
      payloadBytes,
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
    if (!Number.isFinite(chunkCount) || chunkCount <= 0) throw new Error("雲端備份格式不完整：chunkCount 無效。");

    const parts = [];
    for (let i = 0; i < chunkCount; i += 1) {
      const snap = await getDoc(doc(db, "users", user.uid, "sync_chunks", chunkId(i)));
      if (!snap.exists()) throw new Error(`雲端備份缺少分塊：${chunkId(i)}`);
      parts.push(String((snap.data() || {}).data || ""));
    }

    const json = parts.join("");
    const checksum = await sha256Hex(json);
    if (meta.checksum && checksum !== meta.checksum) throw new Error("雲端備份校驗失敗：checksum 不一致。");

    return {
      ok: true,
      payload: JSON.parse(json),
      meta,
      checksum,
      message: `已下載雲端備份。\nchunks=${chunkCount} | checksum=${checksum.slice(0, 12)}…`,
    };
  } catch (error) {
    throw new Error(explainError(error));
  }
}
