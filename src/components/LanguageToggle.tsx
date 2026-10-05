"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full bg-white/[0.06] border border-white/10 p-0.5 shadow-inner transition-colors ${className}`}
      role="group"
      aria-label="Language selection / भाषा चयन"
    >
      <button
        type="button"
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        className={`px-2.5 py-1 rounded-full text-[0.68rem] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
          lang === "hi"
            ? "bg-[#E3A652] text-[#050608] shadow-sm shadow-[#E3A652]/30 scale-[1.02]"
            : "text-white/60 hover:text-white"
        }`}
      >
        हिन्दी
      </button>

      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1 rounded-full text-[0.68rem] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
          lang === "en"
            ? "bg-[#E3A652] text-[#050608] shadow-sm shadow-[#E3A652]/30 scale-[1.02]"
            : "text-white/60 hover:text-white"
        }`}
      >
        ENG
      </button>
    </div>
  );
}
