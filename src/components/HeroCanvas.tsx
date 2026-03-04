"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * â”€â”€â”€ FRAME CONFIGURATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 *
 * Frames located at:  /public/frames/ezgif-frame-001.jpg â†’ ezgif-frame-120.jpg
 * (Copied from D:\Local Codebase\BSR Films\Seq 1)
 *
 * To replace with your own frames:
 *   1. Drop your JPEGs into /public/frames/
 *   2. Update TOTAL_FRAMES and FRAME_NAME_FN below.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 */

const TOTAL_FRAMES = 120;
const SCROLL_MULTIPLIER = 2.2; // 220vh container — faster, tighter scroll

/** Returns the public URL for frame index i (0-based). */
const frameUrl = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const canvasOverlayRef = useRef<HTMLDivElement>(null);
  const endOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const container = containerRef.current!;

    // â”€â”€ Frame registry â€” declared FIRST so sizeCanvas / drawFrame can close over them â”€â”€
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let currentFrame = 0;
    let stReady = false;

    // â”€â”€ Draw helper: cover-fit image on canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // â”€â”€ Size canvas to viewport (after drawFrame is declared) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const sizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-draw current frame after resize so the canvas isn't blank
      if (images[currentFrame]?.complete) drawFrame(currentFrame);
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    // â”€â”€ ScrollTrigger setup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // CSS `sticky` on the inner wrapper already pins the canvas visually.
    // ScrollTrigger is used ONLY to read scroll progress â€” no pin/pinSpacing
    // needed (adding those would double the scroll height and create a black gap).
    const setupScrollTrigger = () => {
      drawFrame(0); // paint frame 0 immediately

      // Set initial states
      gsap.set(endOverlayRef.current,   { opacity: 0, y: 80, pointerEvents: 'none' });
      gsap.set(canvasOverlayRef.current, { opacity: 0 });
      // Guarantee heroTextRef starts at its visible resting position before GSAP takes over
      gsap.set(heroTextRef.current, { x: 0, opacity: 1, filter: 'none' });
      gsap.set(kickerRef.current, { y: 0, opacity: 1, filter: 'none' });

      // ── Proxy object: GSAP tweens "frame" 0→119; onUpdate renders the canvas ──
      // This is the MASTER TRACK — it dictates the full timeline length (duration:1).
      // Every other tween's position/duration is relative to this 0→1.0 range.
      const frameProxy = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=180vh",
          scrub: 0.8,     // snappier response for faster feel
        },
      });

      // ── Track 1 (MASTER): Canvas frame sequence — spans 100% of scroll ──
      // Custom ease: starts slow (cinematic reveal of first frames / forest),
      // then accelerates through the camera-lens zoom for a dramatic feel.
      // "power1.in" = cubic bezier that lingers early, speeds up later.
      tl.to(frameProxy, {
        frame: TOTAL_FRAMES - 1,
        ease: 'power1.in',  // slow start → faster finish (smooth cinematic ramp)
        duration: 1,        // anchors the timeline length
        onUpdate() {
          const idx = Math.min(Math.round(frameProxy.frame), TOTAL_FRAMES - 1);
          currentFrame = idx;
          drawFrame(currentFrame);
        },
      }, 0);

      // Track 2: Hero text — exit left on scroll
      tl.to(heroTextRef.current, {
        x: '-40vw',
        opacity: 0,
        filter: 'blur(10px)',
        ease: 'power2.in',
        duration: 0.35,
      }, 0);

      // Track 2b: Kicker (Raipur, Chhattisgarh) — fade up and out
      tl.to(kickerRef.current, {
        y: -60,
        opacity: 0,
        filter: 'blur(8px)',
        ease: 'power2.in',
        duration: 0.35,
      }, 0);

      // Track 3: Dark scrim — fades in from 65% to 75% so cards are readable
      tl.to(canvasOverlayRef.current, {
        opacity: 0.55,
        ease: 'none',
        duration: 0.1,
      }, 0.65);

      // Track 4: "Why Choose" cards — enter at 70% scroll, finish at 100% (pin releases)
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

    // â”€â”€ Eager preload with progressive first-frame paint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);

      img.onload = () => {
        loadedCount++;
        if (i === 0 && !stReady) drawFrame(0); // show first frame ASAP
        if (loadedCount === TOTAL_FRAMES && !stReady) {
          stReady = true;
          setupScrollTrigger();
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES && !stReady) {
          stReady = true;
          setupScrollTrigger();
        }
      };

      images[i] = img;
    }

    // Fallback: init ScrollTrigger even if some frames fail to load
    const fallback = setTimeout(() => {
      if (!stReady) {
        stReady = true;
        setupScrollTrigger();
      }
    }, 3000);

    return () => {
      window.removeEventListener("resize", sizeCanvas);
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /*
     * The outer div is SCROLL_MULTIPLIER Ã— 100vh tall so the pinned canvas
     * section has enough scroll distance for the full frame sequence.
     */
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      aria-label="Hero: BSR Films cinematic scroll experience"
    >
      {/* â”€â”€ Pinned canvas (GSAP pins this element) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas for scroll-driven frame sequence */}
        <canvas
          ref={canvasRef}
          id="hero-canvas"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Fallback gradient background when frames are missing */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#101218] to-[#1a2a1a] -z-10"
          aria-hidden="true"
        />

        {/* Dark scrim — fades in during Phase 2 to ensure card legibility */}
        <div
          ref={canvasOverlayRef}
          aria-hidden="true"
          className="absolute inset-0 bg-black pointer-events-none z-[5]"
        />

        {/* Left gradient — keeps text readable, camera on the right stays bright */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent w-[60%] z-10 pointer-events-none"
        />

        {/* Subtle bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Unified left hero block */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center">

          {/* Top-right kicker — fades away on scroll via GSAP */}
          <div
            ref={kickerRef}
            className="absolute top-[100px] md:top-[120px] right-[4%] md:right-[5%] z-30 text-right pointer-events-auto"
            style={{ willChange: 'transform, opacity' }}
          >
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-[#E3A652] font-bold tracking-[0.12em] md:tracking-[0.15em] text-[0.6rem] md:text-sm uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)] bg-black/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-sm">
              Raipur, Chhattisgarh<br />
              <span className="text-white">Est. 25+ Years</span>
            </p>
          </motion.div>
          </div>

          {/* GSAP exit wrapper (plain div) -- Framer Motion entry lives inside so they never conflict */}
          <div
            ref={heroTextRef}
            className="w-full max-w-[420px] md:max-w-[500px] lg:max-w-[520px] pl-4 md:pl-16 lg:pl-24 pointer-events-auto flex flex-col justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
            {/* Cascading H1 -- smallest -> medium -> largest */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[1.05] tracking-tight mb-4 md:mb-6 drop-shadow-2xl flex flex-col items-start"
            >
              <span className="text-2xl md:text-4xl lg:text-5xl text-white/90">
                Stories from
              </span>
              <span className="text-3xl md:text-5xl lg:text-6xl text-[#E3A652] my-1 md:my-2">
                the heart of
              </span>
              <span className="text-4xl md:text-6xl lg:text-[4.5rem] text-white">
                Chhattisgarh
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.85 }}
              className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed mb-8 md:mb-10 max-w-[400px] drop-shadow-md"
            >
              Documentaries, ad films and social campaigns &mdash; crafted with
              cinematic precision from the heart of India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.75 }}
              className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-10"
            >
              <a
                href="#work"
                onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior:'smooth' }); }}
                className="cta-primary"
                aria-label="View our work"
              >
                View Our Work
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior:'smooth' }); }}
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
              className="pt-4 md:pt-6 border-t border-white/10 flex flex-wrap gap-5 md:gap-8"
            >
              {[['25+','Years of Experience'],['500+','Projects Delivered'],['20+','Govt. Bodies']].map(([n,l]) => (
                <div key={l}>
                  <p className="text-2xl md:text-3xl font-extrabold text-white leading-none">{n}</p>
                  <p className="text-white/35 text-[.68rem] tracking-[.15em] uppercase mt-1">{l}</p>
                </div>
              ))}
            </motion.div>
            </motion.div>{/* end inner Framer entry div */}
          </div>{/* end outer GSAP heroTextRef div */}
        </div>
        {/* Scroll indicator â€” bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 right-8 md:right-14 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-white/25 text-[.6rem] tracking-[.3em] uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#E3A652]/60 to-transparent" />
        </motion.div>

        {/*
         * â”€â”€ End-of-hero bridge overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
         * Opacity driven from 0â†’1 by ScrollTrigger over the last 28% of frames.
         * Sits above the canvas, below the hero text, giving a cinematic
         * "what's next" teaser before the Works section scrolls in.
         */}
        <div
          ref={endOverlayRef}
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden z-30"
        >
          {/* Dark gradient scrim — ensures glass readability over waterfall */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.35) 100%)" }}
          />

          {/* ── 2-col liquid glass layout ──────────────────────────────── */}
          <div className="relative h-full flex items-center py-10 px-6 md:px-14 lg:px-20 xl:px-28">
            <div className="w-full max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

                {/* Left: liquid glass text panel */}
                <div
                  className="relative rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(28px) saturate(180%)",
                    WebkitBackdropFilter: "blur(28px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
                  <p className="text-[0.65rem] font-bold tracking-[0.28em] uppercase text-white/50 mb-4">The BSR Difference</p>
                  <h2 className="text-[clamp(1.8rem,3.5vw,2.9rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-5">
                    Why Choose <span style={{ color: "#E3A652" }}>BSR Films?</span>
                  </h2>
                  <p className="text-white/65 text-[1rem] leading-relaxed mb-7">
                    We combine the intimacy of regional storytelling with the
                    discipline of a professional studio — producing content that
                    resonates locally and competes globally.
                  </p>
                  <div aria-hidden="true" className="w-10 h-[2px] mb-7" style={{ background: "linear-gradient(90deg, #E3A652, transparent)" }} />
                  <blockquote className="pl-5 py-1" style={{ borderLeft: "3px solid rgba(227,166,82,0.6)" }}>
                    <p className="text-white/80 text-base italic leading-relaxed font-light">
                      "We see Chhattisgarh through the lens of BSR Films."
                    </p>
                    <footer className="text-white/35 text-xs mt-2 tracking-wide">— Our guiding philosophy</footer>
                  </blockquote>
                </div>

                {/* Right: 5 liquid glass reason cards */}
                <div className="flex flex-col gap-3">
                  {([
                    { title: "25+ Years of Proven Excellence", body: "Over two decades of cinematic media production and storytelling across Chhattisgarh." },
                    { title: "Trusted by Govts & Global Bodies", body: "Empanelled with NFDC & AIR. Partnered with World Bank, UNICEF & 20+ Govt Depts." },
                    { title: "Technical Excellence", body: "Master storytellers and post-production artists delivering flawless cinematic content." },
                    { title: "Full-Facility In-House", body: "Audio/Video suites, multi-cam & green screen. Everything under one roof for total control." },
                    { title: "Social Responsibility", body: "Crafting purpose-driven narratives that give a powerful voice to causes that matter." },
                  ] as { title: string; body: string }[]).map((r) => (
                    <div
                      key={r.title}
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.055)",
                        backdropFilter: "blur(22px) saturate(160%)",
                        WebkitBackdropFilter: "blur(22px) saturate(160%)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderLeft: "4px solid #E3A652",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, rgba(227,166,82,0.35), rgba(255,255,255,0.12), transparent)" }} />
                      <div className="flex gap-3 items-start p-4 md:p-5">
                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                          <circle cx="11" cy="11" r="10.5" stroke="#E3A652" strokeWidth="1.2" fill="rgba(227,166,82,0.12)" />
                          <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="#E3A652" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <h3 className="text-white font-bold text-[0.85rem] mb-1 leading-snug">{r.title}</h3>
                          <p className="text-base md:text-lg text-white/80 leading-snug font-medium mt-2">{r.body}</p>
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
