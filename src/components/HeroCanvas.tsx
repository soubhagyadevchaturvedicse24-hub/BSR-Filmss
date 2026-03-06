"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const endOverlayRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean | null>(null); // null = SSR / not yet hydrated

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

        // Track 3: Dark scrim
        tl.to(canvasOverlayRef.current, {
          opacity: 0.55,
          ease: "none",
          duration: 0.1,
        }, 0.65);

        // Track 4: End overlay cards
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

  // ── Reason cards data (shared between desktop overlay and mobile inline) ──
  const reasonCards = [
    { title: "25+ Years of Proven Excellence", body: "Over two decades of cinematic media production and storytelling across Chhattisgarh." },
    { title: "Trusted by Govts & Global Bodies", body: "Empanelled with NFDC & AIR. Partnered with World Bank, UNICEF & 20+ Govt Depts." },
    { title: "Technical Excellence", body: "Master storytellers and post-production artists delivering flawless cinematic content." },
    { title: "Full-Facility In-House", body: "Audio/Video suites, multi-cam & green screen. Everything under one roof for total control." },
    { title: "Social Responsibility", body: "Crafting purpose-driven narratives that give a powerful voice to causes that matter." },
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
        className={`relative w-full ${isDesktop === true ? "h-[250vh]" : "h-screen"}`}
        aria-label="Hero: BSR Films cinematic scroll experience"
      >
        {/* ── Pinned viewport (sticky on desktop, relative on mobile) ── */}
        <div className={isDesktop === true ? "sticky top-0 w-full h-screen overflow-hidden" : "relative w-full h-full overflow-hidden"}>

          {/* Canvas — always in DOM so GSAP matchMedia can grab the ref.
              On mobile no frames are loaded so it's an empty, invisible element. */}
          <canvas
            ref={canvasRef}
            id="hero-canvas"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover will-change-transform ${isDesktop === false ? "hidden" : ""}`}
          />

          {/* Mobile: static background image (frame 1) — only after hydration */}
          {isDesktop === false && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={frameUrl(0)}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          )}

          {/* Fallback gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#101218] to-[#1a2a1a] -z-10"
            aria-hidden="true"
          />

          {/* Theme-aware scrim (GSAP-controlled on desktop, hidden on mobile) */}
          <div
            ref={canvasOverlayRef}
            aria-hidden="true"
            className={`absolute inset-0 canvas-scrim pointer-events-none z-[5] transition-colors duration-700 ${isDesktop !== true ? "opacity-0" : ""}`}
          />

          {/* Left gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent w-[70%] sm:w-[60%] z-10 pointer-events-none"
          />

          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* ── Hero content overlay ─────────────────────────────────── */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center">

            {/* Top-right kicker */}
            <div
              ref={kickerRef}
              className="absolute top-[72px] sm:top-[88px] md:top-[120px] right-[3%] sm:right-[4%] md:right-[5%] z-30 text-right pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <p className="text-[#E3A652] font-bold tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] text-[0.6rem] sm:text-xs md:text-lg uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)] bg-black/30 px-3 sm:px-3.5 md:px-5 py-1 sm:py-1.5 md:py-2.5 rounded-full backdrop-blur-sm">
                  Raipur, Chhattisgarh<br />
                  <span className="text-white">Est. 25+ Years</span>
                </p>
              </motion.div>
            </div>

            {/* Hero text block */}
            <div
              ref={heroTextRef}
              className="w-full max-w-[300px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[520px] pl-3 sm:pl-5 md:pl-16 lg:pl-24 pointer-events-auto flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center"
              >
                {/* H1 */}
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-extrabold leading-[1.05] tracking-tight mb-2 sm:mb-3 md:mb-6 drop-shadow-2xl flex flex-col items-start"
                >
                  <span className="text-lg sm:text-xl md:text-4xl lg:text-5xl text-white/90">
                    Stories from
                  </span>
                  <span className="text-xl sm:text-2xl md:text-5xl lg:text-6xl text-[#E3A652] my-0.5 sm:my-1 md:my-2">
                    the heart of
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-6xl lg:text-[4.5rem] text-white">
                    Chhattisgarh
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.72, duration: 0.85 }}
                  className="text-[0.7rem] sm:text-xs md:text-base lg:text-lg text-white/80 leading-relaxed mb-3 sm:mb-5 md:mb-8 lg:mb-10 max-w-[400px] drop-shadow-md"
                >
                  Documentaries, ad films and social campaigns &mdash; crafted with
                  cinematic precision from the heart of India.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.88, duration: 0.75 }}
                  className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4 mb-3 sm:mb-5 md:mb-8 lg:mb-10"
                >
                  <a
                    href="#work"
                    onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="cta-primary"
                    aria-label="View our work"
                  >
                    View Our Work
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                      <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="cta-ghost"
                    aria-label="Contact us for a project"
                  >
                    Start a Project
                  </a>
                </motion.div>

                {/* Stat strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.15, duration: 1 }}
                  className="pt-2 sm:pt-3 md:pt-6 border-t border-white/10 flex flex-wrap gap-3 sm:gap-4 md:gap-8"
                >
                  {[["25+", "Years of Experience"], ["500+", "Projects Delivered"], ["20+", "Govt. Bodies"]].map(([n, l]) => (
                    <div key={l}>
                      <p className="text-lg sm:text-xl md:text-3xl font-extrabold text-white leading-none">{n}</p>
                      <p className="text-white/35 text-[.5rem] sm:text-[.6rem] tracking-[.12em] sm:tracking-[.15em] uppercase mt-0.5 sm:mt-1">{l}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator — desktop only */}
          {isDesktop === true && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 md:right-14 flex flex-col items-center gap-2"
              aria-hidden="true"
            >
              <span className="text-white/25 text-[.6rem] tracking-[.3em] uppercase">scroll</span>
              <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#E3A652]/60 to-transparent" />
            </motion.div>
          )}

          {/* ── End-of-hero overlay — DESKTOP ONLY ───────────────────── */}
          {isDesktop === true && (
            <div
              ref={endOverlayRef}
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden z-30"
            >
              {/* Dark gradient scrim - changes to light gradient in light mode via CSS classes using an inline check or just via global CSS. Wait, we don't have a way to detect light mode in React yet unless we use a class. Let's use Tailwind's arbitrary values or define a new CSS class. Let's create a class 'hero-overlay-scrim' in globals.css later, but for now we'll just use inline styles with variables if possible. But gradient stops can't use single CSS variables easily unless defined. Let's add a class 'hero-scrim' and style it in CSS. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none hero-scrim transition-colors duration-700"
              />

              {/* 2-col layout */}
              <div className="relative h-full flex items-center py-4 sm:py-6 md:py-10 px-3 sm:px-5 md:px-14 lg:px-20 xl:px-28">
                <div className="w-full max-w-screen-xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                    {/* Left: glass text panel */}
                    <div
                      className="relative rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden transition-colors duration-500 glass-panel-var"
                    >
                      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px transition-colors duration-500 specular-sheen-var" />
                      <p className="text-[0.65rem] font-bold tracking-[0.28em] uppercase mb-4 transition-colors duration-500 color-gold">The BSR Difference</p>
                      <h2 className="text-[clamp(1.8rem,3.5vw,2.9rem)] font-extrabold leading-[1.08] tracking-tight mb-5 transition-colors duration-500 color-heading">
                        Why Choose <span className="color-gold">BSR Films?</span>
                      </h2>
                      <p className="text-[1rem] leading-relaxed mb-7 opacity-80 transition-colors duration-500 color-primary">
                        We combine the intimacy of regional storytelling with the
                        discipline of a professional studio — producing content that
                        resonates locally and competes globally.
                      </p>
                      <div aria-hidden="true" className="w-10 h-[2px] mb-7 transition-colors duration-500 gold-divider-var" />
                      <blockquote className="pl-5 py-1 transition-colors duration-500 gold-border-left">
                        <p className="text-base italic leading-relaxed font-light opacity-90 transition-colors duration-500 color-primary">
                          &quot;We see Chhattisgarh through the lens of BSR Films.&quot;
                        </p>
                        <footer className="text-xs mt-2 tracking-wide transition-colors duration-500 color-muted">— Our guiding philosophy</footer>
                      </blockquote>
                    </div>

                    {/* Right: reason cards */}
                    <div className="flex flex-col gap-3">
                      {reasonCards.map((r) => (
                        <div
                          key={r.title}
                          className="relative rounded-2xl overflow-hidden transition-colors duration-500 glass-card-var"
                        >
                          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px transition-colors duration-500 specular-sheen-gold-var" />
                          <div className="flex gap-3 items-start p-4 md:p-5">
                            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5 transition-colors duration-500">
                              <circle cx="11" cy="11" r="10.5" stroke="var(--gold)" strokeWidth="1.2" fill="var(--gold-soft)" />
                              <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                              <h3 className="font-bold text-[0.85rem] mb-1 leading-snug transition-colors duration-500 color-heading">{r.title}</h3>
                              <p className="text-base md:text-lg leading-snug font-medium mt-2 opacity-80 transition-colors duration-500 color-primary">{r.body}</p>
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
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           MOBILE INLINE: "Why Choose BSR Films" — rendered below hero
           Only visible on <1024px where no scroll overlay exists
           ═══════════════════════════════════════════════════════════════ */}
      {isDesktop === false && (
        <section
          className="relative py-12 px-4 sm:px-6 transition-colors duration-500 bg-secondary-var"
          aria-label="Why Choose BSR Films"
        >
          <div className="max-w-screen-xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase mb-3 transition-colors duration-500 color-gold">The BSR Difference</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-[1.08] tracking-tight mb-4 transition-colors duration-500 color-heading">
                Why Choose <span className="color-gold">BSR Films?</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-5 opacity-80 transition-colors duration-500 color-primary">
                We combine the intimacy of regional storytelling with the
                discipline of a professional studio — producing content that
                resonates locally and competes globally.
              </p>
              <div className="w-10 h-[2px] mb-5 transition-colors duration-500 gold-divider-var" />
              <blockquote className="pl-4 py-1 transition-colors duration-500 gold-border-left">
                <p className="text-sm italic leading-relaxed font-light opacity-90 transition-colors duration-500 color-primary">
                  &quot;We see Chhattisgarh through the lens of BSR Films.&quot;
                </p>
                <footer className="text-xs mt-2 tracking-wide transition-colors duration-500 color-muted">— Our guiding philosophy</footer>
              </blockquote>
            </div>

            {/* Reason cards — simple vertical stack */}
            <div className="flex flex-col gap-3">
              {reasonCards.map((r) => (
                <div
                  key={r.title}
                  className="relative rounded-xl overflow-hidden transition-colors duration-500 glass-card-var"
                >
                  <div className="flex gap-2.5 items-start p-3 sm:p-4">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="11" cy="11" r="10.5" stroke="var(--gold)" strokeWidth="1.2" fill="var(--gold-soft)" />
                      <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-[0.78rem] mb-0.5 leading-snug transition-colors duration-500 color-heading">{r.title}</h3>
                      <p className="text-sm leading-snug font-medium mt-1 opacity-80 transition-colors duration-500 color-primary">{r.body}</p>
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
