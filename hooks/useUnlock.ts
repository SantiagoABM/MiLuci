"use client";

import { useEffect, useState } from "react";
import { Unlock, isUnlocked, formatCountdown, loadTaps, saveTaps } from "@/helpers/unlock";

/**
 * Hook genérico para bloquear/desbloquear cualquier cosa.
 *
 * `id` debe ser único por cada cosa que bloquees (se usa para guardar
 * el progreso de taps en localStorage, así que "tata-section" y
 * "carta-final" nunca se pisan entre sí).
 */
export function useUnlock(id: string, unlock: Unlock) {
  const [now, setNow] = useState(() => Date.now());
  const [taps, setTaps] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTaps(loadTaps(id));
    setHydrated(true);
  }, [id]);

  useEffect(() => {
    if (unlock.type !== "date") return;
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, [unlock.type]);

  const tap = () => {
    if (unlock.type !== "taps") return;
    setTaps((current) => {
      if (current >= unlock.count) return current;
      const next = current + 1;
      saveTaps(id, next);
      return next;
    });
  };

  const unlocked = hydrated && isUnlocked(unlock, now, taps);
  const countdownLabel =
    unlock.type === "date" ? formatCountdown(new Date(unlock.at).getTime() - now) : null;

  return { unlocked, hydrated, taps, tap, countdownLabel };
}