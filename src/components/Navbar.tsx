"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Work",     href: "#work"     },
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Clients",  href: "#clients"  },
  { label: "Contact",  href: "#contact"  },
];

function smooth(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open,     setOpen]       = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: .7, ease: [.22,1,.36,1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050608]/90 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-14 lg:px-20 h-16 md:h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" }); }}
            className="flex items-center gap-3"
            aria-label="BSR Films — home"
          >
            <Image
              src="/bsr-icon.png"
              alt="BSR Films"
              width={110}
              height={72}
              className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              priority
            />
            <span className="text-white/70 font-light text-xs tracking-[.22em] uppercase hidden sm:inline">Films</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => { e.preventDefault(); smooth(l.href); }}
                    className="relative text-white/70 text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.8)] group"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E3A652] transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_#E3A652]" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); smooth("#contact"); }}
            className="hidden md:inline-flex cta-primary hover:shadow-[0_0_20px_rgba(227,166,82,0.4)] hover:scale-105 transition-all duration-300"
            aria-label="Start a project with BSR Films"
          >
            Start a Project
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setOpen(p => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4"}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }}
            className="fixed inset-0 z-40 bg-[#050608]/97 backdrop-blur-xl flex flex-col items-start justify-center px-10 gap-8 md:hidden"
            role="dialog" aria-modal="true"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .05 }}
                onClick={e => { e.preventDefault(); setOpen(false); smooth(l.href); }}
                className="text-white text-3xl font-extrabold tracking-tight hover:text-[#E3A652] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); setOpen(false); smooth("#contact"); }}
              className="cta-primary mt-4"
            >
              Start a Project
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
