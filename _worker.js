/**
 * OvIAmigo · La única parte de la página que corre en Cloudflare.
 *   GET /api/videos  -> trae tus últimos Shorts de YouTube
 * Todo lo demás (index.html, estilos, imágenes, el chat) se sirve tal cual y funciona en el navegador.
 *
 * No necesita ninguna clave. El chat ya no usa inteligencia artificial: responde con el banco de preguntas.js.
 *
 * Opcional: si los videos no aparecen solos, cargá en Cloudflare la variable YOUTUBE_CHANNEL_ID
 * (tu proyecto > Settings > Variables and Secrets) con el código de tu canal, que empieza con UC.
 */
export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === "/api/videos") return videos(env);
    return env.ASSETS.fetch(request);
  }
};

/* ======================= VIDEOS DE YOUTUBE ======================= */
const USUARIO = "oviamigoo";
const MAXIMO = 12;
const CABECERAS = { "user-agent": "Mozilla/5.0 (compatible; OvIAmigoWeb/1.0)", "accept-language": "es", cookie: "SOCS=CAI; CONSENT=YES+1" };

function leerCanal(html) {
  const m = html.match(/"externalId":"(UC[\w-]{22})"/) || html.match(/channel_id=(UC[\w-]{22})/) ||
            html.match(/youtube\.com\/channel\/(UC[\w-]{22})/) || html.match(/"browseId":"(UC[\w-]{22})"/);
  return m ? m[1] : "";
}

function leerVideos(xml) {
  const limpiar = (t) => t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
  const lista = [];
  const entradas = xml.split("<entry>").slice(1);
  for (const e of entradas) {
    const id = (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1];
    const titulo = (e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
    if (id) lista.push({ id, titulo: limpiar(titulo).trim().slice(0, 120) });
  }
  return lista;
}

async function traer(url) {
  const r = await fetch(url, { headers: CABECERAS, cf: { cacheTtl: 1800, cacheEverything: true } });
  return r.ok ? r.text() : "";
}

async function videos(env) {
  const salida = (videos, segundos) =>
    new Response(JSON.stringify({ videos }), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=" + segundos } });
  try {
    let canal = env.YOUTUBE_CHANNEL_ID || "";
    if (!canal) canal = leerCanal(await traer("https://www.youtube.com/@" + USUARIO));
    if (!canal) return salida([], 300);

    // primero la lista de Shorts del canal; si viene vacía, todos los videos
    let videos = leerVideos(await traer("https://www.youtube.com/feeds/videos.xml?playlist_id=UUSH" + canal.slice(2)));
    if (!videos.length) videos = leerVideos(await traer("https://www.youtube.com/feeds/videos.xml?channel_id=" + canal));
    return salida(videos.slice(0, MAXIMO), videos.length ? 1800 : 300);
  } catch (e) {
    console.error(e);
    return salida([], 300);
  }
}
