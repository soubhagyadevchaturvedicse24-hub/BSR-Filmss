"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

function smooth(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Body scroll lock on mobile menu ──────────────────────────────
  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      document.body.classList.add("mobile-menu-open");
      document.body.style.top = `-${scrollYRef.current}px`;
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.top = "";
    };
  }, [open]);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    // Small delay to let the menu close animation start
    setTimeout(() => smooth(href), 100);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
          ? isDark
            ? "bg-[#050608]/90 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-[#F5F0E8]/90 backdrop-blur-md shadow-lg border-b border-black/5"
          : "bg-transparent"
          }`}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-3 sm:px-5 md:px-14 lg:px-20 h-12 sm:h-14 md:h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 sm:gap-3"
            aria-label="BSR Films — home"
          >
            <Image
              src="/bsr-icon.png"
              alt="BSR Films"
              width={110}
              height={72}
              className="h-8 sm:h-10 md:h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              priority
            />
            <span className="text-[var(--text-muted)] font-light text-xs tracking-[.22em] uppercase hidden sm:inline">Films</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => { e.preventDefault(); smooth(l.href); }}
                    className="relative text-[var(--text-muted)] text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:text-[var(--text-heading)] hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.8)] group"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E3A652] transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_#E3A652]" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle + Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); smooth("#contact"); }}
              className="inline-flex cta-primary hover:shadow-[0_0_20px_rgba(227,166,82,0.4)] hover:scale-105 transition-all duration-300"
              aria-label="Start a project with BSR Films"
            >
              Start a Project
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Hamburger — larger tap target */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-3 -mr-1"
            onClick={() => setOpen(p => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
          >
            <span className={`block h-[1.5px] transition-all duration-300 ${isDark ? 'bg-white' : 'bg-[#1A1714]'} ${open ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`} />
            <span className={`block h-[1.5px] transition-all duration-300 ${isDark ? 'bg-white' : 'bg-[#1A1714]'} ${open ? "w-0 opacity-0" : "w-4"}`} />
            <span className={`block h-[1.5px] transition-all duration-300 ${isDark ? 'bg-white' : 'bg-[#1A1714]'} ${open ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"}`} />
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
            className="fixed inset-0 z-40 flex flex-col items-start justify-center px-8 sm:px-10 gap-6 sm:gap-8 md:hidden"
            style={{
              background: isDark ? 'rgba(5,6,8,0.97)' : 'rgba(245,240,232,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            role="dialog" aria-modal="true"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .05 }}
                onClick={e => { e.preventDefault(); handleNavClick(l.href); }}
                className="text-[var(--text-heading)] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight hover:text-[#E3A652] transition-colors active:text-[#E3A652]"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNavClick("#contact"); }}
              className="cta-primary mt-2 sm:mt-4"
            >
              Start a Project
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
