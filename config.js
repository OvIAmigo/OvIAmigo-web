/*
 * OvIAmigo · Datos que podés cambiar sin tocar el resto de la página.
 * Editá lo que está entre comillas, guardá, y listo.
 */
window.OVI = {
  // Tus redes
  redes: {
    instagram: { url: "https://www.instagram.com/oviamigo", usuario: "@oviamigo" },
    tiktok:    { url: "https://www.tiktok.com/@oviamigo",   usuario: "@oviamigo" },
    youtube:   { url: "https://www.youtube.com/@oviamigo",  usuario: "@oviamigo" },
    x:         { url: "https://x.com/oviamigoo",            usuario: "@oviamigoo" }
  },

  // Correo donde te llegan los pedidos del formulario
  correo: "armoaalen@gmail.com",

  // WhatsApp de tu negocio. Dejalo vacío ("") mientras no tengas el número.
  // Cuando lo tengas, escribilo con código de país y sin signos: "595981123456"
  // y aparece solo el botón "Escribime por WhatsApp" en la sección de contacto.
  whatsapp: "",

  // Videos de YouTube. La página trae sola tus últimos Shorts.
  // Si algún día no los trae, pegá acá los códigos de los videos que querés mostrar.
  // El código es lo que va después de /shorts/ en el enlace: youtube.com/shorts/ESTE_CODIGO
  videos: [],

  // true = el chat usa IA de verdad (necesita la clave cargada en Cloudflare).
  // false = el chat responde con respuestas ya escritas, sin costo.
  chatConIA: true
};
