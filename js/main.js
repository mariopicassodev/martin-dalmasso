// TODO: replace with the real Google Form URL once it's ready.
const GOOGLE_FORM_URL = "#";

document.addEventListener("DOMContentLoaded", () => {
  wireCtaLinks();
  initLanguage();
  initNav();
  initReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function wireCtaLinks() {
  ["ctaHeader", "ctaHero", "ctaContact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = GOOGLE_FORM_URL;
  });
}

/* ---------- i18n ---------- */
function initLanguage() {
  const switchEl = document.getElementById("langSwitch");
  const stored = localStorage.getItem("lang");
  const lang = stored || "en";

  applyLanguage(lang);

  switchEl.addEventListener("click", () => {
    const current = switchEl.getAttribute("data-active");
    const next = current === "en" ? "es" : "en";
    applyLanguage(next);
    localStorage.setItem("lang", next);
  });
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;
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
}

/* ---------- mobile nav ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

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
    ".service-card, .about-copy, .about-mark, .music-copy, .video-frame, .contact-inner"
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
