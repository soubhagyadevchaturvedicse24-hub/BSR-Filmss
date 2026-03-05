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
 * Mobile optimization:
 *   - Desktop: loads all 120 frames for silky smooth playback
 *   - Mobile:  loads every 3rd frame (40 frames) as ImageBitmaps for lower memory
 *   - Canvas rendered at 80% resolution (CSS-upscaled) to cut fill-rate cost
 *   - Cover-fit draw params cached; clearRect skipped (cover always fills canvas)
 *   - imageSmoothingQuality set to 'low'; DPR capped at 1
 * ──────────────────────────────────────────────────────────────────────────────
 */

const TOTAL_FRAMES_FULL = 120;
const SCROLL_MULTIPLIER = 2.5;
const MOBILE_CANVAS_SCALE = 0.8;

/** Returns the public URL for frame index i (0-based, out of 120). */
const frameUrl = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

/** Detect mobile once at module level */
const getIsMobile = () =>
  typeof window !== "undefined" && (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const endOverlayRef = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const container = containerRef.current!;

    const isMobile = getIsMobile();
    setMobile(isMobile);

    // On mobile, only load every 3rd frame → 40 frames
    // Drastically cuts memory, network requests & paint cost
    const FRAME_STEP = isMobile ? 3 : 1;
    const TOTAL_FRAMES = Math.ceil(TOTAL_FRAMES_FULL / FRAME_STEP);

    // ── Frame registry ──
    const images: (HTMLImageElement | ImageBitmap)[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let currentFrame = 0;
    let stReady = false;
    let rafPending = false;
    // Cached cover-fit draw parameters — invalidated on canvas resize
    let drawParams: { dx: number; dy: number; dw: number; dh: number } | null = null;

    // ── Draw helper: cover-fit image on canvas ─────────────────────
    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img) return;
      if (img instanceof HTMLImageElement && (!img.complete || !img.naturalWidth)) return;

      // Recompute cover-fit params only after canvas resize (all frames share dimensions)
      if (!drawParams) {
        const iw = img instanceof HTMLImageElement ? img.naturalWidth : img.width;
        const ih = img instanceof HTMLImageElement ? img.naturalHeight : img.height;
        const s = Math.max(canvas.width / iw, canvas.height / ih);
        const dw = iw * s;
        const dh = ih * s;
        drawParams = { dx: (canvas.width - dw) / 2, dy: (canvas.height - dh) / 2, dw, dh };
      }

      // Cover-fit always fills the entire canvas — no clearRect needed
      ctx.drawImage(img, drawParams.dx, drawParams.dy, drawParams.dw, drawParams.dh);
    };

    // ── Size canvas (cap DPR on mobile for perf) ──────────────────
    let resizeRaf: number;
    const sizeCanvas = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
        // Mobile: render at reduced resolution — CSS scales up; imperceptible on small screens
        const res = isMobile ? MOBILE_CANVAS_SCALE : 1;
        canvas.width = Math.round(window.innerWidth * dpr * res);
        canvas.height = Math.round(window.innerHeight * dpr * res);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        drawParams = null; // Invalidate cached cover-fit params
        if (isMobile) ctx.imageSmoothingQuality = 'low';
        drawFrame(currentFrame);
      });
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas, { passive: true });

    // ── ScrollTrigger setup ──────────────────────────────────────────
    const setupScrollTrigger = () => {
      drawFrame(0);

      gsap.set(endOverlayRef.current, { opacity: 0, y: 80, pointerEvents: 'none' });
      gsap.set(canvasOverlayRef.current, { opacity: 0 });
      gsap.set(heroTextRef.current, { x: 0, opacity: 1, filter: 'none' });
      gsap.set(kickerRef.current, { y: 0, opacity: 1, filter: 'none' });

      const frameProxy = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200vh",
          scrub: isMobile ? 2.2 : 1,
        },
      });

      // Track 1 (MASTER): Canvas frame sequence
      tl.to(frameProxy, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
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

      // Track 2: Hero text exit (no filter blur on mobile — expensive)
      tl.to(heroTextRef.current, {
        x: isMobile ? '-30vw' : '-40vw',
        opacity: 0,
        ...(isMobile ? {} : { filter: 'blur(10px)' }),
        ease: 'power2.in',
        duration: 0.35,
      }, 0);

      // Track 2b: Kicker fade
      tl.to(kickerRef.current, {
        y: -60,
        opacity: 0,
        ...(isMobile ? {} : { filter: 'blur(8px)' }),
        ease: 'power2.in',
        duration: 0.35,
      }, 0);

      // Track 3: Dark scrim
      tl.to(canvasOverlayRef.current, {
        opacity: 0.55,
        ease: 'none',
        duration: 0.1,
      }, 0.65);

      // Track 4: End overlay cards
      tl.fromTo(endOverlayRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          ease: 'power1.out',
          duration: 0.3,
        }, 0.7);
    };

    // ── Batched frame preloader ──────────────────────────────────────
    const BATCH_SIZE = isMobile ? 3 : 6;
    const EARLY_INIT_THRESHOLD = isMobile ? 4 : 10;

    const loadImage = (frameIdx: number, arrayIdx: number): Promise<void> => new Promise(resolve => {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(frameIdx);

      const onReady = (drawable: HTMLImageElement | ImageBitmap) => {
        images[arrayIdx] = drawable;
        loadedCount++;
        if (arrayIdx === 0) drawFrame(0);
        if (loadedCount >= EARLY_INIT_THRESHOLD && !stReady) {
          stReady = true;
          setupScrollTrigger();
        }
        resolve();
      };

      img.onload = () => {
        // Mobile: create ImageBitmap for GPU-optimised, pre-decoded texture draws
        if (isMobile && typeof createImageBitmap === 'function') {
          createImageBitmap(img).then(bmp => onReady(bmp), () => onReady(img));
        } else {
          onReady(img);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= EARLY_INIT_THRESHOLD && !stReady) {
          stReady = true;
          setupScrollTrigger();
        }
        resolve();
      };
      images[arrayIdx] = img;
    });

    const loadAllFrames = async () => {
      for (let start = 0; start < TOTAL_FRAMES; start += BATCH_SIZE) {
        const batch = [];
        for (let i = start; i < Math.min(start + BATCH_SIZE, TOTAL_FRAMES); i++) {
          // Map array index → actual frame file index
          const actualFrame = i * FRAME_STEP;
          batch.push(loadImage(actualFrame, i));
        }
        await Promise.all(batch);
      }
    };
    loadAllFrames();

    const fallback = setTimeout(() => {
      if (!stReady) {
        stReady = true;
        setupScrollTrigger();
      }
    }, isMobile ? 5000 : 3000);

    return () => {
      window.removeEventListener("resize", sizeCanvas);
      cancelAnimationFrame(resizeRaf);
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // Free GPU memory from ImageBitmaps
      images.forEach(img => { if (img instanceof ImageBitmap) img.close(); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      aria-label="Hero: BSR Films cinematic scroll experience"
    >
      {/* ── Pinned canvas ──────────────────────────────────────────── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          id="hero-canvas"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={mobile ? { willChange: 'transform' } : undefined}
        />

        {/* Fallback gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#101218] to-[#1a2a1a] -z-10"
          aria-hidden="true"
        />

        {/* Dark scrim */}
        <div
          ref={canvasOverlayRef}
          aria-hidden="true"
          className="absolute inset-0 bg-black pointer-events-none z-[5]"
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

        {/* Unified left hero block */}
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
              <p className={`text-[#E3A652] font-bold tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] text-[0.5rem] sm:text-[0.55rem] md:text-sm uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)] bg-black/30 px-2 sm:px-2.5 md:px-4 py-0.5 sm:py-1 md:py-2 rounded-full${mobile ? '' : ' backdrop-blur-sm'}`}>
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
              {/* Cascading H1 */}
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
                  onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
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
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
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
                {[['25+', 'Years of Experience'], ['500+', 'Projects Delivered'], ['20+', 'Govt. Bodies']].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-lg sm:text-xl md:text-3xl font-extrabold text-white leading-none">{n}</p>
                    <p className="text-white/35 text-[.5rem] sm:text-[.6rem] tracking-[.12em] sm:tracking-[.15em] uppercase mt-0.5 sm:mt-1">{l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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

        {/* End-of-hero bridge overlay */}
        <div
          ref={endOverlayRef}
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden z-30"
        >
          {/* Dark gradient scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.35) 100%)" }}
          />

          {/* ── 2-col liquid glass layout ──────────────────────────── */}
          <div className="relative h-full flex items-center py-4 sm:py-6 md:py-10 px-3 sm:px-5 md:px-14 lg:px-20 xl:px-28">
            <div className="w-full max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-14 items-start">

                {/* Left: liquid glass text panel */}
                <div
                  className="relative rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-8 lg:p-10 shadow-2xl overflow-hidden"
                  style={{
                    background: mobile ? "rgba(10,12,16,0.92)" : "rgba(255,255,255,0.05)",
                    ...(mobile ? {} : { backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)" }),
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
                  <p className="text-[0.55rem] sm:text-[0.6rem] font-bold tracking-[0.25em] sm:tracking-[0.28em] uppercase text-white/50 mb-2 sm:mb-3 md:mb-4">The BSR Difference</p>
                  <h2 className="text-[clamp(1.15rem,3.2vw,2.9rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-2 sm:mb-3 md:mb-5">
                    Why Choose <span style={{ color: "#E3A652" }}>BSR Films?</span>
                  </h2>
                  <p className="text-white/65 text-xs sm:text-sm md:text-[1rem] leading-relaxed mb-3 sm:mb-5 md:mb-7">
                    We combine the intimacy of regional storytelling with the
                    discipline of a professional studio — producing content that
                    resonates locally and competes globally.
                  </p>
                  <div aria-hidden="true" className="w-8 sm:w-10 h-[2px] mb-3 sm:mb-5 md:mb-7" style={{ background: "linear-gradient(90deg, #E3A652, transparent)" }} />
                  <blockquote className="pl-3 sm:pl-4 md:pl-5 py-1" style={{ borderLeft: "3px solid rgba(227,166,82,0.6)" }}>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base italic leading-relaxed font-light">
                      "We see Chhattisgarh through the lens of BSR Films."
                    </p>
                    <footer className="text-white/35 text-xs mt-2 tracking-wide">— Our guiding philosophy</footer>
                  </blockquote>
                </div>

                {/* Right: 5 liquid glass reason cards */}
                <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
                  {([
                    { title: "25+ Years of Proven Excellence", body: "Over two decades of cinematic media production and storytelling across Chhattisgarh." },
                    { title: "Trusted by Govts & Global Bodies", body: "Empanelled with NFDC & AIR. Partnered with World Bank, UNICEF & 20+ Govt Depts." },
                    { title: "Technical Excellence", body: "Master storytellers and post-production artists delivering flawless cinematic content." },
                    { title: "Full-Facility In-House", body: "Audio/Video suites, multi-cam & green screen. Everything under one roof for total control." },
                    { title: "Social Responsibility", body: "Crafting purpose-driven narratives that give a powerful voice to causes that matter." },
                  ] as { title: string; body: string }[]).map((r) => (
                    <div
                      key={r.title}
                      className="relative rounded-xl sm:rounded-2xl overflow-hidden"
                      style={{
                        background: mobile ? "rgba(10,12,16,0.88)" : "rgba(255,255,255,0.055)",
                        ...(mobile ? {} : { backdropFilter: "blur(16px) saturate(140%)", WebkitBackdropFilter: "blur(16px) saturate(140%)" }),
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderLeft: "4px solid #E3A652",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, rgba(227,166,82,0.35), rgba(255,255,255,0.12), transparent)" }} />
                      <div className="flex gap-2 sm:gap-2.5 md:gap-3 items-start p-2 sm:p-3 md:p-5">
                        <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5 w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]">
                          <circle cx="11" cy="11" r="10.5" stroke="#E3A652" strokeWidth="1.2" fill="rgba(227,166,82,0.12)" />
                          <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="#E3A652" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <h3 className="text-white font-bold text-[0.68rem] sm:text-[0.75rem] md:text-[0.85rem] mb-0.5 leading-snug">{r.title}</h3>
                          <p className="text-[0.68rem] sm:text-sm md:text-base lg:text-lg text-white/80 leading-snug font-medium mt-0.5 sm:mt-1 md:mt-2">{r.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
