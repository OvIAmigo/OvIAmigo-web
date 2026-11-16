# OvIAmigo · sitio web

Son **10 archivos sueltos, sin carpetas**. Tienen que estar todos juntos en el mismo lugar.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página de inicio: dos pantallas (inicio, y tu rubro + videos) y las ventanas del chat y del formulario. |
| `servicios.html` | **La página aparte con tus 15 servicios**, uno por uno, que se despliegan. |
| `estilos.css` | El diseño. Adentro van las letras de la marca y tu avatar. |
| `app.js` | Las ideas por rubro, los videos que se reproducen solos, el formulario y el funcionamiento del chat. |
| `preguntas.js` | **El banco del chat:** más de 13.000 preguntas con sus respuestas. |
| `config.js` | **Lo que vas a tocar seguido:** redes, correo, tu WhatsApp, videos. |
| `_worker.js` | Trae solo tus últimos Shorts de YouTube. No usa ninguna clave. |
| `avatar.jpg` | Ícono de la pestaña. |
| `compartir.jpg` | La imagen que aparece cuando compartís el enlace. |
| `LEEME.md` | Esta guía. |

## El chat ya no usa inteligencia artificial

Responde con las preguntas y respuestas escritas en `preguntas.js`. No gasta saldo ni necesita clave.

**Embudo de WhatsApp:** el robot no da tu WhatsApp de entrada. Si preguntan precio o cómo contratar, primero pregunta el rubro, cuántas consultas reciben por día y qué quieren automatizar. Recién cuando insisten o ya contaron su negocio (2 o 3 mensajes), les muestra el botón que abre tu WhatsApp con un resumen ya escrito. Lo mismo si hacen dos preguntas que el robot no sabe. La lógica está en `app.js`, sección "CHAT DE PREGUNTAS".

Si habías cargado la clave `ANTHROPIC_API_KEY` en Cloudflare, ya no hace falta: la podés borrar.

## Cómo quedó la página

- **Pantalla 1:** tu presentación y los botones. **Pantalla 2:** "¿Qué hace la IA en un negocio como el tuyo?" + tus Shorts, que arrancan solos y sin sonido (tocás uno y suena).
- El **chat** ("Hacé tu pregunta") y el **formulario** ("Hablemos") se abren como ventanas arriba de la página.
- **Servicios:** botón "Ver todos mis servicios" > `servicios.html`. Cada servicio tiene "Pedir este servicio", que abre el formulario con ese servicio ya elegido. Para cambiar un texto de un servicio, buscalo en `servicios.html` por su nombre.
- **Los 4 stickers del avatar** (Sin humo, Con humor, Para pymes, Un video por día) son botones: cada uno abre una ventanita con acciones (preguntarle al robot, un chiste nuevo cada vez, elegir tu rubro, ver los videos). Los textos y chistes están en `app.js`, sección "LOS 4 STICKERS".
- **El robot al lado del avatar** abre el chat al tocarlo.
- `servicios.html` ahora tiene 21 servicios, con un grupo nuevo: "Dominio y más cosas con IA" (dominio y correo, imágenes, voz y subtítulos, textos, presentaciones e informes, planillas y reportes).
- Se sacaron el detector de humo y la calculadora de "¿Cuánto te cuesta responder tarde?".
- Los videos los trae `_worker.js` del canal `@oviamigoo` de YouTube. En TikTok el usuario es `@oviamigo` (sin la segunda o).

## Tu WhatsApp

Está en `config.js`, en la línea `whatsapp` (hoy `595987878487`). Ese número queda a la vista de quien visite la página.
- Para cambiarlo: escribí el número nuevo con código de país y sin signos, por ejemplo `"595981123456"`.
- Para no mostrar ningún número: dejalo vacío (`""`). Los botones de WhatsApp desaparecen y todo va al formulario.

## 1. Subirlo a GitHub

1. Entrá a github.com con la cuenta **OvIAmigo** > **New**. Nombre: `oviamigo-web` > **Create repository**.
2. Tocá **uploading an existing file**.
3. Descomprimí el zip, abrí la carpeta, **seleccioná los 10 archivos** y arrastralos.
4. Esperá a que aparezcan los 10 en la lista y tocá **Commit changes**.

Si ya habías subido una versión anterior: subí estos 10 encima.

## 2. Publicarlo en Cloudflare

1. **Workers & Pages** > **Create**. Si te da a elegir, elegí **Pages** > **Connect to Git**.
2. Elegí el repositorio `oviamigo-web`.
3. Framework preset **None**, Build command **vacío**, Build output directory **/**.
4. **Save and Deploy**. Te da una dirección `.pages.dev` para probar.

Cada cambio que guardes en GitHub se publica solo.

Si en cambio publicás arrastrando los archivos a Cloudflare, no subas `_worker.js`: ese modo solo acepta archivos comunes.
La página funciona igual; lo único que cambia es que los videos se cargan a mano en `config.js`.

## 3. Conectar oviamigo.com

Tu proyecto > **Custom domains** > **Set up a custom domain** > `oviamigo.com`. Repetí con `www.oviamigo.com`.

## 4. Cambios que vas a querer hacer

- **Cambiar o agregar respuestas del chat:** en `preguntas.js`. Arriba del archivo está explicado cómo: cada renglón tiene el tema, la respuesta y las formas de preguntar.
- **Cambiar el correo de los pedidos:** en `config.js`, línea `correo`. La primera vez FormSubmit manda un correo para activar: hay que confirmarlo.
- **Si no aparecen los videos:** en `config.js`, pegá los códigos en `videos: ["codigo1", "codigo2"]`.
- **Sumar un país o una moneda:** en `app.js`, listas `PAISES` y `MONEDAS`.
- **Cambiar las frases que se escriben solas en el inicio ("Puedo…"):** en `app.js`, la lista `frases` de "CONSOLA QUE ESCRIBE SOLA".
- **Editar los servicios del inicio:** en `index.html`, la lista `hero-serv` (las pastillas) y la sección "LO QUE HAGO" (las tarjetas).
- **Editar frases del detector, rubros o servicios:** en `app.js`, listas `FRASES`, `RUBROS` y `SERVICIOS`.
