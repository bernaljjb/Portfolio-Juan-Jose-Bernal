"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Ticker() {
  const { t } = useLanguage();
  const items = [...t.ticker.skills, ...t.ticker.skills];

  return (
    <div className="overflow-hidden bg-neutral-950 py-4 select-none">
      <div className="ticker-track inline-flex whitespace-nowrap">
        {items.map((skill, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-sm font-medium uppercase tracking-widest text-white px-5">
              {skill}
            </span>
            <span className="text-accent opacity-70 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
