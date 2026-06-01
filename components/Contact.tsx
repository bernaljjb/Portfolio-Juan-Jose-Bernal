"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-28 px-6 bg-neutral-950">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm uppercase tracking-widest mb-6 text-white/40"
        >
          {t.contact.label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-none text-white mb-10"
        >
          {t.contact.heading[0]}
          <br />
          {t.contact.heading[1]}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-12"
        >
          <a
            href="mailto:juanjose.bernal14@gmail.com"
            className="text-lg sm:text-2xl font-medium text-white border-b border-white/20 pb-1 hover:text-accent hover:border-accent active:text-accent-dark active:border-accent-dark transition-colors duration-200"
          >
            juanjose.bernal14@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="flex gap-6"
        >
          <a
            href="https://www.linkedin.com/in/juanjosebernal-uxuidesigner/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/50 hover:text-accent active:text-accent-dark transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://www.behance.net/juanjoseb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/50 hover:text-accent active:text-accent-dark transition-colors duration-200"
          >
            Behance ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
