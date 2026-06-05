/* Stodola Staré časy — rezervačný formulár
   Odoslanie cez Formspree (AJAX) so záložným mailto: a predvýberom ?typ= */
(function () {
  "use strict";

  // ── KONFIGURÁCIA ─────────────────────────────────────────────────────────
  // TODO (klient): vlož reálny Formspree endpoint, napr.
  //   https://formspree.io/f/abcdwxyz   (zaregistruj sa na formspree.io,
  //   over e-mail info@stodolastarecasy.sk a sem vlož ID formulára).
  // Kým je placeholder nezmenený, formulár sa odošle cez e-mailového klienta (mailto).
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID";

  var MAILTO = "info@stodolastarecasy.sk";

  var form = document.getElementById("resvForm");
  if (!form) return;
  var confirm = document.getElementById("confirm");

  // ── Predvýber typu udalosti z ?typ= ──────────────────────────────────────
  var typParam = new URLSearchParams(location.search).get("typ");
  if (typParam) {
    var el = form.querySelector('input[name="typ"][value="' + (window.CSS && CSS.escape ? CSS.escape(typParam) : typParam) + '"]');
    if (el) el.checked = true;
  }

  // ── Pomocné funkcie ──────────────────────────────────────────────────────
  function val(name) {
    var f = form.querySelector('[name="' + name + '"]');
    return f ? (f.value || "").trim() : "";
  }
  function checkedVal(name) {
    var f = form.querySelector('input[name="' + name + '"]:checked');
    return f ? f.value : "";
  }
  function showConfirm(msg) {
    if (!confirm) return;
    if (msg) {
      var p = confirm.querySelector("p");
      if (p) p.textContent = msg;
    }
    confirm.classList.add("show");
    confirm.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function setError(msg) {
    var box = document.getElementById("formError");
    if (!box) {
      box = document.createElement("div");
      box.id = "formError";
      box.className = "form-error";
      box.setAttribute("role", "alert");
      form.insertBefore(box, form.querySelector('button[type="submit"]'));
    }
    box.textContent = msg;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function clearError() {
    var box = document.getElementById("formError");
    if (box) box.textContent = "";
  }

  // ── Validácia povinných polí ─────────────────────────────────────────────
  function validate() {
    clearError();
    if (!val("meno")) return "Prosím, vyplňte meno a priezvisko.";
    if (!val("tel")) return "Prosím, uveďte telefónne číslo, aby sme vás vedeli kontaktovať.";
    var email = val("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Skontrolujte, prosím, formát e-mailovej adresy.";
    var gdpr = form.querySelector(".gdpr input[type=checkbox]");
    if (gdpr && !gdpr.checked) return "Pre odoslanie je potrebný súhlas so spracovaním osobných údajov.";
    return null;
  }

  // ── Zostavenie zhrnutia dopytu ───────────────────────────────────────────
  function summary() {
    var doplnky = Array.prototype.slice
      .call(form.querySelectorAll('input[name="doplnok"]:checked'))
      .map(function (x) { return x.value; })
      .join(", ") || "žiadne";
    return {
      "Typ udalosti": checkedVal("typ") || "neuvedené",
      "Dátum": val("datum") || "-",
      "Počet hostí": val("hostia") || "-",
      "Priestor": val("priestor") || "-",
      "Výzdoba": val("balik") || "-",
      "Doplnky": doplnky,
      "Meno": val("meno") || "-",
      "Telefón": val("tel") || "-",
      "E-mail": val("email") || "-",
      "Poznámka": val("sprava") || "-"
    };
  }

  function mailtoFallback() {
    var s = summary();
    var subj = "Dopyt na rezerváciu — " + s["Typ udalosti"];
    var body = Object.keys(s).map(function (k) { return k + ": " + s[k]; }).join("\r\n");
    window.location.href =
      "mailto:" + MAILTO +
      "?subject=" + encodeURIComponent(subj) +
      "&body=" + encodeURIComponent(body);
    showConfirm("Otvorili sme váš e-mailový klient s predvyplneným dopytom. Ak sa neotvoril, zavolajte nám priamo.");
  }

  // ── Odoslanie ────────────────────────────────────────────────────────────
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot — ak je vyplnený, ide o spam: tvárime sa úspešne a nič neodošleme
    if (val("website")) { showConfirm(); return; }

    var err = validate();
    if (err) { setError(err); return; }
    clearError();

    var btn = form.querySelector('button[type="submit"]');

    // Bez nakonfigurovaného endpointu → mailto fallback
    if (FORMSPREE_ENDPOINT.indexOf("REPLACE_WITH_FORM_ID") !== -1) {
      mailtoFallback();
      return;
    }

    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Odosielam…"; }

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          showConfirm("Váš dopyt sme prijali. Ozveme sa vám do 24 hodín.");
        } else {
          // Server odmietol → ponúkneme mailto ako zálohu
          mailtoFallback();
        }
      })
      .catch(function () { mailtoFallback(); })
      .finally(function () {
        if (btn) { btn.disabled = false; if (btn.dataset.label) btn.textContent = btn.dataset.label; }
      });
  });
})();
