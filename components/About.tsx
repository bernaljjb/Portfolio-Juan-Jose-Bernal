"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section id="about" className="py-28 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-sm text-muted uppercase tracking-widest mb-3">
          {t.about.label}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            {t.about.heading[0]}
            <br />
            {t.about.heading[1]}
          </h2>
          <p className="text-muted leading-relaxed text-lg pt-1">{t.about.bio}</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.about.expertise.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="p-6 border border-border rounded-2xl bg-background"
            >
              <h3 className="font-semibold mb-4">{area.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
