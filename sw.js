const CACHE_NAME = "bula-teach-v66";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./home.js",
  "./copybook",
  "./copybook/",
  "./copybook/index.html",
  "./copybook/copybook.css",
  "./copybook/copybook.js",
  "./copybook/lessons/bopomofo.js",
  "./copybook/lessons/letters.js",
  "./copybook/lessons/hanzi.js",
  "./copybook/lessons/words.js",
  "./manifest.webmanifest",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./app-icon.png",
  "./assets/menu-copybook.svg",
  "./assets/menu-math.svg",
  "./assets/menu-games.svg",
  "./assets/vendor/hanzi-writer-3.7.2.min.js",
  "./assets/bopomofo-stroke-data/ㄅ.json",
  "./assets/bopomofo-stroke-data/ㄆ.json",
  "./assets/bopomofo-stroke-data/ㄇ.json",
  "./assets/bopomofo-stroke-data/ㄈ.json",
  "./assets/bopomofo-stroke-data/ㄉ.json",
  "./assets/bopomofo-stroke-data/ㄊ.json",
  "./assets/bopomofo-stroke-data/ㄋ.json",
  "./assets/bopomofo-stroke-data/ㄌ.json",
  "./assets/bopomofo-stroke-data/ㄍ.json",
  "./assets/bopomofo-stroke-data/ㄎ.json",
  "./assets/bopomofo-stroke-data/ㄏ.json",
  "./assets/bopomofo-stroke-data/ㄐ.json",
  "./assets/bopomofo-stroke-data/ㄑ.json",
  "./assets/bopomofo-stroke-data/ㄒ.json",
  "./assets/bopomofo-stroke-data/ㄓ.json",
  "./assets/bopomofo-stroke-data/ㄔ.json",
  "./assets/bopomofo-stroke-data/ㄕ.json",
  "./assets/bopomofo-stroke-data/ㄖ.json",
  "./assets/bopomofo-stroke-data/ㄗ.json",
  "./assets/bopomofo-stroke-data/ㄘ.json",
  "./assets/bopomofo-stroke-data/ㄙ.json",
  "./assets/bopomofo-stroke-data/ㄧ.json",
  "./assets/bopomofo-stroke-data/ㄨ.json",
  "./assets/bopomofo-stroke-data/ㄩ.json",
  "./assets/bopomofo-stroke-data/ㄚ.json",
  "./assets/bopomofo-stroke-data/ㄛ.json",
  "./assets/bopomofo-stroke-data/ㄜ.json",
  "./assets/bopomofo-stroke-data/ㄝ.json",
  "./assets/bopomofo-stroke-data/ㄞ.json",
  "./assets/bopomofo-stroke-data/ㄟ.json",
  "./assets/bopomofo-stroke-data/ㄠ.json",
  "./assets/bopomofo-stroke-data/ㄡ.json",
  "./assets/bopomofo-stroke-data/ㄢ.json",
  "./assets/bopomofo-stroke-data/ㄣ.json",
  "./assets/bopomofo-stroke-data/ㄤ.json",
  "./assets/bopomofo-stroke-data/ㄥ.json",
  "./assets/bopomofo-stroke-data/ㄦ.json",
  "./math",
  "./math/",
  "./math/index.html",
  "./math/math.css",
  "./math/math.js",
  "./games",
  "./games/",
  "./games/index.html",
  "./games/games.css",
  "./games/games.js",
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
