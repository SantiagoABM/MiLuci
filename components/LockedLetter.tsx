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
  COUPLE_NAMES,
} from "@/lib/config";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function WaxSeal({ broken }: { broken: boolean }) {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      animate={
        broken
          ? { scale: [1, 1.15, 0], opacity: [1, 1, 0], rotate: [0, -8, 12] }
          : { rotate: [0, -2, 2, 0] }
      }
      transition={
        broken
          ? { duration: 0.6, ease: "easeIn" }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <circle cx="32" cy="32" r="30" fill="currentColor" className="text-peony-deep" />
      <circle cx="32" cy="32" r="30" fill="url(#seal-sheen)" />
      <defs>
        <radialGradient id="seal-sheen" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M32 22c-5-6-16-3-16 5 0 8 10 13 16 19 6-6 16-11 16-19 0-8-11-11-16-5Z"
        fill="none"
        stroke="currentColor"
        className="text-cream/90"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function EnvelopeFlap() {
  return (
    <svg width="100%" height="36" viewBox="0 0 400 36" preserveAspectRatio="none" className="block">
      <path
        d="M0 0 L200 34 L400 0 L400 2 L200 36 L0 2 Z"
        fill="currentColor"
        className="text-indigo/40"
      />
    </svg>
  );
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
        className="relative mx-auto max-w-md rounded-3xl border border-periwinkle/25 bg-gradient-to-br from-indigo/30 to-peony-deep/20 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]"
      >
        {/* solapa de sobre, decorativa, siempre visible */}
        <div className="text-indigo/50 pointer-events-none">
          <EnvelopeFlap />
        </div>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="px-6 pb-8 pt-2 md:px-8 md:pb-10 text-center"
            >
              <div className="flex justify-center -mt-2 mb-6 text-peony">
                <WaxSeal broken={false} />
              </div>

              {LOCK_MODE === "image" ? (
                <>
                  <p className="font-body text-blush/75 text-sm mb-5">{LOCK_HINT}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {options.map(({ src, index }) => (
                      <motion.button
                        key={src + index}
                        onClick={() => handlePhotoPick(index)}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        className="relative aspect-square rounded-xl overflow-hidden border border-periwinkle/25 ring-0 hover:ring-2 hover:ring-peony/60 transition-shadow"
                      >
                        <Image src={src} alt="Opción" fill className="object-cover" unoptimized />
                        <span className="absolute inset-0 bg-midnight/0 hover:bg-midnight/10 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleCodeSubmit} className="flex flex-col items-center gap-3">
                  <p className="font-body text-blush/60 text-xs">{LOCK_CODE_HINT}</p>
                  <div className="relative w-full max-w-[240px]">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Escribe la clave"
                      className="w-full text-center rounded-full bg-cream/95 text-midnight placeholder:text-midnight/40 font-body px-5 py-3 outline-none focus:ring-2 focus:ring-peony transition-shadow"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-peony hover:bg-peony-deep transition-colors text-cream font-body text-sm px-7 py-2.5 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.4)]"
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
              className="relative px-7 py-10 md:px-10 md:py-12"
            >
              {/* textura sutil tipo papel */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 28px)",
                }}
              />

              <motion.div
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="flex justify-center mb-5 text-peony/70"
              >
                <WaxSeal broken />
              </motion.div>

              <p className="relative font-display italic text-lg md:text-xl text-cream whitespace-pre-line leading-relaxed text-center">
                {LOVE_LETTER}
              </p>

              <div className="relative mt-8 flex items-center justify-center gap-3 text-peony/50">
                <span className="h-px w-10 bg-peony/30" />
                <span className="font-display italic text-sm">{COUPLE_NAMES}</span>
                <span className="h-px w-10 bg-peony/30" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}