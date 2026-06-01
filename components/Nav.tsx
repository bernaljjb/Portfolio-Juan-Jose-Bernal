"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, t, toggle } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: [string, string][] = [
    [t.nav.projects, "#projects"],
    [t.nav.about, "#about"],
    [t.nav.contact, "#contact"],
  ];

  const langs: Lang[] = ["es", "en"];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Image
          src="/Images/LogoJJB/Logo JJB.png"
          alt="Juan José Bernal Núñez"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
        />

        <div className="flex items-center gap-8">
          <ul className="hidden sm:flex items-center gap-8 text-sm text-muted">
            {navLinks.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-accent active:text-accent-dark transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 font-mono text-xs tracking-widest">
            {langs.map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-border select-none">·</span>
                )}
                <button
                  onClick={() => l !== lang && toggle()}
                  className={`uppercase transition-colors duration-200 ${
                    lang === l
                      ? "text-foreground font-semibold cursor-default"
                      : "text-muted hover:text-accent active:text-accent-dark cursor-pointer"
                  }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
