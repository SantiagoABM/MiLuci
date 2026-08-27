"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AUDIO_TRACKS } from "@/lib/config";

export default function AudioPlayer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = AUDIO_TRACKS[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnd = () => handleNext();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (!AUDIO_TRACKS.length) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleNext = () => {
    setCurrent((c) => (c + 1) % AUDIO_TRACKS.length);
    setProgress(0);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
    setPlaying(true);
  };

  const handlePrev = () => {
    setCurrent((c) => (c - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length);
    setProgress(0);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
    setPlaying(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-body">
      <audio ref={audioRef} src={track.src} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-72 rounded-2xl bg-gradient-to-br from-indigo/95 to-peony-deep/90 backdrop-blur-md border border-periwinkle/30 shadow-2xl p-4"
          >
            <p className="text-cream text-sm font-semibold truncate">{track.title}</p>
            {track.artist && (
              <p className="text-blush/70 text-xs truncate mb-3">{track.artist}</p>
            )}

            <div className="h-1 w-full rounded-full bg-cream/20 overflow-hidden mb-3">
              <div
                className="h-full bg-cream rounded-full transition-all"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                aria-label="Canción anterior"
                className="text-cream/80 hover:text-cream transition"
              >
                ⏮
              </button>
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pausar" : "Reproducir"}
                className="w-10 h-10 rounded-full bg-cream text-peony-deep flex items-center justify-center text-lg hover:scale-105 transition"
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente canción"
                className="text-cream/80 hover:text-cream transition"
              >
                ⏭
              </button>
            </div>

            <ul className="mt-4 max-h-28 overflow-y-auto space-y-1">
              {AUDIO_TRACKS.map((t, i) => (
                <li key={t.src}>
                  <button
                    onClick={() => {
                      setCurrent(i);
                      setProgress(0);
                      setPlaying(true);
                      setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
                    }}
                    className={`w-full text-left text-xs truncate px-2 py-1 rounded-lg transition ${
                      i === current ? "bg-cream/20 text-cream" : "text-blush/70 hover:bg-cream/10"
                    }`}
                  >
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir reproductor de música"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-peony to-indigo shadow-xl flex items-center justify-center text-cream text-xl animate-drift"
      >
        {playing ? "♪" : "♫"}
      </motion.button>
    </div>
  );
}
