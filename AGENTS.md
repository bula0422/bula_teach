# AGENTS.md

## Project Goal

Bula Teach is a personal-use iPad PWA for tracing Chinese characters, bopomofo, and English words. It should work offline after the first HTTPS load and should not require accounts, a backend, or audio files.

## Architecture

This project is intentionally static:

- `index.html` contains the app shell.
- `styles.css` defines the iPad-friendly layout and tracing template style.
- `app.js` contains default lesson data, custom lesson storage, drawing logic, progress storage, and TTS playback.
- `sw.js` enables offline caching.
- `manifest.webmanifest` enables installable PWA behavior.
- `_headers` contains Cloudflare Pages response headers.

Do not add a framework or build step unless the app has grown enough to justify it.

## Deployment Target

Deploy to Cloudflare Pages as a static site:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`

Cloudflare Pages provides HTTPS, which is required for reliable Service Worker and PWA behavior on iPad Safari.

## Offline Behavior

The app should work offline after it has been opened once from the deployed HTTPS URL. The Service Worker uses a network-first strategy so online visits can pick up updates, then falls back to cache while offline.

When changing core app files, keep `APP_ASSETS` in `sw.js` current. If offline update behavior becomes confusing, bump `CACHE_NAME`.

## Lesson Data

Lessons currently live in the `LESSONS` array in `app.js`. Keep entries small and explicit:

```js
{
  id: "zh_wo",
  type: "chinese",
  display: "我",
  hint: "ㄨㄛˇ",
  meaning: "I / me",
  speakText: "我",
  lang: "zh-TW"
}
```

Supported `type` values:

- `chinese`
- `bopomofo`
- `english`

Use `display` for the tracing template and `speakText` for TTS. For bopomofo, prefer TTS-friendly speak text such as `波`, `坡`, or `摸` instead of relying on the engine to pronounce isolated symbols correctly.

## Drawing Approach

The tracing template is generated with system fonts and a translucent text layer beneath the canvas. There are no SVG stroke files and no embedded fonts in the current version.

This is deliberate for the MVP:

- No extra font licensing work.
- No per-character SVG preparation.
- Chinese, bopomofo, and English all use the same rendering path.

If exact cross-device glyph consistency becomes necessary, add a properly licensed font file and define it with `@font-face` in `styles.css`.

## TTS

Use the browser `speechSynthesis` API. Do not add audio files unless the user explicitly wants recorded pronunciation. On iPad, offline TTS quality depends on installed iOS voices.

## Coding Constraints

Keep the app dependency-free and easy to deploy. Prefer plain HTML, CSS, and JavaScript. Avoid adding Node tooling, package managers, or generated files unless there is a concrete need.

Before finishing a change, run:

```bash
node --check app.js
node --check sw.js
```


## Custom Lessons

The app supports user-added lessons from the sidebar form. Custom lessons are stored in `localStorage` under `bula-teach-custom-lessons-v1` and are intentionally device-local. Do not add backend sync unless the user asks for multi-device use.

When rendering user-provided text, use DOM APIs and `textContent`; do not inject user input through `innerHTML`.


## Settings

User settings are stored in `localStorage` under `bula-teach-settings-v1`. Current settings are `autoPlay` and `showTemplate`. Keep settings device-local unless the user asks for sync.

The template visibility control must update both the toolbar button and the settings checkbox. Auto-play should only trigger when changing cards, not on the first page load.

English defaults include uppercase and lowercase A-Z generated in `app.js`. Keep English tracing in Arial unless the user asks for a different font.


## Bopomofo Audio Assets

Default bopomofo lessons use Ministry of Education audio copied into `assets/audio/bopomofo/`. Keep the attribution in `assets/THIRD_PARTY_NOTICES.md` whenever these assets are shipped.

For bopomofo playback, prefer `audioUrl` over TTS. If new required audio assets are added, update `APP_ASSETS` in `sw.js` and bump `CACHE_NAME` so installed PWAs refresh their cache.
