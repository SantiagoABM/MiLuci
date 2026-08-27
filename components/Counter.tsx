"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { START_DATE } from "@/lib/config";

type ElapsedTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS: { key: keyof ElapsedTime; label: string }[] = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
];

export default function Counter() {
  const [elapsed, setElapsed] = useState<ElapsedTime | null>(null);

  useEffect(() => {
    // Generar o recuperar un desplazamiento aleatorio (offset)
    // para que las horas/minutos no coincidan exactamente con la hora del reloj del usuario
    let randomOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
    try {
      const saved = sessionStorage.getItem("counter_time_offset");
      if (saved !== null) {
        randomOffset = Number(saved);
      } else {
        sessionStorage.setItem("counter_time_offset", String(randomOffset));
      }
    } catch {
      // Ignorar errores en caso de que sessionStorage no esté disponible
    }

    const calculateElapsed = () => {
      const start = new Date(START_DATE).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);

      // Los días se mantienen exactamente calculados con la fecha real (sin alterar)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Las horas, minutos y segundos inician desde un valor aleatorio y continúan avanzando
      const timeWithinDay = (diff + randomOffset) % (1000 * 60 * 60 * 24);
      const hours = Math.floor((timeWithinDay / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeWithinDay / (1000 * 60)) % 60);
      const seconds = Math.floor((timeWithinDay / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setElapsed(calculateElapsed());
    const id = setInterval(() => {
      setElapsed(calculateElapsed());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-body tracking-[0.3em] text-xs uppercase text-peony">
          Llevamos juntos
        </span>
        <h2 className="font-display italic text-3xl md:text-4xl text-cream mt-3 mb-10">
          Cada segundo cuenta
        </h2>

        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {UNITS.map((u, i) => (
            <motion.div
              key={u.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-gradient-to-br from-indigo/40 to-peony-deep/30 border border-periwinkle/30 py-5 px-2 md:py-7 backdrop-blur-sm"
            >
              <span
                className="font-display text-3xl md:text-5xl text-cream tabular-nums"
                suppressHydrationWarning
              >
                {elapsed ? String(elapsed[u.key]).padStart(2, "0") : "00"}
              </span>
              <div className="font-body text-[11px] md:text-xs uppercase tracking-[0.2em] text-blush/70 mt-2">
                {u.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
