/**
 * Lógica compartida para "bloquear" cualquier cosa (una canción, una
 * sección, un componente entero) hasta cierta fecha/hora o hasta que
 * el usuario haga una cantidad de "taps".
 *
 * No sabe nada de UI — eso vive en useUnlock (hook) y UnlockGate
 * (componente). Aquí solo están los tipos y las funciones puras.
 */

export type Unlock =
  | { type: "available" }
  | { type: "date"; at: string } // fecha/hora en UTC, formato ISO
  | { type: "taps"; count: number };

/**
 * Perú no tiene horario de verano, siempre es UTC-5.
 * Para convertir "hora Perú" a UTC: hora_UTC = hora_Perú + 5.
 * Ej: "28 de sept, 12:00pm hora Perú" → "2026-09-28T17:00:00Z"
 */

export function isUnlocked(unlock: Unlock, now: number, taps: number): boolean {
  switch (unlock.type) {
    case "available":
      return true;
    case "date":
      return now >= new Date(unlock.at).getTime();
    case "taps":
      return taps >= unlock.count;
  }
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "¡ya casi!";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return days > 0
    ? `${days}d ${pad(hours)}h ${pad(minutes)}m`
    : `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// --- persistencia de taps en localStorage, por id único ---

const tapsKey = (id: string) => `unlock-taps:${id}`;

export function loadTaps(id: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(tapsKey(id));
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveTaps(id: string, taps: number) {
  try {
    window.localStorage.setItem(tapsKey(id), String(taps));
  } catch {
    // si falla el storage (modo privado, etc.), seguimos sin persistir
  }
}