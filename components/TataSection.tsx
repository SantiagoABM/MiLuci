"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TATA_IMAGE, TATA_ITEMS } from "@/lib/config";

export default function TataSection() {
  const [open, setOpen] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
    setOpen((o) => !o);
  };

  return (
    <section className="relative px-6 py-4">
      {/* Línea divisoria con el muñeco al centro */}
      <div className="mx-auto max-w-4xl flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-periwinkle/40 to-peony/40" />

        <motion.button
          onClick={handleClick}
          aria-label={open ? "Cerrar sección" : "Abrir sección"}
          whileHover={{ scale: 1.08 }}
          animate={bouncing ? { scale: [1, 1.35, 0.85, 1.08, 1] } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-16 h-16 md:w-20 md:h-20 shrink-0"
        >
          <Image
            src={TATA_IMAGE}
            alt="Tata"
            fill
            className="object-contain drop-shadow-lg"
            unoptimized
          />
        </motion.button>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-periwinkle/40 to-peony/40" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="tata-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-auto max-w-3xl py-12 space-y-14">
              {TATA_ITEMS.map((item, i) => {
                const reverse = i % 2 === 1;
                return (
                  <motion.div
                    key={item.title + i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col md:flex-row ${
                      reverse ? "md:flex-row-reverse" : ""
                    } items-center gap-6 md:gap-10`}
                  >
                    <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border border-periwinkle/20">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h3 className="font-display italic text-2xl text-cream mb-3">
                        {item.title}
                      </h3>
                      <p className="font-body text-blush/75 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}