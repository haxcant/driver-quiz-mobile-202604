const CACHE_NAME = "driver-quiz-pwa-v17-firebase-stablefix";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=20260330stable",
  "./questions.js",
  "./handbook_explanations.js",
  "./handbook_pages.js",
  "./manifest.webmanifest",
  "./firebase-init.js",
  "./firebase-auth.js?v=20260330stable",
  "./firebase-sync-smoke.js?v=20260330stable",
  "./firebase-backup.js?v=20260330stable",
  "./firebase-ui.js?v=20260330stable",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigate = event.request.mode === "navigate";
  const isCriticalAsset = /\.(html|js|css)$/.test(url.pathname);

  if (isNavigate || isCriticalAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        });
    })
  );
});
