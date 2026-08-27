"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { translations } from "@/lib/translations";
import type { T } from "@/lib/translations";

export type Lang = "es" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
