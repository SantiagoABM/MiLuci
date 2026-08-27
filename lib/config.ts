// ─────────────────────────────────────────────────────────────
// EDITA SOLO ESTE ARCHIVO PARA PERSONALIZAR TU PÁGINA
// ─────────────────────────────────────────────────────────────

// Fecha en la que empezaron (se usa para el contador en vivo)
export const START_DATE = "2024-04-28T00:00:00";

// Mes que se muestra en el calendario
export const MONTH_NAME = "28 meses 28 recuerdos";
export const MONTH_YEAR = 2026;
export const DAYS_IN_MONTH = 28;

// Día especial que "florece" en el calendario
export const HIGHLIGHT_DAY = 28;

// Nombres de la pareja (para el hero)
export const COUPLE_NAMES = "Tú & Yo";
export const HERO_TITLE = "28 meses juntos";
export const HERO_SUBTITLE =
  "Un collage de todo lo que hemos estado viviendo.";

// ─────────────────────────────────────────────────────────────
// FOTOS DEL COLLAGE (hero). Coloca tus imágenes en /public/photos
// y reemplaza estas rutas. Puedes usar 4 a 8 fotos.
// ─────────────────────────────────────────────────────────────
export const COLLAGE_PHOTOS: string[] = [
  "/photos/collage-1.png",
  "/photos/collage-2.png",
  "/photos/collage-3.png",
  "/photos/collage-4.png",
  "/photos/collage-5.png",
  "/photos/collage-6.png",
];

// ─────────────────────────────────────────────────────────────
// FOTO POR CADA DÍA DEL CALENDARIO (opcional).
// Deja vacío ("") en los días que no tengan foto: se mostrará
// un corazón. Coloca tus archivos en /public/photos/day-N.jpg
// y actualiza la ruta correspondiente.
// ─────────────────────────────────────────────────────────────
export const DAY_PHOTOS: Record<number, string> = Object.fromEntries(
  Array.from({ length: DAYS_IN_MONTH }, (_, i) => [
    i + 1,
    `/photos/m${i + 1}.png`,
  ])
);

// Frase corta que aparece bajo la foto del día especial
export const HIGHLIGHT_CAPTION = "El día que todo empezó 🌸";

// ─────────────────────────────────────────────────────────────
// CARTA CON CANDADO. Elige cómo se desbloquea:
// - "image": hay que tocar la foto correcta del collage.
// - "code":  hay que escribir una clave.
// ─────────────────────────────────────────────────────────────
export const LOCK_MODE: "image" | "code" = "image";

// Modo "image": índice (empezando en 0) dentro de COLLAGE_PHOTOS
// que es la foto correcta. Ej: 0 = la primera foto de COLLAGE_PHOTOS.
export const CORRECT_PHOTO_INDEX = 0;

// Pista que se muestra arriba de las fotos (modo "image")
export const LOCK_HINT = "Toca la foto que abre la carta";

// Modo "code": la clave que hay que escribir (no distingue mayúsculas)
export const LOCK_CODE = "2802";
export const LOCK_CODE_HINT = "Pista: el día que empezó todo";

// Texto de la carta que se revela al desbloquear
export const LOVE_LETTER = `
Para la niña que alegra mis días y me escogió 😋​.

Hola amor, sé que no es el mejor día ni el mejor lugar para esto pero, queria agradecerte por todo lo que has hecho por mi, por quererme como soy, por apoyarme en mis decisiones y por estar siempre ahí para mí.

Espero que te guste este pequeño detalle, lo hice con mucho cariño y amor. No es lo que quisiera pero es lo que pude hacer, sé que a pesar de la distancia, de los problemas, de los celos, de las peleas, de las pruebas y de todo lo que hemos pasado, seguimos aquí, juntos y más fuertes que nunca. 

Gracias por ser mi compañera, mi confidente, mi mejor amiga, mi todo. No sé que haría sin ti. Eres la mejor persona que he conocido y estoy muy feliz de tenerte en mi vida, aunque a veces me porte como un niño pequeño, no te cambio por nada del mundo.

Te amo y te amaré por siempre.

Atte: Tu novio el más cariñoso en ambos sentidos contigo jsjs.
`;

// Cómo se cargan las fotos del calendario:
// "lazy"  -> (recomendado) más liviano. En la cuadrícula solo se ve un
//            corazón en cada día; la foto real se carga únicamente
//            cuando tocas ese día. Ideal si tus fotos pesan bastante.
// "eager" -> se cargan las 28 fotos de una vez en la cuadrícula.
export const CALENDAR_IMAGE_MODE: "lazy" | "eager" = "lazy";

// ─────────────────────────────────────────────────────────────
// AUDIOS. Coloca tus archivos .mp3 en /public/audio y complétalos
// aquí. Si dejas el arreglo vacío, el reproductor se oculta.
// ─────────────────────────────────────────────────────────────
export type Track = { title: string; artist?: string; src: string };

export const AUDIO_TRACKS: Track[] = [
  { title: "Into The Sun / Lloremos juntos amor", artist: "BTS", src: "/audio/cancion-1.mp3" },
  { title: "Those Eyes / Me encantan", artist: "New West", src: "/audio/cancion-2.mp3" },
  { title: "Disfruto / Esto es cada momento contigo", artist: "Carla Morrison", src: "/audio/cancion-3.mp3" },
  { title: "Labios Rotos / Esta es nuestra canción", artist: "Zoe", src: "/audio/cancion-4.mp3" },
  { title: "Perfect / Porque tú ya eres perfecta", artist: "Ed Sheeran", src: "/audio/cancion-5.mp3" },
];

// ─────────────────────────────────────────────────────────────
// SECCIÓN "TATA". Aparece como una línea divisoria entre el
// calendario y la carta. Al tocar la imagen central, rebota y la
// sección se abre mostrando una lista de fotos con descripción.
// ─────────────────────────────────────────────────────────────

// Imagen central de la línea (usa un PNG con fondo transparente
// para que solo se vea el muñeco). Coloca tu archivo en
// /public/photos y actualiza la ruta.
export const TATA_IMAGE = "/photos/tata.png";

export type TataItem = { image: string; title: string; description: string };

export const TATA_ITEMS: TataItem[] = [
  {
    image: "/photos/tata-brawl.png",
    title: "Tata Edgar",
    description: "El mejor brawler del juego para la mejor novia :3.",
  },
  {
    image: "/photos/tata-funko.png",
    title: "Tata Funko",
    description: "Una de las figuras más valiosas que uno puede conseguir, pero no más que tú mi amorrr.",
  },
  {
    image: "/photos/tata-llavero.png",
    title: "Tata Llavero",
    description: "Algo que puedo llevar siempre que salga y me haga recordar a ti siempre batería.",
  },
];