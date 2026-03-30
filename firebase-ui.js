window.addEventListener("DOMContentLoaded", async () => {
  const details = document.getElementById("firebaseSyncDetails");
  const summaryText = document.getElementById("firebaseSummaryText");
  const displayNameEl = document.getElementById("firebase-display-name");
  const privateInfoEl = document.getElementById("firebase-private-info");
  const togglePrivateBtn = document.getElementById("btn-firebase-toggle-private");
  const btnLogin = document.getElementById("btn-google-login");
  const btnLogout = document.getElementById("btn-google-logout");
  const btnSmokeWrite = document.getElementById("btn-smoke-write");
  const btnSmokeRead = document.getElementById("btn-smoke-read");
  const btnCloudUpload = document.getElementById("btn-cloud-upload");
  const btnCloudDownload = document.getElementById("btn-cloud-download");
  const output = document.getElementById("sync-test-output");

  let privateVisible = false;
  let currentUser = null;

  const setOutput = (msg) => { if (output) output.textContent = msg || ""; };
  const setEnabled = (enabled) => {
    [btnSmokeWrite, btnSmokeRead, btnCloudUpload, btnCloudDownload].forEach((btn) => {
      if (btn) btn.disabled = !enabled;
    });
  };
  const masked = (value, keep = 2) => {
    const s = String(value || "").trim();
    if (!s) return "";
    if (s.length <= keep) return "*".repeat(s.length);
    return s.slice(0, keep) + "*".repeat(Math.max(2, s.length - keep));
  };
  const renderUser = () => {
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
      setEnabled(true);
      if (!output?.textContent) setOutput("已登入，可展開後進行測試或雲端備份。\n個資預設隱匿，按眼睛才完整顯示。");
    } else {
      if (summaryText) summaryText.textContent = "雲端同步：未登入（展開登入選項）";
      if (displayNameEl) displayNameEl.textContent = "尚未登入";
      if (privateInfoEl) {
        privateInfoEl.style.display = "none";
        privateInfoEl.textContent = "";
      }
      if (togglePrivateBtn) togglePrivateBtn.style.display = "none";
      if (btnLogin) btnLogin.style.display = "";
      if (btnLogout) btnLogout.style.display = "none";
      setEnabled(false);
      if (!output?.textContent) setOutput("請先展開並登入 Google。登入成功後才可使用測試與雲端備份。\n個資預設隱匿。");
    }
  };

  if (details) details.open = false;
  togglePrivateBtn?.addEventListener("click", () => {
    privateVisible = !privateVisible;
    renderUser();
  });

  try {
    const authMod = await import("./firebase-auth.js?v=20260330f");
    const smokeMod = await import("./firebase-sync-smoke.js?v=20260330f");
    const backupMod = await import("./firebase-backup.js?v=20260330f");
    const { loginWithGoogle, logoutFirebase, watchAuthState, finishRedirectLogin } = authMod;
    const { smokeWrite, smokeRead } = smokeMod;
    const { uploadFullMemoryBackup, downloadFullMemoryBackup } = backupMod;

    try {
      await finishRedirectLogin();
    } catch (err) {
      console.error("finishRedirectLogin failed", err);
      setOutput("Firebase redirect 收尾失敗：" + (err?.message || String(err)));
    }

    btnLogin?.addEventListener("click", async () => {
      try {
        setOutput("登入中...");
        await loginWithGoogle();
      } catch (err) {
        console.error(err);
        setOutput("Google 登入失敗：" + (err?.message || String(err)));
      }
    });

    btnLogout?.addEventListener("click", async () => {
      try {
        await logoutFirebase();
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
      } catch (err) {
        console.error(err);
        setOutput("雲端上傳失敗：\n" + (err?.message || String(err)));
      }
    });

    btnCloudDownload?.addEventListener("click", async () => {
      try {
        setOutput("下載完整資料中...");
        if (!window.DriverQuizMemory?.applyPayload) throw new Error("找不到完整資料匯入函式（DriverQuizMemory.applyPayload）。");
        const result = await downloadFullMemoryBackup();
        const replaceAll = window.confirm("按「確定」= 用雲端備份覆蓋目前本機全部學習記憶；按「取消」= 與目前記憶合併。");
        const applyResult = window.DriverQuizMemory.applyPayload(result.payload, replaceAll);
        setOutput((result.message || "下載完成") + "\n\n" + (applyResult?.message || "匯入完成"));
      } catch (err) {
        console.error(err);
        setOutput("雲端下載失敗：\n" + (err?.message || String(err)));
      }
    });

    watchAuthState((user) => {
      currentUser = user || null;
      privateVisible = false;
      renderUser();
    });
  } catch (err) {
    console.error("Firebase UI module load failed", err);
    setOutput("Firebase 模組載入失敗：\n" + (err?.message || String(err)) + "\n\n請確認 firebase-init.js、firebase-auth.js、firebase-sync-smoke.js、firebase-backup.js 都已上傳到 GitHub Pages 根目錄。");
    if (summaryText) summaryText.textContent = "雲端同步：模組載入失敗";
  }
});
