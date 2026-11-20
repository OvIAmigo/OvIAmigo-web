/*
 * OvIAmigo · WhatsApp directo en pantalla y menú que marca dónde estás.
 * Usa el número de config.js (window.OVI.whatsapp). Si está vacío, los botones de WhatsApp se ocultan.
 */
(function () {
  "use strict";
  var OVI = window.OVI || {};
  var num = String(OVI.whatsapp || "").replace(/\D/g, "");
  function $$(q, r) { return [].slice.call((r || document).querySelectorAll(q)); }

  /* ---------- WhatsApp ---------- */
  function link(nombre, texto) {
    nombre = (nombre || "").trim(); texto = (texto || "").trim();
    var m = nombre ? "Hola Ovi, soy " + nombre + ". " : "Hola Ovi 👋 ";
    m += texto || "Quiero consultarte por mi negocio.";
    m += " (Te escribo desde oviamigo.com)";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(m);
  }

  if (!num) {
    $$("[data-wa-directo], .wa-caja, #wa-abrir, #wa-panel").forEach(function (n) { n.remove(); });
  } else {
    // botón directo, sin formulario
    $$("[data-wa-directo]").forEach(function (a) { a.href = link("", ""); });
    // cada caja de mensaje arma su enlace mientras la persona escribe
    $$("[data-wa-form]").forEach(function (caja) {
      var n = caja.querySelector("[data-wa-nombre]"), t = caja.querySelector("[data-wa-texto]"), a = caja.querySelector("[data-wa-enviar]");
      function act() { a.href = link(n && n.value, t && t.value); }
      if (n) n.addEventListener("input", act);
      if (t) t.addEventListener("input", act);
      act();
    });

    // panel flotante
    var panel = document.getElementById("wa-panel"), abrir = document.getElementById("wa-abrir");
    if (panel && abrir) {
      var cerrar = panel.querySelector("[data-wa-cerrar]");
      function mostrar(si) {
        panel.hidden = !si; abrir.setAttribute("aria-expanded", si ? "true" : "false");
        if (si) { var t = panel.querySelector("textarea"); if (t) setTimeout(function () { t.focus({ preventScroll: true }); }, 30); }
      }
      abrir.addEventListener("click", function () { mostrar(panel.hidden); });
      if (cerrar) cerrar.addEventListener("click", function () { mostrar(false); abrir.focus(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { mostrar(false); abrir.focus(); } });
      document.addEventListener("click", function (e) {
        if (!panel.hidden && !e.target.closest("#flota")) mostrar(false);
      });
      panel.querySelector("[data-wa-enviar]").addEventListener("click", function () { setTimeout(function () { mostrar(false); }, 200); });
    }
  }

  /* ---------- menú: marca la sección que se está viendo ---------- */
  var enlaces = $$(".menu a[href^='#']");
  if (enlaces.length) {
    var items = enlaces.map(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      // "Tu rubro" apunta a un bloque interno: se mide la sección completa que lo contiene
      return el ? { a: a, el: el.closest("section") || el } : null;
    }).filter(Boolean);
    var espera = false;
    function marcar() {
      espera = false;
      var linea = 150, actual = null;
      items.forEach(function (it) { if (it.el.getBoundingClientRect().top <= linea) actual = it; });
      // al final de la página la última sección (Contacto) puede no llegar a la línea: se marca igual
      if (items.length && window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) actual = items[items.length - 1];
      enlaces.forEach(function (a) { a.removeAttribute("aria-current"); });
      if (actual) actual.a.setAttribute("aria-current", "true");
    }
    window.addEventListener("scroll", function () { if (!espera) { espera = true; requestAnimationFrame(marcar); } }, { passive: true });
    marcar();
  }
})();
