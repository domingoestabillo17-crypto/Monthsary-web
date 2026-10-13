# ❤️ Monthsary Surprise Website

A dreamy, romantic, interactive website — a little digital gift made with love.
No backend, no database, no accounts, no API keys. Just pure HTML, CSS and JavaScript.

---

## 1. How to run it (VS Code + Live Server)

1. Open the folder `monthsary-surprise/` in **VS Code**.
2. Install the free **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **"Open with Live Server"**.
4. Your browser opens at something like `http://127.0.0.1:5500/`. That's it! 💗

> You can also just double-click `index.html` to open it directly, but Live Server
> gives the smoothest experience (especially for music).

---

## 2. Where to put our photos

Put your pictures **next to `index.html`**, named `photo1.jpg` … `photo8.jpg`.
(Keeping them in `assets/images/` works too — the site tries both.)

```
monthsary-surprise/          (or the GitHub Pages repo root)
├── index.html
├── config.js
├── photo1.jpg … photo8.jpg
└── assets/images/           (optional)
```

Open **`config.js`** and find the `gallery` list. Each entry has a `file`
(the real picture) and a `fallback` (tried automatically if `file` is missing):

```js
gallery: [
  { file: "./photo1.jpg", fallback: "assets/images/photo1.jpg", caption: "Our first date" },
  { file: "./beach.png",  fallback: "assets/images/beach.png",  caption: "That beach day" },
  // ...add as many as you like
],
```

- The site tries `file` first, then `fallback`, then shows a pretty placeholder —
  it never breaks.
- Photos may live at the root **or** in `assets/images/`; both work.
- Supported: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`

You can **add or remove** lines freely to change how many photos appear.

---

## 3. How to add our favorite songs (one or many)

Put your song file **next to `index.html`** (keeping it in `assets/music/`
works too), then in **`config.js`** find the `playlist` list and add one line
per song:

```js
playlist: [
  { file: "./our-song.mp3", fallback: "assets/music/our-song.mp3", title: "Our Song" },
  { file: "./favorite.mp3", fallback: "assets/music/favorite.mp3", title: "Your Favorite" },
  { file: "./memories.wav", fallback: "assets/music/memories.wav", title: "Our Memories" },
],
```

That's it — save and refresh. The player will show them all in the playlist.
The player tries `file` first, then `fallback`, then skips the song gracefully.

- Supported: `.mp3`, `.wav`, `.ogg`, `.m4a`, `.flac` (anything your browser can play).
- **Multiple songs:** just keep adding `{ file: "...", title: "..." },` lines.
- **Order:** songs play in the order you list them.
- **Missing files:** if a song isn't found, the player skips it gracefully.
- **Looping:** set `loopMusic: true` to repeat the current song forever.
- **Starting volume:** change `startVolume` (0.0 – 1.0).
- Music **never autoplays on load**. It starts when she presses ▶ — or right when
  she taps **"Open Your Surprise 💌"** (if songs are added).

> Please don't download copyrighted music automatically — add songs you own or
> have permission to use.

---

## 4. Where to edit the text

Everything lives in **`config.js`**. Open it and change the words between quotes:

| What you want to change            | Look for                |
| ---------------------------------- | ----------------------- |
| Her name / nickname                | `girlfriendName`        |
| The big welcome title              | `greeting`              |
| The welcome subtitle               | `welcomeSubtitle`       |
| The button text                    | `openButtonText`        |
| Photos + captions                  | `gallery`               |
| Songs                              | `playlist`              |
| The love letter                    | `letter`                |
| Final intro line                   | `finalIntro`            |
| Final big heading                  | `finalHeading`          |
| Final heartfelt message            | `finalMessage`          |
| Final tagline                      | `finalTagline`          |

Inside text, `\n` starts a new line. Every section has comments explaining it.

---

## 5. Project structure

```
monthsary-surprise/
├── index.html        ← the page (all five sections)
├── style.css         ← all the pretty styling & animations
├── script.js         ← all the interactivity (no need to edit)
├── config.js         ← ✏️  EDIT EVERYTHING HERE
├── README.md         ← you are here
├── photo1.jpg …      ← 📷 photos can sit here (root)
├── our-song.mp3 …    ← 🎵 songs can sit here (root)
└── assets/           ← optional; photos/songs here work too
    ├── images/
    └── music/
```

---

## 6. The five sections

1. **Welcome** — animated glowing heart + "Open Your Surprise" button.
2. **Our Photo Gallery** — Polaroid-style photos, lightbox, slideshow.
3. **Our Favorite Music** — full local music player + persistent mini player.
4. **A Letter For You** — animated envelope with a typewriter letter.
5. **The Final Surprise** — night sky, moon, cinematic reveal + replay.

## 7. Accessibility & performance

- Respects your system's **"reduce motion"** setting.
- Lightweight: no external libraries, runs entirely in the browser.
- Relative paths everywhere, so it works fully offline.

---

Made with ❤️ — enjoy, and happy monthsary.
