/* OvIAmigo · comportamiento de la página. Los datos editables están en config.js */
(function () {
  "use strict";
  var OVI = window.OVI || {};
  // si faltara config.js, la página igual muestra las redes
  OVI.redes = OVI.redes || {
    instagram: { url: "https://www.instagram.com/oviamigo", usuario: "@oviamigo" }, tiktok: { url: "https://www.tiktok.com/@oviamigo", usuario: "@oviamigo" },
    youtube: { url: "https://www.youtube.com/@oviamigo", usuario: "@oviamigo" }, x: { url: "https://x.com/oviamigoo", usuario: "@oviamigoo" }
  };
  if (!("correo" in OVI)) OVI.correo = "armoaalen@gmail.com";
  var $ = function (id) { return document.getElementById(id); };
  var crear = function (tag, clase, texto) { var e = document.createElement(tag); if (clase) e.className = clase; if (texto != null) e.textContent = texto; return e; };
  var guaranies = function (n) { return "₲ " + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
  var sinTildes = function (t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };

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
  REDES.forEach(function (r) {
    var a = crear("a", "red " + r.id);
    a.href = OVI.redes[r.id].url; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = '<span class="red-logo">' + icono(r.id) + "</span><strong></strong><em></em><span></span>";
    a.querySelector("strong").textContent = r.nombre;
    a.querySelector("em").textContent = OVI.redes[r.id].usuario;
    a.lastChild.textContent = r.detalle;
    $("tarjetas").appendChild(a);
  });

  /* ================= CHAT ================= */
  var log = $("chat-log"), ideas = $("chat-ideas"), chatForm = $("chat-form"), chatIn = $("chat-in");
  var historial = [], ocupado = false, iaDisponible = OVI.chatConIA !== false, preguntas = 0, MAX_PREGUNTAS = 20;

  var RESPUESTAS = [
    [/impuesto|ruc|factur|\biva\b|tribut|dnit|contab/, "De impuestos y facturación no opino: eso se consulta con un contador de confianza. Lo mío es la IA aplicada a tu negocio 🤖"],
    [/precio|cuesta|cuanto|costo|sale|cobr|presupuesto|tarifa/, "Depende de lo que necesites, y no te voy a inventar un número 😅 Dejá tus datos en la sección “Hablemos” y Ovi te pasa el precio después de conocer tu caso."],
    [/whatsapp|wasap|wsp|responder|atender|mensaje|consulta/, "Se puede conectar tu WhatsApp Business a una IA que responde las preguntas de siempre (precios, horarios, cómo comprar) a cualquier hora. Lo difícil te lo pasa a vos. Sin humo: hay que configurarla bien y revisarla."],
    [/reemplaz|sin trabajo|despid|empleo|quitar|sacar el trabajo/, "La IA no viene a sacarte el trabajo: viene a sacarte lo repetitivo. Responder lo mismo veinte veces, armar borradores, ordenar planillas. Lo que sigue siendo tuyo: conocer a tu cliente y decidir."],
    [/web|pagina|sitio|enlace|turno|reserva/, "Ovi arma páginas para negocios, páginas de enlaces como la de su bio, y sistemas de turnos o reservas online. Contale qué necesitás en “Hablemos” y te dice qué te conviene."],
    [/video|reel|contenido|redes|instagram|tiktok|youtube|guion|miniatura/, "Con IA se puede acelerar mucho el contenido: guiones, edición, miniaturas y el plan del mes. Ovi lo hace para su propia marca todos los días, podés ver cómo queda en sus redes 👇"],
    [/capacit|aprend|curso|ensen|taller|equipo/, "Ovi da capacitaciones de IA para equipos, con ejemplos de tu propio negocio y sin tecnicismos. También podés aprender gratis con un video por día en sus redes."],
    [/que es|como funciona|chatgpt|claude|gemini|inteligencia artificial/, "La IA de la que todos hablan es un programa que aprendió a escribir leyendo muchísimo texto. Redacta, resume y responde muy bien, pero a veces inventa cosas con total seguridad. Por eso se usa con criterio."],
    [/humano|persona|contact|hablar con|llamar|contratar|ovi\b/, "Para hablar con Ovi, dejá tus datos en la sección “Hablemos” de esta página. Él te escribe a tu WhatsApp."],
    [/servicio|que puede|que hace|ayud|negocio|empresa|pyme/, "En corto: páginas web, contenido para redes, WhatsApp atendido por IA y capacitación. Mirá la sección de servicios, tocá lo que te interese y Ovi te escribe."],
    [/hola|buenas|buen dia|que tal/, "¡Hola! 👋 Preguntame lo que quieras sobre IA para tu negocio."],
    [/gracias|genial|buenisimo/, "¡De nada! Si querés seguir aprendiendo, hay un video nuevo por día en las redes de OvIAmigo 🙌"]
  ];
  function respuestaLocal(texto) {
    var t = sinTildes(texto);
    for (var i = 0; i < RESPUESTAS.length; i++) if (RESPUESTAS[i][0].test(t)) return RESPUESTAS[i][1];
    return "Esa prefiero no inventártela 😅 Dejá tu pregunta en la sección “Hablemos” y Ovi te la responde en persona.";
  }

  function burbuja(quien, texto) {
    var b = crear("div", "burbuja " + quien, texto);
    log.appendChild(b); log.scrollTop = log.scrollHeight; return b;
  }
  function pensando() {
    var b = crear("div", "burbuja ia pensando"); b.innerHTML = "<i></i><i></i><i></i>"; b.setAttribute("aria-label", "Escribiendo");
    log.appendChild(b); log.scrollTop = log.scrollHeight; return b;
  }
  function pedirIA() {
    var corte = new AbortController(), reloj = setTimeout(function () { corte.abort(); }, 20000);
    return fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: historial }), signal: corte.signal })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, estado: r.status, d: d }; }); })
      .finally(function () { clearTimeout(reloj); });
  }
  function preguntar(texto) {
    texto = String(texto || "").trim();
    if (!texto || ocupado) return;
    ideas.hidden = true;
    burbuja("yo", texto);
    if (++preguntas > MAX_PREGUNTAS) { burbuja("ia", "Ya charlamos un montón 😄 Para seguir, dejale tus datos a Ovi en “Hablemos”."); return; }
    historial.push({ role: "user", content: texto });
    ocupado = true;
    var espera = pensando(), inicio = Date.now();
    var responder = function (r) {
      var falta = Math.max(0, 600 - (Date.now() - inicio));
      setTimeout(function () {
        espera.remove(); burbuja("ia", r); historial.push({ role: "assistant", content: r });
        if (historial.length > 12) historial = historial.slice(-12);
        ocupado = false;
      }, falta);
    };
    if (!iaDisponible) { responder(respuestaLocal(texto)); return; }
    pedirIA().then(function (res) {
      if (res.ok && res.d && res.d.reply) { responder(res.d.reply); return; }
      if (res.estado === 429) { responder("Por hoy ya llegamos al tope de mensajes 😅 Dejale tus datos a Ovi en “Hablemos” y seguimos por ahí."); return; }
      iaDisponible = false; responder(respuestaLocal(texto));
    }).catch(function () { iaDisponible = false; responder(respuestaLocal(texto)); });
  }
  burbuja("ia", "¡Hola! Soy la IA de OvIAmigo 🤖 Preguntame lo que quieras sobre IA para tu negocio.");
  ["¿Qué puede hacer la IA por mi negocio?", "¿Me va a dejar sin trabajo?", "¿Cómo atiendo WhatsApp con IA?", "¿Cuánto cuesta?"].forEach(function (t) {
    var b = crear("button", "idea", t); b.type = "button";
    b.addEventListener("click", function () { preguntar(t); });
    ideas.appendChild(b);
  });
  chatForm.addEventListener("submit", function (e) { e.preventDefault(); var v = chatIn.value; chatIn.value = ""; preguntar(v); });

  /* ================= DETECTOR DE HUMO ================= */
  var FRASES = [
    { t: "La IA va a manejar tu negocio sola mientras vos dormís", humo: true, p: "Puede responder consultas a las 3 de la mañana, pero alguien tiene que configurarla, revisarla y tomar las decisiones. Ese alguien sos vos." },
    { t: "Un asistente con IA puede responder el WhatsApp de tu negocio a cualquier hora", humo: false, p: "Conectado a WhatsApp Business contesta las preguntas de siempre: precios, horarios, cómo comprar. Lo complicado te lo pasa a vos." },
    { t: "Con este prompt secreto vas a ganar millones en una semana", humo: true, p: "No hay frase mágica. La IA te ahorra tiempo en tareas concretas; la plata la sigue trayendo tu producto y tu trabajo." },
    { t: "La IA a veces inventa datos y los dice con total seguridad", humo: false, p: "Pasa, y tiene nombre: alucinación. Por eso todo lo que escribe se revisa, sobre todo precios, fechas y números." },
    { t: "Para usar IA en tu negocio necesitás saber programar", humo: true, p: "La mayoría de las herramientas se usan escribiendo en castellano, como en un chat. Programar ayuda, pero no es requisito." },
    { t: "La IA puede armar en minutos el borrador de tus publicaciones del mes", humo: false, p: "Un borrador, sí. Después le ponés tu voz y corregís lo que no suena a vos. Sin ese paso, se nota que lo escribió un robot." },
    { t: "La IA conoce tu negocio mejor que vos", humo: true, p: "Solo sabe lo que le contás. Si no le das tus precios, tu horario y tu forma de atender, responde generalidades." },
    { t: "Empezar a usar IA cuesta una fortuna", humo: true, p: "Varias herramientas tienen plan gratis y los pagos arrancan en pocos dólares por mes. Lo caro es usarla mal y no darse cuenta." }
  ];
  var juego = $("juego"), fin = $("final"), puntos = $("puntos"), frase = $("frase"), veredicto = $("veredicto"), sello = $("sello"), porque = $("porque");
  var botones = $("juego-botones"), sig = $("siguiente"), n = 0, aciertos = 0, marcas = [];
  FRASES.forEach(function () { puntos.appendChild(crear("i")); });

  function pintarPuntos() { [].forEach.call(puntos.children, function (p, i) { p.className = marcas[i] || (i === n ? "ahora" : ""); }); }
  function mostrar() {
    frase.textContent = FRASES[n].t; veredicto.hidden = true; botones.hidden = false; sig.hidden = true; pintarPuntos();
  }
  function responder(dijoHumo) {
    var f = FRASES[n], bien = dijoHumo === f.humo;
    if (bien) aciertos++;
    marcas[n] = bien ? "ok" : "mal";
    sello.className = "sello " + (f.humo ? "es-humo" : "es-real"); sello.textContent = f.humo ? "¡Humo!" : "Real";
    porque.innerHTML = ""; porque.appendChild(crear("span", "acierto", bien ? "Acertaste 👏" : "Te la vendieron 😅")); porque.appendChild(document.createTextNode(f.p));
    veredicto.hidden = false; botones.hidden = true; sig.hidden = false;
    sig.textContent = n === FRASES.length - 1 ? "Ver mi resultado" : "Siguiente frase";
    pintarPuntos(); sig.focus({ preventScroll: true });
  }
  function resultado() {
    var total = FRASES.length;
    $("final-num").textContent = aciertos + " de " + total;
    $("final-txt").textContent = aciertos === total ? "Detector de humo certificado 🏅 A vos no te venden nada."
      : aciertos >= total - 2 ? "Muy buen olfato 👃 Casi no te la venden."
      : aciertos >= total / 2 ? "Vas bien, pero algún humo te entró 💨"
      : "Te vendieron bastante humo 😅 Tranqui, para eso estoy.";
    juego.hidden = true; fin.hidden = false;
  }
  botones.addEventListener("click", function (e) { var b = e.target.closest("[data-resp]"); if (b) responder(b.getAttribute("data-resp") === "humo"); });
  sig.addEventListener("click", function () { if (++n >= FRASES.length) resultado(); else mostrar(); });
  $("otra").addEventListener("click", function () { n = 0; aciertos = 0; marcas = []; fin.hidden = true; juego.hidden = false; mostrar(); });
  $("compartir").addEventListener("click", function () {
    var btn = this, url = location.origin + location.pathname + "#detector";
    var texto = "Saqué " + aciertos + "/" + FRASES.length + " en el detector de humo de OvIAmigo. ¿Y vos, distinguís el humo de la IA real?";
    if (navigator.share) { navigator.share({ title: "Detector de humo", text: texto, url: url }).catch(function () {}); return; }
    var listo = function () { btn.textContent = "Enlace copiado ✓"; setTimeout(function () { btn.textContent = "Compartir mi resultado"; }, 2500); };
    if (navigator.clipboard) navigator.clipboard.writeText(texto + " " + url).then(listo, function () {});
  });
  mostrar();

  /* ================= VIDEOS ================= */
  var tira = $("tira");
  function cerrarVideos() {
    tira.querySelectorAll("iframe").forEach(function (f) { var m = f.parentNode; f.remove(); m.querySelector("img").hidden = false; m.querySelector(".play").hidden = false; });
  }
  function pintarVideos(lista) {
    tira.innerHTML = "";
    if (!lista.length) {
      var aviso = crear("p", "sin-videos", "No pude traer los videos en este momento. Están todos en mi canal de YouTube, a un toque de distancia 👇");
      tira.appendChild(aviso); return;
    }
    lista.forEach(function (v) {
      var caja = crear("div", "corto"), marco = crear("button", "corto-marco");
      marco.type = "button"; marco.setAttribute("aria-label", "Ver el video: " + (v.titulo || "Short de OvIAmigo"));
      var img = new Image(); img.loading = "lazy"; img.alt = "";
      img.src = "https://i.ytimg.com/vi/" + v.id + "/oardefault.jpg";
      img.onerror = function () { img.onerror = null; img.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg"; };
      marco.appendChild(img); marco.appendChild(crear("span", "play", "▶"));
      marco.addEventListener("click", function () {
        if (marco.querySelector("iframe")) return;
        cerrarVideos();
        var f = crear("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&playsinline=1&rel=0";
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true; f.title = v.titulo || "Video de OvIAmigo";
        img.hidden = true; marco.querySelector(".play").hidden = true; marco.appendChild(f);
      });
      caja.appendChild(marco);
      if (v.titulo) caja.appendChild(crear("p", "", v.titulo));
      tira.appendChild(caja);
    });
  }
  for (var k = 0; k < 4; k++) { var hueco = crear("div", "corto vacio"); hueco.appendChild(crear("div", "corto-marco")); tira.appendChild(hueco); }
  var manuales = (OVI.videos || []).filter(function (id) { return /^[\w-]{11}$/.test(id); }).map(function (id) { return { id: id, titulo: "" }; });
  fetch("/api/videos").then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (d) { var l = (d && d.videos) || []; pintarVideos(l.length ? l : manuales); })
    .catch(function () { pintarVideos(manuales); });

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
      $("hablemos").scrollIntoView(); setTimeout(function () { $("f-nombre").focus({ preventScroll: true }); }, 500);
    });
    pie.appendChild(b); ideasBox.appendChild(pie);
  }
  RUBROS.forEach(function (r, k) {
    var b = crear("button", "rub", r.n); b.type = "button"; b.setAttribute("role", "tab");
    b.addEventListener("click", function () { verRubro(k); }); rubrosBox.appendChild(b);
  });
  verRubro(0);

  /* ================= LA CUENTA ================= */
  var cP = $("c-pierde"), cV = $("c-venta"), cD = $("c-dias"), cuentaTxt = "";
  function calcular() {
    var p = +cP.value, v = +cV.value, d = +cD.value, mes = p * v * d;
    $("o-pierde").textContent = p; $("o-venta").textContent = guaranies(v); $("o-dias").textContent = d;
    $("c-total").textContent = guaranies(mes); $("c-anio").textContent = guaranies(mes * 12) + " en un año";
    cuentaTxt = "Hice la cuenta: se me escapan " + p + (p === 1 ? " consulta" : " consultas") + " por día y pierdo " + guaranies(mes) + " al mes.";
  }
  [cP, cV, cD].forEach(function (c) { c.addEventListener("input", calcular); });
  calcular();
  $("c-quiero").addEventListener("click", function () {
    var m = $("f-msg");
    if (!m.value.trim() || m.value.indexOf("Hice la cuenta:") === 0) m.value = cuentaTxt;
    elegir("💬 WhatsApp Business bien configurado", true); elegir("🤖 Asistente con IA para WhatsApp", true);
    $("hablemos").scrollIntoView(); setTimeout(function () { $("f-nombre").focus({ preventScroll: true }); }, 500);
  });

  /* ================= SERVICIOS ================= */
  var SERVICIOS = [
    { g: "Web y presencia", items: ["🌐 Página web para tu negocio", "🔗 Página de enlaces para tu bio", "📅 Turnos y reservas online", "🧮 Calculadoras y formularios interactivos"] },
    { g: "Contenido para redes", items: ["🎬 Edición de videos y reels", "🖼️ Miniaturas y portadas", "🎨 Banners y fotos de perfil", "✍️ Guiones y textos para tus videos", "🗓️ Plan de contenido del mes"] },
    { g: "WhatsApp e IA", items: ["💬 WhatsApp Business bien configurado", "🤖 Asistente con IA para WhatsApp", "🔔 Avisos automáticos de pedidos y turnos", "📊 Planilla de clientes conectada a tu calendario"] },
    { g: "Aprender y usar", items: ["🧑‍🏫 Capacitación en IA para tu equipo", "📦 Plantillas y sistemas listos para usar"] }
  ];
  var elegidos = [], chips = {}, barra = crear("div", "barra-elegidos"), barraBtn = crear("a", "btn");
  barraBtn.href = "#hablemos"; barra.appendChild(barraBtn); barra.hidden = true; document.body.appendChild(barra);
  var enServicios = false;
  function pintarElegidos() {
    var caja = $("elegidos"), k = elegidos.length;
    caja.hidden = !k; caja.innerHTML = "";
    if (k) { caja.appendChild(document.createTextNode("Te interesa:")); caja.appendChild(crear("span", "", elegidos.join(", "))); }
    barraBtn.textContent = "Pedir info de " + k + (k === 1 ? " servicio" : " servicios");
    barra.hidden = !(k && enServicios);
  }
  function elegir(nombre, valor) {
    var i = elegidos.indexOf(nombre), poner = valor == null ? i < 0 : valor;
    if (poner && i < 0) elegidos.push(nombre); if (!poner && i > -1) elegidos.splice(i, 1);
    if (chips[nombre]) chips[nombre].setAttribute("aria-pressed", poner ? "true" : "false");
    pintarElegidos();
  }
  SERVICIOS.forEach(function (grp) {
    var caja = crear("div", "grupo"), fila = crear("div");
    caja.appendChild(crear("h3", "", grp.g));
    grp.items.forEach(function (it) {
      var b = crear("button", "serv", it); b.type = "button"; b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { elegir(it); });
      chips[it] = b; fila.appendChild(b);
    });
    caja.appendChild(fila); $("grupos").appendChild(caja);
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { enServicios = es[0].isIntersecting; pintarElegidos(); }, { rootMargin: "-25% 0px -25% 0px" }).observe($("servicios"));
  }

  /* ================= FORMULARIO ================= */
  var formu = $("formu"), fErr = $("f-error"), fBtn = $("f-enviar");
  function telefonoPY(v) {
    var d = String(v).replace(/\D/g, "");
    if (d.indexOf("595") === 0) d = d.slice(3);
    if (d.charAt(0) === "0") d = d.slice(1);
    return d.length === 9 && d.charAt(0) === "9" ? "595" + d : "";
  }
  function error(txt, campo) { fErr.textContent = txt; fErr.hidden = false; if (campo) campo.focus(); }
  formu.addEventListener("submit", function (e) {
    e.preventDefault(); fErr.hidden = true;
    if ($("f-miel").value) return;
    var nombre = $("f-nombre").value.trim(), tel = telefonoPY($("f-tel").value);
    if (nombre.length < 2) return error("Escribí tu nombre para saber cómo llamarte.", $("f-nombre"));
    if (!tel) return error("Revisá el número: tiene que ser un celular de Paraguay, por ejemplo 981 123 456.", $("f-tel"));
    if (!OVI.correo) return error("El formulario todavía no tiene un correo configurado.");
    var datos = {
      _subject: "Pedido desde oviamigo.com: " + nombre, _template: "table", _captcha: "false",
      Nombre: nombre, WhatsApp: "+" + tel, Escribirle: "https://wa.me/" + tel, Negocio: $("f-negocio").value,
      "Quiere resolver": $("f-msg").value.trim() || "(no escribió)", "Le interesa": elegidos.join(", ") || "(no eligió servicios)", Origen: location.hostname
    };
    fBtn.disabled = true; fBtn.textContent = "Enviando…";
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(OVI.correo), {
      method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify(datos)
    }).then(function (r) { return r.json().then(function (d) { if (!r.ok || String(d.success) === "false") throw 0; }); })
      .then(function () { formu.hidden = true; $("gracias").hidden = false; $("gracias").scrollIntoView({ block: "center" }); })
      .catch(function () { error("No se pudo enviar. Revisá tu conexión y tocá de nuevo “Enviar mis datos”."); })
      .finally(function () { fBtn.disabled = false; fBtn.textContent = "Enviar mis datos"; });
  });

  /* botón de WhatsApp: aparece solo cuando cargás el número en config.js */
  var wa = String(OVI.whatsapp || "").replace(/\D/g, "");
  if (wa) { var w = $("wa-btn"); w.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent("Hola Ovi, vengo de oviamigo.com"); w.hidden = false; }
})();
