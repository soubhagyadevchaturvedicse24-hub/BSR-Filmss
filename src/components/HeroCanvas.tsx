"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

/**
 * ─── FRAME CONFIGURATION ──────────────────────────────────────────────────────
 *
 * Frames located at:  /public/frames/ezgif-frame-001.jpg → ezgif-frame-120.jpg
 *
 * Desktop (≥1024px):
 *   - Loads all 120 frames for silky smooth scroll-driven playback
 *   - GSAP ScrollTrigger pins the canvas; text/cards animate on scroll
 *   - "Why Choose" cards rendered as an overlay inside the pinned viewport
 *
 * Mobile (<1024px):
 *   - NO ScrollTrigger, NO sticky pinning, NO frame loading
 *   - Shows a single static hero image (frame 001) as a background
 *   - "Why Choose" content rendered as normal inline section below
 *   - Clean, native scrolling — zero lag
 * ──────────────────────────────────────────────────────────────────────────────
 */

const TOTAL_FRAMES = 120;
const SCROLL_MULTIPLIER = 2.5; // 250vh container on desktop

/** Returns the public URL for frame index i (0-based). */
const frameUrl = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.webp`;

/** Breakpoint: below this → static mobile hero */
const DESKTOP_MQ = "(min-width: 1024px)";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const leftGradientRef = useRef<HTMLDivElement>(null);
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const endOverlayRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean | null>(null); // null = SSR / not yet hydrated
  const { isHindi } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── gsap.matchMedia — all ScrollTrigger work lives INSIDE ────────
    // When the viewport drops below 1024px, GSAP automatically reverts
    // every ScrollTrigger, tween, and set() created inside this scope.
    // This means the mobile experience gets ZERO GSAP overhead.
    const mm = gsap.matchMedia();

    // Also track viewport for React-side conditional rendering
    const mqList = window.matchMedia(DESKTOP_MQ);
    const syncState = () => setIsDesktop(mqList.matches);
    syncState();
    mqList.addEventListener("change", syncState);

    // ══════════════════════════════════════════════════════════════════
    // DESKTOP SCOPE — Full scroll-driven canvas experience
    // ══════════════════════════════════════════════════════════════════
    mm.add(DESKTOP_MQ, (context) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { alpha: false })!;

      // Frame registry
      const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
      let loadedCount = 0;
      let currentFrame = 0;
      let stReady = false;
      let rafPending = false;

      // ── Draw helper: cover-fit image on canvas ──
      const drawFrame = (idx: number) => {
        const img = images[idx];
        if (!img?.complete || !img.naturalWidth) return;

        const scale = Math.max(
          canvas.width / img.naturalWidth,
          canvas.height / img.naturalHeight
        );
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        const dx = (canvas.width - dw) / 2;
        const dy = (canvas.height - dh) / 2;

        ctx.drawImage(img, dx, dy, dw, dh);
      };

      // ── Size canvas ──
      const sizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        if (images[currentFrame]?.complete) drawFrame(currentFrame);
      };
      sizeCanvas();
      window.addEventListener("resize", sizeCanvas, { passive: true });

      // cleanup registered via context (auto-reverted when MQ no longer matches)
      context.add("cleanup", () => {
        window.removeEventListener("resize", sizeCanvas);
      });

      // ── ScrollTrigger setup ──
      const setupScrollTrigger = () => {
        drawFrame(0);

        gsap.set(endOverlayRef.current, { opacity: 0, y: 80, pointerEvents: "none" });
        gsap.set(canvasOverlayRef.current, { opacity: 0 });
        gsap.set(heroTextRef.current, { x: 0, opacity: 1, filter: "none" });
        gsap.set(kickerRef.current, { y: 0, opacity: 1, filter: "none" });
        gsap.set(leftGradientRef.current, { opacity: 1 });

        const frameProxy = { frame: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=200vh",
            scrub: 1,
          },
        });

        // Track 1: Canvas frame sequence
        tl.to(frameProxy, {
          frame: TOTAL_FRAMES - 1,
          ease: "none",
          duration: 1,
          onUpdate() {
            const idx = Math.min(Math.round(frameProxy.frame), TOTAL_FRAMES - 1);
            if (idx === currentFrame) return;
            currentFrame = idx;
            if (!rafPending) {
              rafPending = true;
              requestAnimationFrame(() => {
                drawFrame(currentFrame);
                rafPending = false;
              });
            }
          },
        }, 0);

        // Track 2: Hero text exit
        tl.to(heroTextRef.current, {
          x: "-40vw",
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.in",
          duration: 0.35,
        }, 0);

        // Track 2b: Kicker fade
        tl.to(kickerRef.current, {
          y: -60,
          opacity: 0,
          filter: "blur(8px)",
          ease: "power2.in",
          duration: 0.35,
        }, 0);

        // Track 2c: Left gradient fade out so waterfall canvas is completely uncovered
        tl.to(leftGradientRef.current, {
          opacity: 0,
          ease: "power2.in",
          duration: 0.35,
        }, 0);

        // Track 4: End overlay cards (waterfall frame on canvas is 100% visible behind them)
        tl.fromTo(
          endOverlayRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            ease: "power1.out",
            duration: 0.3,
          },
          0.7
        );
      };

      // ── Batched frame preloader ──
      const BATCH_SIZE = 6;
      const EARLY_INIT_THRESHOLD = 10;

      const loadImage = (i: number): Promise<void> =>
        new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.src = frameUrl(i);
          img.onload = () => {
            loadedCount++;
            if (i === 0) drawFrame(0);
            if (loadedCount >= EARLY_INIT_THRESHOLD && !stReady) {
              stReady = true;
              setupScrollTrigger();
            }
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            if (loadedCount >= EARLY_INIT_THRESHOLD && !stReady) {
              stReady = true;
              setupScrollTrigger();
            }
            resolve();
          };
          images[i] = img;
        });

      const loadAllFrames = async () => {
        for (let start = 0; start < TOTAL_FRAMES; start += BATCH_SIZE) {
          const batch = [];
          for (let i = start; i < Math.min(start + BATCH_SIZE, TOTAL_FRAMES); i++) {
            batch.push(loadImage(i));
          }
          await Promise.all(batch);
        }
      };
      loadAllFrames();

      // Fallback: init ScrollTrigger even if some frames fail to load
      const fallback = setTimeout(() => {
        if (!stReady) {
          stReady = true;
          setupScrollTrigger();
        }
      }, 3000);

      context.add("cleanup", () => {
        clearTimeout(fallback);
      });
    });

    // ══════════════════════════════════════════════════════════════════
    // MOBILE SCOPE — No GSAP, no ScrollTrigger, clean native scroll
    // ══════════════════════════════════════════════════════════════════
    // (Empty — we handle mobile purely via React state + CSS)
    // The mm.add(DESKTOP_MQ) above auto-reverts on mobile, so all
    // gsap.set() calls are undone, all ScrollTriggers are killed,
    // and the DOM returns to its natural, un-animated state.

    return () => {
      mqList.removeEventListener("change", syncState);
      mm.revert(); // kills all ScrollTriggers + reverts all gsap.set() calls
    };
  }, []);

  // ── Bilingual data & reason cards ──
  const reasonCards = isHindi
    ? [
        {
          title: "25+ वर्षों का सिद्ध अनुभव एवं प्रतिष्ठा",
          body: "दो दशकों से अधिक समय से छत्तीसगढ़ में सिनेमाई मीडिया निर्माण, जन-सरोकार और संवेदनशील कथा-कथन का निर्बाध नेतृत्व।",
        },
        {
          title: "शासन व अंतरराष्ट्रीय संस्थानों का अटूट भरोसा",
          body: "NFDC और आकाशवाणी द्वारा विधिवत सूचीबद्ध। विश्व बैंक, यूनिसेफ और 20+ सरकारी विभागों के साथ सफल दीर्घकालिक साझेदारी।",
        },
        {
          title: "विश्वस्तरीय तकनीकी एवं सिनेमाई उत्कृष्टता",
          body: "मास्टर स्टोरीटेलर्स, 4K/6K सिनेमा सिनेमैटोग्राफी और अत्याधुनिक पोस्ट-प्रोडक्शन द्वारा त्रुटिहीन प्रस्तुति।",
        },
        {
          title: "संपूर्ण इन-हाउस सुविधाएं एक ही छत के नीचे",
          body: "एडवांस्ड ऑडियो/वीडियो एडिटिंग सूट्स, मल्टी-कैमरा प्रोडक्शन और क्रोमा स्टूडियो — हर फ्रेम पर पूर्ण गुणवत्ता नियंत्रण।",
        },
        {
          title: "सजग सामाजिक सरोकार और उत्तरदायित्व",
          body: "जन-जागरूकता, लोक-संस्कृति और संवेदनशील मुद्दों को प्रभावी रचनात्मक अभिव्यक्ति देने वाली उद्देश्यपूर्ण फिल्में।",
        },
      ]
    : [
        {
          title: "25+ Years of Proven Excellence",
          body: "Over two decades of cinematic media production and storytelling across Chhattisgarh.",
        },
        {
          title: "Trusted by Govts & Global Bodies",
          body: "Empanelled with NFDC & AIR. Partnered with World Bank, UNICEF & 20+ Govt Depts.",
        },
        {
          title: "Technical Excellence",
          body: "Master storytellers and post-production artists delivering flawless cinematic content.",
        },
        {
          title: "Full-Facility In-House",
          body: "Audio/Video suites, multi-cam & green screen. Everything under one roof for total control.",
        },
        {
          title: "Social Responsibility",
          body: "Crafting purpose-driven narratives that give a powerful voice to causes that matter.",
        },
      ];

  const kickerText = isHindi ? "रायपुर, छत्तीसगढ़ • 25+ वर्ष का गौरव" : "Raipur, Chhattisgarh • Est. 25+ Years";
  const headline1 = isHindi ? "छत्तीसगढ़ की माटी से" : "Stories from";
  const headline2 = isHindi ? "उपजी" : "the heart of";
  const headline3 = isHindi ? "अविस्मरणीय कहानियां" : "Chhattisgarh";
  const subtitle = isHindi
    ? "वृत्तचित्र, विज्ञापन फिल्में एवं सामाजिक जन-जागरूकता अभियान — देश के हृदय स्थल से सिनेमाई भव्यता और तकनीकी उत्कृष्टता के साथ निर्मित।"
    : "Documentaries, ad films and social campaigns — crafted with cinematic precision from the heart of India.";
  const ctaWork = isHindi ? "हमारा काम देखें" : "View Our Work";
  const ctaContact = isHindi ? "प्रोजेक्ट शुरू करें" : "Start a Project";
  const statsList = [
    ["25+", isHindi ? "वर्षों का अनुभव" : "Years of Experience"],
    ["650+", isHindi ? "वीडियो स्पॉट्स" : "Projects Delivered"],
    ["340+", isHindi ? "डॉक्यूमेंट्रीज" : "Documentaries"],
    ["20+", isHindi ? "शासकीय विभाग" : "Govt. Bodies"],
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
           HERO CONTAINER
           Desktop: 250vh tall for scroll distance, sticky canvas inside
           Mobile:  100vh tall, simple static hero, native scroll
           ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        id="hero"
        className={`relative w-full ${isDesktop === true ? "h-[250vh]" : "min-h-[100dvh]"}`}
        aria-label="Hero: BSR Films cinematic scroll experience"
      >
        {isDesktop === false ? (
          /* ═════════════════════════════════════════════════════════════
             MOBILE VIEW (<1024px) — Pure Native Mobile-First Layout
             ═════════════════════════════════════════════════════════════ */
          <div className="relative w-full min-h-[100dvh] flex flex-col justify-end px-5 sm:px-8 pb-10 sm:pb-12 pt-24 overflow-hidden">
            {/* Background static image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frameUrl(0)}
              alt="BSR Films studio preview"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none"
              draggable={false}
            />

            {/* Mobile dark cinematic scrim for contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/85 to-[#050608]/35 -z-10 pointer-events-none"
              aria-hidden="true"
            />
            {/* Ambient gold glow */}
            <div
              className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#E3A652]/15 rounded-full blur-3xl -z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Content */}
            <div className="w-full max-w-lg z-20">
              {/* Location & Legacy Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#F4D090]/50 mb-3.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#F4D090] animate-pulse" />
                <span className="text-[#F4D090] font-extrabold text-xs tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {kickerText}
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="font-extrabold leading-[1.08] tracking-tight mb-2.5 drop-shadow-2xl text-[2.2rem] sm:text-4xl text-left">
                <span className="text-[#FFF5DC] block drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] font-extrabold">{headline1}</span>
                <span className="text-[#F4D090] block my-0.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] font-black">{headline2}</span>
                <span className="text-white block drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] font-black">{headline3}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#F3EDE2] font-medium leading-relaxed mb-5 max-w-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {subtitle}
              </p>

              {/* Thumb-friendly Mobile CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5 w-full max-w-sm">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`nav-gold-cta text-center justify-center py-3.5 px-6 min-h-[48px] ${
                    isHindi ? "text-lg font-black" : "text-base font-black"
                  }`}
                  aria-label="View our work"
                >
                  <span>{ctaWork}</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="ml-1.5 inline">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`cta-ghost text-center justify-center py-3.5 px-6 min-h-[48px] border border-[#F4D090]/60 bg-black/50 backdrop-blur-md text-[#FFF5DC] ${
                    isHindi ? "text-base font-bold" : "text-sm font-bold"
                  }`}
                  aria-label="Contact us for a project"
                >
                  {ctaContact}
                </a>
              </div>

              {/* Mobile Stat strip */}
              <div className="grid grid-cols-4 gap-2 pt-3.5 border-t border-white/20 w-full max-w-sm text-left">
                {statsList.map(([n, l]) => (
                  <div key={l}>
                    <p className="text-lg sm:text-xl font-black text-[#F4D090] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">{n}</p>
                    <p className="text-[#E8DFC8] text-[0.58rem] font-bold tracking-wider uppercase mt-1 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ═════════════════════════════════════════════════════════════
             DESKTOP VIEW (≥1024px or SSR) — GSAP Scroll-Driven Canvas
             ═════════════════════════════════════════════════════════════ */
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              id="hero-canvas"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
            />

            {/* Fallback gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#101218] to-[#1a2a1a] -z-10"
              aria-hidden="true"
            />

            {/* Theme-aware scrim */}
            <div
              ref={canvasOverlayRef}
              aria-hidden="true"
              className="absolute inset-0 canvas-scrim pointer-events-none z-[5] transition-colors duration-700"
            />

            {/* Left gradient — fades out cleanly on scroll via GSAP */}
            <div
              ref={leftGradientRef}
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent w-[70%] sm:w-[60%] z-10 pointer-events-none"
            />

            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Desktop Hero content overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center">
              {/* Top-right kicker */}
              <div
                ref={kickerRef}
                className="absolute top-[88px] right-[4%] md:top-[120px] md:right-[5%] z-30 text-right pointer-events-auto"
              >
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <p className="text-[#F4D090] font-black tracking-[0.12em] md:tracking-[0.15em] text-xs md:text-base uppercase drop-shadow-[0_4px_14px_rgba(0,0,0,1)] bg-black/60 border border-[#F4D090]/50 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-md">
                    {kickerText}
                  </p>
                </motion.div>
              </div>

              {/* Desktop Hero text block */}
              <div
                ref={heroTextRef}
                className="w-full max-w-[500px] lg:max-w-[560px] pl-16 lg:pl-24 pointer-events-auto flex flex-col justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-center"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.52, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-extrabold leading-[1.05] tracking-tight mb-4 md:mb-6 drop-shadow-2xl flex flex-col items-start"
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl text-[#FFF5DC] font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                      {headline1}
                    </span>
                    <span className="text-4xl md:text-5xl lg:text-6xl text-[#F4D090] font-black my-1 md:my-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                      {headline2}
                    </span>
                    <span className="text-5xl md:text-6xl lg:text-[4.5rem] text-white font-black drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                      {headline3}
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.72, duration: 0.85 }}
                    className="text-base lg:text-lg text-[#F3EDE2] font-medium leading-relaxed mb-6 md:mb-8 lg:mb-10 max-w-[440px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                  >
                    {subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.88, duration: 0.75 }}
                    className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8 lg:mb-10"
                  >
                    <a
                      href="#work"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`nav-gold-cta px-7 py-3.5 rounded-full cursor-pointer transition-all ${
                        isHindi ? "text-lg md:text-xl font-black" : "text-base md:text-lg font-black"
                      }`}
                      aria-label="View our work"
                    >
                      <span>{ctaWork}</span>
                      <svg width="15" height="11" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="ml-1">
                        <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`cta-ghost border border-[#F4D090]/60 bg-black/50 backdrop-blur-md text-[#FFF5DC] font-bold px-7 py-3.5 rounded-full hover:bg-[#F4D090] hover:text-[#050608] transition-all cursor-pointer ${
                        isHindi ? "text-lg md:text-xl font-black" : "text-base md:text-lg font-bold"
                      }`}
                      aria-label="Contact us for a project"
                    >
                      {ctaContact}
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.15, duration: 1 }}
                    className="pt-4 md:pt-6 border-t border-white/20 flex flex-wrap gap-4 md:gap-7"
                  >
                    {statsList.map(([n, l]) => (
                      <div key={l}>
                        <p className="text-xl md:text-3xl font-black text-[#F4D090] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">{n}</p>
                        <p className="text-[#E8DFC8] text-[.62rem] md:text-[.7rem] font-bold tracking-[.12em] uppercase mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{l}</p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator — desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 md:right-14 flex flex-col items-center gap-2"
              aria-hidden="true"
            >
              <span className="text-[#F4D090]/70 font-bold text-[.65rem] tracking-[.3em] uppercase">{isHindi ? "स्क्रॉल करें" : "scroll"}</span>
              <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#F4D090] to-transparent" />
            </motion.div>

          {/* ── End-of-hero overlay — DESKTOP ONLY ───────────────────── */}
          {isDesktop === true && (
            <div
              ref={endOverlayRef}
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden z-30 hero-end-overlay"
            >
              {/* 2-col layout over pristine canvas waterfall */}
              <div className="relative h-full flex items-center py-4 sm:py-6 md:py-10 px-3 sm:px-5 md:px-14 lg:px-20 xl:px-28">
                <div className="w-full max-w-screen-xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left: translucent glass text panel letting waterfall shine through */}
                    <div
                      className="relative rounded-2xl p-7 md:p-9 shadow-2xl overflow-hidden bg-black/35 backdrop-blur-[3px] border border-white/20 sm:border-[#FFE29A]/40 text-left"
                    >
                      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFE29A]/60 to-transparent" />
                      <p className="text-[0.72rem] md:text-xs font-black tracking-[0.25em] uppercase mb-4 text-[#FFE29A] drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                        {isHindi ? "बी.एस.आर. की विशिष्ट पहचान" : "The BSR Difference"}
                      </p>
                      <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-black leading-[1.08] tracking-tight mb-5 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                        {isHindi ? (
                          <>बी.एस.आर. फिल्म्स ही <span className="text-[#FFE29A] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">क्यों?</span></>
                        ) : (
                          <>Why Choose <span className="text-[#FFE29A] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">BSR Films?</span></>
                        )}
                      </h2>
                      <p className="text-base md:text-lg leading-relaxed mb-7 text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                        {isHindi
                          ? "हम स्थानीय जनजीवन व संस्कृति की गहरी समझ को विश्वस्तरीय स्टूडियो के तकनीकी अनुशासन के साथ जोड़ते हैं — ऐसा सिनेमा जो जन-जन के दिल को छूए और अंतरराष्ट्रीय पटल पर प्रभाव छोड़े।"
                          : "We combine the intimacy of regional storytelling with the discipline of a professional studio — producing content that resonates locally and competes globally."}
                      </p>
                      <div aria-hidden="true" className="w-12 h-[2px] mb-7 bg-gradient-to-r from-[#FFE29A] to-transparent" />
                      <blockquote className="pl-5 py-1 border-l-2 border-[#FFE29A]">
                        <p className="text-base md:text-lg italic font-bold leading-relaxed text-[#FFF8E7] drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                          {isHindi
                            ? "«हम बी.एस.आर. फिल्म्स के नजरिए से छत्तीसगढ़ को देखते हैं।»"
                            : "“We see Chhattisgarh through the lens of BSR Films.”"}
                        </p>
                        <footer className="text-xs md:text-sm mt-2 font-black text-[#FFE29A] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                          {isHindi ? "— हमारा मार्गदर्शक दर्शन" : "— Our guiding philosophy"}
                        </footer>
                      </blockquote>
                    </div>

                    {/* Right: translucent reason cards */}
                    <div className="flex flex-col gap-3">
                      {reasonCards.map((r) => (
                        <div
                          key={r.title}
                          className="relative rounded-2xl overflow-hidden bg-black/35 backdrop-blur-[3px] border border-white/20 sm:border-[#FFE29A]/35 shadow-xl p-4 md:p-5 hover:bg-black/45 hover:border-[#FFE29A]/60 transition-all text-left"
                        >
                          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFE29A]/40 to-transparent" />
                          <div className="flex gap-3.5 items-start">
                            <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#FFE29A]/20 border border-[#FFE29A]/60 flex items-center justify-center text-[#FFE29A]">
                              <svg width="14" height="14" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                                <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="#FFE29A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-black text-sm md:text-base text-[#FFE29A] leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                                {r.title}
                              </h3>
                              <p className="text-xs md:text-sm leading-relaxed font-semibold text-white mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                                {r.body}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           MOBILE INLINE: "Why Choose BSR Films" — rendered below hero
           With Chitrakote Waterfall background
           ═══════════════════════════════════════════════════════════════ */}
      {isDesktop === false && (
        <section
          className="relative py-14 px-4 sm:px-6 overflow-hidden"
          aria-label="Why Choose BSR Films"
        >
          {/* Waterfall Background Image — Chitrakote Waterfall */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameUrl(TOTAL_FRAMES - 1)}
            alt="Chitrakote Waterfall - BSR Films"
            className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none"
            draggable={false}
          />
          {/* Subtle non-obscuring gradient so waterfall is vivid while text is crisp */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65 -z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-screen-xl mx-auto text-left relative z-10">
            {/* Header */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-black/35 backdrop-blur-[3px] border border-white/20 sm:border-[#FFE29A]/40 shadow-xl">
              <p className="text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#FFE29A] drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                {isHindi ? "बी.एस.आर. की विशिष्ट पहचान" : "The BSR Difference"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black leading-[1.08] tracking-tight mb-3 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                {isHindi ? (
                  <>बी.एस.आर. फिल्म्स ही <span className="text-[#FFE29A] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">क्यों?</span></>
                ) : (
                  <>Why Choose <span className="text-[#FFE29A] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">BSR Films?</span></>
                )}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-4 text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                {isHindi
                  ? "हम स्थानीय जनजीवन व संस्कृति की गहरी समझ को विश्वस्तरीय स्टूडियो के तकनीकी अनुशासन के साथ जोड़ते हैं — ऐसा सिनेमा जो जन-जन के दिल को छूए और अंतरराष्ट्रीय पटल पर प्रभाव छोड़े।"
                  : "We combine the intimacy of regional storytelling with the discipline of a professional studio — producing content that resonates locally and competes globally."}
              </p>
              <div className="w-12 h-[2px] mb-4 bg-gradient-to-r from-[#FFE29A] to-transparent" />
              <blockquote className="pl-4 py-1 border-l-2 border-[#FFE29A]">
                <p className="text-sm italic font-bold leading-relaxed text-[#FFF8E7] drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  {isHindi
                    ? "«हम बी.एस.आर. फिल्म्स के नजरिए से छत्तीसगढ़ को देखते हैं।»"
                    : "“We see Chhattisgarh through the lens of BSR Films.”"}
                </p>
                <footer className="text-xs mt-1.5 text-[#FFE29A] font-black drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                  {isHindi ? "— हमारा मार्गदर्शक दर्शन" : "— Our guiding philosophy"}
                </footer>
              </blockquote>
            </div>

            {/* Reason cards — vertical stack */}
            <div className="flex flex-col gap-3">
              {reasonCards.map((r) => (
                <div
                  key={r.title}
                  className="relative rounded-xl overflow-hidden p-3.5 sm:p-4 bg-black/35 backdrop-blur-[3px] border border-white/20 sm:border-[#FFE29A]/35 shadow-lg"
                >
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#FFE29A]/20 border border-[#FFE29A]/60 flex items-center justify-center text-[#FFE29A]">
                      <svg width="12" height="12" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                        <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="#FFE29A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-sm leading-snug text-[#FFE29A] drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">{r.title}</h3>
                      <p className="text-xs leading-relaxed font-semibold mt-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">{r.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
