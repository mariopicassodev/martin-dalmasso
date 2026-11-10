# Martín Dalmasso — portfolio site

## What this is
A multi-page portfolio website for **Martín Dalmasso** (Instagram: [@martindalmassom](https://www.instagram.com/martindalmassom/), YouTube: [@martindalmassom](https://www.youtube.com/@martindalmassom)), a jazz/contemporary guitarist. He offers four services, each with its own page: **arrangement**, **sessionist** (session guitar), **music** (original compositions/performances), and **teacher** (one-to-one lessons).

Live at: **https://mariopicassodev.github.io/martin-dalmasso/** (GitHub Pages, auto-deployed from `main` — see "Deployment" below).

## Who he is (drives every design decision)
- Super warm and kind, but his defining trait as a musician is **precision**: meticulous, detail-oriented ("detallista"), clean in appearance, procedural in how he teaches.
- His playing is complex modern arrangement and solos pursued close to perfection — a niche built on rigor, not just feel.
- **He's not just a harmony specialist.** Copy must reflect the full range of his musicianship — rhythm, idiomatic phrasing, melody, composition, layers/texture, interpretation — with **"music" as the umbrella term**, not "harmony." Harmony can appear as one item in a list, never as the single word used to describe what he does. (Client correction — see git history; don't regress to harmony-first copy.)
- Design mandate: warm but exact. Since v2, the design leans on **real photography** to carry the "cool" factor (per client direction, referencing [kurtrosenwinkel.com](https://www.kurtrosenwinkel.com/)'s clean, photo-led, editorial style) rather than color or illustration.

## Version history (why the site looks like it does)
- **v1**: single page, no photos yet, dark-navy hero, Google Form CTA. See git history.
- **v2**: after a meeting with the client, rebuilt as **separate pages per service** (not one combined "services" section — explicitly requested), real photos dropped in, reference shifted to kurtrosenwinkel.com's clean/minimal look, CTA switched from a Google Form to **WhatsApp**, YouTube videos embedded per page, social icons added.
- **v3**: default language flipped to **Spanish**; CTA relabeled from "WhatsApp" to generic **"Contact"/"Contacto"** (client is wary of spam from a public number but wants to keep WhatsApp as the mechanism for now — a Google Form is the likely future replacement, see "Contact" below); CTA button color changed from amber to near-black per client's dislike of the orange; added an animated strings motif (draw-in on load + pointer-plucked bend); broadened all copy away from "harmony" as the single descriptor of Martín's musicianship.
- **v4 (current)**: client feedback was "needs more modernity, feels naive" — two concrete fixes plus one bigger design move:
  - Fixed a real layout bug: the quicknav "Ver →" links on Home sat at different heights per card because description lengths differed. Cards are now `display:flex; flex-direction:column` with `margin-top:auto` on the link, so it's pinned to the bottom of every card regardless of text length.
  - **Removed the animated strings motif entirely** — client said it "came out horrible." Don't re-add it; see git history (v3) if curious what it looked like.
  - **Replaced it with hero-image parallax** (client reviewed a list of current portfolio-animation trends and specifically called out "scroll-driven depth/parallax" as worth exploring): hero photos now drift vertically with scroll and fade in once on load. See "Hero parallax" below.
  - **Added a custom logotype** for the "Martín Dalmasso" wordmark (header, footer, Home hero) using the Ethnocentric typeface, rendered to PNG rather than loaded as a live webfont — see "Brand wordmark" below for why.

## Stack decisions
- **No UI framework, no build step.** Plain HTML/CSS/JS, one `.html` file per page. The user explicitly asked to avoid a framework unless it becomes limiting.
- **Multi-page, not SPA.** Each page (`index.html`, `about.html`, `services/*.html`) is a standalone HTML file with duplicated header/footer markup (no templating available without a build step). When editing shared chrome (nav, footer, social icons), **update it in all 6 files** — `services/*.html` were generated from `/tmp` scratch script `gen_services.py` originally; there's no live generator in the repo, so edits are manual across files now. Keep nav items and hrefs consistent.
- All internal links are **relative, no leading slash** (`services/arrangement.html`, `../index.html`, etc.) — required because GitHub Pages serves this as a project site under `/martin-dalmasso/`, not at the domain root. Never use root-relative (`/css/...`) paths.
- Fonts: Google Fonts `Fraunces` (headings) + `Inter` (body/UI). Loaded via `<link>`.
- `js/i18n.js` holds the EN/ES dictionary (now much larger — one key set per page). `js/main.js` wires up language switching, mobile nav + active-link highlighting (via `<body data-page="...">`), the contact CTA links, scroll reveal, and hero parallax.

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
js/main.js                 — language switch, nav active-state, contact CTA builder, scroll reveal, hero parallax
assets/img/                — compressed, web-ready JPEGs (committed)
assets/brand/              — rendered wordmark logotype PNGs (ink + paper variants, committed)
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
- `--amber:  #cc7901` — accent (links, eyebrow labels, nav hover underline, hover states) — **not** the primary button anymore (see below)
- `--navy:   #353c56` — base for the footer's dark background
- `--maroon: #540002` — secondary accent (active nav indicator, button hover state)

**v2 change:** per client direction ("may be the color palette is not accurate for these images, be free to change it — main objective is a very cool look and feel"), the overall site shifted from a dark-navy hero (v1) to a **light, warm-white background** (`--paper: #faf7f1`) with near-black text (`--ink`), letting the real photography carry visual weight — closer to kurtrosenwinkel.com. The four brand colors are kept but used sparingly as accents, not as large fills. Only the footer stays dark navy.

**v3 change:** client disliked the orange primary button. `.btn-primary` (the main CTA pill, used for the header and footer contact buttons) is now `var(--ink)` (near-black) with a `var(--maroon)` hover state — "blackie," per the client's words. Amber is still used for `.eyebrow` labels, nav hover/active underlines, and link-style text (`.quicknav-link`), so the palette isn't gone, just no longer on the loudest element on the page.

## i18n (English / Spanish)
- **Default language is Spanish** (changed in v3 — was English in v1/v2), switch via a pill toggle in the header (`#langSwitch`), persisted via `localStorage` once a visitor picks one. Default lives in `main.js`: `localStorage.getItem("lang") || "es"`.
- Every page loads the same `js/i18n.js` dictionary; each page's unique copy has its own key namespace (e.g. `arrangementP1`, `teacherP1`, `musicP1`) so unrelated pages don't share text. Shared keys (`navHome`, `ctaBandTitle`, `footerNote`, etc.) are reused everywhere.
- `{year}` in `footerNote` is replaced at runtime with the current year.
- **Keep EN and ES in sync** — never add a `data-i18n` key to only one language object.
- Note: hardcoded fallback text in the HTML (what shows before JS runs) is still English — a brief flash-of-English is expected for ES visitors on first paint. Not worth "fixing" by writing Spanish into the HTML source; that would just flip the flash for EN visitors instead.

## Contact: obfuscated WhatsApp link, labeled "Contact" (not a form, not yet)
- **v1** used a placeholder Google Form CTA. **v2** replaced this with a WhatsApp link, labeled "WhatsApp," number `+54 9 3512 29-9545`.
- **v3**: client likes using WhatsApp for now but is wary of spam/scam messages from exposing a public number, and would rather the UI say **"Contact"/"Contacto"**, not advertise the channel. The long-term plan may be a Google Form instead — if asked to make that switch, it's a matter of changing what `contactLink()` in `js/main.js` returns and what `.cta-contact` elements do on click; the class name is already channel-agnostic for this reason (don't rename it back to anything WhatsApp-specific).
- The number is lightly **obfuscated** in source as a base64 string (`WA_B64` in `js/main.js`, decoded via `atob()`) so it doesn't appear as plain text to casual scraping. This is obscurity, not security — anyone who opens devtools can still get it. Don't "fix" this by writing the digits back in plain text.
- `contactLink(lang)` builds `https://wa.me/<number>?text=<encoded prefilled message>` at runtime, message localized via `WHATSAPP_MESSAGE.en` / `.es`. Any element with class `cta-contact` gets its `href` set on language change/init — don't hardcode a href directly in HTML; always use `href="#" class="btn ... cta-contact"` and let JS fill it in.
- UI copy never says "WhatsApp" anywhere visible (button label, CTA band text) — only the prefilled message content (seen only after the redirect) mentions reaching out "from the website."

## Hero parallax (replaced the strings motif in v4)
- Client reviewed a summary of current portfolio-animation trends (scroll parallax/depth, 3D cursor tilt, mixed-media collage, kinetic typography) and specifically endorsed **scroll-driven depth** as worth exploring. This is the one animation effect on the site now that the strings motif is gone.
- Lives in `initParallax()` in `js/main.js` + the `.hero-banner img` rules in `style.css`. Every `.hero-banner img` is pre-scaled to `scale(1.12)` (12% headroom to pan within), fades in once via a CSS `opacity` transition after load, then gets `translateY(...)` written directly via `style.transform` on every scroll tick (rAF-throttled) — **no CSS transition on `transform`**, so the pan tracks scroll exactly with no lag. Offset is derived from the banner's distance from viewport center and clamped to the 12%-scale headroom so the image never reveals a transparent/empty edge.
- Respects `prefers-reduced-motion: reduce` — skips both the fade and the pan; the image is just shown at rest.
- If asked to extend this effect elsewhere (e.g. the quicknav card icons, video thumbnails), reuse the same pattern (pre-scale + JS-driven transform, no CSS transition on transform) rather than introducing a scroll library — keeps it dependency-free.

## Brand wordmark (logotype, not a webfont)
- Client sent a dafont.com link to **Ethnocentric** (Typodermic Fonts) and asked to use it for the "Martín Dalmasso" name.
- **Important constraint**: Ethnocentric's free license (Typodermic Desktop License) covers desktop/print/logo use but explicitly excludes webfont embedding — serving the font file to visitors' browsers would need a separate paid license we don't have. So **don't** add `Ethnocentric` as a `@font-face`/webfont. If the client later buys a webfont license, this can be revisited.
- What's actually in the repo instead: the wordmark was rendered **once**, locally, to a flattened image — which the free license's "finished work, including logos" clause does cover — using Pillow to draw "MARTÍN DALMASSO" in the font at high resolution, producing two transparent-background PNGs in `assets/brand/`:
  - `wordmark-ink.png` — dark text, for light backgrounds (header, Home hero, About)
  - `wordmark-paper.png` — light text, for the dark footer
- These are plain `<img class="brand-mark" alt="Martín Dalmasso">` elements in place of what used to be a `<span class="brand-name">` text element; `.hero-wordmark` is the larger variant used for the Home page's `<h1>`. Sizing is controlled purely by CSS `height` (see `.brand-mark`, `.brand-mark.small`, `.hero-wordmark`) — never re-upload differently-sized source images for different contexts, just adjust CSS.
- The font file itself was never committed to the repo (used transiently to generate the PNGs, then discarded) — if you need to regenerate the wordmark (e.g. different text, color, or size), the render script's approach is: `PIL.ImageFont.truetype(path_to_otf, size)` → `ImageDraw.text(...)` → save PNG. You'd need to re-download the font from dafont.com to redo this; don't commit the `.otf` to the repo either way.
- All other type on the site (headings, body) stays `Fraunces`/`Inter` via Google Fonts as before — only the literal brand name uses Ethnocentric.

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

## Repository protections
- `main` has GitHub branch protection: force-pushes and branch deletion are blocked, and any push from someone other than the repo owner/admin requires an approved pull request (`enforce_admins: false`, 1 required approving review, stale reviews dismissed on new commits). The owner can still push directly. This was a deliberate ask ("restrict contributions of other users on main") — don't remove or loosen it without being asked.

## Working conventions for this repo
- Keep it framework-free unless a real limitation forces otherwise — ask before adding one.
- When adding a new page, copy the header/footer/`<head>` block from an existing page of the same depth (root vs. `services/`) rather than writing it from scratch, to avoid relative-path mistakes.
- Keep EN and ES copy in sync — never add a `data-i18n` key to only one language object.
- Minimal animations only (client preference) — the existing `.reveal` fade-up and the hero parallax are the ceiling, not a floor; don't add more motion (3D tilt, WebGL, Lottie, kinetic type) without asking, even though the client's trends list mentioned those as options — only scroll parallax was explicitly greenlit.
- Never add a new webfont without checking its license covers web embedding specifically (see "Brand wordmark" — this bit us once already with Ethnocentric).
- GitHub: pushed to [github.com/mariopicassodev/martin-dalmasso](https://github.com/mariopicassodev/martin-dalmasso).
