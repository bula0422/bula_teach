# AGENTS.md

## Project Goal

Bula Teach is a personal-use iPad PWA for tracing bopomofo, letters, Chinese characters, and English words. It should work offline after the first HTTPS load and should not require accounts or a backend.

## Architecture

This project is intentionally static and dependency-free:

- `index.html` contains the app shell, dialogs, and controls.
- `styles.css` defines the iPad-friendly accordion layout, tracing area, and modal styling.
- `app.js` contains lesson data, drawing logic, local storage, import/export, settings, and playback.
- `sw.js` enables offline caching.
- `manifest.webmanifest` enables installable PWA behavior.
- `_headers` contains Cloudflare response headers.
- `assets/audio/bopomofo/` contains copied bopomofo WAV files.
- `assets/THIRD_PARTY_NOTICES.md` contains third-party attribution.

Do not add a framework or build step unless the app has grown enough to justify it.

## UI Model

The main screen should stay simple:

- Left sidebar: four collapsible categories only: `注音`, `字母`, `國字`, `英文單字`.
- Categories may all be collapsed; do not force one to stay open.
- Search filters card rows by display text, hint, meaning, or speak text.
- Right top: compact card information block with display text, hint/KK/zhuyin, meaning, and play button grouped closely together.
- Main area: tracing canvas with floating previous/next arrows and floating template/clear controls.
- Secondary operations belong in dialogs opened from sidebar buttons.

## Lesson Categories

Use `category`, not the old `type` field:

- `bopomofo`: fixed default lessons, not editable in the app.
- `letter`: fixed default lessons, not editable in the app.
- `hanzi`: editable lessons.
- `word`: editable lessons.

Editable lesson example:

```js
{
  id: "hanzi_wo",
  category: "hanzi",
  display: "我",
  hint: "ㄨㄛˇ",
  pinyin: "wǒ",
  meaning: "I / me",
  speakText: "我",
  lang: "zh-TW"
}
```

Only `hanzi` and `word` should appear in the management form and backup payload. Bopomofo and letters are fixed source data. Hanzi cards may include `pinyin`, displayed next to zhuyin in the card info area.

The built-in hanzi and word lessons are a practical elementary starter set, not an official complete curriculum list. Keep this wording unless a verified official source is added.

## Local Storage

Current keys:

- `bula-teach-lessons-v2`: editable `hanzi` and `word` lessons only.
- `bula-teach-settings-v1`: user settings such as `autoPlay` and `showTemplate`.
- `bula-teach-backup-state-v1`: export/dirty status.

When editing, adding, deleting, or importing lessons, preserve fixed bopomofo and letter lessons.

## Import / Export

Export filename is fixed as `bula-teach-lessons.json`. Browsers may still create numbered copies on repeated downloads; the app cannot force overwrite on iPad Safari.

Export payload should contain:

```js
{
  app: "bula-teach",
  version: 1,
  exportedAt: "...",
  lessons: [/* hanzi and word only */]
}
```

Import should accept either this object shape or a raw lesson array for compatibility. Import replaces editable lessons only and must keep fixed lessons intact.

## Drawing Approach

The tracing template is generated with system fonts and a translucent text layer beneath the canvas. There are no per-character SVG stroke files in the active tracing UI.

Current font choices:

- Chinese and bopomofo: system CJK fonts.
- Letters and English words: Arial / Helvetica fallback.

Keep line-height generous enough that lowercase descenders such as `g`, `p`, and `y` are not clipped in the sidebar, header, or tracing template.

## Playback

Bopomofo lessons use `audioUrl` and should prefer local WAV playback over TTS. Chinese and English use browser `speechSynthesis` unless an `audioUrl` is provided.

Auto-play should trigger only when changing cards, not on the first page load.

## Bopomofo Audio Assets

Default bopomofo lessons use Ministry of Education audio copied into `assets/audio/bopomofo/`. Keep the attribution in `assets/THIRD_PARTY_NOTICES.md` whenever these assets are shipped.

If audio assets are added or renamed, update `APP_ASSETS` in `sw.js` and bump `CACHE_NAME` so installed PWAs refresh their cache.

## Deployment

The app can be deployed as a static Cloudflare Pages project or via Cloudflare Workers/Wrangler. HTTPS is required for reliable PWA Service Worker behavior on iPad Safari.

When changing core app files or precached assets, bump `CACHE_NAME` in `sw.js`.

## Verification

Before finishing a code change, run:

```bash
node --check app.js
node --check sw.js
```

For static serving checks, use the local server if it is running:

```bash
curl -I http://localhost:5173/
```

## Coding Constraints

Keep the app dependency-free and easy to deploy. Prefer plain HTML, CSS, and JavaScript. Avoid adding Node tooling, package managers, generated bundles, or framework files unless there is a concrete need.

When rendering user-provided text, use DOM APIs and `textContent`; do not inject user input through `innerHTML`.
