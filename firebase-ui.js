window.addEventListener('DOMContentLoaded', async () => {
  const userInfo = document.getElementById('firebase-user-info');
  const btnLogin = document.getElementById('btn-google-login');
  const btnLogout = document.getElementById('btn-google-logout');
  const btnSmokeWrite = document.getElementById('btn-smoke-write');
  const btnSmokeRead = document.getElementById('btn-smoke-read');
  const output = document.getElementById('sync-test-output');

  const setOutput = (msg) => {
    if (output) output.textContent = msg;
  };

  try {
    const authMod = await import('./firebase-auth.js?v=20260330c');
    const smokeMod = await import('./firebase-sync-smoke.js?v=20260330c');
    const { loginWithGoogle, logoutFirebase, watchAuthState, finishRedirectLogin } = authMod;
    const { smokeWrite, smokeRead } = smokeMod;

    try {
      await finishRedirectLogin();
    } catch (err) {
      console.error('finishRedirectLogin failed', err);
      setOutput('Firebase redirect 收尾失敗：' + (err?.message || String(err)));
    }

    btnLogin?.addEventListener('click', async () => {
      try {
        setOutput('登入中...');
        await loginWithGoogle();
      } catch (err) {
        console.error(err);
        setOutput('Google 登入失敗：' + (err?.message || String(err)));
        alert('Google 登入失敗，請看同步測試區或 console。');
      }
    });

    btnLogout?.addEventListener('click', async () => {
      try {
        await logoutFirebase();
        setOutput('已登出');
      } catch (err) {
        console.error(err);
        setOutput('登出失敗：' + (err?.message || String(err)));
      }
    });

    btnSmokeWrite?.addEventListener('click', async () => {
      try {
        setOutput('寫入中...');
        await smokeWrite();
        setOutput('寫入成功');
      } catch (err) {
        console.error(err);
        setOutput('寫入失敗：\n' + (err?.message || String(err)));
      }
    });

    btnSmokeRead?.addEventListener('click', async () => {
      try {
        setOutput('讀取中...');
        const data = await smokeRead();
        setOutput(JSON.stringify(data, null, 2));
      } catch (err) {
        console.error(err);
        setOutput('讀取失敗：\n' + (err?.message || String(err)));
      }
    });

    watchAuthState((user) => {
      if (user) {
        if (userInfo) userInfo.textContent = `已登入：${user.displayName || '(無名稱)'} | ${user.email || '(無 email)'} | uid=${user.uid}`;
        if (btnLogin) btnLogin.style.display = 'none';
        if (btnLogout) btnLogout.style.display = '';
        if (btnSmokeWrite) btnSmokeWrite.disabled = false;
        if (btnSmokeRead) btnSmokeRead.disabled = false;
        if (!output?.textContent) setOutput('已登入，可開始測試 Firestore 讀寫。');
      } else {
        if (userInfo) userInfo.textContent = '尚未登入';
        if (btnLogin) btnLogin.style.display = '';
        if (btnLogout) btnLogout.style.display = 'none';
        if (btnSmokeWrite) btnSmokeWrite.disabled = true;
        if (btnSmokeRead) btnSmokeRead.disabled = true;
        if (!output?.textContent) setOutput('請先登入 Google。');
      }
    });
  } catch (err) {
    console.error('Firebase UI module load failed', err);
    setOutput('Firebase 模組載入失敗：\n' + (err?.message || String(err)) + '\n\n請確認 firebase-init.js、firebase-auth.js、firebase-sync-smoke.js 都已上傳到 GitHub Pages 根目錄。');
  }
});
