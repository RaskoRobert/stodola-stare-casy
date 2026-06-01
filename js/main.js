/* Stodola Staré časy — spoločné skripty (header, mobilné menu, reveal, lightbox) */
(function () {
  "use strict";

  // ── Header — pridanie tieňa pri scrollovaní ──────────────────────────────
  var hdr = document.getElementById("hdr");
  if (hdr) {
    var onScroll = function () {
      hdr.classList.toggle("scrolled", window.scrollY > 20);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  // ── Mobilné menu (burger) ────────────────────────────────────────────────
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    var setNav = function (open) {
      burger.classList.toggle("open", open);
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    burger.addEventListener("click", function () {
      setNav(!nav.classList.contains("open"));
    });
    // Zatvor po kliknutí na koncový odkaz (nie na prepínač podmenu)
    nav.querySelectorAll("a.lnk:not(.sub-toggle)").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
    // Esc zatvorí menu
    addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) setNav(false);
    });
  }

  // ── Rozbaľovacie podmenu „Podujatia" (na mobile klikom) ──────────────────
  document.querySelectorAll(".has-sub > .sub-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      // Na mobile (burger viditeľný) preberáme klik a iba prepíname podmenu
      if (getComputedStyle(burger).display !== "none") {
        e.preventDefault();
        var li = toggle.closest(".has-sub");
        var open = li.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }
    });
  });

  // ── Scroll-reveal animácie (rešpektuje prefers-reduced-motion) ───────────
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  // ── GDPR cookie lišta ────────────────────────────────────────────────────
  try {
    if (!localStorage.getItem("cookieConsent")) {
      // relatívny prefix pre podpriečinok /blog/
      var prefix = location.pathname.indexOf("/blog/") !== -1 ? "../" : "";
      var bar = document.createElement("div");
      bar.className = "cookiebar";
      bar.setAttribute("role", "dialog");
      bar.setAttribute("aria-label", "Súhlas s cookies");
      bar.innerHTML =
        '<p>Táto stránka používa nevyhnutné cookies pre svoju funkčnosť. Viac v sekcii ' +
        '<a href="' + prefix + 'ochrana-osobnych-udajov.html">Ochrana osobných údajov</a>.</p>' +
        '<div class="cb-actions">' +
        '<button class="btn btn-light" type="button" data-cookie="ok">Rozumiem</button>' +
        "</div>";
      document.body.appendChild(bar);
      requestAnimationFrame(function () { bar.classList.add("show"); });
      bar.querySelector("[data-cookie=ok]").addEventListener("click", function () {
        try { localStorage.setItem("cookieConsent", "1"); } catch (e) {}
        bar.classList.remove("show");
        setTimeout(function () { bar.remove(); }, 400);
      });
    }
  } catch (e) { /* localStorage nedostupné — lištu nezobrazíme */ }

  // ── Lightbox galérie ─────────────────────────────────────────────────────
  var galLinks = document.querySelectorAll("[data-lightbox] a");
  if (galLinks.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Zväčšená fotografia");
    box.innerHTML =
      '<button class="lb-close" aria-label="Zavrieť">&times;</button>' +
      '<button class="lb-nav lb-prev" aria-label="Predchádzajúca">&#8249;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-nav lb-next" aria-label="Ďalšia">&#8250;</button>';
    document.body.appendChild(box);

    var lbImg = box.querySelector("img");
    var lbCap = box.querySelector("figcaption");
    var items = Array.prototype.slice.call(galLinks);
    var current = 0;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var a = items[current];
      lbImg.src = a.getAttribute("href");
      var img = a.querySelector("img");
      lbImg.alt = img ? img.alt : "";
      lbCap.textContent = img ? img.alt : "";
    };
    var open = function (i) {
      show(i);
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      box.classList.remove("open");
      document.body.style.overflow = "";
    };

    items.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }
})();
