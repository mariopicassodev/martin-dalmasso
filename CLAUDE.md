# Martín Dalmasso — portfolio site

## What this is
A one-page portfolio website for **Martín Dalmasso** (Instagram: [@martindalmassom](https://www.instagram.com/martindalmassom/)), a jazz/contemporary guitarist. He offers four services: **arrangement**, **sessionist** (session guitar), **music** (original compositions/performances), and **teacher** (harmony & improvisation lessons).

## Who he is (drives every design decision)
- Super warm and kind, but his defining trait as a musician is **precision**: meticulous, detail-oriented ("detallista"), clean in appearance, procedural in how he teaches.
- His playing is complex modern arrangement and solos pursued close to perfection — a niche built on rigor, not just feel.
- Design mandate: the UI must read as **warm but exact** — generous whitespace and careful alignment (precision), paired with warm palette and inviting copy (kindness). Nothing sloppy, nothing default-template.

## Stack decisions
- **No UI framework.** Plain HTML/CSS/JS. The user explicitly asked to avoid a framework unless it becomes limiting — revisit only if a real limitation shows up (e.g. needing routing, complex state, a CMS).
- Fonts: Google Fonts `Fraunces` (headings — elegant serif, has personality) + `Inter` (body/UI — clean, precise). Loaded via `<link>`, no build step.
- No JS dependencies. `js/i18n.js` holds the translation dictionary, `js/main.js` wires up language switching, mobile nav, CTA links, and a small IntersectionObserver reveal-on-scroll.
- No images yet (see Open items). Visual interest currently comes from typography, color, and thin SVG line/dot motifs (nod to staff lines) rather than photography.

## Structure
```
index.html        — single page, all sections
css/style.css      — all styles, CSS variables for the palette at the top
js/i18n.js         — EN/ES dictionary, keyed by data-i18n attribute values
js/main.js         — language switch, nav toggle, CTA wiring, scroll reveal
```

## Color palette
Given by the client, kept as CSS variables in `css/style.css`:
- `--olive:  #615d30`
- `--amber:  #cc7901` — primary CTA / accent color (warmth, invitation)
- `--navy:   #353c56` — base for dark sections + headings
- `--maroon: #540002` — secondary accent (icons, hover depth)

Derived neutrals (`--cream`, `--cream-alt`, `--navy-deep`, `--navy-deeper`, `--ink`) extend the palette so it works as a full UI, not just four flat colors. Sections alternate warm-cream and deep-navy backgrounds (hero, music = dark; about, services, contact = light) — a verse/chorus rhythm echoing music structure.

## i18n (English / Spanish)
- **Default language is English**, with the switch required to be very easy to find and pleasant to use — implemented as a pill toggle in the header (`#langSwitch`), persisted via `localStorage`, not browser-detected.
- All translatable copy lives in `js/i18n.js` as `I18N.en` / `I18N.es`, matched to `data-i18n="key"` attributes in `index.html`. To add new copy: add the key to both language objects, then tag the element.
- `{year}` in a translation string is replaced at runtime with the current year (used in the footer).

## Content sourcing
Initial bio/services copy was inferred from Martín's public Instagram bio ("Clases de armonía e impro. Arreglos. Mi última música") plus the brief from the project owner. It should be reviewed/replaced with Martín's own wording once available — treat current About/Services copy as a strong first draft, not final.

## Open items (do not forget)
1. **Google Form URL** — the CTA buttons (`#ctaHeader`, `#ctaHero`, `#ctaContact`) all point to `GOOGLE_FORM_URL` in `js/main.js`, currently `"#"`. Replace with the real form link as soon as it exists.
2. **Photos/logo** — none yet (client will provide "in a few days"). The layout was built photo-free on purpose (typographic hero, SVG motifs). When photos arrive: add a hero portrait and consider replacing the `.about-mark` SVG with a real photo, or adding a dedicated photo section. Don't force the layout to assume a framework or CMS for this — plain `<img>` is enough.
3. Reference inspiration: [julianlage.com](https://julianlage.com/) — clean, minimal, gallery-like, image-forward. Our site is intentionally more typographic for now since we have no imagery, but should move toward that same restraint once photos exist.
4. Featured video is currently Martín's Instagram-linked YouTube video (`Wm2iDcAbkkQ`) — swap for whatever his latest/best release is over time.

## Working conventions for this repo
- Keep it framework-free unless a real limitation forces otherwise — ask before adding one.
- Prefer editing the existing three files over splitting into more unless the page genuinely outgrows them.
- Keep EN and ES copy in sync — never add a `data-i18n` key to only one language object.
- GitHub: pushed to [github.com/mariopicassodev](https://github.com/mariopicassodev?tab=repositories).
