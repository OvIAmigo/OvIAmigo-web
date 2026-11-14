# OvIAmigo · sitio web

Sitio de oviamigo.com: chat con IA, detector de humo, Shorts de YouTube, calculadora, servicios, formulario y redes.

## Qué hay en cada archivo

| Archivo | Para qué sirve |
|---|---|
| `config.js` | **Lo único que vas a tocar seguido:** redes, correo, WhatsApp, videos. |
| `index.html` | Los textos de la página. |
| `estilos.css` | Colores y diseño. |
| `app.js` | El chat, el juego, la calculadora y el formulario. |
| `functions/api/chat.js` | El chat con IA de verdad (corre en Cloudflare, ahí va la clave). |
| `functions/api/videos.js` | Trae solo tus últimos Shorts de YouTube. |
| `assets/` | Tu avatar, las letras y la imagen que se ve al compartir el enlace. |

## 1. Subirlo a GitHub

1. Entrá a github.com con la cuenta **OvIAmigo** y tocá **New** (repositorio nuevo).
2. Nombre: `oviamigo-web`. Dejalo en **Public** o **Private**, como prefieras. Tocá **Create repository**.
3. En la pantalla que aparece, tocá **uploading an existing file**.
4. Descomprimí el zip y arrastrá **todo lo que hay adentro** de la carpeta (incluidas las carpetas `assets` y `functions`).
5. Tocá **Commit changes**.

## 2. Publicarlo en Cloudflare

1. En Cloudflare: **Workers & Pages** > **Create**. Si te da a elegir entre Workers y Pages, elegí **Pages**, y después **Connect to Git**.
2. Autorizá GitHub y elegí el repositorio `oviamigo-web`.
3. Configuración: Framework preset **None**, Build command **vacío**, Build output directory **/**.
4. Tocá **Save and Deploy**. En un minuto te da una dirección `.pages.dev` para probar.

Desde ahí, cada cambio que guardes en GitHub se publica solo.

## 3. Encender la IA del chat

Sin este paso la página funciona igual: el chat responde con respuestas ya escritas.

1. Creá una clave nueva en platform.claude.com > Settings > API keys. **No la pegues en ningún chat ni en ningún archivo.**
2. En Cloudflare: tu proyecto > **Settings** > **Variables and Secrets** > **Add**.
3. Type: **Secret**. Name: `ANTHROPIC_API_KEY`. Value: tu clave. Guardá.
4. Volvé a publicar: **Deployments** > los tres puntitos del último > **Retry deployment**.
5. En la consola de Claude, poné un **límite de gasto mensual** bajo para dormir tranquilo.

El chat usa el modelo más económico, respuestas cortas, y cada visitante puede hacer hasta 20 preguntas por visita.

## 4. Conectar oviamigo.com

En Cloudflare: tu proyecto > **Custom domains** > **Set up a custom domain** > `oviamigo.com`. Repetí con `www.oviamigo.com`.

## 5. Cambios que vas a querer hacer

- **Agregar tu WhatsApp:** en `config.js`, escribí el número en `whatsapp: "595981123456"`. Aparece solo el botón.
- **Cambiar el correo de los pedidos:** en `config.js`, línea `correo`. La primera vez FormSubmit te manda un correo para activar: hay que confirmarlo.
- **Si no aparecen los videos:** en `config.js`, pegá los códigos en `videos: ["codigo1", "codigo2"]`.
- **Apagar la IA:** en `config.js`, `chatConIA: false`.
- **Editar las frases del detector o los servicios:** están en `app.js`, en las listas `FRASES` y `SERVICIOS`.
