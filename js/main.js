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
    // do mobilného menu doplníme kontakt + dekoratívny list (raz)
    if (!nav.querySelector(".menu-extra")) {
      var ex = document.createElement("div");
      ex.className = "menu-extra";
      ex.innerHTML =
        '<div class="menu-contact">' +
        '<a href="tel:+421904942936"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1z"/></svg>0904 942 936</a>' +
        '<a href="mailto:info@stodolastarecasy.sk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>info@stodolastarecasy.sk</a>' +
        "</div>" +
        '<svg class="menu-sprig" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 195 C96 150 92 110 86 70 C82 44 74 24 60 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><g fill="currentColor"><ellipse cx="70" cy="150" rx="20" ry="11" transform="rotate(-28 70 150)"/><ellipse cx="128" cy="138" rx="20" ry="11" transform="rotate(26 128 138)"/><ellipse cx="64" cy="116" rx="18" ry="10" transform="rotate(-32 64 116)"/><ellipse cx="124" cy="104" rx="18" ry="10" transform="rotate(22 124 104)"/><ellipse cx="62" cy="82" rx="15" ry="9" transform="rotate(-36 62 82)"/><ellipse cx="116" cy="72" rx="15" ry="9" transform="rotate(20 116 72)"/><ellipse cx="66" cy="50" rx="12" ry="7" transform="rotate(-40 66 50)"/><ellipse cx="104" cy="44" rx="12" ry="7" transform="rotate(16 104 44)"/><ellipse cx="76" cy="24" rx="9" ry="5.5" transform="rotate(-44 76 24)"/></g></svg>';
      nav.appendChild(ex);
    }
    var setNav = function (open) {
      burger.classList.toggle("open", open);
      nav.classList.toggle("open", open);
      document.documentElement.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) {
        nav.querySelectorAll(".has-sub.open").forEach(function (hs) {
          hs.classList.remove("open");
          var t = hs.querySelector(".sub-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    };
    // tlačidlo „Späť" v každom podmenu (mobilný slide)
    nav.querySelectorAll(".has-sub").forEach(function (hs) {
      var sm = hs.querySelector(".submenu");
      if (sm && !sm.querySelector(".sub-back")) {
        var li = document.createElement("li");
        li.className = "sub-back-li";
        var b = document.createElement("button");
        b.className = "sub-back";
        b.type = "button";
        b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>Späť';
        b.addEventListener("click", function () {
          hs.classList.remove("open");
          var t = hs.querySelector(".sub-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        });
        li.appendChild(b);
        sm.insertBefore(li, sm.firstChild);
      }
    });
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

  // ── Galéria — automatický carousel (2 fotky) ─────────────────────────────
  var gs = document.querySelector("[data-gslider]");
  if (gs) {
    var track = gs.querySelector(".gtrack");
    var slides = track.children;
    var dotsWrap = document.querySelector("[data-gdots]");
    var idx = 0, timer = null;
    var reduceG = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var perView = function () { return window.innerWidth <= 680 ? 1 : 2; };
    var maxIdx = function () { return Math.max(0, slides.length - perView()); };
    var go = function (i) {
      var mx = maxIdx();
      idx = i > mx ? 0 : (i < 0 ? mx : i);
      track.style.transform = "translateX(" + (-idx * (100 / perView())) + "%)";
      renderDots();
    };
    var renderDots = function () {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var d = 0; d <= maxIdx(); d++) {
        var b = document.createElement("button");
        b.className = "gdot" + (d === idx ? " on" : "");
        b.setAttribute("aria-label", "Snímka " + (d + 1));
        (function (dd) { b.addEventListener("click", function () { go(dd); restart(); }); })(d);
        dotsWrap.appendChild(b);
      }
    };
    var restart = function () {
      if (reduceG) return;
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 3500);
    };
    go(0); restart();
    gs.addEventListener("mouseenter", function () { clearInterval(timer); });
    gs.addEventListener("mouseleave", function () { gs.classList.remove("cur-left", "cur-right"); restart(); });
    // kurzor šípka (ľavá/pravá polovica) + klik na prepnutie
    gs.addEventListener("mousemove", function (e) {
      var r = gs.getBoundingClientRect();
      var left = (e.clientX - r.left) < r.width / 2;
      gs.classList.toggle("cur-left", left);
      gs.classList.toggle("cur-right", !left);
    });
    var swiped = false;
    gs.addEventListener("click", function (e) {
      if (swiped) return;
      var r = gs.getBoundingClientRect();
      if ((e.clientX - r.left) < r.width / 2) go(idx - 1); else go(idx + 1);
      restart();
    });
    // swipe prstom na dotykových zariadeniach
    var startX = null;
    gs.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; swiped = false; }, { passive: true });
    gs.addEventListener("touchmove", function (e) {
      if (startX !== null && Math.abs(e.touches[0].clientX - startX) > 10) swiped = true;
    }, { passive: true });
    gs.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { if (dx < 0) go(idx + 1); else go(idx - 1); restart(); }
      startX = null;
      if (swiped) setTimeout(function () { swiped = false; }, 400);
    });
    var rt;
    addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { go(Math.min(idx, maxIdx())); }, 150);
    });
  }

  var reduceMo = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Hero — plynulý crossfade medzi vrstvami obrázkov ──────────────────────
  var heroBg = document.querySelector(".hero .bg[data-hero]");
  if (heroBg && !reduceMo) {
    var layers = heroBg.querySelectorAll("img.hbg");
    if (layers.length > 1) {
      var hi = 0;
      setInterval(function () {
        layers[hi].classList.remove("on");
        hi = (hi + 1) % layers.length;
        layers[hi].classList.add("on");
      }, 5000);
    }
  }

  // ── Typewriter efekt na citát (striedanie viacerých viet) ────────────────
  var tw = document.querySelector("[data-typewriter]");
  if (tw) {
    var raw = tw.getAttribute("data-typewriter") || tw.textContent;
    var phrases = raw.split("|").map(function (x) { return x.trim(); }).filter(Boolean);
    if (reduceMo || phrases.length === 0) {
      tw.textContent = phrases[0] || tw.textContent;
    } else {
      var firedTw = false;
      var ioT = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !firedTw) {
            firedTw = true;
            tw.classList.add("typing");
            var pi = 0, ci = 0, del = false;
            (function step() {
              var full = phrases[pi];
              if (!del) {
                ci++;
                tw.textContent = full.slice(0, ci);
                if (ci >= full.length) { del = true; return setTimeout(step, 2400); }
                return setTimeout(step, 45);
              }
              ci--;
              tw.textContent = full.slice(0, ci);
              if (ci <= 0) { del = false; pi = (pi + 1) % phrases.length; return setTimeout(step, 400); }
              return setTimeout(step, 24);
            })();
            ioT.disconnect();
          }
        });
      }, { threshold: 0.45 });
      ioT.observe(tw);
    }
  }

  // ── Počítadlo (count-up) pre štatistiky ──────────────────────────────────
  var statsWrap = document.querySelector(".ustats");
  if (statsWrap && !reduceMo) {
    var nums = statsWrap.querySelectorAll(".ust b");
    var ranC = false;
    var ioC = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !ranC) {
          ranC = true;
          nums.forEach(function (el) {
            var m = el.textContent.trim().match(/^(\d+)(.*)$/);
            if (!m) return;
            var target = parseInt(m[1], 10), suffix = m[2], dur = 1500, t0 = null;
            function frame(ts) {
              if (!t0) t0 = ts;
              var p = Math.min((ts - t0) / dur, 1);
              var eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (p < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
          });
          ioC.disconnect();
        }
      });
    }, { threshold: 0.45 });
    ioC.observe(statsWrap);
  }

  // ── CTA karta presne na prelome footra a sekcie nad ním ───────────────────
  var fcta = document.querySelector(".fcta");
  if (fcta) {
    var mainEl = document.getElementById("obsah");
    var prevSec = mainEl ? mainEl.lastElementChild : null;
    var placeCta = function () {
      var half = Math.round(fcta.offsetHeight / 2);
      fcta.style.marginTop = (-half) + "px";
      if (prevSec) {
        // sekcia nad footrom sa vždy dotýka footra (žiadna krémová medzera za kartou);
        // pri mape karta presahuje cez mapu, inak cez vlastné pozadie sekcie
        prevSec.style.marginBottom = "0px";
        if (!prevSec.classList.contains("map-full")) {
          prevSec.style.paddingBottom = (half + 28) + "px";
        }
      }
    };
    placeCta();
    addEventListener("load", placeCta);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeCta);
    var rtc;
    addEventListener("resize", function () {
      clearTimeout(rtc);
      rtc = setTimeout(placeCta, 150);
    });
    if (window.ResizeObserver) new ResizeObserver(placeCta).observe(fcta);
  }

  // ── Kontakt: biela karta s údajmi presne na prelome phero a sekcie ────────
  var kinfo = document.querySelector(".kcard-info");
  if (kinfo) {
    var ksec = kinfo.closest("section");
    var kprev = ksec ? ksec.previousElementSibling : null;
    var placeK = function () {
      var half = Math.round(kinfo.offsetHeight / 2);
      kinfo.style.marginTop = (-half) + "px";
      if (kprev) kprev.style.paddingBottom = (half + 40) + "px";
    };
    placeK();
    addEventListener("load", placeK);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeK);
    var rk;
    addEventListener("resize", function () { clearTimeout(rk); rk = setTimeout(placeK, 150); });
    if (window.ResizeObserver) new ResizeObserver(placeK).observe(kinfo);
  }
})();
