"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLOWER_MESSAGE } from "@/lib/config";

/**
 * Ramo interactivo de flores amarillas, dibujado como un solo bouquet
 * (tallos + moño). Cada flor empieza como un capullo cerrado sobre su
 * tallo; al tocarla, florece ahí mismo. Cuando las 4 florecen, se
 * revela una dedicatoria corta (FLOWER_MESSAGE en @/lib/config).
 */

type FlowerId = "sunflower" | "peony" | "daisy" | "tulip";

// --- pétalos genéricos, centrados en el origen (0,0) ---
function Petals({
  count,
  radius,
  rx,
  ry,
  color,
}: {
  count: number;
  radius: number;
  rx: number;
  ry: number;
  color: string;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} transform={`rotate(${(360 / count) * i})`}>
          <ellipse cx="0" cy={-radius} rx={rx} ry={ry} fill={color} />
        </g>
      ))}
    </>
  );
}

// --- cabezas de flor, cada una centrada en (0,0), listas para transform="translate(x y)" ---
function SunflowerHead() {
  return (
    <g>
      <Petals count={16} radius={15} rx={4.2} ry={11} color="#F6C445" />
      <circle r="9.5" fill="#6B4226" />
      <circle r="9.5" fill="url(#sf-shine)" />
    </g>
  );
}

function PeonyHead() {
  return (
    <g>
      <Petals count={9} radius={12} rx={8} ry={7} color="#F7DFA0" />
      <Petals count={7} radius={6} rx={5.5} ry={5} color="#F2C14E" />
      <circle r="3.5" fill="#E0A93A" />
    </g>
  );
}

function DaisyHead() {
  return (
    <g>
      <Petals count={15} radius={13} rx={2.6} ry={10} color="#FDF6DC" />
      <circle r="6.5" fill="#EAA83D" />
    </g>
  );
}

function TulipHead() {
  return (
    <g transform="translate(0,4)">
      <path d="M0 -16 C-8 -16 -11 -8 -10 0 C-9 5 -5 8 0 10 C5 8 9 5 10 0 C11 -8 8 -16 0 -16Z" fill="#F5C242" />
      <path d="M0 -14 C-5 -13 -8 -7 -7.5 -1 C-7 3 -4.5 6 0 8Z" fill="#E0A93A" opacity="0.5" />
    </g>
  );
}

// --- capullo cerrado (antes de florecer) ---
function Bud({ color }: { color: string }) {
  return (
    <g>
      <ellipse rx="5" ry="7" fill={color} />
      <ellipse rx="5" ry="7" fill="#000" opacity="0.06" />
    </g>
  );
}

function Leaf({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d="M0 0 C10 -3 18 2 20 10 C10 10 1 7 0 0Z" fill="#7BA05B" />
    </g>
  );
}

interface FlowerSlot {
  id: FlowerId;
  label: string;
  Head: () => JSX.Element;
  budColor: string;
  x: number;
  y: number;
  stem: string; // path "d", desde el moño hasta (x, y)
}

const BOW = { x: 150, y: 232 };

const FLOWERS: FlowerSlot[] = [
  {
    id: "sunflower",
    label: "girasol",
    Head: SunflowerHead,
    budColor: "#C9A227",
    x: 92,
    y: 112,
    stem: `M${BOW.x} ${BOW.y} Q100 178 92 112`,
  },
  {
    id: "peony",
    label: "peonía",
    Head: PeonyHead,
    budColor: "#D8B45A",
    x: 136,
    y: 72,
    stem: `M${BOW.x} ${BOW.y} Q128 150 136 72`,
  },
  {
    id: "daisy",
    label: "margarita",
    Head: DaisyHead,
    budColor: "#E4D9A8",
    x: 182,
    y: 76,
    stem: `M${BOW.x} ${BOW.y} Q172 150 182 76`,
  },
  {
    id: "tulip",
    label: "tulipán",
    Head: TulipHead,
    budColor: "#D8A93A",
    x: 224,
    y: 114,
    stem: `M${BOW.x} ${BOW.y} Q202 178 224 114`,
  },
];

export default function YellowFlowers() {
  const [bloomed, setBloomed] = useState<FlowerId[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const allBloomed = bloomed.length === FLOWERS.length;

  const bloom = (id: FlowerId) => {
    if (bloomed.includes(id)) return;
    const next = [...bloomed, id];
    setBloomed(next);
    if (next.length === FLOWERS.length) {
      setTimeout(() => setShowMessage(true), 500);
    }
  };

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-md text-center mb-8">
        <span className="font-body tracking-[0.3em] text-xs uppercase text-peony">
          Para ti
        </span>
        <h2 className="font-display italic text-3xl md:text-4xl text-cream mt-3">
          Un ramo que no te pude dar
        </h2>
        <p className="font-body text-blush/50 text-xs mt-3">
          {allBloomed ? "completo ✓" : "toca cada capullo para que florezca"}
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-3xl border border-periwinkle/25 bg-gradient-to-br from-indigo/30 to-peony-deep/20 backdrop-blur-sm overflow-hidden">
        <svg viewBox="0 0 300 260" className="w-full h-auto select-none">
          <defs>
            <radialGradient id="sf-shine" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* tallos */}
          {FLOWERS.map((f) => (
            <path key={f.id} d={f.stem} stroke="#7BA05B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          ))}

          {/* hojas */}
          <Leaf x={118} y={178} angle={-15} />
          <Leaf x={160} y={160} angle={20} />
          <Leaf x={190} y={178} angle={40} />
          <Leaf x={128} y={205} angle={-35} />

          {/* moño */}
          <g transform={`translate(${BOW.x} ${BOW.y})`}>
            <path d="M0 0 C-4 22 -2 40 0 48 C2 40 4 22 0 0Z" fill="#C89540" />
            <path d="M-3 18 C-14 24 -18 40 -12 52 C-6 44 -3 30 -3 18Z" fill="#E6B655" />
            <path d="M3 18 C14 24 18 40 12 52 C6 44 3 30 3 18Z" fill="#E6B655" />
            <path d="M0 -18 C-16 -22 -22 -10 -18 -2 C-10 -4 -2 -10 0 -18Z" fill="#E6B655" />
            <path d="M0 -18 C16 -22 22 -10 18 -2 C10 -4 2 -10 0 -18Z" fill="#E6B655" />
            <circle r="6" fill="#C89540" />
          </g>

          {/* capullos / flores */}
          {FLOWERS.map((f) => {
            const isBloomed = bloomed.includes(f.id);
            return (
              <g
                key={f.id}
                transform={`translate(${f.x} ${f.y})`}
                onClick={() => bloom(f.id)}
                style={{ cursor: isBloomed ? "default" : "pointer" }}
              >
                {/* zona de toque, invisible pero más grande que el dibujo */}
                <circle r="20" fill="transparent" />

                <motion.g
                  animate={
                    isBloomed
                      ? { opacity: 0, scale: 0.3 }
                      : { opacity: 1, scale: [1, 1.12, 1] }
                  }
                  transition={
                    isBloomed
                      ? { duration: 0.3 }
                      : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <Bud color={f.budColor} />
                </motion.g>

                <motion.g
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={
                    isBloomed
                      ? {
                          opacity: 1,
                          scale: 1,
                          rotate: [0, -3, 3, 0],
                        }
                      : { opacity: 0, scale: 0.2 }
                  }
                  transition={
                    isBloomed
                      ? {
                          opacity: { duration: 0.4 },
                          scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                          rotate: { delay: 0.6, duration: 4, repeat: Infinity, ease: "easeInOut" },
                        }
                      : { duration: 0.2 }
                  }
                >
                  <f.Head />
                </motion.g>
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-periwinkle/15 px-7 py-8 text-center"
            >
              <p className="font-display italic text-lg text-cream whitespace-pre-line leading-relaxed">
                {FLOWER_MESSAGE}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}