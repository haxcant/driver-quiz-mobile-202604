window.addEventListener("DOMContentLoaded", async () => {
  const details = document.getElementById("firebaseSyncDetails");
  const summaryText = document.getElementById("firebaseSummaryText");
  const helpText = document.getElementById("firebase-help-text");
  const displayNameEl = document.getElementById("firebase-display-name");
  const ownerNoteEl = document.getElementById("firebase-owner-note");
  const reminderEl = document.getElementById("firebase-sync-reminder");
  const privateInfoEl = document.getElementById("firebase-private-info");
  const togglePrivateBtn = document.getElementById("btn-firebase-toggle-private");
  const btnLogin = document.getElementById("btn-google-login");
  const btnLogout = document.getElementById("btn-google-logout");
  const btnSmokeWrite = document.getElementById("btn-smoke-write");
  const btnSmokeRead = document.getElementById("btn-smoke-read");
  const btnCloudUpload = document.getElementById("btn-cloud-upload");
  const btnCloudDownload = document.getElementById("btn-cloud-download");
  const btnLocalRestore = document.getElementById("btn-local-restore");
  const output = document.getElementById("sync-test-output");

  let privateVisible = false;
  let currentUser = null;
  let authReady = false;
  let promptedUid = "";
  let modules = null;

  const setOutput = (msg) => { if (output) output.textContent = msg || ""; };
  const masked = (value, keep = 2) => {
    const s = String(value || "").trim();
    if (!s) return "";
    if (s.length <= keep) return "*".repeat(s.length);
    return s.slice(0, keep) + "*".repeat(Math.max(2, s.length - keep));
  };
  const setButtonsEnabled = (enabled) => {
    [btnSmokeWrite, btnSmokeRead, btnCloudUpload, btnCloudDownload].forEach((btn) => {
      if (btn) btn.disabled = !enabled;
    });
  };

  function setRestoreEnabled() {
    const snapshotInfo = modules?.backup?.getPreSyncSnapshotInfo?.();
    if (btnLocalRestore) btnLocalRestore.disabled = !snapshotInfo;
  }

  function getCurrentPayloadSafe() {
    try {
      return window.DriverQuizMemory?.buildPayload?.() || null;
    } catch (err) {
      console.warn("buildPayload failed", err);
      return null;
    }
  }

  function updateReminder() {
    if (!reminderEl) return;
    const payload = getCurrentPayloadSafe();
    const localMeta = modules?.backup?.readLocalUploadMeta?.() || {};
    const answered = modules?.backup?.getAnsweredCountFromPayload?.(payload) || 0;
    const uploadedAnswered = Number(localMeta?.answeredCount || 0);
    const delta = Math.max(0, answered - uploadedAnswered);

    if (!currentUser) {
      reminderEl.textContent = "未登入時仍可用本機功能與 JSON 匯入匯出。";
      return;
    }
    if (delta >= 200) {
      reminderEl.textContent = `你自上次雲端上傳後已新增約 ${delta} 題，建議現在手動上傳雲端備份。`;
    } else if (delta > 0) {
      reminderEl.textContent = `目前有未同步變更（約 ${delta} 題差異），雲端同步採手動上傳／下載。`;
    } else {
      reminderEl.textContent = "本機與最近一次雲端上傳沒有明顯新增差異。";
    }
  }

  function renderUser() {
    const pendingRedirect = modules?.auth?.hasPendingRedirectLogin?.() || false;

    if (details) details.open = false;
    if (currentUser) {
      const name = currentUser.displayName || currentUser.email?.split("@")[0] || "已登入使用者";
      if (summaryText) summaryText.textContent = `雲端同步：${name}`;
      if (displayNameEl) displayNameEl.textContent = `名稱：${name}`;
      if (privateInfoEl) {
        privateInfoEl.style.display = privateVisible ? "block" : "none";
        privateInfoEl.textContent = privateVisible
          ? `Email：${currentUser.email || "未提供"}\nUID：${currentUser.uid || "未提供"}`
          : `Email：${masked(currentUser.email, 2)}\nUID：${masked(currentUser.uid, 4)}`;
      }
      if (togglePrivateBtn) {
        togglePrivateBtn.style.display = "";
        togglePrivateBtn.textContent = privateVisible ? "🙈" : "👁";
        togglePrivateBtn.title = privateVisible ? "隱藏個資" : "顯示個資";
      }
      if (btnLogin) btnLogin.style.display = "none";
      if (btnLogout) btnLogout.style.display = "";
      setButtonsEnabled(true);
      setRestoreEnabled();
      if (ownerNoteEl) ownerNoteEl.style.display = "";
      if (helpText) helpText.textContent = "最簡說明：登入後只會先檢查雲端是否有備份，不會直接覆蓋本機。雲端同步預設採手動上傳／下載。";
      updateReminder();
      if (!output?.textContent) setOutput("已登入。若雲端有備份，系統會先詢問你是否要載入。");
      return;
    }

    if (summaryText) {
      summaryText.textContent = pendingRedirect
        ? "雲端同步：登入回跳中，請稍候"
        : "雲端同步：未登入（展開登入選項）";
    }
    if (displayNameEl) displayNameEl.textContent = pendingRedirect ? "登入回跳中..." : "尚未登入";
    if (privateInfoEl) {
      privateInfoEl.style.display = "none";
      privateInfoEl.textContent = "";
    }
    if (togglePrivateBtn) togglePrivateBtn.style.display = "none";
    if (btnLogin) btnLogin.style.display = "";
    if (btnLogout) btnLogout.style.display = "none";
    if (btnLocalRestore) btnLocalRestore.disabled = !modules?.backup?.getPreSyncSnapshotInfo?.();
    setButtonsEnabled(false);
    if (ownerNoteEl) ownerNoteEl.style.display = "none";
    if (helpText) {
      helpText.textContent = pendingRedirect
        ? "最簡說明：手機登入會跳轉到 Google 驗證頁，回到本站後請稍候 1～3 秒讓登入狀態恢復。"
        : "最簡說明：未登入時仍可正常練題與使用 JSON 匯入匯出；登入只影響雲端同步。";
    }
    updateReminder();
    if (!output?.textContent) {
      setOutput(pendingRedirect ? "正在等待登入回跳結果..." : "請先登入 Google。登入後若要開通雲端同步，請將名稱 / 信箱 / UID 提供給擁有者加入白名單。");
    }
  }

  async function maybePromptCloudLoad(user) {
    if (!modules || !user || promptedUid === user.uid) return;
    promptedUid = user.uid;
    try {
      const meta = await modules.backup.getCloudBackupMetaSummary();
      if (!meta?.exists) {
        if (currentUser && !output?.textContent) setOutput("目前雲端尚無備份。你可先在本機練習，之後手動上傳。");
        return;
      }

      const localPayload = getCurrentPayloadSafe();
      const localMeta = modules.backup.readLocalUploadMeta?.() || {};
      const localAnswered = modules.backup.getAnsweredCountFromPayload?.(localPayload) || 0;
      const sameAsLastUpload = meta.checksum && localMeta.checksum && meta.checksum === localMeta.checksum;

      let msg = "已偵測到雲端備份，是否現在載入？\n";
      if (meta.updatedAt) msg += `雲端更新時間：${meta.updatedAt}\n`;
      msg += `雲端累計作答：約 ${Number(meta.answeredCount || 0)} 題\n`;
      msg += `本機累計作答：約 ${localAnswered} 題\n`;
      if (sameAsLastUpload) msg += "雲端看起來與你最近一次上傳相同。\n";
      msg += "\n按「確定」後，下一步可選擇覆蓋或合併；按「取消」則先不載入。";

      if (!window.confirm(msg)) {
        setOutput("你已登入。這次先保留本機資料，未自動載入雲端備份。");
        return;
      }

      if (!window.DriverQuizMemory?.applyPayload || !window.DriverQuizMemory?.buildPayload) {
        throw new Error("找不到完整資料匯入／匯出函式。");
      }

      modules.backup.savePreSyncSnapshot(() => window.DriverQuizMemory.buildPayload());
      setRestoreEnabled();

      const result = await modules.backup.downloadFullMemoryBackup();
      const replaceAll = window.confirm("按「確定」= 用雲端備份覆蓋本機全部學習記憶；按「取消」= 與目前本機記憶合併。");
      const applyResult = window.DriverQuizMemory.applyPayload(result.payload, replaceAll);
      setOutput((result.message || "下載完成") + "\n\n" + (applyResult?.message || "匯入完成") + "\n\n已先保留同步前本機備份，可用「還原同步前本機備份」回復。");
      updateReminder();
    } catch (err) {
      console.error("maybePromptCloudLoad failed", err);
      setOutput("登入後檢查雲端備份失敗：\n" + (err?.message || String(err)));
    }
  }

  if (details) details.open = false;
  togglePrivateBtn?.addEventListener("click", () => {
    privateVisible = !privateVisible;
    renderUser();
  });

  try {
    modules = {
      auth: await import("./firebase-auth.js?v=20260330g"),
      smoke: await import("./firebase-sync-smoke.js?v=20260330g"),
      backup: await import("./firebase-backup.js?v=20260330g"),
    };

    const { loginWithGoogle, logoutFirebase, watchAuthState, finishRedirectLogin } = modules.auth;
    const { smokeWrite, smokeRead } = modules.smoke;
    const { uploadFullMemoryBackup, downloadFullMemoryBackup, restorePreSyncSnapshot, savePreSyncSnapshot } = modules.backup;

    try {
      await finishRedirectLogin();
    } catch (err) {
      console.error("finishRedirectLogin failed", err);
      setOutput("Firebase redirect 收尾失敗：" + (err?.message || String(err)));
    }

    btnLogin?.addEventListener("click", async () => {
      try {
        setOutput("登入中...手機會跳轉到 Google 驗證頁，回本站後請稍候 1～3 秒。");
        await loginWithGoogle();
      } catch (err) {
        console.error(err);
        setOutput("Google 登入失敗：" + (err?.message || String(err)));
      }
    });

    btnLogout?.addEventListener("click", async () => {
      try {
        await logoutFirebase();
        promptedUid = "";
        setOutput("已登出");
      } catch (err) {
        console.error(err);
        setOutput("登出失敗：" + (err?.message || String(err)));
      }
    });

    btnSmokeWrite?.addEventListener("click", async () => {
      try {
        setOutput("寫入中...");
        await smokeWrite();
        setOutput("寫入成功");
      } catch (err) {
        console.error(err);
        setOutput("寫入失敗：\n" + (err?.message || String(err)));
      }
    });

    btnSmokeRead?.addEventListener("click", async () => {
      try {
        setOutput("讀取中...");
        const data = await smokeRead();
        setOutput(JSON.stringify(data, null, 2));
      } catch (err) {
        console.error(err);
        setOutput("讀取失敗：\n" + (err?.message || String(err)));
      }
    });

    btnCloudUpload?.addEventListener("click", async () => {
      try {
        setOutput("上傳完整資料中...");
        if (!window.DriverQuizMemory?.buildPayload) throw new Error("找不到完整資料匯出函式（DriverQuizMemory.buildPayload）。");
        const result = await uploadFullMemoryBackup(() => window.DriverQuizMemory.buildPayload());
        setOutput(result.message || "上傳完成");
        updateReminder();
      } catch (err) {
        console.error(err);
        setOutput("雲端上傳失敗：\n" + (err?.message || String(err)));
      }
    });

    btnCloudDownload?.addEventListener("click", async () => {
      try {
        setOutput("下載完整資料中...");
        if (!window.DriverQuizMemory?.applyPayload || !window.DriverQuizMemory?.buildPayload) {
          throw new Error("找不到完整資料匯入／匯出函式。");
        }
        savePreSyncSnapshot(() => window.DriverQuizMemory.buildPayload());
        setRestoreEnabled();
        const result = await downloadFullMemoryBackup();
        const replaceAll = window.confirm("按「確定」= 用雲端備份覆蓋目前本機全部學習記憶；按「取消」= 與目前記憶合併。");
        const applyResult = window.DriverQuizMemory.applyPayload(result.payload, replaceAll);
        setOutput((result.message || "下載完成") + "\n\n" + (applyResult?.message || "匯入完成") + "\n\n已先保留同步前本機備份，可用「還原同步前本機備份」回復。");
        updateReminder();
      } catch (err) {
        console.error(err);
        setOutput("雲端下載失敗：\n" + (err?.message || String(err)));
      }
    });

    btnLocalRestore?.addEventListener("click", async () => {
      try {
        if (!window.DriverQuizMemory?.applyPayload) throw new Error("找不到完整資料匯入函式。");
        const ok = window.confirm("是否要還原到上一次同步前的本機備份？這會覆蓋目前本機資料。");
        if (!ok) return;
        const result = restorePreSyncSnapshot((payload, replaceAll) => window.DriverQuizMemory.applyPayload(payload, replaceAll));
        setOutput((result?.message || "已還原同步前本機備份。"));
        updateReminder();
      } catch (err) {
        console.error(err);
        setOutput("還原失敗：\n" + (err?.message || String(err)));
      }
    });

    watchAuthState(async (user) => {
      currentUser = user || null;
      authReady = true;
      privateVisible = false;
      renderUser();
      if (currentUser) {
        await maybePromptCloudLoad(currentUser);
      } else {
        promptedUid = "";
      }
    });

    renderUser();
  } catch (err) {
    console.error("Firebase UI module load failed", err);
    setOutput("Firebase 模組載入失敗：\n" + (err?.message || String(err)) + "\n\n請確認 firebase-init.js、firebase-auth.js、firebase-sync-smoke.js、firebase-backup.js 都已上傳到 GitHub Pages 根目錄。");
    if (summaryText) summaryText.textContent = "雲端同步：模組載入失敗";
  }
});
