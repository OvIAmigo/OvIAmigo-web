# OvIAmigo · sitio web

Son **archivos sueltos, sin carpetas** (los iconos `favicon.svg` e `icono-*.png` también van). Tienen que estar todos juntos en el mismo lugar.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página de inicio: portada, servicios, tu rubro, método, quiénes somos y contacto, más las ventanas del chat y del formulario. |
| `secciones.css` | El diseño de las secciones nuevas y de los botones flotantes (robot y WhatsApp). |
| `flota.js` | El WhatsApp directo en pantalla y el menú que marca en qué sección estás. |
| `ceo.jpg` | La foto de la sección Quiénes somos. |
| `servicios.html` | **La página aparte con tus 21 servicios**, uno por uno, que se despliegan. |
| `estilos.css` | El diseño. Adentro van las letras de la marca y tu avatar. |
| `app.js` | Las ideas por rubro, el formulario y el funcionamiento del chat. |
| `preguntas.js` | **El banco del chat:** más de 13.000 preguntas con sus respuestas. |
| `config.js` | **Lo que vas a tocar seguido:** redes, correo, tu WhatsApp. |
| `_worker.js` | Ya no se usa en la página (se sacó la sección de videos). Podés dejarlo o borrarlo. |
| `avatar.jpg` | Ícono de la pestaña. |
| `compartir.jpg` | La imagen que aparece cuando compartís el enlace. |
| `LEEME.md` | Esta guía. |

## El chat ya no usa inteligencia artificial

Responde con las preguntas y respuestas escritas en `preguntas.js`. No gasta saldo ni necesita clave.

**Embudo de WhatsApp:** el robot no da tu WhatsApp de entrada. Si preguntan precio o cómo contratar, primero pregunta el rubro, cuántas consultas reciben por día y qué quieren automatizar. Recién cuando insisten o ya contaron su negocio (2 o 3 mensajes), les muestra el botón que abre tu WhatsApp con un resumen ya escrito. Lo mismo si hacen dos preguntas que el robot no sabe. La lógica está en `app.js`, sección "CHAT DE PREGUNTAS".

Si habías cargado la clave `ANTHROPIC_API_KEY` en Cloudflare, ya no hace falta: la podés borrar.

## Cómo quedó la página

La página se recorre de arriba hacia abajo, con el menú de arriba para saltar a cada parte:

1. **Portada:** tu presentación, los 4 stickers y el robot (sin cambios).
2. **Servicios:** los 21 servicios en 6 tarjetas. Cada servicio de la lista lleva a su detalle en `servicios.html`.
3. **Tu rubro:** "¿Qué hace la IA en un negocio como el tuyo?" con las ideas por rubro.
4. **Método:** cómo trabajás en 4 pasos y por qué elegirte.
5. **Quiénes somos:** tu foto, tu presentación (para pymes, que sos contador y seguís formándote en tecnología e IA), y la misión, la visión y los objetivos.
6. **Contacto:** botón de WhatsApp directo, formulario que abre WhatsApp con el mensaje escrito, y tus redes.

- **Botones flotantes** (abajo a la derecha, en toda la página): el robot abre el chat y el de WhatsApp abre una cajita para escribirte desde la pantalla. Usan el número de `config.js`.
- **Flecha para seguir:** al final de cada parte hay un botón redondo con una flecha hacia abajo que lleva a la parte que sigue. En el celular, la portada también la tiene.
- El **robot** ya no dice cuántas preguntas sabe. Saluda: "¡Hola! Soy el robot de OvIAmigo".
- Se **sacó la sección de videos**. Los videos se ven en tus redes (botones del sticker "Un video por día" y de Contacto).
- El **chat** y el **formulario** ("Hablemos") se abren como ventanas arriba de la página.
- Cada servicio tiene "Pedir este servicio", que abre el formulario con ese servicio ya elegido.
- **Los 4 stickers del avatar** abren una ventanita con acciones. Los textos y chistes están en `app.js`, sección "LOS 4 STICKERS".
- Para cambiar los textos de Quiénes somos, Misión, Visión, Objetivos y Método, buscalos en `index.html` (están en la sección correspondiente).
- En TikTok el usuario es `@oviamigo` (sin la segunda o).

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
La página funciona igual: ya no usa ese archivo.

## 3. Conectar oviamigo.com

Tu proyecto > **Custom domains** > **Set up a custom domain** > `oviamigo.com`. Repetí con `www.oviamigo.com`.

## 4. Cambios que vas a querer hacer

- **Cambiar o agregar respuestas del chat:** en `preguntas.js`. Arriba del archivo está explicado cómo: cada renglón tiene el tema, la respuesta y las formas de preguntar.
- **Cambiar el correo de los pedidos:** en `config.js`, línea `correo`. La primera vez FormSubmit manda un correo para activar: hay que confirmarlo.
- **Sumar un país o una moneda:** en `app.js`, listas `PAISES` y `MONEDAS`.
- **Cambiar las frases que se escriben solas en el inicio ("Puedo…"):** en `app.js`, la lista `frases` de "CONSOLA QUE ESCRIBE SOLA".
- **Editar los servicios del inicio:** en `index.html`, la lista `hero-serv` (las pastillas) y la sección "LO QUE HAGO" (las tarjetas).
- **Editar frases del detector, rubros o servicios:** en `app.js`, listas `FRASES`, `RUBROS` y `SERVICIOS`.
