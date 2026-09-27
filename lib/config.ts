// ─────────────────────────────────────────────────────────────
// EDITA SOLO ESTE ARCHIVO PARA PERSONALIZAR TU PÁGINA
// ─────────────────────────────────────────────────────────────

import { monthsSince } from "./time";

// Fecha en la que empezaron (se usa para el contador en vivo)

export const START_DATE = "2024-04-28T07:00:00";
export const ACTUAL_MONTHS = monthsSince(START_DATE);

// Mes que se muestra en el calendario
export const MONTH_NAME = monthsSince(START_DATE) + " meses 28 recuerdos";
export const MONTH_YEAR = 2026;
export const DAYS_IN_MONTH = 28;

// Día especial que "florece" en el calendario
export const HIGHLIGHT_DAY = 28;

// Nombres de la pareja (para el hero)
export const COUPLE_NAMES = "Tú & Yo";
export const HERO_TITLE = monthsSince(START_DATE) + " meses juntos";
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
export const LOCK_MODE: "image" | "code" = "code";

// Modo "image": índice (empezando en 0) dentro de COLLAGE_PHOTOS
// que es la foto correcta. Ej: 0 = la primera foto de COLLAGE_PHOTOS.
export const CORRECT_PHOTO_INDEX = 0;

// Pista que se muestra arriba de las fotos (modo "image")
export const LOCK_HINT = "Toca la foto que abre la carta";

// Modo "code": la clave que hay que escribir (no distingue mayúsculas)
export const LOCK_CODE = "280424";
export const LOCK_CODE_HINT = "Pista: el día que empezó todo";

// Texto de la carta que se revela al desbloquear
export const LOVE_LETTER = `
Hola amor, felices ${monthsSince(START_DATE)} meses, sé que sentimos que ya nos está afectando el cambio de horario, pero quiero que sepas que a pesar de todo lo que estamos pasando, sigo y seguiré estando aquí para ti.

Sabemos que la distancia es un obstáculo pero no tengo duda de que vamos a salir adelante, a pesar de los problemas, de los celos, de las peleas, de las pruebas y de todo lo que hemos pasado, seguimos aquí, juntos y fortaleciendo nuestra relación. 

Quizás pienses que ya no te presto tanta atención como antes, o que ya no te amo igual, pero créeme que no es así, solo que a veces me siento abrumado por todo lo que estamos pasando, pero eso no significa que te ame menos, al contrario, te amo más cada día que pasa.

Y aunque a veces me porte como un idiota, no te cambio por nada del mundo.

Gracias por ser mi compañera, mi confidente, mi mejor amiga, mi todo. No sé que haría sin ti. Eres la mejor persona que he conocido y estoy muy feliz de tenerte en mi vida, aunque a veces me porte como un niño pequeño, no te cambio por nada del mundo.

Te amo y te seguiré amando hasta la vejez.

Atte: Tu programador favorito <3.
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

// Spotify-songs
// --- Spotify ---

export type SpotifyType = "track" | "album" | "playlist";

export type SpotifyUnlock =
  | { type: "available" }
  | { type: "date"; at: string } // ISO UTC — Perú es siempre UTC-5, hora_UTC = hora_Perú + 5
  | { type: "taps"; count: number };

export interface SpotifySongConfig {
  id: string;
  type: SpotifyType;
  title: string;
  note?: string;
  unlock: SpotifyUnlock;
}

export const SPOTIFY_SONGS: SpotifySongConfig[] = [
  {
    id: "0yKnn15144wfd5sCCNFnnE",
    type: "track",
    title: "On Melancholy Hill",
    note: "Nuestra canción que nos recuerda el inicio de todo.",
    unlock: { type: "available" }, // ← SIEMPRE DESBLOQUEADO
  },
  {
    id: "6dOtVTDdiauQNBQEDOtlAB",
    type: "track",
    title: "Birds of a Feather",
    note: "Una de las canciones que más me hace recordar a ti.",
    unlock: { type: "taps", count: 28 }, // ← Bloqueado por taps
  },
  {
    id: "2plbrEY59IikOBgBGLjaoe",
    type: "track",
    title: "Die With A Smile",
    note: "Es una canción que me gusta escucharla por la razón de que es una de tus favoritas.",
    unlock: { type: "taps", count: 4 },
  },
  {
    id: "1MX0g22bQkr9HDVe37fLnN",
    type: "track",
    title: "134340",
    note: "BTS",
    unlock: { type: "taps", count: 24 },
  },
  {
    id: "2j1fFjWHCI9KJSwcuYAOyF",
    type: "track",
    title: "Spring Day",
    note: "BTS",
    unlock: { type: "date", at: "2026-09-28T07:00:00Z" }, //<- Bloqueado por fecha
  },
  {
    id: "1HYzRuWjmS9LXCkdVHi25K",
    type: "track",
    title: "Stay with me",
    note: "Chanyeol, Punch",
    unlock: { type: "date", at: "2026-09-28T07:00:00Z" },
  },
  {
    id: "609SDGj0txmlAXRrpwee9Y",
    type: "track",
    title: "Llegaste tú",
    note: "Luis Fonsi ft. Juan Luis Guerra",
    unlock: { type: "date", at: "2026-09-28T07:00:00Z" },
  },
  {
    id: "351dqwRVsCDniedG9soXSf",
    type: "track",
    title: "Un Beso En Madrid",
    note: "TINI & Alejandro Sanz",
    unlock: { type: "date", at: "2026-09-28T07:00:00Z" },
  },
];

// Flores amarillas

export const FLOWER_MESSAGE = `Aquí tienes tu ramo amor, sé que no es como uno real pero este es
uno que no se marchita, perdón el retraso amorcito.`;