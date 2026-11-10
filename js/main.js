// Contact number is kept out of plain text in the source to deter casual
// scraping/spam bots; this is light obfuscation, not real security.
const WA_B64 = "NTQ5MzUxMjI5OTU0NQ==";
const WHATSAPP_NUMBER = atob(WA_B64);
const WHATSAPP_MESSAGE = {
  en: "Hi Martín! I'm reaching out from your website — I'd like more info.",
  es: "¡Hola Martín! Te escribo desde la web, quiero más información."
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initNav();
  initReveal();
  initParallax();
});

function contactLink(lang) {
  const msg = WHATSAPP_MESSAGE[lang] || WHATSAPP_MESSAGE.es;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function wireCtaLinks(lang) {
  document.querySelectorAll(".cta-contact").forEach((el) => {
    el.href = contactLink(lang);
  });
}

/* ---------- i18n ---------- */
function initLanguage() {
  const switchEl = document.getElementById("langSwitch");
  const stored = localStorage.getItem("lang");
  const lang = stored || "es";

  applyLanguage(lang);

  switchEl.addEventListener("click", () => {
    const current = switchEl.getAttribute("data-active");
    const next = current === "en" ? "es" : "en";
    applyLanguage(next);
    localStorage.setItem("lang", next);
  });
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.es;
  const switchEl = document.getElementById("langSwitch");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    let text = dict[key];
    if (text === undefined) return;
    if (text.includes("{year}")) {
      text = text.replace("{year}", new Date().getFullYear());
    }
    el.textContent = text;
  });

  document.documentElement.lang = lang;
  switchEl.setAttribute("data-active", lang);
  switchEl.setAttribute("aria-label", lang === "en" ? "Switch to Spanish" : "Cambiar a inglés");

  wireCtaLinks(lang);
}

/* ---------- mobile nav + active link ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  const currentPage = document.body.getAttribute("data-page");

  if (currentPage) {
    nav.querySelectorAll("a[data-page]").forEach((link) => {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("is-active");
      }
    });
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  const targets = document.querySelectorAll(
    ".quicknav-card, .page-copy .copy-wrap, .video-frame, .cta-band .copy-wrap"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- hero parallax ----------
   Each hero photo is pre-scaled up (headroom to pan) and fades in
   once on load, then drifts vertically with scroll position —
   classic layered-depth parallax. The scale is applied once; the
   scroll-driven translateY is written directly (no CSS transition),
   so the pan tracks scroll with zero lag. Disabled for
   prefers-reduced-motion. */
function initParallax() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const banners = Array.from(document.querySelectorAll(".hero-banner"));
  if (!banners.length) return;

  const SCALE = 1.12;

  if (reduceMotion) {
    banners.forEach((banner) => {
      const img = banner.querySelector("img");
      if (img) img.classList.add("is-in");
    });
    return;
  }

  const items = banners
    .map((banner) => ({ banner, img: banner.querySelector("img") }))
    .filter((item) => item.img);

  items.forEach(({ img }) => {
    img.style.transform = `scale(${SCALE})`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => img.classList.add("is-in"));
    });
  });

  let ticking = false;

  function update() {
    const vh = window.innerHeight;
    items.forEach(({ banner, img }) => {
      const rect = banner.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - vh / 2;
      const maxOffset = rect.height * ((SCALE - 1) / 2);
      const offset = Math.max(-maxOffset, Math.min(maxOffset, -center * 0.12));
      img.style.transform = `scale(${SCALE}) translateY(${offset.toFixed(1)}px)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}
