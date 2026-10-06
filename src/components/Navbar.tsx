"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { label: { en: "Work", hi: "कार्य" }, href: "#work", isRoute: false },
  { label: { en: "About", hi: "परिचय" }, href: "#about", isRoute: false },
  { label: { en: "Services", hi: "सेवाएं" }, href: "#services", isRoute: false },
  { label: { en: "Clients", hi: "ग्राहक" }, href: "#clients", isRoute: false },
  { label: { en: "Founder", hi: "संस्थापक" }, href: "/founder", isRoute: true },
  { label: { en: "Contact", hi: "संपर्क" }, href: "#contact", isRoute: false },
];

function smooth(href: string) {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const scrollYRef = useRef(0);
  const menuFirstLinkRef = useRef<HTMLAnchorElement>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    const sections = ["hero", "work", "about", "services", "clients", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
      // Focus first link after menu opens for keyboard accessibility
      requestAnimationFrame(() => menuFirstLinkRef.current?.focus());
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

  const handleNavClick = useCallback((href: string, isRoute: boolean) => {
    setOpen(false);
    if (!isRoute) {
      setTimeout(() => smooth(href), 100);
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-[#050608] shadow-lg border-b border-white/10"
              : "bg-[#F5F0E8] shadow-lg border-b border-black/5"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-3 sm:px-5 md:px-14 lg:px-20 h-12 sm:h-14 md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3"
            aria-label="BSR Films — home"
          >
            <Image
              src="/bsr-icon.webp"
              alt="BSR Films"
              width={110}
              height={72}
              className="h-8 sm:h-10 md:h-16 w-auto object-contain md:drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              priority
            />
            <span className="text-[var(--text-muted)] font-light text-xs tracking-[.22em] uppercase hidden sm:inline">
              Films
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-8">
              {navItems.map((item) => {
                const text = item.label[lang] || item.label.en;
                const isActive = activeSection === item.href.slice(1);

                return (
                  <li key={item.href}>
                    {item.isRoute ? (
                      <Link
                        href={item.href}
                        className="relative text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:text-[var(--text-heading)] hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.8)] text-[var(--text-muted)] group flex items-center gap-1"
                      >
                        <span>{text}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E3A652] opacity-80" />
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E3A652] transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_#E3A652]" />
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          smooth(item.href);
                        }}
                        className={`relative text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:text-[var(--text-heading)] hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.8)] group ${
                          isActive ? "text-[#E3A652]" : "text-[var(--text-muted)]"
                        }`}
                      >
                        {text}
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] bg-[#E3A652] transition-all duration-300 ease-out shadow-[0_0_8px_#E3A652] ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Language Toggle + Theme Toggle + Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smooth("#contact");
              }}
              className={`nav-gold-cta py-3 px-6 lg:py-3.5 lg:px-8 font-black tracking-wide cursor-pointer ${
                lang === "hi" ? "text-lg lg:text-xl" : "text-base lg:text-lg"
              }`}
              aria-label="Start a project with BSR Films"
            >
              <span>{lang === "hi" ? "प्रोजेक्ट शुरू करें" : "Start a Project"}</span>
              <svg width="16" height="12" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="flex-shrink-0 ml-1">
                <path
                  d="M1 5h12M8 1l5 4-5 4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Mobile/Tablet: Language + Theme + CTA + Hamburger */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smooth("#contact");
              }}
              className={`hidden sm:inline-flex nav-gold-cta py-2 px-3.5 font-black cursor-pointer mr-1 ${
                lang === "hi" ? "text-sm font-black" : "text-xs font-black"
              }`}
              aria-label="Start a project with BSR Films"
            >
              <span>{lang === "hi" ? "प्रोजेक्ट शुरू करें" : "Start a Project"}</span>
            </a>
            <button
              className="flex flex-col gap-[5px] p-2.5 -mr-1 min-w-[40px] min-h-[40px] items-center justify-center cursor-pointer"
              onClick={() => setOpen((p) => !p)}
              aria-label={open ? "Close menu" : "Open menu"}
              {...(open ? { "aria-expanded": "true" } : {})}
            >
              <span
                className={`block h-[1.5px] transition-all duration-300 ${
                  isDark ? "bg-white" : "bg-[#1A1714]"
                } ${open ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`}
              />
              <span
                className={`block h-[1.5px] transition-all duration-300 ${
                  isDark ? "bg-white" : "bg-[#1A1714]"
                } ${open ? "w-0 opacity-0" : "w-4"}`}
              />
              <span
                className={`block h-[1.5px] transition-all duration-300 ${
                  isDark ? "bg-white" : "bg-[#1A1714]"
                } ${open ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center px-8 sm:px-10 gap-5 sm:gap-6 md:hidden"
            style={{
              background: isDark ? "rgba(5,6,8,0.98)" : "rgba(245,240,232,0.98)",
            }}
            role="dialog"
            aria-modal="true"
          >
            {navItems.map((item, i) => {
              const text = item.label[lang] || item.label.en;
              return item.isRoute ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[var(--text-heading)] text-xl sm:text-2xl font-extrabold tracking-tight hover:text-[#E3A652] transition-colors flex items-center gap-2"
                >
                  <span>{text}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#E3A652]/20 text-[#E3A652] font-medium">
                    Profile
                  </span>
                </Link>
              ) : (
                <motion.a
                  key={item.href}
                  href={item.href}
                  ref={i === 0 ? menuFirstLinkRef : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, false);
                  }}
                  className="text-[var(--text-heading)] text-xl sm:text-2xl font-extrabold tracking-tight hover:text-[#E3A652] transition-colors active:text-[#E3A652]"
                >
                  {text}
                </motion.a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact", false);
              }}
              className={`nav-gold-cta mt-4 py-4 px-8 font-black w-full max-w-xs text-center justify-center min-h-[52px] ${
                lang === "hi" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              }`}
            >
              <span>{lang === "hi" ? "प्रोजेक्ट शुरू करें" : "Start a Project"}</span>
              <svg width="16" height="12" viewBox="0 0 14 10" fill="none" className="flex-shrink-0 ml-1">
                <path
                  d="M1 5h12M8 1l5 4-5 4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
