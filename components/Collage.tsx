"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { COLLAGE_PHOTOS, HERO_TITLE, HERO_SUBTITLE } from "@/lib/config";

// Posiciones y rotaciones "esparcidas" para cada polaroid.
// Si añades más o menos fotos en config.ts, ajusta este arreglo.
const LAYOUT = [
  { top: "4%", left: "6%", rotate: -9, size: 190, delay: 0 },
  { top: "2%", left: "58%", rotate: 6, size: 170, delay: 0.08 },
  { top: "34%", left: "2%", rotate: 5, size: 160, delay: 0.16 },
  { top: "44%", left: "70%", rotate: -7, size: 200, delay: 0.24 },
  { top: "62%", left: "30%", rotate: -4, size: 175, delay: 0.32 },
  { top: "58%", left: "50%", rotate: 10, size: 150, delay: 0.4 },
];

export default function Collage() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center px-6">
      {/* halo de fondo azul -> peonía */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(123,143,214,0.35),transparent_45%),radial-gradient(circle_at_75%_70%,rgba(198,93,130,0.35),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-5xl h-[560px] hidden md:block">
        {COLLAGE_PHOTOS.slice(0, LAYOUT.length).map((src, i) => {
          const pos = LAYOUT[i];
          return (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 40, rotate: 0, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotate: pos.rotate, scale: 1 }}
              transition={{ duration: 0.8, delay: pos.delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
              className="polaroid absolute cursor-pointer"
              style={{ top: pos.top, left: pos.left, width: pos.size }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                <Image src={src} alt="Recuerdo" fill className="object-cover" unoptimized />
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <span className="font-body tracking-[0.35em] text-xs md:text-sm uppercase text-blush/80 mb-3">
            Colección de recuerdos
          </span>
          <h1 className="font-display italic text-4xl md:text-6xl text-cream text-shadow-soft max-w-2xl leading-tight">
            {HERO_TITLE}
          </h1>
          <p className="font-body text-blush/90 mt-4 max-w-md text-sm md:text-base">
            {HERO_SUBTITLE}
          </p>
        </motion.div>
      </div>

      {/* Versión móvil: collage simplificado en grilla */}
      <div className="md:hidden relative z-10 w-full max-w-sm mx-auto pt-20 pb-10">
        <div className="text-center mb-8">
          <span className="font-body tracking-[0.3em] text-xs uppercase text-blush/80">
            Colección de recuerdos
          </span>
          <h1 className="font-display italic text-3xl text-cream text-shadow-soft mt-3">
            {HERO_TITLE}
          </h1>
          <p className="font-body text-blush/90 mt-3 text-sm">{HERO_SUBTITLE}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {COLLAGE_PHOTOS.slice(0, 4).map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="polaroid"
              style={{ transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)` }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                <Image src={src} alt="Recuerdo" fill className="object-cover" unoptimized />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blush/70 font-body text-xs tracking-[0.3em] uppercase"
      >
        Desliza ↓
      </motion.div>
    </section>
  );
}
