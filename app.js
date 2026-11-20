/* OvIAmigo · comportamiento de la página. Los datos editables están en config.js */
(function () {
  "use strict";
  var OVI = window.OVI || {};
  // si faltara config.js, la página igual muestra las redes
  OVI.redes = OVI.redes || {
    instagram: { url: "https://www.instagram.com/oviamigoo", usuario: "@oviamigoo" }, tiktok: { url: "https://www.tiktok.com/@oviamigo", usuario: "@oviamigo" },
    youtube: { url: "https://www.youtube.com/@oviamigoo", usuario: "@oviamigoo" }, x: { url: "https://x.com/oviamigoo", usuario: "@oviamigoo" }
  };
  if (!("correo" in OVI)) OVI.correo = "armoaalen@gmail.com";
  var $ = function (id) { return document.getElementById(id); };
  var crear = function (tag, clase, texto) { var e = document.createElement(tag); if (clase) e.className = clase; if (texto != null) e.textContent = texto; return e; };
  var miles = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); };

  /* ================= PAÍSES Y MONEDAS ================= */
  // [código de país, nombre, prefijo telefónico]. Para sumar un país, agregá un renglón.
  var PAISES = [["PY", "Paraguay", "595"], ["AR", "Argentina", "54"], ["BO", "Bolivia", "591"], ["BR", "Brasil", "55"], ["CL", "Chile", "56"], ["CO", "Colombia", "57"], ["CR", "Costa Rica", "506"],
    ["CU", "Cuba", "53"], ["EC", "Ecuador", "593"], ["SV", "El Salvador", "503"], ["ES", "España", "34"], ["US", "Estados Unidos", "1"], ["GT", "Guatemala", "502"], ["HN", "Honduras", "504"],
    ["MX", "México", "52"], ["NI", "Nicaragua", "505"], ["PA", "Panamá", "507"], ["PE", "Perú", "51"], ["PR", "Puerto Rico", "1"], ["DO", "República Dominicana", "1"], ["UY", "Uruguay", "598"],
    ["VE", "Venezuela", "58"], ["DE", "Alemania", "49"], ["AD", "Andorra", "376"], ["AU", "Australia", "61"], ["AT", "Austria", "43"], ["BE", "Bélgica", "32"], ["BZ", "Belice", "501"], ["CA", "Canadá", "1"],
    ["CN", "China", "86"], ["KR", "Corea del Sur", "82"], ["DK", "Dinamarca", "45"], ["AE", "Emiratos Árabes", "971"], ["PH", "Filipinas", "63"], ["FI", "Finlandia", "358"], ["FR", "Francia", "33"],
    ["GR", "Grecia", "30"], ["GQ", "Guinea Ecuatorial", "240"], ["GY", "Guyana", "592"], ["HT", "Haití", "509"], ["IN", "India", "91"], ["IE", "Irlanda", "353"], ["IL", "Israel", "972"], ["IT", "Italia", "39"],
    ["JM", "Jamaica", "1"], ["JP", "Japón", "81"], ["MA", "Marruecos", "212"], ["NO", "Noruega", "47"], ["NZ", "Nueva Zelanda", "64"], ["NL", "Países Bajos", "31"], ["PL", "Polonia", "48"], ["PT", "Portugal", "351"],
    ["GB", "Reino Unido", "44"], ["RO", "Rumania", "40"], ["RU", "Rusia", "7"], ["SG", "Singapur", "65"], ["ZA", "Sudáfrica", "27"], ["SE", "Suecia", "46"], ["CH", "Suiza", "41"], ["SR", "Surinam", "597"],
    ["TW", "Taiwán", "886"], ["TT", "Trinidad y Tobago", "1"], ["TR", "Turquía", "90"], ["", "Otro país", ""]];
  // [código, nombre, símbolo, mínimo, máximo, paso, valor inicial] para la calculadora
  var MONEDAS = [["PYG", "Guaraníes (₲)", "₲", 20000, 1500000, 10000, 200000], ["USD", "Dólares (US$)", "US$", 5, 500, 5, 30], ["EUR", "Euros (€)", "€", 5, 500, 5, 30],
    ["ARS", "Pesos argentinos ($)", "$", 5000, 500000, 5000, 30000], ["BRL", "Reales (R$)", "R$", 20, 2000, 10, 150], ["MXN", "Pesos mexicanos ($)", "$", 100, 10000, 100, 500],
    ["CLP", "Pesos chilenos ($)", "$", 5000, 500000, 5000, 25000], ["COP", "Pesos colombianos ($)", "$", 20000, 1500000, 10000, 100000], ["PEN", "Soles (S/)", "S/", 20, 2000, 10, 100],
    ["UYU", "Pesos uruguayos ($)", "$", 200, 20000, 100, 1200], ["BOB", "Bolivianos (Bs)", "Bs", 20, 2000, 10, 200]];
  var MONEDA_DE = { PY: "PYG", AR: "ARS", BR: "BRL", MX: "MXN", CL: "CLP", CO: "COP", PE: "PEN", UY: "UYU", BO: "BOB", ES: "EUR", DE: "EUR", FR: "EUR", IT: "EUR", PT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", IE: "EUR", GR: "EUR", FI: "EUR", AD: "EUR" };
  var ZONAS = { "America/Asuncion": "PY", "America/Buenos_Aires": "AR", "America/Cordoba": "AR", "America/Sao_Paulo": "BR", "America/Bahia": "BR", "America/Fortaleza": "BR", "America/Recife": "BR", "America/Manaus": "BR",
    "America/Belem": "BR", "America/Cuiaba": "BR", "America/Campo_Grande": "BR", "America/Porto_Velho": "BR", "America/Rio_Branco": "BR", "America/Maceio": "BR", "America/Araguaina": "BR", "America/Boa_Vista": "BR",
    "America/Montevideo": "UY", "America/Santiago": "CL", "America/Punta_Arenas": "CL", "America/La_Paz": "BO", "America/Lima": "PE", "America/Bogota": "CO", "America/Guayaquil": "EC", "America/Caracas": "VE",
    "America/Mexico_City": "MX", "America/Monterrey": "MX", "America/Tijuana": "MX", "America/Cancun": "MX", "America/Merida": "MX", "America/Chihuahua": "MX", "America/Hermosillo": "MX", "America/Mazatlan": "MX",
    "America/Guatemala": "GT", "America/El_Salvador": "SV", "America/Tegucigalpa": "HN", "America/Managua": "NI", "America/Costa_Rica": "CR", "America/Panama": "PA", "America/Havana": "CU",
    "America/Santo_Domingo": "DO", "America/Puerto_Rico": "PR", "Europe/Madrid": "ES", "Atlantic/Canary": "ES", "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US", "America/Los_Angeles": "US",
    "America/Phoenix": "US", "America/Detroit": "US", "America/Toronto": "CA", "America/Vancouver": "CA", "Europe/Lisbon": "PT", "Europe/Rome": "IT", "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/London": "GB" };
  // Adivina el país del visitante por la zona horaria de su equipo. Es solo el valor inicial: siempre se puede cambiar.
  function paisDelVisitante() {
    var zona = "", idioma = String(navigator.language || "").toLowerCase(), region = (idioma.split("-")[1] || "").toUpperCase();
    try { zona = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    if (region === "PY") return "PY";
    var iso = zona.indexOf("America/Argentina") === 0 ? "AR" : ZONAS[zona];
    if (iso === "BR" && idioma.indexOf("es") === 0) return "PY";   // muchos equipos de Paraguay usan la hora de San Pablo
    if (iso) return iso;
    for (var i = 0; i < PAISES.length; i++) if (region && PAISES[i][0] === region) return region;
    return "PY";
  }
  var PAIS_INICIAL = paisDelVisitante();
  var sinTildes = function (t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };

  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ================= ROBOT CON VIDA ================= */
  // el mismo robot del logo, pero mueve los ojos hacia donde está el puntero, parpadea y saluda
  var ROBOT = '<svg class="rv" viewBox="0 0 200 240"><g stroke="#13161B" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M100 42V20" stroke-width="6" fill="none"/><circle class="rv-antena" cx="100" cy="15" r="10" fill="#FFD60A" stroke-width="5"/>' +
    '<rect x="20" y="76" width="22" height="46" rx="10" fill="#4DA3FF" stroke-width="6"/><rect x="158" y="76" width="22" height="46" rx="10" fill="#4DA3FF" stroke-width="6"/>' +
    '<path d="M64 178Q40 182 38 204" stroke-width="18" fill="none"/><path d="M64 178Q40 182 38 204" stroke="#4DA3FF" stroke-width="9" fill="none"/><circle cx="38" cy="208" r="9" fill="#fff" stroke-width="5"/>' +
    '<g class="rv-brazo"><path d="M138 174Q164 162 166 134" stroke-width="18" fill="none"/><path d="M138 174Q164 162 166 134" stroke="#4DA3FF" stroke-width="9" fill="none"/><circle cx="166" cy="128" r="9" fill="#fff" stroke-width="5"/></g>' +
    '<rect x="72" y="208" width="24" height="22" rx="8" fill="#13161B" stroke-width="4"/><rect x="104" y="208" width="24" height="22" rx="8" fill="#13161B" stroke-width="4"/>' +
    '<rect x="62" y="154" width="76" height="60" rx="20" fill="#4DA3FF" stroke-width="6"/><rect x="82" y="168" width="36" height="30" rx="7" fill="#FFD60A" stroke-width="4"/>' +
    '<rect x="34" y="42" width="132" height="112" rx="36" fill="#fff" stroke-width="6"/><rect x="50" y="60" width="100" height="76" rx="26" fill="#13161B" stroke="none"/>' +
    '<path d="M88 114Q100 126 112 114" stroke="#3FCF8E" stroke-width="5" fill="none"/></g>' +
    '<g class="rv-ojos"><ellipse class="rv-ojo" cx="80" cy="92" rx="9" ry="14" fill="#3FCF8E"/><ellipse class="rv-ojo" cx="120" cy="92" rx="9" ry="14" fill="#3FCF8E"/></g>' +
    '<ellipse cx="63" cy="114" rx="8" ry="5" fill="#FF4D8D"/><ellipse cx="137" cy="114" rx="8" ry="5" fill="#FF4D8D"/>' +
    '<text x="100" y="191" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="22" fill="#13161B">IA</text></svg>';
  var robots = [], miraX = 0, miraY = 0, cuadroPedido = false, ultimoMov = 0;
  function robotVivo(caja) { caja.innerHTML = ROBOT; robots.push({ caja: caja, ojos: caja.querySelector(".rv-ojos") }); }
  function moverOjos() {
    cuadroPedido = false;
    robots.forEach(function (r) {
      var b = r.caja.getBoundingClientRect(); if (!b.width) return;
      var dx = miraX - (b.left + b.width / 2), dy = miraY - (b.top + b.height * .4), d = Math.sqrt(dx * dx + dy * dy) || 1, f = Math.min(1, d / 160);
      r.ojos.style.transform = "translate(" + (dx / d * 7 * f).toFixed(1) + "px," + (dy / d * 5 * f).toFixed(1) + "px)";
    });
  }
  document.addEventListener("pointermove", function (e) {
    miraX = e.clientX; miraY = e.clientY; ultimoMov = Date.now();
    if (!cuadroPedido) { cuadroPedido = true; requestAnimationFrame(moverOjos); }
  }, { passive: true });
  // sin puntero (celular): mira para distintos lados cada tanto
  if (!reduce) setInterval(function () {
    if (Date.now() - ultimoMov < 3000) return;
    var a = Math.random() * 6.283, x = (Math.cos(a) * 6).toFixed(1), y = (Math.sin(a) * 4).toFixed(1);
    robots.forEach(function (r) { r.ojos.style.transform = "translate(" + x + "px," + y + "px)"; });
  }, 2200);
  if ($("robot-chat")) robotVivo($("robot-chat"));
  if ($("robot-hero")) robotVivo($("robot-hero"));

  /* ================= EFECTOS: HUMO Y PAPELITOS ================= */
  function efecto(caja, tipo, cantidad) {
    if (reduce || !caja) return;
    var colores = ["#FF4D8D", "#4DA3FF", "#3FCF8E", "#FFD60A", "#13161B"];
    for (var i = 0; i < cantidad; i++) {
      var p = crear("i", "fx " + tipo), ang = Math.random() * 6.283, lejos = 70 + Math.random() * 110;
      if (tipo === "humo-p") {
        p.style.setProperty("--dx", Math.round((Math.random() - .5) * 220) + "px"); p.style.setProperty("--dy", Math.round(-90 - Math.random() * 110) + "px");
        p.style.animationDelay = (i * 45) + "ms";
      } else {
        p.style.setProperty("--dx", Math.round(Math.cos(ang) * lejos) + "px"); p.style.setProperty("--dy", Math.round(Math.sin(ang) * lejos - 40) + "px");
        p.style.setProperty("--r", Math.round((Math.random() - .5) * 720) + "deg"); p.style.setProperty("--c", colores[i % colores.length]);
      }
      caja.appendChild(p);
      setTimeout(function (el) { el.remove(); }, 1900, p);
    }
  }

  /* ================= REDES ================= */
  var REDES = [
    { id: "instagram", nombre: "Instagram", detalle: "Reels e historias del día a día" },
    { id: "tiktok", nombre: "TikTok", detalle: "Los videos cortos, primero acá" },
    { id: "youtube", nombre: "YouTube", detalle: "Todos los Shorts, ordenados" },
    { id: "x", nombre: "X", detalle: "Novedades de IA en pocas palabras" }
  ].filter(function (r) { return OVI.redes && OVI.redes[r.id] && OVI.redes[r.id].url; });
  var icono = function (id) { return '<svg aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };

  document.querySelectorAll("[data-redes]").forEach(function (caja) {
    var modo = caja.getAttribute("data-redes");
    REDES.forEach(function (r) {
      var a = crear("a", modo === "iconos" ? "icono" : "btn");
      a.href = OVI.redes[r.id].url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = icono(r.id) + (modo === "iconos" ? "" : "<span>" + r.nombre + "</span>");
      a.setAttribute("aria-label", "OvIAmigo en " + r.nombre);
      caja.appendChild(a);
    });
  });
  document.querySelectorAll("[data-red]").forEach(function (a) {
    var r = OVI.redes && OVI.redes[a.getAttribute("data-red")];
    if (r && r.url) a.href = r.url; else a.hidden = true;
  });

  /* ================= CHAT DE PREGUNTAS ================= */
  // No usa inteligencia artificial en vivo ni tiene costo: busca la respuesta en el banco de preguntas.js.
  // EMBUDO: el robot NO entrega el WhatsApp de entrada. Si preguntan precio o cómo contratar, primero hace preguntas
  // de diagnóstico (rubro, consultas por día, qué quieren automatizar). Recién cuando hay interés real (insisten
  // o ya contaron su negocio) los pasa a tu WhatsApp con un resumen escrito. Todo en el navegador, sin servidor.
  var log = $("chat-log"), ideas = $("chat-ideas"), chatForm = $("chat-form"), chatIn = $("chat-in");
  var ocupado = false, banco = null, cargando = null;
  var WA = String(OVI.whatsapp || "").replace(/\D/g, "");
  function enlaceWA(texto) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto); }
  var INICIALES = ["¿Cuánto cuesta una página web?", "¿Qué puede hacer la IA por una peluquería?", "¿Se puede automatizar mi WhatsApp?", "¿La IA me va a dejar sin trabajo?", "¿Cómo se trabaja con Ovi?"];
  var CHIPS = {
    rubro: ["Peluquería", "Restaurante", "Tienda de ropa", "Consultorio", "Tienda online"],
    volumen: ["Menos de 10 por día", "Unas 30 por día", "Más de 100 por día"],
    proceso: ["Responder precios", "Dar turnos", "Tomar pedidos", "Seguimiento de clientes"]
  };
  var PREG_DIAG = {
    rubro: "¿De qué rubro es tu negocio? (por ejemplo: peluquería, restaurante, tienda, consultorio…)",
    volumen: "¿Más o menos cuántos mensajes o consultas recibís por día en WhatsApp?",
    proceso: "¿Qué es lo que más tiempo te saca hoy: responder precios, dar turnos, tomar pedidos, hacer seguimiento…?"
  };
  var ETIQUETA_TEMA = { web: "una página web", enlaces: "una página de enlaces", turnos: "turnos online", formularios: "formularios", videos: "edición de videos", miniaturas: "miniaturas", banners: "banners y perfiles", guiones: "guiones", plan: "un plan de contenido", wabusiness: "WhatsApp Business", asistente: "un asistente de WhatsApp", avisos: "avisos automáticos", planilla: "una planilla de clientes", capacitacion: "capacitación en IA", plantillas: "plantillas", "wa-auto": "automatizar WhatsApp" };
  // lo que la persona va contando a lo largo de la charla
  var E = { n: 0, intencion: 0, rubro: "", volumen: "", proceso: "", espera: "", sinRespuesta: 0, preguntoRubro: false, temas: [], pregs: [], calificado: false };

  var RX_PRECIO = /(precio|cuesta|cuestan|cuanto (sale|salen|cobr|me sale|es el|seria|tengo que pagar|hay que pagar|vale)|costo|tarifa|presupuesto|cotiz|abono|mensualidad|valor del)/;
  var RX_CONTRATAR = /(contratar|contrato|quiero (que|el|la|un|una|empezar|arrancar|comprar|tu servicio|tus servicios)|me interesa|como (empiezo|arranco|te contrato|se contrata)|arrancar ya|empezar ya|comprar|lo quiero)/;
  var RX_HABLAR = /((hablar|comunic|contact|escribir|escribirle|pasame|pasar|pasas|derivar|derivame)[a-z ]* (con )?(ovi|alguien|una persona|un humano|el dueno|un asesor|vos)|numero de (ovi|whatsapp)|whatsapp de ovi|telefono de ovi|dame (el|tu) (numero|whatsapp|telefono)|tu (numero|whatsapp|telefono))/;
  var RX_PREGUNTA = /(\?|^(que|como|cuando|cuanto|cuanta|cuantos|cual|donde|por que|quien|puedo|podes|hacen|haces|tenes|tienen|se puede|es posible)\b)/;

  // El banco pesa algo más de un mega: se baja recién cuando la persona se acerca al chat (y viaja comprimido).
  function cargarBanco() {
    if (banco) return Promise.resolve(banco);
    if (!cargando) cargando = new Promise(function (listo) {
      var s = document.createElement("script"); s.src = "preguntas.js"; s.async = true;
      s.onload = function () { banco = window.OVI_BANCO || null; listo(banco); };
      s.onerror = function () { cargando = null; listo(null); };
      document.head.appendChild(s);
    });
    return cargando;
  }
  // Respaldo mínimo, por si preguntas.js no llegara a cargar
  var RESPALDO = [
    [/impuesto|ruc|factur|\biva\b|tribut|contab/, "De impuestos y facturación no opino: eso se consulta con un contador de confianza."],
    [/hola|buenas|buen dia/, "¡Hola! 👋 Preguntame lo que quieras sobre IA y WhatsApp para tu negocio."]
  ];
  function respuestaDeRespaldo(texto) {
    var t = sinTildes(texto);
    for (var i = 0; i < RESPALDO.length; i++) if (RESPALDO[i][0].test(t)) return RESPALDO[i][1];
    return "";
  }

  function burbuja(quien, texto) {
    var b = crear("div", "burbuja " + quien, texto);
    log.appendChild(b); log.scrollTop = log.scrollHeight; return b;
  }
  // la respuesta aparece escribiéndose; el lector de pantalla recibe el texto entero de una vez
  function escribir(b, texto, fin) {
    if (reduce) { b.textContent = texto; fin(); return; }
    var letras = Array.from(texto), i = 0, salto = Math.max(1, Math.ceil(letras.length / 70));
    var visible = crear("span"); visible.setAttribute("aria-hidden", "true");
    b.appendChild(crear("span", "solo-lector", texto)); b.appendChild(visible);
    (function tic() {
      i += salto; visible.textContent = letras.slice(0, i).join(""); log.scrollTop = log.scrollHeight;
      if (i < letras.length) setTimeout(tic, 16); else { b.textContent = texto; fin(); }
    })();
  }
  function pensando() {
    var b = crear("div", "burbuja ia pensando"); b.innerHTML = "<i></i><i></i><i></i>"; b.setAttribute("aria-label", "Buscando la respuesta");
    log.appendChild(b); log.scrollTop = log.scrollHeight; return b;
  }
  // varios mensajes seguidos, uno después del otro
  function decir(msgs, fin) {
    if (!msgs.length) { fin(); return; }
    escribir(burbuja("ia", ""), msgs[0], function () { setTimeout(function () { decir(msgs.slice(1), fin); }, msgs.length > 1 ? 350 : 0); });
  }
  // botón para seguir con Ovi: WhatsApp con el resumen ya escrito o, si no hay número, el formulario
  function botonOvi(resumen, etiqueta) {
    var b;
    if (WA) {
      b = crear("a", "chat-wa", etiqueta); b.href = enlaceWA(resumen); b.target = "_blank"; b.rel = "noopener";
    } else {
      b = crear("button", "chat-wa", "✍️ Dejarle mis datos a Ovi"); b.type = "button";
      b.addEventListener("click", function () {
        var m = $("f-msg"); if (!m.value.trim()) m.value = resumen;
        abrirForm();
      });
    }
    log.appendChild(b); log.scrollTop = log.scrollHeight;
  }
  function sugerir(lista) {
    ideas.innerHTML = "";
    (lista || []).forEach(function (t) {
      var b = crear("button", "idea", t); b.type = "button";
      b.addEventListener("click", function () { preguntar(t); });
      ideas.appendChild(b);
    });
    ideas.hidden = !ideas.children.length; ideas.scrollLeft = 0;
  }

  /* ---------- el embudo ---------- */
  function datos() { return (E.rubro ? 1 : 0) + (E.volumen ? 1 : 0) + (E.proceso ? 1 : 0); }
  // cierra la venta cuando hay interés real: insiste con el precio, o ya contó su negocio
  function puedeCerrar() {
    var d = datos();
    return E.calificado || E.intencion >= 3 || (E.intencion >= 2 && d >= 1) || (E.intencion >= 1 && d >= 2) || d >= 3;
  }
  function siguientePregunta() {
    var que = !E.rubro ? "rubro" : !E.volumen ? "volumen" : !E.proceso ? "proceso" : "";
    E.espera = que;
    return que ? PREG_DIAG[que] : "¿Hay algo más que quieras saber antes de hablar con Ovi?";
  }
  function recordarTema(t) { if (t && ETIQUETA_TEMA[t] && E.temas.indexOf(ETIQUETA_TEMA[t]) < 0) E.temas.push(ETIQUETA_TEMA[t]); }
  function resumen(ultima) {
    var l = ["Hola Ovi, vengo de oviamigo.com y estuve con el asistente."];
    if (E.rubro) l.push("Mi negocio: " + E.rubro);
    if (E.volumen) l.push("Consultas por día: " + E.volumen);
    if (E.proceso) l.push("Quiero automatizar: " + E.proceso);
    if (E.temas.length) l.push("Me interesó: " + E.temas.slice(0, 4).join(", "));
    if (E.pregs.length) l.push("Preguntas sin respuesta: " + E.pregs.slice(-3).join(" / "));
    if (E.intencion) l.push("Quiero saber el precio para mi caso.");
    return l.join("\n").slice(0, 900);
  }
  function resumenCorto() {
    var p = [];
    if (E.rubro) p.push(E.rubro);
    if (E.volumen) p.push("consultas: " + E.volumen);
    if (E.proceso) p.push("quiere automatizar: " + E.proceso);
    return p.join(" · ");
  }
  function cerrar(sinRespuesta) {
    E.calificado = true; E.espera = "";
    var r = resumen(), corto = resumenCorto();
    var msg = sinRespuesta
      ? "Esa conviene que te la responda Ovi en persona. Te dejé armado el mensaje con lo que me contaste para que no repitas nada: tocá el botón y le llega directo."
      : "Con lo que me contaste, esto ya se habla mejor con Ovi: así te da un precio real para tu caso y no un número al aire." + (corto ? " Resumen: " + corto + "." : "") + " Tocá el botón y le llega todo ya escrito 👇";
    var fijo = $("chat-ovi");
    if (fijo && WA) { fijo.href = enlaceWA(r); fijo.target = "_blank"; fijo.rel = "noopener"; fijo.textContent = "escribile por WhatsApp"; fijo.removeAttribute("data-abrir"); }
    return { msgs: [msg], boton: { texto: r, etiqueta: "💬 Hablar con Ovi por WhatsApp (ya va mi resumen)" }, ideas: [] };
  }
  function limpiarRubro(t) {
    return t.replace(/^(tengo|soy|somos|trabajo (en|con)|mi negocio es|mi rubro es|es|el rubro es)\s+/i, "").replace(/^(un|una|mi|el|la)\s+/i, "").replace(/[.!]+$/, "").slice(0, 60).trim();
  }
  function valorRubro(b, rubro) {
    var r = b ? b.responder("¿Qué puede hacer la IA por " + rubro + "?") : null;
    if (r && r.tema === "rubro") return "Anotado: " + rubro + " 👌 " + r.respuesta;
    return "Anotado: " + rubro + " 👌 En negocios así lo que más rinde suele ser responder rápido las preguntas de siempre y ordenar los pedidos o los turnos.";
  }
  function valorVolumen(t) {
    var n = parseInt((t.match(/\d+/) || [0])[0], 10), x = sinTildes(t);
    if (n >= 30 || /(mucho|monton|cantidad|no doy abasto|cien|cientos)/.test(x)) return "Con ese volumen, contestar todo a mano te come horas del día: ahí es justo donde más rinde automatizar lo repetitivo y que te lleguen solo las consultas que valen.";
    if (n > 0 || /(poco|pocas|pocos)/.test(x)) return "Con ese volumen conviene empezar simple y barato: mensaje de bienvenida y respuestas rápidas, y escalar cuando haga falta.";
    return "Anotado 👌";
  }
  // la persona está contestando una pregunta de diagnóstico
  function tomarDato(texto, b) {
    var que = E.espera, valor;
    if (que === "rubro") { E.rubro = limpiarRubro(texto) || texto.slice(0, 60); valor = valorRubro(b, E.rubro); }
    else if (que === "volumen") { E.volumen = texto.slice(0, 60); valor = valorVolumen(texto); }
    else { E.proceso = texto.slice(0, 80); valor = "Perfecto: eso es justo de lo que más se puede automatizar sin perder el trato personal."; }
    E.espera = "";
    if (puedeCerrar()) { var c = cerrar(false); c.msgs.unshift(valor); return c; }
    var sig = siguientePregunta();
    return { msgs: [valor, sig], boton: null, ideas: CHIPS[E.espera] || [] };
  }
  function desvio(r) {
    var tema = r && ETIQUETA_TEMA[r.tema] ? ETIQUETA_TEMA[r.tema] : "";
    if (tema) E.temas.indexOf(tema) < 0 && E.temas.push(tema);
    if (E.intencion >= 2) return "Entiendo que querés el valor 😄 Para que Ovi te dé un precio real y no uno inventado, me falta muy poco.";
    return (tema ? "Para " + tema + " el" : "El") + " precio depende de lo que necesite tu negocio: no es lo mismo atender 10 consultas por día que 200. Arrancar es más accesible de lo que parece, pero antes de hablar de números prefiero conocerte un poco para decirte algo que te sirva.";
  }

  // decide qué contesta el robot y si ya corresponde pasar a WhatsApp
  function decidir(texto, b) {
    var t = sinTildes(texto);
    var r = b ? b.responder(texto) : null;
    var intencion = RX_PRECIO.test(t) || RX_CONTRATAR.test(t) || RX_HABLAR.test(t);
    // precio de herramientas o de la IA en general: no es un pedido de presupuesto
    if (intencion && r && (r.tema === "herramientas" || r.tema === "ia") && !RX_CONTRATAR.test(t) && !RX_HABLAR.test(t)) intencion = false;
    // 1) contesta una pregunta de diagnóstico
    if (E.espera && !intencion && !RX_PREGUNTA.test(t) && texto.length <= 90) return tomarDato(texto, b);
    // 2) precio, contratar o pedir el número: no se entrega de entrada
    if (intencion) {
      E.intencion++;
      if (r) recordarTema(r.tema);
      if (puedeCerrar()) return cerrar(false);
      return { msgs: [desvio(r), siguientePregunta()], boton: null, ideas: CHIPS[E.espera] || [] };
    }
    // 3) hay respuesta en el banco
    if (r) {
      // si ya contó su rubro, prefiere la respuesta pensada para ese rubro
      if (E.rubro && b) { var r2 = b.responder(texto + " para " + E.rubro); if (r2 && r2.tema === r.tema) r = r2; }
      recordarTema(r.tema);
      var texto2 = r.respuesta;
      // antes de que la persona esté calificada, el texto no manda a WhatsApp por su cuenta
      if (!E.calificado) texto2 = texto2.replace(/\s*[^.!?]*(escribile|escribirle|escribime|escribinos|Hablemos|por WhatsApp a Ovi)[^.!?]*[.!?]/g, "").trim() || r.respuesta;
      var msgs = [texto2];
      if (!E.preguntoRubro && !E.rubro && E.n >= 2) { E.preguntoRubro = true; E.espera = "rubro"; msgs.push("Por cierto, ¿de qué rubro es tu negocio? Así te doy ejemplos de lo tuyo."); }
      return { msgs: msgs, boton: (E.calificado && r.whatsapp) ? { texto: resumen(), etiqueta: "💬 Seguir con Ovi por WhatsApp" } : null,
        ideas: E.espera ? CHIPS[E.espera] : (r.sugeridas.length ? r.sugeridas : INICIALES) };
    }
    // 4) no la tiene anotada: primero conoce el negocio; si insiste o ya está calificado, la deriva
    E.sinRespuesta++; E.pregs.push(texto.slice(0, 120));
    if (E.calificado || datos() >= 2 || E.sinRespuesta >= 2) return cerrar(true);
    var base = (b ? "" : respuestaDeRespaldo(texto)) || "Esa no la tengo anotada 😅 Para pasársela bien armada a Ovi, contame un poco de tu negocio.";
    return { msgs: [base, siguientePregunta()], boton: null, ideas: CHIPS[E.espera] || [] };
  }

  function preguntar(texto) {
    texto = String(texto || "").replace(/\s+/g, " ").trim().slice(0, 300);
    if (!texto || ocupado) return;
    ocupado = true; ideas.hidden = true;
    burbuja("yo", texto); E.n++;
    var espera = pensando(), inicio = Date.now();
    cargarBanco().then(function (b) {
      var plan = decidir(texto, b);
      setTimeout(function () {
        espera.remove();
        decir(plan.msgs, function () {
          if (plan.boton) botonOvi(plan.boton.texto, plan.boton.etiqueta);
          sugerir(plan.ideas && plan.ideas.length ? plan.ideas : (E.espera ? CHIPS[E.espera] : INICIALES)); ocupado = false;
        });
      }, Math.max(0, 450 - (Date.now() - inicio)));
    });
  }
  burbuja("ia", "¡Hola! Soy el robot de OvIAmigo 🤖 ¿En qué te puedo ayudar?");
  sugerir(INICIALES);
  chatForm.addEventListener("submit", function (e) { e.preventDefault(); var v = chatIn.value; chatIn.value = ""; preguntar(v); });
  chatIn.addEventListener("focus", cargarBanco);

  /* ================= TU RUBRO ================= */
  var RUBROS = [
    { n: "🍔 Comida", f: "Gastronomía o comida", i: [["💬", "Pedidos por WhatsApp a cualquier hora", "Un asistente que pasa el menú, toma el pedido y te avisa."], ["📸", "Publicaciones de la semana", "Textos y portadas para tus platos, listos para subir."], ["🌐", "Menú online con botón de pedido", "Una página simple que se abre desde tu bio."]] },
    { n: "🩺 Salud", f: "Salud", i: [["📅", "Turnos online con recordatorio", "El paciente elige horario y recibe el aviso solo."], ["💬", "Respuestas a lo de siempre", "Horarios, ubicación y cómo agendar, sin que nadie atienda el teléfono."], ["📊", "Agenda ordenada", "Tu planilla de turnos conectada a tu calendario."]] },
    { n: "💅 Estética", f: "Estética", i: [["📅", "Reservas sin ida y vuelta", "Tus clientas eligen día y hora desde el celular."], ["🔔", "Recordatorios automáticos", "Menos turnos perdidos por olvidos."], ["🎬", "Reels de tus trabajos", "Edición y portadas para mostrar lo que hacés."]] },
    { n: "🏋️ Gimnasio", f: "Gimnasio", i: [["💬", "Precios y horarios al instante", "La consulta más repetida, respondida a cualquier hora."], ["🔔", "Avisos de clases y novedades", "Mensajes automáticos para tus socios."], ["🗓️", "Plan de contenido del mes", "Ideas y guiones para no quedarte sin publicar."]] },
    { n: "🎓 Instituto", f: "Instituto o academia", i: [["📝", "Inscripciones con formulario online", "Los datos llegan ordenados a una planilla."], ["💬", "Consultas sobre cursos", "Un asistente que explica cursos, horarios y requisitos."], ["🧑‍🏫", "Capacitación en IA para docentes", "Para preparar clases y materiales en menos tiempo."]] },
    { n: "🛍️ Tienda", f: "Tienda", i: [["🌐", "Catálogo web con botón de pedido", "Tus productos en una página fácil de compartir."], ["💬", "Asistente que responde precios", "Con la lista que vos le cargás y mantenés."], ["🖼️", "Fotos y videos de producto", "Miniaturas y reels que se entienden de un vistazo."]] },
    { n: "💼 Profesional", f: "Servicios profesionales", i: [["🌐", "Página con tus servicios", "Con formulario para que te lleguen consultas claras."], ["📅", "Agenda de reuniones", "El cliente reserva y te aparece en el calendario."], ["✍️", "Borradores en minutos", "Propuestas, correos y publicaciones para revisar y enviar."]] },
    { n: "🚀 Recién empiezo", f: "Emprendimiento nuevo", i: [["🔗", "Página de enlaces para tu bio", "Todo lo tuyo en un solo lugar desde el primer día."], ["💬", "WhatsApp Business bien configurado", "Catálogo, respuestas rápidas y mensaje de bienvenida."], ["🎨", "Imagen para tus redes", "Banner, foto de perfil y primeras publicaciones."]] }
  ];
  var rubrosBox = $("rubros"), ideasBox = $("ideas");
  function verRubro(k) {
    [].forEach.call(rubrosBox.children, function (b, i) { b.setAttribute("aria-selected", i === k ? "true" : "false"); });
    ideasBox.innerHTML = "";
    RUBROS[k].i.forEach(function (it) {
      var c = crear("div", "idea-c"), d = crear("div");
      c.appendChild(crear("span", "", it[0])); d.appendChild(crear("strong", "", it[1])); d.appendChild(crear("p", "", it[2])); c.appendChild(d); ideasBox.appendChild(c);
    });
    var pie = crear("div", "ideas-pie"), b = crear("button", "btn", "Quiero algo así para mi negocio"); b.type = "button";
    b.addEventListener("click", function () {
      $("f-negocio").value = RUBROS[k].f;
      var m = $("f-msg"); if (!m.value.trim()) m.value = "Me interesa: " + RUBROS[k].i.map(function (x) { return x[1].toLowerCase(); }).join(", ") + ".";
      abrirForm();
    });
    pie.appendChild(b); ideasBox.appendChild(pie);
  }
  RUBROS.forEach(function (r, k) {
    var b = crear("button", "rub", r.n); b.type = "button"; b.setAttribute("role", "tab");
    b.addEventListener("click", function () { verRubro(k); }); rubrosBox.appendChild(b);
  });
  verRubro(0);

  /* ================= LO QUE ELIGIÓ (viene de la página de servicios) ================= */
  var elegidos = [];
  function pintarElegidos() {
    var caja = $("elegidos"), k = elegidos.length;
    caja.hidden = !k; caja.innerHTML = "";
    if (k) { caja.appendChild(document.createTextNode("Te interesa:")); caja.appendChild(crear("span", "", elegidos.join(", "))); }
  }
  function elegir(nombre) { if (nombre && elegidos.indexOf(nombre) < 0) { elegidos.push(nombre); pintarElegidos(); } }

  /* ================= VENTANAS: EL CHAT Y EL FORMULARIO ================= */
  var vChat = $("v-chat"), vForm = $("hablemos"), vPop = $("v-pop");
  var teclado = !!(window.matchMedia && window.matchMedia("(pointer: fine)").matches);
  function abrirVentana(v) {
    [vChat, vForm, vPop].forEach(function (x) { if (x !== v && x.open) x.close(); });
    if (!v.open) { if (v.showModal) v.showModal(); else v.setAttribute("open", ""); }
    document.documentElement.classList.add("con-ventana");
  }
  function abrirChat() { abrirVentana(vChat); cargarBanco(); if (teclado) setTimeout(function () { chatIn.focus({ preventScroll: true }); }, 80); }
  function abrirForm() { abrirVentana(vForm); if (teclado) setTimeout(function () { $("f-nombre").focus({ preventScroll: true }); }, 80); }
  [vChat, vForm, vPop].forEach(function (v) {
    v.addEventListener("close", function () { if (!vChat.open && !vForm.open && !vPop.open) document.documentElement.classList.remove("con-ventana"); });
    v.addEventListener("click", function (e) { if (e.target === v) v.close(); });   // tocar afuera cierra
  });
  [].forEach.call(document.querySelectorAll("[data-cerrar]"), function (b) { b.addEventListener("click", function () { b.closest("dialog").close(); }); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("[data-abrir]") : null;
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault(); if (a.getAttribute("data-abrir") === "chat") abrirChat(); else abrirForm();
  });
  [].forEach.call(document.querySelectorAll("[data-abrir=chat]"), function (a) {
    ["pointerenter", "touchstart"].forEach(function (ev) { a.addEventListener(ev, cargarBanco, { passive: true, once: true }); });
  });
  /* ================= LOS 4 STICKERS DEL AVATAR: botones que abren acciones ================= */
  var CHISTES = [
    "Le dije a la IA: “hacé que mi negocio venda solo”. Me respondió: “primero contame qué vendés”. Ahí entendí que la IA no hace magia: pregunta.",
    "Mi asistente de WhatsApp contestó “Buen día” a las 3 de la mañana. El único empleado que nunca pide aumento.",
    "Prompt: “hacé una página web”. La IA: “¿de qué?”. Yo: “de lo mío”. La IA: “eso no alcanza, campeón”.",
    "Hay dos tipos de negocios: los que responden el WhatsApp rápido y los que dicen “ya te contesto” tres días después.",
    "La IA no te va a quitar el trabajo. Alguien que sepa usarla, quizás. Por eso estás acá.",
    "Pedirle a la IA que invente datos es como pedirle al GPS que invente calles: llegás, pero no sabés adónde.",
    "Mi regla: si una promesa de IA suena demasiado linda, probablemente sea humo con buen diseño.",
    "Lo único que se automatiza con “ganá plata con IA sin hacer nada” es el desengaño."
  ];
  var chisteN = Math.floor(Math.random() * CHISTES.length);
  var popBox = $("pop-cuerpo");
  function popBoton(txt, fn, clase) { var b = crear("button", "btn" + (clase ? " " + clase : ""), txt); b.type = "button"; b.addEventListener("click", fn); return b; }
  function popEnlace(txt, href, clase, nueva) { var a = crear("a", "btn" + (clase ? " " + clase : ""), txt); a.href = href; if (nueva) { a.target = "_blank"; a.rel = "noopener"; } return a; }
  function irA(id) { vPop.close(); setTimeout(function () { var e = $(id); if (e) e.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }, 60); }
  function preguntarAlRobot(q) { abrirChat(); setTimeout(function () { preguntar(q); }, 350); }
  var PEG = {
    humo: function (c, acc) {
      c.appendChild(crear("h2", "pop-t", "🚭 Sin humo"));
      c.appendChild(crear("p", "pop-p", "No te prometo ventas mágicas ni una “IA que lo hace todo”. Te digo qué sirve, qué no y cuánto cuesta antes de empezar."));
      var ul = crear("ul", "pop-lista");
      ["Si la IA no es para tu caso, te lo digo.", "Precio claro antes de empezar, sin letra chica.", "Lo probamos con casos reales antes de encenderlo."].forEach(function (t) { ul.appendChild(crear("li", "", t)); });
      c.appendChild(ul);
      acc.appendChild(popBoton("🤖 Preguntale al robot: ¿me sirve la IA?", function () { vPop.close(); preguntarAlRobot("¿Me sirve la IA para mi negocio?"); }, "rosa"));
      acc.appendChild(popEnlace("Ver todos mis servicios", "servicios.html", "fantasma"));
    },
    humor: function (c, acc) {
      c.appendChild(crear("h2", "pop-t", "😄 Con humor"));
      c.appendChild(crear("p", "pop-p", "Aprender IA no tiene por qué ser aburrido. Uno por vez:"));
      var ch = crear("blockquote", "pop-chiste"); c.appendChild(ch);
      function poner() { ch.textContent = CHISTES[chisteN % CHISTES.length]; ch.classList.remove("pop-chiste-nuevo"); void ch.offsetWidth; ch.classList.add("pop-chiste-nuevo"); }
      poner();
      acc.appendChild(popBoton("🎲 Otro chiste", function () { chisteN++; poner(); efecto(popBox, "fiesta", 14); }, "rosa"));
      if (OVI.redes && OVI.redes.instagram && OVI.redes.instagram.url) acc.appendChild(popEnlace("▶ Ver mis videos", OVI.redes.instagram.url, "fantasma", true));
    },
    pymes: function (c, acc) {
      c.appendChild(crear("h2", "pop-t", "💼 Para pymes"));
      c.appendChild(crear("p", "pop-p", "Pensado para negocios que recién empiezan y quieren resolver lo de todos los días. Tocá el tuyo y te muestro tres ideas:"));
      var fila = crear("div", "pop-chips");
      RUBROS.forEach(function (r, k) {
        fila.appendChild(popBoton(r.n, function () { verRubro(k); irA("rubro"); }, "chip"));
      });
      c.appendChild(fila);
      acc.appendChild(popBoton("✍️ Quiero algo para mi negocio", function () { abrirForm(); }, "rosa"));
    },
    video: function (c, acc) {
      c.appendChild(crear("h2", "pop-t", "🗓️ Un video por día"));
      c.appendChild(crear("p", "pop-p", "Trucos, pruebas y metidas de pata con IA, en menos de un minuto. Todos los días, para que aprendas sin darte cuenta."));
      [["youtube", "YouTube"], ["tiktok", "TikTok"], ["instagram", "Instagram"]].forEach(function (r) {
        if (OVI.redes && OVI.redes[r[0]] && OVI.redes[r[0]].url) acc.appendChild(popEnlace(r[1], OVI.redes[r[0]].url, "fantasma", true));
      });
    }
  };
  [].forEach.call(document.querySelectorAll("[data-peg]"), function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      b.classList.remove("tocada"); void b.offsetWidth; b.classList.add("tocada");
      popBox.innerHTML = ""; var acc = crear("div", "pop-acciones");
      PEG[b.getAttribute("data-peg")](popBox, acc); popBox.appendChild(acc);
      efecto($("hero-foto"), "fiesta", 10);
      abrirVentana(vPop);
    });
    b.addEventListener("animationend", function (e) { if (e.animationName === "pegar") b.classList.remove("tocada"); });
  });
  // el robot de al lado del avatar cambia de frase para llamar la atención
  (function () {
    var bu = $("rl-burbuja"); if (!bu || reduce) return;
    var fr = ["¿Dudas? Preguntame 👋", "¿Cuánto cuesta una web?", "¿Me sirve la IA?", "¿Querés una web?"], i = 0;
    setInterval(function () { if (document.hidden) return; i = (i + 1) % fr.length; bu.classList.remove("rl-cambia"); void bu.offsetWidth; bu.textContent = fr[i]; bu.classList.add("rl-cambia"); }, 4200);
  })();

  // llegar con #chat, #hablemos o ?quiero=Servicio (desde la página de servicios)
  (function () {
    var q = ""; try { q = new URLSearchParams(location.search).get("quiero") || ""; } catch (e) {}
    if (q) { q.split("|").forEach(elegir); if (history.replaceState) history.replaceState(null, "", location.pathname + "#hablemos"); }
    if (q || location.hash === "#hablemos") setTimeout(abrirForm, 120);
    else if (location.hash === "#chat") setTimeout(abrirChat, 120);
  })();

  /* ================= FORMULARIO ================= */
  var formu = $("formu"), fErr = $("f-error"), fBtn = $("f-enviar"), selPais = $("f-pais"), verPais = $("pais-ver"), telIn = $("f-tel");
  function bandera(iso) { return iso.length === 2 ? String.fromCodePoint(127397 + iso.charCodeAt(0), 127397 + iso.charCodeAt(1)) : "🌎"; }
  PAISES.forEach(function (p, i) {
    var o = crear("option", "", p[1] + (p[2] ? " (+" + p[2] + ")" : "")); o.value = i;
    if (p[0] === PAIS_INICIAL) o.selected = true;
    selPais.appendChild(o);
  });
  function pintarPais() {
    var p = PAISES[selPais.value];
    verPais.textContent = bandera(p[0]) + " " + (p[2] ? "+" + p[2] : "otro");
    telIn.placeholder = p[0] === "PY" ? "981 123 456" : p[2] ? "Tu número, sin el código" : "Código de país y número";
  }
  selPais.addEventListener("change", function () { pintarPais(); fErr.hidden = true; });
  pintarPais();
  // Devuelve el número completo con código de país (solo dígitos) o "" si no parece válido.
  function telefono() {
    var p = PAISES[selPais.value], crudo = telIn.value.trim(), d = crudo.replace(/\D/g, "");
    if (!p[2] || crudo.charAt(0) === "+") return d.length >= 8 && d.length <= 15 ? d : "";   // "otro país" o número pegado con +código
    d = d.replace(/^0+/, "");
    if (p[0] === "PY") { if (d.indexOf("595") === 0 && d.length === 12) d = d.slice(3); return d.length === 9 && d.charAt(0) === "9" ? "595" + d : ""; }
    return d.length >= 6 && d.length <= 13 ? p[2] + d : "";
  }
  function error(txt, campo) { fErr.textContent = txt; fErr.hidden = false; if (campo) campo.focus(); }
  formu.addEventListener("submit", function (e) {
    e.preventDefault(); fErr.hidden = true;
    if ($("f-miel").value) return;
    var nombre = $("f-nombre").value.trim(), tel = telefono(), pais = PAISES[selPais.value];
    if (nombre.length < 2) return error("Escribí tu nombre para saber cómo llamarte.", $("f-nombre"));
    if (!tel) return error(pais[0] === "PY" ? "Revisá el número: tiene que ser un celular de Paraguay, por ejemplo 981 123 456."
      : pais[2] ? "Revisá el número: escribilo sin el código de país (+" + pais[2] + " ya está elegido)." : "Escribí tu número completo, con el código de país. Por ejemplo: +34 612 345 678.", telIn);
    if (!OVI.correo) return error("El formulario todavía no tiene un correo configurado.");
    var datos = {
      _subject: "Pedido desde oviamigo.com: " + nombre, _template: "table", _captcha: "false",
      Nombre: nombre, "País": pais[2] ? pais[1] : "Otro (ver el número)", WhatsApp: "+" + tel, Escribirle: "https://wa.me/" + tel, Negocio: $("f-negocio").value,
      "Quiere resolver": $("f-msg").value.trim() || "(no escribió)", "Le interesa": elegidos.join(", ") || "(no eligió servicios)", Origen: location.hostname
    };
    fBtn.disabled = true; fBtn.textContent = "Enviando…";
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(OVI.correo), {
      method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify(datos)
    }).then(function (r) { return r.json().then(function (d) { if (!r.ok || String(d.success) === "false") throw 0; }); })
      .then(function () { formu.hidden = true; $("gracias").hidden = false; })
      .catch(function () { error("No se pudo enviar. Revisá tu conexión y tocá de nuevo “Enviar mis datos”."); })
      .finally(function () { fBtn.disabled = false; fBtn.textContent = "Enviar mis datos"; });
  });

  /* ================= CONSOLA QUE ESCRIBE SOLA ================= */
  (function () {
    var el = $("tipeo"); if (!el || reduce) return;
    var frases = ["armar tu página web", "editar tus videos", "atender tu WhatsApp con IA", "ordenar tus turnos", "diseñar tus portadas", "capacitar a tu equipo", "conseguir tu dominio y correo", "preparar tus informes con IA"];
    var f = 0, i = frases[0].length, borrando = true;
    function tic() {
      var t = frases[f];
      if (borrando) {
        i -= 2;
        if (i <= 0) { i = 0; el.textContent = ""; borrando = false; f = (f + 1) % frases.length; return setTimeout(tic, 320); }
        el.textContent = t.slice(0, i); return setTimeout(tic, 24);
      }
      i++; el.textContent = t.slice(0, i);
      if (i >= t.length) { borrando = true; return setTimeout(tic, 1900); }
      setTimeout(tic, 46);
    }
    setTimeout(tic, 2600);
  })();

  /* ================= RED DE PUNTOS DEL INICIO ================= */
  (function () {
    var cv = $("red"); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d"), hero = cv.parentNode, W = 0, H = 0, nodos = [], puntero = null, visible = true, corriendo = false, LEJOS = 140;
    function medir() {
      var r = hero.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var cant = Math.max(22, Math.min(64, Math.round(W * H / 16000)));
      while (nodos.length < cant) nodos.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38, r: 1.6 + Math.random() * 2 });
      nodos.length = cant;
    }
    function cuadro() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d;
      for (i = 0; i < nodos.length; i++) {
        a = nodos[i]; a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
        a.x = Math.max(0, Math.min(W, a.x)); a.y = Math.max(0, Math.min(H, a.y));
      }
      ctx.lineWidth = 1.2;
      for (i = 0; i < nodos.length; i++) for (j = i + 1; j < nodos.length; j++) {
        a = nodos[i]; b = nodos[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < LEJOS) { ctx.strokeStyle = "rgba(19,22,27," + ((1 - d / LEJOS) * .24).toFixed(3) + ")"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      if (puntero) {
        ctx.lineWidth = 1.6;
        for (i = 0; i < nodos.length; i++) {
          a = nodos[i]; dx = a.x - puntero.x; dy = a.y - puntero.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < 190) { ctx.strokeStyle = "rgba(255,77,141," + ((1 - d / 190) * .8).toFixed(3) + ")"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(puntero.x, puntero.y); ctx.stroke(); }
        }
      }
      ctx.fillStyle = "rgba(19,22,27,.42)";
      for (i = 0; i < nodos.length; i++) { a = nodos[i]; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill(); }
      if (visible && !reduce && !document.hidden) requestAnimationFrame(cuadro); else corriendo = false;
    }
    function arrancar() { if (!corriendo) { corriendo = true; requestAnimationFrame(cuadro); } }
    medir(); arrancar();
    var espera; window.addEventListener("resize", function () { clearTimeout(espera); espera = setTimeout(function () { medir(); arrancar(); }, 150); });
    document.addEventListener("visibilitychange", function () { if (!document.hidden && visible) arrancar(); });
    hero.addEventListener("pointermove", function (e) { var r = hero.getBoundingClientRect(); puntero = { x: e.clientX - r.left, y: e.clientY - r.top }; }, { passive: true });
    hero.addEventListener("pointerleave", function () { puntero = null; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) arrancar(); }).observe(hero);
  })();

  /* ================= BARRA DE AVANCE ================= */
  (function () {
    var barraAvance = $("progreso"); if (!barraAvance) return;
    var pedido = false;
    function pintar() { pedido = false; var alto = document.documentElement.scrollHeight - window.innerHeight; barraAvance.style.transform = "scaleX(" + (alto > 0 ? Math.min(1, window.scrollY / alto) : 0).toFixed(4) + ")"; }
    window.addEventListener("scroll", function () { if (!pedido) { pedido = true; requestAnimationFrame(pintar); } }, { passive: true });
    pintar();
  })();

  /* tocar la foto de Ovi tira papelitos */
  (function () {
    var foto = $("hero-foto"); if (!foto) return;
    foto.addEventListener("click", function () { efecto(foto, "fiesta", 24); });
  })();

})();
