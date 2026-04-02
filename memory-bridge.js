(function () {
  const STORAGE_KEY = "driver-quiz-progress-v6";
  const SESSION_KEY = "driver-quiz-session-v6";
  const SETTINGS_KEY = "driver-quiz-settings-v6";
  const IMAGE_ISSUES_KEY = "driver-quiz-image-issues-v1";
  const MEMORY_EXPORT_VERSION = 1;

  function safeParse(raw, fallback) {
    if (typeof raw !== "string" || !raw.trim()) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function readStorageJson(key, fallback) {
    try {
      return safeParse(localStorage.getItem(key), fallback);
    } catch {
      return fallback;
    }
  }

  function readProgress() {
    const data = readStorageJson(STORAGE_KEY, {});
    return data && typeof data === "object" ? data : {};
  }

  function readSession() {
    const data = readStorageJson(SESSION_KEY, null);
    return data && typeof data === "object" ? data : null;
  }

  function readSettings() {
    const data = readStorageJson(SETTINGS_KEY, {});
    return data && typeof data === "object" ? data : {};
  }

  function readImageIssues() {
    const data = readStorageJson(IMAGE_ISSUES_KEY, {});
    return data && typeof data === "object" ? data : {};
  }

  function getAnsweredCount() {
    const progress = readProgress();
    const meta = progress && typeof progress.meta === "object" ? progress.meta : {};
    const total = Number(meta.totalAnswered || 0);
    if (Number.isFinite(total) && total >= 0) return total;
    return 0;
  }

  function isSessionInProgress() {
    const session = readSession();
    if (!session || typeof session !== "object") return false;
    const queueLen = Array.isArray(session.queue) ? session.queue.length : 0;
    const index = Math.max(0, Number(session.index || 0));
    const hasQuizClass = !!document.body?.classList?.contains("quiz-mode-active");
    return queueLen > 0 && index < queueLen && hasQuizClass;
  }

  function buildPayload() {
    return {
      app: "driver-quiz-pwa",
      type: "full-memory-export",
      version: MEMORY_EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      storageKeys: {
        progress: STORAGE_KEY,
        session: SESSION_KEY,
        settings: SETTINGS_KEY,
        imageIssues: IMAGE_ISSUES_KEY,
      },
      progress: readProgress(),
      session: readSession(),
      settings: readSettings(),
      imageIssues: readImageIssues(),
      source: "memory-bridge",
    };
  }

  function ensureMemoryApi() {
    const current = window.DriverQuizMemory || {};
    const next = {
      ...current,
      buildPayload: typeof current.buildPayload === "function" ? current.buildPayload : buildPayload,
      getAnsweredCount: typeof current.getAnsweredCount === "function" ? current.getAnsweredCount : getAnsweredCount,
      isSessionInProgress: typeof current.isSessionInProgress === "function" ? current.isSessionInProgress : isSessionInProgress,
    };
    window.DriverQuizMemory = next;
    return next;
  }

  function exportPayloadAsJson() {
    const payload = ensureMemoryApi().buildPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `driver-quiz-memory-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 0);
  }

  function bindFallbackExportButton() {
    const btn = document.getElementById("exportMemoryBtn");
    if (!btn || btn.dataset.memoryBridgeBound === "1") return;
    btn.dataset.memoryBridgeBound = "1";
    btn.addEventListener("click", (event) => {
      const api = ensureMemoryApi();
      if (typeof api.buildPayload !== "function") return;
      // 若 app.js 已正常綁定原本匯出函式，讓它優先處理。
      // 這個 fallback 只在事件結束後仍未觸發下載時補上。
      const before = document.querySelectorAll('a[download^="driver-quiz-memory-"]').length;
      setTimeout(() => {
        const after = document.querySelectorAll('a[download^="driver-quiz-memory-"]').length;
        if (after > before) return;
        try {
          exportPayloadAsJson();
        } catch (err) {
          console.error("memory-bridge export fallback failed", err);
        }
      }, 0);
    }, false);
  }

  window.DriverQuizMemoryBridge = {
    ensureMemoryApi,
    buildPayload,
    getAnsweredCount,
    isSessionInProgress,
    exportPayloadAsJson,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ensureMemoryApi();
      bindFallbackExportButton();
    }, { once: true });
  } else {
    ensureMemoryApi();
    bindFallbackExportButton();
  }

  window.addEventListener("pageshow", () => {
    ensureMemoryApi();
    bindFallbackExportButton();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") ensureMemoryApi();
  });
})();
