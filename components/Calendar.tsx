"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  DAYS_IN_MONTH,
  DAY_PHOTOS,
  HIGHLIGHT_DAY,
  HIGHLIGHT_CAPTION,
  MONTH_NAME,
  MONTH_YEAR,
  CALENDAR_IMAGE_MODE,
} from "@/lib/config";

function Peony() {
  // Peonía SVG que se dibuja/abre con stroke-dashoffset + escala
  const petals = 8;
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
      <g transform="translate(100,100)">
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (360 / petals) * i;
          return (
            <ellipse
              key={i}
              cx="0"
              cy="-38"
              rx="20"
              ry="34"
              fill="url(#peonyGrad)"
              opacity="0.9"
              transform={`rotate(${angle})`}
              className="animate-bloom"
              style={{ animationDelay: `${i * 60}ms`, transformOrigin: "0 38px" }}
            />
          );
        })}
        <circle r="14" fill="#FBE4EC" />
      </g>
      <defs>
        <radialGradient id="peonyGrad">
          <stop offset="0%" stopColor="#FBE4EC" />
          <stop offset="60%" stopColor="#E893B3" />
          <stop offset="100%" stopColor="#C65D82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Calendar() {
  const [selected, setSelected] = useState<number | null>(null);
  const days = Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1);

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl text-center mb-12">
        <span className="font-body tracking-[0.3em] text-xs uppercase text-peony">
          Calendario
        </span>
        <h2 className="font-display italic text-3xl md:text-4xl text-cream mt-3">
          {MONTH_NAME}
          {/* {MONTH_YEAR} */}
        </h2>
        <p className="font-body text-blush/70 text-sm mt-3 max-w-md mx-auto">
          Toca cualquier día para ver el recuerdo. El {HIGHLIGHT_DAY} es especial.
        </p>
      </div>

      <div className="mx-auto max-w-4xl grid grid-cols-4 sm:grid-cols-7 gap-3 md:gap-4">
        {days.map((day) => {
          const isHighlight = day === HIGHLIGHT_DAY;
          const photo = DAY_PHOTOS[day];

          return (
            <motion.button
              key={day}
              onClick={() => setSelected(day)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (day % 7) * 0.03 }}
              whileHover={{ scale: 1.06, zIndex: 10 }}
              whileTap={{ scale: 0.97 }}
              className={`relative aspect-square rounded-xl overflow-hidden border ${isHighlight
                  ? "border-peony-deep animate-glow col-span-2 row-span-2 sm:col-span-1 sm:row-span-1"
                  : "border-periwinkle/20"
                }`}
            >
              {CALENDAR_IMAGE_MODE === "eager" && photo ? (
                <Image src={photo} alt={`Día ${day}`} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full bg-indigo/30 flex items-center justify-center text-blush/90 text-lg">
                  ♥
                </div>
              )}
              {/* {photo ? (
                <Image src={photo} alt={`Recuerdo ${day}`} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full bg-indigo/30 flex items-center justify-center text-blush/40">
                  ♥
                </div>
              )} */}

              {isHighlight && (
                <div className="absolute inset-0">
                  <Peony />
                </div>
              )}

              <div
                className={`absolute bottom-1 right-1.5 font-body text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded-full ${isHighlight
                    ? "bg-cream text-peony-deep"
                    : "bg-midnight/60 text-cream/90"
                  }`}
              >
                {day}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/85 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="polaroid max-w-xs w-full"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                {DAY_PHOTOS[selected] ? (
                  <Image
                    src={DAY_PHOTOS[selected]}
                    alt={`Recuerdo ${selected}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-indigo/20 flex items-center justify-center text-peony-deep text-3xl">
                    ♥
                  </div>
                )}
              </div>
              <p className="font-display italic text-midnight text-center mt-3">
                {selected === HIGHLIGHT_DAY ? HIGHLIGHT_CAPTION : `Recuerdo ${selected}`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
