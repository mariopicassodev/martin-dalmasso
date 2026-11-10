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
  initStrings();
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

/* ---------- animated strings (guitar-string motif) ----------
   On load: each string draws itself in, left to right.
   On pointer move over the container: the nearest strings bend
   toward the cursor, like being plucked, and ease back when the
   pointer leaves. Disabled for prefers-reduced-motion. */
function initStrings() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".strings-wrap").forEach((wrap) => {
    const svg = wrap.querySelector(".strings");
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll(".string-line"));
    const viewBox = svg.viewBox.baseVal;
    const vbWidth = viewBox.width || 1200;
    const vbHeight = viewBox.height || 160;

    const strings = paths.map((path) => ({
      el: path,
      y: parseFloat(path.getAttribute("data-y")),
      bend: 0,
      target: 0
    }));

    const setFlat = (s) => s.el.setAttribute("d", `M0,${s.y} L${vbWidth},${s.y}`);

    if (reduceMotion) {
      strings.forEach(setFlat);
      return;
    }

    // Draw-in on load.
    strings.forEach((s) => {
      setFlat(s);
      const len = vbWidth;
      s.el.style.strokeDasharray = String(len);
      s.el.style.strokeDashoffset = String(len);
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        strings.forEach((s, i) => {
          s.el.style.transition = `stroke-dashoffset 1s cubic-bezier(.22,.8,.3,1) ${i * 0.08}s`;
          s.el.style.strokeDashoffset = "0";
        });
      });
    });
    svg.querySelectorAll(".note-dot").forEach((dot, i) => {
      dot.style.transition = `opacity .5s ease ${0.4 + i * 0.1}s, transform .5s ease ${0.4 + i * 0.1}s`;
      dot.style.opacity = "0";
      dot.style.transform = "scale(.4)";
      dot.style.transformOrigin = "center";
      dot.style.transformBox = "fill-box";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.style.opacity = "1";
          dot.style.transform = "scale(1)";
        });
      });
    });

    // Pointer-driven pluck.
    let raf = null;
    let pointerActive = false;

    function toLocal(clientX, clientY) {
      const rect = svg.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * vbWidth,
        y: ((clientY - rect.top) / rect.height) * vbHeight
      };
    }

    function tick() {
      let stillMoving = false;
      strings.forEach((s) => {
        s.bend += (s.target - s.bend) * 0.2;
        if (Math.abs(s.target - s.bend) > 0.1) stillMoving = true;
        const controlX = s._controlX ?? vbWidth / 2;
        s.el.setAttribute("d", `M0,${s.y} Q${controlX},${s.y + s.bend} ${vbWidth},${s.y}`);
      });
      if (stillMoving || pointerActive) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    function startLoop() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    wrap.addEventListener("pointermove", (e) => {
      pointerActive = true;
      const { x, y } = toLocal(e.clientX, e.clientY);
      const maxInfluence = vbHeight / 2.5;
      strings.forEach((s) => {
        const dist = Math.abs(y - s.y);
        const strength = Math.max(0, 1 - dist / maxInfluence);
        const raw = (s.y - y) * 0.5 * strength;
        s.target = Math.max(-26, Math.min(26, raw));
        s._controlX = x;
      });
      startLoop();
    });

    wrap.addEventListener("pointerleave", () => {
      pointerActive = false;
      strings.forEach((s) => {
        s.target = 0;
      });
      startLoop();
    });
  });
}
