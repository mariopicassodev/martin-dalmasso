# Martín Dalmasso — portfolio site

## What this is
A multi-page portfolio website for **Martín Dalmasso** (Instagram: [@martindalmassom](https://www.instagram.com/martindalmassom/), YouTube: [@martindalmassom](https://www.youtube.com/@martindalmassom)), a jazz/contemporary guitarist. He offers four services, each with its own page: **arrangement**, **sessionist** (session guitar), **music** (original compositions/performances), and **teacher** (harmony & improvisation lessons).

Live at: **https://mariopicassodev.github.io/martin-dalmasso/** (GitHub Pages, auto-deployed from `main` — see "Deployment" below).

## Who he is (drives every design decision)
- Super warm and kind, but his defining trait as a musician is **precision**: meticulous, detail-oriented ("detallista"), clean in appearance, procedural in how he teaches.
- His playing is complex modern arrangement and solos pursued close to perfection — a niche built on rigor, not just feel.
- Design mandate: warm but exact. Since v2, the design leans on **real photography** to carry the "cool" factor (per client direction, referencing [kurtrosenwinkel.com](https://www.kurtrosenwinkel.com/)'s clean, photo-led, editorial style) rather than color or illustration.

## Version history (why the site looks like it does)
- **v1**: single page, no photos yet, dark-navy hero, Google Form CTA. See git history.
- **v2 (current)**: after a meeting with the client, rebuilt as **separate pages per service** (not one combined "services" section — explicitly requested), real photos dropped in, reference shifted to kurtrosenwinkel.com's clean/minimal look, CTA switched from a Google Form to **WhatsApp**, YouTube videos embedded per page, social icons added.

## Stack decisions
- **No UI framework, no build step.** Plain HTML/CSS/JS, one `.html` file per page. The user explicitly asked to avoid a framework unless it becomes limiting.
- **Multi-page, not SPA.** Each page (`index.html`, `about.html`, `services/*.html`) is a standalone HTML file with duplicated header/footer markup (no templating available without a build step). When editing shared chrome (nav, footer, social icons), **update it in all 6 files** — `services/*.html` were generated from `/tmp` scratch script `gen_services.py` originally; there's no live generator in the repo, so edits are manual across files now. Keep nav items and hrefs consistent.
- All internal links are **relative, no leading slash** (`services/arrangement.html`, `../index.html`, etc.) — required because GitHub Pages serves this as a project site under `/martin-dalmasso/`, not at the domain root. Never use root-relative (`/css/...`) paths.
- Fonts: Google Fonts `Fraunces` (headings) + `Inter` (body/UI). Loaded via `<link>`.
- `js/i18n.js` holds the EN/ES dictionary (now much larger — one key set per page). `js/main.js` wires up language switching, mobile nav + active-link highlighting (via `<body data-page="...">`), the WhatsApp CTA links, and scroll reveal.

## Structure
```
index.html                 — Home
about.html                 — About (first-person pitch)
services/arrangement.html  — Arrangement service page (+ 1 video)
services/session.html      — Sessionist service page (no video)
services/teacher.html      — Teacher / Educación service page (no video)
services/music.html        — Music service page (+ 2 videos, latest releases)
css/style.css              — all styles, CSS variables for the palette at the top
js/i18n.js                 — EN/ES dictionary, keyed by data-i18n attribute values
js/main.js                 — language switch, nav active-state, WhatsApp CTA builder, scroll reveal
assets/img/                — compressed, web-ready JPEGs (committed)
pictures/                  — raw source photos from the client (gitignored — large originals, not for the repo)
.github/workflows/         — GitHub Actions: deploy to Pages on every push to main
```

## Photos
Client selected 5 photos (from `pictures/web/`), one per section. Resized to max 2000px wide / JPEG q82 via Pillow into `assets/img/`:
- **Home** → `IslandiaGtr7.png` → `home.jpg` (classical guitar, studio, headphones, looking down — concentration/precision)
- **Teacher/Educación** → `IslandiaGtr4.png` → `teacher.jpg` (same studio, smiling at camera — warm, approachable)
- **Arrangement** → `Sindicato2.png` → `arrangement.jpg` (dark live ensemble/stage shot — fits "arrangement" = orchestration/ensemble)
- **Session** → `IslandiaGtr2.png` → `session.jpg` (studio, focused playing)
- **Music** → `F7C02885.JPG` → `music.jpg` (B&W editorial portrait under a theater marquee — most "cool"/striking image, used for the Music page hero)

If new/replacement photos arrive, resize with the same approach (Pillow, `ImageOps.exif_transpose`, max width 2000, JPEG quality 82) and drop into `assets/img/` with the same filenames so no HTML changes are needed. Keep raw originals in `pictures/` (gitignored, not committed — they're multi-MB).

## Color palette
Given by the client, kept as CSS variables in `css/style.css`:
- `--olive:  #615d30`
- `--amber:  #cc7901` — primary accent (CTA buttons, links, hover states)
- `--navy:   #353c56` — base for the footer's dark background
- `--maroon: #540002` — secondary accent (active nav indicator, "eyebrow" labels on photo pages)

**v2 change:** per client direction ("may be the color palette is not accurate for these images, be free to change it — main objective is a very cool look and feel"), the overall site shifted from a dark-navy hero (v1) to a **light, warm-white background** (`--paper: #faf7f1`) with near-black text (`--ink`), letting the real photography carry visual weight — closer to kurtrosenwinkel.com. The four brand colors are kept but used sparingly as accents, not as large fills. Only the footer stays dark navy.

## i18n (English / Spanish)
- **Default language is English**, switch via a pill toggle in the header (`#langSwitch`), persisted via `localStorage`.
- Every page loads the same `js/i18n.js` dictionary; each page's unique copy has its own key namespace (e.g. `arrangementP1`, `teacherP1`, `musicP1`) so unrelated pages don't share text. Shared keys (`navHome`, `ctaBandTitle`, `footerNote`, etc.) are reused everywhere.
- `{year}` in `footerNote` is replaced at runtime with the current year.
- **Keep EN and ES in sync** — never add a `data-i18n` key to only one language object.

## Contact: WhatsApp (not a form)
- **v1** used a placeholder Google Form CTA. **v2 replaced this with WhatsApp**, per client direction, number `+54 9 3512 29-9545`.
- `js/main.js` builds the link at runtime: `https://wa.me/5493512299545?text=<encoded prefilled message>`, with the message text localized (`WHATSAPP_MESSAGE.en` / `.es`). Any element with class `cta-whatsapp` gets its `href` set on language change/init — don't hardcode `href="https://wa.me/..."` directly in HTML, always use `href="#" class="btn ... cta-whatsapp"` and let JS fill it in, so the prefilled text stays localized.

## Videos
- **Arrangement page**: 1 video — `CqlS-xtkEDY`.
- **Music page**: 2 videos ("latest releases") — `Wm2iDcAbkkQ`, `DBiDfZOJ3UY`.
- **Session / Teacher pages**: no video currently — add one the same way (`.video-section` → `.video-grid` → `.video-frame` with a YouTube `iframe`) if the client provides one later.
- Home page intentionally has **no video embed** (kept sparse/hero-led, Kurt-Rosenwinkel-style); the Music page is the canonical place for "latest music released." If the client wants videos on Home too, duplicate the `.video-section` block from `services/music.html` onto `index.html`.

## Social links
YouTube and Instagram icons (inline SVG, no icon font/library) appear in the header (desktop only — hidden on narrow mobile to save space) and always in the footer:
- YouTube: `https://www.youtube.com/@martindalmassom`
- Instagram: `https://www.instagram.com/martindalmassom/`

## About page content
First-person "selling" pitch (15 years of experience → challenges observed → solutions offered → CTA), per client's requested structure. **Currently placeholder copy** (`pitchP1`/`pitchP2`/`pitchP3` in `js/i18n.js`, EN and ES) — clearly marked in-page as a draft (`pitchNote` key) and must be replaced with Martín's own words once he writes them. Don't remove the draft note until real copy is in.

## Deployment (GitHub Pages + Actions)
- Hosted on **GitHub Pages** from the `mariopicassodev/martin-dalmasso` repo, deployed via a GitHub Actions workflow (`.github/workflows/deploy.yml`) using the official `actions/upload-pages-artifact` + `actions/deploy-pages` actions — **not** the legacy "deploy from a branch" setting.
- The workflow runs on every push to `main` and redeploys automatically — no manual Pages rebuild needed.
- Because this is a project site (not a `mariopicassodev.github.io` user-page repo), it's served under `/martin-dalmasso/`. This is exactly why all internal links must stay relative (see Stack decisions above) — an absolute path would break on Pages while looking fine locally.

## Working conventions for this repo
- Keep it framework-free unless a real limitation forces otherwise — ask before adding one.
- When adding a new page, copy the header/footer/`<head>` block from an existing page of the same depth (root vs. `services/`) rather than writing it from scratch, to avoid relative-path mistakes.
- Keep EN and ES copy in sync — never add a `data-i18n` key to only one language object.
- Minimal animations only (client preference) — the existing fade-up `.reveal` scroll effect is the ceiling, not a floor; don't add more motion without asking.
- GitHub: pushed to [github.com/mariopicassodev/martin-dalmasso](https://github.com/mariopicassodev/martin-dalmasso).
