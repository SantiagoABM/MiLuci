"use client";

import { useEffect, useState } from "react";
import { Unlock, isUnlocked, formatCountdown } from "@/helpers/unlock";
import { SPOTIFY_SONGS as SONGS, SpotifyType } from "@/lib/config";

/**
 * Lista de canciones que se van desbloqueando (por fecha o por taps).
 * Usa la misma lógica de "@/lib/unlock" que UnlockGate, solo que aquí
 * cada canción tiene su propio estado de taps dentro de una lista,
 * en vez de bloquear una sola cosa.
 *
 * Cómo agregar una canción:
 * 1. Ábrela en Spotify → "Compartir" → "Copiar enlace".
 * 2. El ID es la parte entre "track/" y "?" del link.
 * 3. Agrega un objeto al arreglo SONGS con ese ID, título y su "unlock".
 */

interface Song {
  id: string;
  type: SpotifyType;
  title: string;
  note?: string;
  unlock: Unlock;
}


const STORAGE_KEY = "our-songs-taps";

function loadTapsMap(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveTapsMap(map: Record<string, number>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // sin storage disponible, seguimos sin persistir
  }
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function HeartTapIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M12 20s-7.5-4.6-10-9.3C0.3 7.2 2.1 4 5.4 4c2 0 3.5 1.1 4.6 2.7C11.1 5.1 12.6 4 14.6 4c3.3 0 5.1 3.2 3.4 6.7C20 15.4 12 20 12 20Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SpotifySong() {
  // arranca en 0 (igual en servidor y cliente) para no desincronizar la
  // hidratación; el valor real de Date.now() se aplica recién en el efecto.
  const [now, setNow] = useState(0);
  const [tapsMap, setTapsMap] = useState<Record<string, number>>({});
  const [active, setActive] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTapsMap(loadTapsMap());
    setNow(Date.now());
    setHydrated(true);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!hydrated || active !== null) return;
    const firstUnlocked = SONGS.findIndex((s) =>
      isUnlocked(s.unlock, now, tapsMap[s.id] ?? 0)
    );
    if (firstUnlocked !== -1) setActive(firstUnlocked);
  }, [hydrated, active, now, tapsMap]);

  const handleTap = (song: Song) => {
    if (song.unlock.type !== "taps") return;
    const current = tapsMap[song.id] ?? 0;
    if (current >= song.unlock.count) return;
    const next = { ...tapsMap, [song.id]: current + 1 };
    setTapsMap(next);
    saveTapsMap(next);
  };

  const song = active !== null ? SONGS[active] : null;
  const embedUrl = song
    ? `https://open.spotify.com/embed/${song.type}/${song.id}?utm_source=generator&theme=0`
    : null;
  const embedHeight = song?.type === "track" ? 152 : 352;

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-md">
        <p className="font-display italic text-peony/90 text-xl text-center mb-1">
          nuestras canciones
        </p>
        <p className="font-body text-blush/50 text-xs text-center tracking-wide mb-6">
          se van a ir revelando, poquito a poquito
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {SONGS.map((s, i) => {
            const taps = tapsMap[s.id] ?? 0;
            const unlocked = isUnlocked(s.unlock, now, taps);
            const isActive = i === active;

            if (!unlocked) {
              return (
                <div
                  key={`${s.id}-${i}`}
                  className="rounded-2xl px-4 py-3 border border-periwinkle/10 bg-periwinkle/[0.03]"
                >
                  <div className="flex items-center gap-2 text-blush/40">
                    <LockIcon />
                    <p className="font-body text-sm">{s.title}</p>
                  </div>

                  {s.unlock.type === "date" && (
                    <p className="font-body text-blush/35 text-xs mt-1.5 tabular-nums">
                      {hydrated
                        ? `se desbloquea en ${formatCountdown(new Date(s.unlock.at).getTime() - now)}`
                        : "calculando..."}
                    </p>
                  )}

                  {s.unlock.type === "taps" && (
                    <button
                      onClick={() => handleTap(s)}
                      className="mt-2 flex items-center gap-2 text-peony/70 hover:text-peony/95 transition-colors"
                    >
                      <HeartTapIcon filled={taps > 0} />
                      <span className="font-body text-xs">
                        toca el corazón · {taps}/{s.unlock.count}
                      </span>
                    </button>
                  )}
                </div>
              );
            }

            return (
              <button
                key={`${s.id}-${i}`}
                onClick={() => setActive(i)}
                className={`text-left rounded-2xl px-4 py-3 transition-colors duration-200 border ${
                  isActive
                    ? "bg-peony/10 border-peony/40"
                    : "bg-transparent border-periwinkle/15 hover:border-periwinkle/35"
                }`}
              >
                <p className={`font-body text-sm ${isActive ? "text-peony/95" : "text-blush/80"}`}>
                  {s.title}
                </p>
                {s.note && <p className="font-body text-blush/40 text-xs mt-0.5">{s.note}</p>}
              </button>
            );
          })}
        </div>

        {song && embedUrl && (
          <div className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-periwinkle/40 via-peony/30 to-blush/40 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)]">
            <div className="rounded-[26px] overflow-hidden bg-[#121212]">
              <iframe
                key={song.id}
                title={`Spotify player - ${song.title}`}
                style={{ borderRadius: "26px" }}
                src={embedUrl}
                width="100%"
                height={embedHeight}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}