window.addEventListener("DOMContentLoaded", async () => {
  const el = (id) => document.getElementById(id);
  const details = el("firebaseSyncDetails");
  const summaryText = el("firebaseSummaryText");
  const helpText = el("firebase-help-text");
  const displayNameEl = el("firebase-display-name");
  const ownerNoteEl = el("firebase-owner-note");
  const cloudMetaEl = el("firebase-cloud-meta");
  const reminderEl = el("firebase-sync-reminder");
  const privateInfoEl = el("firebase-private-info");
  const togglePrivateBtn = el("btn-firebase-toggle-private");
  const btnLogin = el("btn-google-login");
  const btnLogout = el("btn-google-logout");
  const btnSmokeWrite = el("btn-smoke-write");
  const btnSmokeRead = el("btn-smoke-read");
  const btnCloudUpload = el("btn-cloud-upload");
  const btnCloudDownload = el("btn-cloud-download");
  const btnLocalRestore = el("btn-local-restore");
  const output = el("sync-test-output");

  let modules = null;
  let currentUser = null;
  let cloudMeta = null;
  let privateVisible = false;
  let modulesReady = false;
  let loginInFlight = false;

  const setOutput = (msg) => {
    if (output) output.textContent = msg || "";
    if (details && msg) details.open = true;
  };
  const setButtonBusy = (btn, busyText, busy) => {
    if (!btn) return;
    if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent || "";
    btn.disabled = !!busy;
    btn.textContent = busy ? busyText : (btn.dataset.originalText || btn.textContent || "");
  };
  const masked = (value, keep = 2) => {
    const s = String(value || "").trim();
    if (!s) return "";
    if (s.length <= keep) return "*".repeat(s.length);
    return s.slice(0, keep) + "*".repeat(Math.max(2, s.length - keep));
  };
  const setSyncButtonsEnabled = (enabled) => {
    [btnSmokeWrite, btnSmokeRead, btnCloudUpload, btnCloudDownload].forEach((btn) => {
      if (btn) btn.disabled = !enabled;
    });
  };
  const localAnsweredCount = () => {
    try {
      return modules?.backup?.getAnsweredCountFromPayload(window.DriverQuizMemory?.buildPayload?.()) || 0;
    } catch {
      return 0;
    }
  };
  const setRestoreEnabled = () => {
    const snapshotInfo = modules?.backup?.getPreSyncSnapshotInfo?.();
    if (btnLocalRestore) btnLocalRestore.disabled = !snapshotInfo;
  };


if (btnLogin) {
  btnLogin.dataset.originalText = btnLogin.textContent || "Google 登入";
  btnLogin.addEventListener("click", (event) => {
    if (modulesReady || loginInFlight) return;
    event.preventDefault();
    setOutput("同步模組仍在載入中，請稍候 1～2 秒後再試。若長時間沒有變化，代表網頁腳本可能尚未成功載入。");
  });
}

  function updateCloudMetaView() {
    if (!cloudMetaEl) return;
    if (!currentUser) {
      cloudMetaEl.textContent = "";
      return;
    }
    if (!cloudMeta?.exists) {
      cloudMetaEl.textContent = "雲端目前沒有備份。";
      return;
    }
    const answered = Number(cloudMeta.answeredCount || 0);
    const when = cloudMeta.updatedAt ? `，更新：${cloudMeta.updatedAt}` : "";
    cloudMetaEl.textContent = `雲端備份：約 ${answered} 題${when}`;
  }

  function updateReminder() {
    if (!reminderEl) return;
    if (!currentUser) {
      reminderEl.textContent = "未登入時仍可用本機功能與 JSON 匯入匯出。";
      return;
    }
    const localMeta = modules?.backup?.readLocalUploadMeta?.() || {};
    const answered = localAnsweredCount();
    const uploadedAnswered = Number(localMeta?.answeredCount || 0);
    const delta = Math.max(0, answered - uploadedAnswered);
    if (delta >= 200) {
      reminderEl.textContent = `你自上次雲端上傳後已新增約 ${delta} 題，建議現在手動上傳雲端備份。`;
    } else if (delta > 0) {
      reminderEl.textContent = `目前有未同步變更（約 ${delta} 題差異），雲端同步採手動上傳／下載。`;
    } else {
      reminderEl.textContent = "目前沒有明顯未同步新增作答。";
    }
  }

  async function refreshCloudMeta() {
    if (!currentUser || !modules?.backup?.getCloudBackupMetaSummary) {
      cloudMeta = null;
      updateCloudMetaView();
      return;
    }
    try {
      cloudMeta = await modules.backup.getCloudBackupMetaSummary();
    } catch (err) {
      console.error("refreshCloudMeta failed", err);
      cloudMeta = { exists: false, error: err?.message || String(err) };
    }
    updateCloudMetaView();
  }

  function renderUser() {
    if (details) details.open = false;

    if (currentUser) {
      const name = currentUser.displayName || (currentUser.email ? currentUser.email.split("@")[0] : "已登入使用者");
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
      setSyncButtonsEnabled(true);
      setRestoreEnabled();
      if (ownerNoteEl) ownerNoteEl.style.display = "";
      if (helpText) helpText.textContent = "最簡說明：登入後只會顯示雲端備份摘要；只有當你按『下載雲端備份』時，才會詢問是否載入本機。";
      updateCloudMetaView();
      updateReminder();
      if (!output?.textContent) {
        setOutput("已登入。雲端不會自動載入；若需要再手動下載。\n載入前會先保存同步前本機備份，可隨時還原。");
      }
      return;
    }

    if (summaryText) summaryText.textContent = "雲端同步：未登入（展開登入選項）";
    if (displayNameEl) displayNameEl.textContent = "尚未登入";
    if (privateInfoEl) {
      privateInfoEl.style.display = "none";
      privateInfoEl.textContent = "";
    }
    if (togglePrivateBtn) togglePrivateBtn.style.display = "none";
    if (btnLogin) btnLogin.style.display = "";
    if (btnLogout) btnLogout.style.display = "none";
    if (btnLocalRestore) btnLocalRestore.disabled = !modules?.backup?.getPreSyncSnapshotInfo?.();
    setSyncButtonsEnabled(false);
    if (ownerNoteEl) ownerNoteEl.style.display = "none";
    if (cloudMetaEl) cloudMetaEl.textContent = "";
    if (helpText) helpText.textContent = "最簡說明：未登入時仍可正常練題與使用 JSON 匯入匯出；登入只影響雲端同步。";
    updateReminder();
    if (!output?.textContent) {
      setOutput("請先登入 Google。登入後若要開通雲端同步，請將名稱 / 信箱 / UID 提供給擁有者加入白名單。\n若手機無法彈出登入視窗，請允許彈出視窗或改用桌面瀏覽器。");
    }
  }

  setSyncButtonsEnabled(false);
  if (btnCloudUpload) btnCloudUpload.disabled = true;
  if (btnCloudDownload) btnCloudDownload.disabled = true;
  if (btnSmokeWrite) btnSmokeWrite.disabled = true;
  if (btnSmokeRead) btnSmokeRead.disabled = true;
  if (btnLocalRestore) btnLocalRestore.disabled = true;
  if (btnLogin) btnLogin.textContent = "載入登入模組...";
  try {
    modules = {
      auth: await import("./firebase-auth.js?v=20260331v206"),
      smoke: await import("./firebase-sync-smoke.js?v=20260331v206"),
      backup: await import("./firebase-backup.js?v=20260331v206"),
    };
  } catch (err) {
    console.error("firebase modules import failed", err);
    setOutput("Firebase 模組載入失敗：" + (err?.message || String(err)));
    return;
  }

  const { loginWithGoogle, logoutFirebase, watchAuthState, finishRedirectLogin } = modules.auth;
  modulesReady = true;
  if (btnLogin) {
    btnLogin.disabled = false;
    btnLogin.textContent = btnLogin.dataset.originalText || "Google 登入";
  }
  const { smokeWrite, smokeRead } = modules.smoke;
  const { uploadFullMemoryBackup, downloadFullMemoryBackup, restorePreSyncSnapshot, savePreSyncSnapshot } = modules.backup;

  if (details) details.open = false;
  if (togglePrivateBtn) {
    togglePrivateBtn.addEventListener("click", () => {
      privateVisible = !privateVisible;
      renderUser();
    });
  }

  try {
    await finishRedirectLogin();
  } catch (err) {
    console.error("finishRedirectLogin failed", err);
    setOutput("Firebase 登入初始化失敗：" + (err?.message || String(err)));
  }

  
if (btnLogin) {
    btnLogin.addEventListener("click", async () => {
      if (!modulesReady) {
        setOutput("同步模組仍在載入中，請稍候再試。");
        return;
      }
      if (loginInFlight) return;
      loginInFlight = true;
      try {
        setButtonBusy(btnLogin, "登入中...", true);
        setOutput("登入中... 若 8 秒內仍沒有出現 Google 視窗，通常是瀏覽器擋下彈窗、網路太慢，或網頁腳本尚未完整載入。");
        const warnTimer = setTimeout(() => {
          setOutput("登入流程仍在等待中。若完全沒有跳出 Google 視窗，較可能是瀏覽器彈窗限制或網頁腳本異常；若有跳出視窗但又回到未登入，才比較像 Google/Firebase 流程問題。");
        }, 8000);
        await loginWithGoogle();
        clearTimeout(warnTimer);
      } catch (err) {
        console.error(err);
        setOutput("Google 登入失敗：
" + (err?.message || String(err)));
      } finally {
        loginInFlight = false;
        setButtonBusy(btnLogin, "登入中...", false);
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      try {
        await logoutFirebase();
        cloudMeta = null;
        setOutput("已登出");
      } catch (err) {
        console.error(err);
        setOutput("登出失敗：" + (err?.message || String(err)));
      }
    });
  }

  if (btnSmokeWrite) {
    btnSmokeWrite.addEventListener("click", async () => {
      try {
        setOutput("寫入中...");
        await smokeWrite();
        await refreshCloudMeta();
        setOutput("寫入成功");
      } catch (err) {
        console.error(err);
        setOutput("寫入失敗：\n" + (err?.message || String(err)));
      }
    });
  }

  if (btnSmokeRead) {
    btnSmokeRead.addEventListener("click", async () => {
      try {
        setOutput("讀取中...");
        const data = await smokeRead();
        setOutput(JSON.stringify(data, null, 2));
      } catch (err) {
        console.error(err);
        setOutput("讀取失敗：\n" + (err?.message || String(err)));
      }
    });
  }

  if (btnCloudUpload) {
    btnCloudUpload.addEventListener("click", async () => {
      try {
        if (!window.DriverQuizMemory?.buildPayload) throw new Error("找不到完整資料匯出函式（DriverQuizMemory.buildPayload）。");
        setOutput("上傳完整資料中...");
        const result = await uploadFullMemoryBackup(() => window.DriverQuizMemory.buildPayload());
        await refreshCloudMeta();
        setOutput(result.message || "上傳完成");
        updateReminder();
    } catch (err) {
      console.error(err);
      setOutput("雲端上傳失敗：
" + (err?.message || String(err)));
    } finally {
      setButtonBusy(btnCloudUpload, "上傳中...", false);
    }
  });
}

  if (btnCloudDownload) {
    btnCloudDownload.addEventListener("click", async () => {
      try {
        if (!window.DriverQuizMemory?.applyPayload || !window.DriverQuizMemory?.buildPayload) {
          throw new Error("找不到完整資料匯入／匯出函式。");
        }
        await refreshCloudMeta();
        if (!cloudMeta?.exists) throw new Error("雲端目前沒有備份可下載。");
        const msg = [
          "是否現在載入雲端備份？",
          cloudMeta.updatedAt ? `雲端更新時間：${cloudMeta.updatedAt}` : "",
          `雲端累計作答：約 ${Number(cloudMeta.answeredCount || 0)} 題`,
          `本機累計作答：約 ${localAnsweredCount()} 題`,
          "",
          "按『確定』後，下一步可選擇覆蓋或合併；按『取消』則不載入。"
        ].filter(Boolean).join("
");
        if (!window.confirm(msg)) {
          setOutput("已取消載入雲端備份。本機資料保持不變。");
          return;
        }
        savePreSyncSnapshot(() => window.DriverQuizMemory.buildPayload());
        setRestoreEnabled();
        const result = await downloadFullMemoryBackup();
        const replaceAll = window.confirm("第二步：按『確定』= 覆蓋本機；按『取消』= 與本機合併。
覆蓋前已自動保存同步前本機備份。
");
        const applyResult = window.DriverQuizMemory.applyPayload(result.payload, replaceAll);
        setOutput((result.message || "下載完成") + "

" + (applyResult?.message || "已套用到本機。"));
        updateReminder();
    } catch (err) {
      console.error(err);
      setOutput("雲端下載失敗：
" + (err?.message || String(err)));
    } finally {
      setButtonBusy(btnCloudDownload, "下載中...", false);
    }
  });
}

  if (btnLocalRestore) {
    btnLocalRestore.addEventListener("click", async () => {
      try {
        if (!window.DriverQuizMemory?.applyPayload) throw new Error("找不到完整資料匯入函式。")
        const result = restorePreSyncSnapshot((payload, replaceAll) => window.DriverQuizMemory.applyPayload(payload, replaceAll ? "replace" : "conservative"));
        setOutput(result?.message || "已還原同步前本機備份。");
        updateReminder();
      } catch (err) {
        console.error(err);
        setOutput("還原失敗：\n" + (err?.message || String(err)));
      }
    });
  }

  watchAuthState(async (user) => {
    currentUser = user || null;
    privateVisible = false;
    await refreshCloudMeta();
    renderUser();
    setRestoreEnabled();
  });

  renderUser();
});
