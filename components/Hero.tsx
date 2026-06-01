"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.13,
      ease: EASE,
    },
  }),
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-mono text-sm text-muted mb-6 tracking-widest uppercase"
        >
          {t.hero.location}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-7xl lg:text-[5.5rem] font-semibold leading-none tracking-tight mb-6 text-accent"
        >
          Juan José
          <br />
          Bernal Núñez
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xl sm:text-2xl text-muted max-w-xl mb-12 leading-relaxed"
        >
          {t.hero.role[0]}
          <br />
          {t.hero.role[1]}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-accent hover:text-white active:bg-accent-dark transition-colors duration-200"
          >
            {t.hero.ctaProjects}
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-border text-sm font-medium rounded-full hover:border-accent hover:text-accent active:text-accent-dark active:border-accent-dark transition-colors duration-200"
          >
            {t.hero.ctaAbout}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
