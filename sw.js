const CACHE_NAME = "bula-teach-v7";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/THIRD_PARTY_NOTICES.md",
  "./assets/audio/bopomofo/F1.WAV",
  "./assets/audio/bopomofo/F2.WAV",
  "./assets/audio/bopomofo/F3.WAV",
  "./assets/audio/bopomofo/F4.WAV",
  "./assets/audio/bopomofo/F5.WAV",
  "./assets/audio/bopomofo/F6.WAV",
  "./assets/audio/bopomofo/F7.WAV",
  "./assets/audio/bopomofo/F8.WAV",
  "./assets/audio/bopomofo/F9.WAV",
  "./assets/audio/bopomofo/F10.WAV",
  "./assets/audio/bopomofo/F11.WAV",
  "./assets/audio/bopomofo/F12.WAV",
  "./assets/audio/bopomofo/F13.WAV",
  "./assets/audio/bopomofo/F14.WAV",
  "./assets/audio/bopomofo/F15.WAV",
  "./assets/audio/bopomofo/F16.WAV",
  "./assets/audio/bopomofo/F17.WAV",
  "./assets/audio/bopomofo/F18.WAV",
  "./assets/audio/bopomofo/F19.WAV",
  "./assets/audio/bopomofo/F20.WAV",
  "./assets/audio/bopomofo/F21.WAV",
  "./assets/audio/bopomofo/F22.WAV",
  "./assets/audio/bopomofo/F23.WAV",
  "./assets/audio/bopomofo/F24.WAV",
  "./assets/audio/bopomofo/F25.WAV",
  "./assets/audio/bopomofo/F26.WAV",
  "./assets/audio/bopomofo/F27.WAV",
  "./assets/audio/bopomofo/F28.WAV",
  "./assets/audio/bopomofo/F29.WAV",
  "./assets/audio/bopomofo/F30.WAV",
  "./assets/audio/bopomofo/F31.WAV",
  "./assets/audio/bopomofo/F32.WAV",
  "./assets/audio/bopomofo/F33.WAV",
  "./assets/audio/bopomofo/F34.WAV",
  "./assets/audio/bopomofo/F35.WAV",
  "./assets/audio/bopomofo/F36.WAV",
  "./assets/audio/bopomofo/F37.WAV"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => {
      return caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      });
    })
  );
});
