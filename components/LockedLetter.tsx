"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  COLLAGE_PHOTOS,
  CORRECT_PHOTO_INDEX,
  LOCK_MODE,
  LOCK_HINT,
  LOCK_CODE,
  LOCK_CODE_HINT,
  LOVE_LETTER,
} from "@/lib/config";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function LockedLetter() {
  const [unlocked, setUnlocked] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [code, setCode] = useState("");

  // Fotos con su índice original, barajadas solo en el cliente
  // (evita descuadres entre el render de servidor y el del navegador).
  const [options, setOptions] = useState(
    COLLAGE_PHOTOS.map((src, index) => ({ src, index }))
  );
  useEffect(() => {
    setOptions(shuffle(COLLAGE_PHOTOS.map((src, index) => ({ src, index }))));
  }, []);

  const triggerWrong = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const handlePhotoPick = (index: number) => {
    if (index === CORRECT_PHOTO_INDEX) {
      setUnlocked(true);
    } else {
      triggerWrong();
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === LOCK_CODE.trim().toLowerCase()) {
      setUnlocked(true);
    } else {
      triggerWrong();
      setCode("");
    }
  };

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-md text-center mb-10">
        <span className="font-body tracking-[0.3em] text-xs uppercase text-peony">
          Una carta
        </span>
        <h2 className="font-display italic text-3xl md:text-4xl text-cream mt-3">
          Está cerrada con llave
        </h2>
      </div>

      <motion.div
        animate={shaking ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md rounded-3xl border border-periwinkle/25 bg-gradient-to-br from-indigo/30 to-peony-deep/20 backdrop-blur-sm overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="p-6 md:p-8"
            >
              <motion.div
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl mb-5"
              >
                🔒
              </motion.div>

              {LOCK_MODE === "image" ? (
                <>
                  <p className="font-body text-blush/80 text-sm mb-5">{LOCK_HINT}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {options.map(({ src, index }) => (
                      <motion.button
                        key={src + index}
                        onClick={() => handlePhotoPick(index)}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative aspect-square rounded-lg overflow-hidden border border-periwinkle/30"
                      >
                        <Image src={src} alt="Opción" fill className="object-cover" unoptimized />
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleCodeSubmit} className="flex flex-col items-center gap-3">
                  <p className="font-body text-blush/60 text-xs">{LOCK_CODE_HINT}</p>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Escribe la clave"
                    className="w-full max-w-[220px] text-center rounded-full bg-cream/95 text-midnight placeholder:text-midnight/40 font-body px-5 py-3 outline-none focus:ring-2 focus:ring-peony"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-peony hover:bg-peony-deep transition text-cream font-body text-sm px-6 py-2.5"
                  >
                    Abrir carta
                  </button>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 md:p-10"
            >
              <div className="text-4xl mb-4">🔓</div>
              <p className="font-display italic text-lg md:text-xl text-cream whitespace-pre-line leading-relaxed">
                {LOVE_LETTER}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
