# OvIAmigo · sitio web

Son **8 archivos sueltos, sin carpetas**. Tienen que estar los 8 juntos en el mismo lugar.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Los textos de la página. |
| `estilos.css` | El diseño. Adentro van las letras de la marca y tu avatar. |
| `app.js` | El chat, el juego, las ideas por rubro, la calculadora y el formulario. |
| `config.js` | **Lo que vas a tocar seguido:** redes, correo, WhatsApp, videos. |
| `_worker.js` | **La parte de la IA.** Corre en Cloudflare y usa tu clave de Claude. |
| `avatar.jpg` | Tu foto (ícono de la pestaña). |
| `compartir.jpg` | La imagen que aparece cuando compartís el enlace. |
| `LEEME.md` | Esta guía. |

## 1. Subirlo a GitHub

1. Entrá a github.com con la cuenta **OvIAmigo** > **New**. Nombre: `oviamigo-web` > **Create repository**.
2. Tocá **uploading an existing file**.
3. Descomprimí el zip, abrí la carpeta, **seleccioná los 8 archivos** y arrastralos.
4. Esperá a que aparezcan los 8 en la lista y tocá **Commit changes**.

Si ya habías subido la versión anterior: subí estos 8 encima y borrá las carpetas viejas `assets` y `functions`.

## 2. Publicarlo en Cloudflare

1. **Workers & Pages** > **Create**. Si te da a elegir, elegí **Pages** > **Connect to Git**.
2. Elegí el repositorio `oviamigo-web`.
3. Framework preset **None**, Build command **vacío**, Build output directory **/**.
4. **Save and Deploy**. Te da una dirección `.pages.dev` para probar.

Cada cambio que guardes en GitHub se publica solo.

## 3. Poner la clave para que la IA escriba sola

Sin este paso el chat igual funciona, con respuestas ya escritas.

1. Creá una clave nueva en platform.claude.com > Settings > API keys. **No la pegues en ningún chat ni archivo.**
2. En Cloudflare: tu proyecto > **Settings** > **Variables and Secrets** > **Add**.
3. Type: **Secret** · Name: `ANTHROPIC_API_KEY` · Value: tu clave > **Save**.
4. **Deployments** > los tres puntitos del último > **Retry deployment**.
5. En la consola de Claude poné un **límite de gasto mensual** bajo.

Para probar: abrí tu página, escribile algo raro al chat (por ejemplo, "explicame qué es un prompt con un ejemplo de empanadas"). Si responde algo a medida, la IA está encendida.

## 4. Conectar oviamigo.com

Tu proyecto > **Custom domains** > **Set up a custom domain** > `oviamigo.com`. Repetí con `www.oviamigo.com`.

## 5. Cambios que vas a querer hacer

- **Agregar tu WhatsApp:** en `config.js`, `whatsapp: "595981123456"`. El botón aparece solo.
- **Cambiar el correo de los pedidos:** en `config.js`, línea `correo`. La primera vez FormSubmit manda un correo para activar: hay que confirmarlo.
- **Si no aparecen los videos:** en `config.js`, pegá los códigos en `videos: ["codigo1", "codigo2"]`.
- **Apagar la IA:** en `config.js`, `chatConIA: false`.
- **Editar frases del detector, rubros o servicios:** en `app.js`, listas `FRASES`, `RUBROS` y `SERVICIOS`.
- **Cambiar cómo habla la IA:** en `_worker.js`, el texto `INSTRUCCIONES`.
