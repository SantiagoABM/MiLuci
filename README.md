# Nuestro mes de enamorados 💙🌸

Página Next.js con collage tipo polaroid, contador de tiempo en vivo,
calendario del mes (con un día especial que "florece") y reproductor
de audio con playlist.

## Cómo ponerla a andar

1. Instala Node.js 18+ si no lo tienes.
2. Abre una terminal en esta carpeta y ejecuta:
   ```bash
   npm install
   npm run dev
   ```
3. Abre `http://localhost:3000` en tu navegador.

## Cómo personalizarla (sin tocar el diseño)

Todo lo que vas a cambiar vive en **`lib/config.ts`**:

- `START_DATE`: la fecha en que empezaron, para el contador en vivo.
- `MONTH_NAME` / `MONTH_YEAR` / `DAYS_IN_MONTH`: el mes del calendario.
- `HIGHLIGHT_DAY`: el día que "florece" (por defecto el 28).
- `HERO_TITLE` / `HERO_SUBTITLE` / `COUPLE_NAMES`: los textos del hero.
- `COLLAGE_PHOTOS`: rutas a las fotos del collage principal (4 a 8 fotos).
- `DAY_PHOTOS`: la foto de cada día del calendario (opcional).
- `AUDIO_TRACKS`: tus canciones o audios.
- `LOCK_MODE`: `"image"` (hay que tocar la foto correcta del collage) o
  `"code"` (hay que escribir una clave). `CORRECT_PHOTO_INDEX` / `LOCK_CODE`
  definen cuál es la respuesta correcta, y `LOVE_LETTER` es el texto que
  se revela al desbloquear la carta.

### Tus fotos

1. Copia tus imágenes dentro de `public/photos/`.
2. En `lib/config.ts`, reemplaza las rutas de `COLLAGE_PHOTOS` y `DAY_PHOTOS`
   por los nombres de tus archivos, por ejemplo:
   ```ts
   export const COLLAGE_PHOTOS = [
     "/photos/nosotros-1.jpg",
     "/photos/nosotros-2.jpg",
     // ...
   ];
   ```
   Puedes borrar los archivos `.svg` de ejemplo cuando ya no los necesites.

### Tus audios

1. Copia tus archivos `.mp3` dentro de `public/audio/`.
2. Completa `AUDIO_TRACKS` en `lib/config.ts` con el título y la ruta de
   cada uno. Si dejas el arreglo vacío, el reproductor se oculta solo.

## Publicarla en internet (gratis)

La forma más simple es con [Vercel](https://vercel.com):

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a vercel.com, conecta el repositorio y despliega.
3. En un par de minutos tendrás un link para compartir.

## Estructura

```
app/            → layout y página principal
components/     → Collage, Counter, Calendar, AudioPlayer
lib/config.ts   → todo lo que puedes personalizar
public/photos/  → tus fotos
public/audio/   → tus audios
```
