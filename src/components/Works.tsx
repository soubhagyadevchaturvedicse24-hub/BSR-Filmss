"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

/** Extract YouTube video ID from any youtu.be or youtube.com URL */
function ytId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/);
  return m ? m[1] : "";
}

interface Project {
  id: number;
  tag: string;
  title: string;
  desc: string;
  yt: string;
  accent: string;
}

const projects: Project[] = [
  { id: 1, tag: "Documentary", title: "DOCUMENTARY FILMS", desc: "Telling real stories from the soul of Chhattisgarh.", yt: "https://youtu.be/bg0PxI6_QZI?si=Wrwnp5ZfK5rsW1-x", accent: "#34d399" },
  { id: 2, tag: "Corporate", title: "CORPORATE FILMS", desc: "Cinematic storytelling for global brands.", yt: "https://youtu.be/pyAS6rpfw0Y?si=k0cS-UyAKMb3rUj1", accent: "#60a5fa" },
  { id: 3, tag: "Ad Film", title: "AD FILMS & JINGLES", desc: "Creative TVCs that capture hearts at first frame.", yt: "https://youtu.be/WxsYGECivmQ?si=Pzujhxe-bRQ_rkkN", accent: "#E3A652" },
  { id: 4, tag: "Audio", title: "AUDIO PRODUCTION", desc: "Memorable audio production that stays with you.", yt: "https://youtu.be/up7w3WY_dvI?si=2DrbR25LBJv8lcBG", accent: "#f472b6" },
  { id: 5, tag: "Animation", title: "ANIMATION & VFX", desc: "Bringing imagination to life with cutting-edge tech.", yt: "https://youtu.be/g4OJZP6sa18", accent: "#c084fc" },
  { id: 6, tag: "Event", title: "EVENT COVERAGE", desc: "Impactful event films across 27 districts.", yt: "https://youtu.be/HlEgtE828N4?si=v_3aFWU1DYFj0kiu", accent: "#38bdf8" },
  { id: 7, tag: "Short Film", title: "SHORT FILMS", desc: "Compact cinematic narratives with lasting impact.", yt: "https://youtu.be/nBjr3Qgd0LY?si=7WUdVlRymjHjfQ8L", accent: "#fb923c" },
];

const TAG_STYLE: Record<string, { bg: string; border: string; text: string }> = {
  Documentary: { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.4)", text: "#34d399" },
  Corporate: { bg: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.4)", text: "#60a5fa" },
  "Ad Film": { bg: "rgba(227,166,82,0.15)", border: "rgba(227,166,82,0.4)", text: "#E3A652" },
  Audio: { bg: "rgba(244,114,182,0.15)", border: "rgba(244,114,182,0.4)", text: "#f472b6" },
  Animation: { bg: "rgba(192,132,252,0.15)", border: "rgba(192,132,252,0.4)", text: "#c084fc" },
  Event: { bg: "rgba(56,189,248,0.15)", border: "rgba(56,189,248,0.4)", text: "#38bdf8" },
  "Short Film": { bg: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.4)", text: "#fb923c" },
};

/* ═══════════════════════════════════════════════════════════════════
   CSS — injected once via <style>
   ═══════════════════════════════════════════════════════════════════ */

const SWIPER_CSS = `
  /* ── Slide sizing (responsive) ── */
  .works-swiper .swiper-slide {
    width: 300px;
    transform-origin: center;
    transition: transform 0.5s cubic-bezier(0.25,1,0.5,1);
  }
  @media (min-width: 640px)  { .works-swiper .swiper-slide { width: 420px; } }
  @media (min-width: 768px)  { .works-swiper .swiper-slide { width: 560px; } }
  @media (min-width: 1024px) { .works-swiper .swiper-slide { width: 640px; } }

  /* ── Active slide lift ── */
  .works-swiper .swiper-slide-active {
    transform: scale(1.02);
  }

  /* ── Dark overlay for non-active slides (CSS-only, no JS filter) ── */
  .works-swiper .swiper-slide .slide-overlay {
    opacity: 0.6;
    transition: opacity 0.5s ease;
  }
  .works-swiper .swiper-slide-active .slide-overlay {
    opacity: 0 !important;
  }

  /* ── Pagination ── */
  .works-swiper .swiper-pagination-bullet {
    background: rgba(255,255,255,0.25);
    width: 6px; height: 6px;
    opacity: 1;
    transition: background 0.3s, width 0.3s;
  }
  .works-swiper .swiper-pagination-bullet-active {
    background: #E3A652;
    width: 24px;
    border-radius: 3px;
  }
  .works-swiper { padding-bottom: 52px !important; }

  /* Hide default nav arrows (we use custom) */
  .works-swiper .swiper-button-next,
  .works-swiper .swiper-button-prev { display: none; }
`;

/* ═══════════════════════════════════════════════════════════════════
   SLIDE CARD — extracted for clarity
   ═══════════════════════════════════════════════════════════════════ */

interface SlideCardProps {
  project: Project;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onClose: () => void;
  onSlideToMe: () => void;
}

function SlideCard({ project: p, isActive, isPlaying, onPlay, onClose, onSlideToMe }: SlideCardProps) {
  const videoId = ytId(p.yt);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const ts = TAG_STYLE[p.tag];

  /** Click handler: side card → scroll to center; active card → play */
  const handleCardClick = () => {
    if (!isActive) {
      onSlideToMe();
    } else if (!isPlaying) {
      onPlay();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative overflow-hidden rounded-2xl select-none cursor-pointer"
      style={{
        aspectRatio: "16/9",
        boxShadow: isActive
          ? "0 0 0 1px rgba(227,166,82,0.18), 0 20px 50px rgba(0,0,0,0.65), 0 0 40px rgba(227,166,82,0.12)"
          : "0 8px 28px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.5s ease",
      }}
    >
      {/* ── Dark overlay for non-active slides (CSS-driven) ── */}
      <div
        className="slide-overlay absolute inset-0 z-[5] pointer-events-none rounded-2xl"
        style={{ background: "rgba(0,0,0,0.85)" }}
      />

      {isPlaying && isActive ? (
        /* ── YouTube iframe embed ── */
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={p.title}
            className="absolute inset-0 w-full h-full z-[6]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ border: "none" }}
          />
          {/* Close / stop button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-3 right-3 z-[15] w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-200 hover:scale-110 cursor-pointer"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
            aria-label="Close video"
          >
            ✕
          </button>
        </>
      ) : (
        /* ── Thumbnail + play button ── */
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Bottom gradient — ensures text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.50) 40%, transparent 100%)" }}
          />
          {/* Top gradient — tag readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 30%)" }}
          />

          {/* Tag badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[6]">
            <span
              className="text-[0.6rem] sm:text-[0.65rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded backdrop-blur-sm"
              style={{ color: ts.text, background: ts.bg, border: `1px solid ${ts.border}` }}
            >
              {p.tag}
            </span>
          </div>

          {/* Play button — absolute center */}
          <div className="absolute inset-0 flex items-center justify-center z-[6]">
            <button
              onClick={(e) => { e.stopPropagation(); if (isActive) onPlay(); else onSlideToMe(); }}
              className="group flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                width: "64px", height: "64px",
                background: isActive
                  ? "linear-gradient(135deg, #E3A652 0%, #D4913E 50%, #EDB96A 100%)"
                  : "rgba(255,255,255,0.12)",
                border: isActive ? "none" : "1.5px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(10px)",
                boxShadow: isActive
                  ? "0 0 28px rgba(227,166,82,0.45), 0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)"
                  : "0 4px 14px rgba(0,0,0,0.3)",
              }}
              aria-label={`Play ${p.title} video`}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="ml-0.5">
                <path d="M2 1.5l14 8.5-14 8.5V1.5z" fill={isActive ? "#050608" : "white"} />
              </svg>
            </button>
          </div>

          {/* Bottom text content */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-7 z-[6]">
            <h3
              className="font-extrabold uppercase leading-tight tracking-wide"
              style={{
                fontSize: "clamp(0.85rem, 2.2vw, 1.3rem)",
                color: isActive ? "#E3A652" : "#fff",
                transition: "color 0.4s ease",
              }}
            >
              {p.title}
            </h3>
            <p
              className="mt-1 leading-snug"
              style={{
                fontSize: "clamp(0.68rem, 1.4vw, 0.85rem)",
                color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.45)",
                transition: "color 0.4s ease",
              }}
            >
              {p.desc}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const swiperRef = useRef<SwiperType | null>(null);

  const [reel, setReel] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Ref mirror avoids stale closures in Swiper event callbacks
  const playingIdRef = useRef<number | null>(null);

  /* ── Video / autoplay orchestration ── */
  const startVideo = useCallback((id: number) => {
    playingIdRef.current = id;
    setPlayingId(id);
    const sw = swiperRef.current;
    if (sw) {
      sw.autoplay?.stop();
      // Lock the carousel while video is playing
      sw.allowTouchMove = false;
      sw.allowSlideNext = false;
      sw.allowSlidePrev = false;
    }
  }, []);

  const stopVideo = useCallback(() => {
    playingIdRef.current = null;
    setPlayingId(null);
    const sw = swiperRef.current;
    if (sw) {
      // Unlock carousel
      sw.allowTouchMove = true;
      sw.allowSlideNext = true;
      sw.allowSlidePrev = true;
      sw.autoplay?.start();
    }
  }, []);

  // No onSlideChange handler needed — carousel is fully locked while video plays.
  // Swiper loop mode fires internal slideChange events during DOM re-rendering
  // (iframe replacing thumbnail), which was the root cause of the auto-pause bug.

  return (
    <motion.section
      id="work"
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
      style={{ zIndex: 10, paddingTop: "5rem", paddingBottom: "6rem", backgroundColor: "var(--bg-primary)" }}
      aria-label="Selected Works"
    >
      <style>{SWIPER_CSS}</style>

      {/* Top edge gradient fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-32"
        style={{ background: "linear-gradient(to bottom, rgba(5,6,8,1) 0%, transparent 100%)" }}
      />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-14 lg:px-20 xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="lens-flare">
              <p className="label-line justify-start mb-4">
                <span className="w-6 h-px block" style={{ background: "#E3A652" }} />Portfolio
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-none tracking-tight text-cinema">
                SELECTED <span style={{ color: "#E3A652" }}>WORKS</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/50 mt-3 font-light tracking-wide">
                Craft that moves people &amp; markets.
              </p>
              <div className="mt-5"><div className="fade-line" /></div>
            </div>

            {/* Showreel CTA */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => { setReel(true); swiperRef.current?.autoplay?.stop(); }}
                className="group flex items-center gap-4 p-4 sm:p-5 transition-all duration-300 hover-lift cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
                aria-label="Watch full showreel"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border border-[#E3A652]/40 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-[5px] sm:inset-[6px] rounded-full bg-[#E3A652] flex items-center justify-center">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M1 1l8 5-8 5V1z" fill="#050608" />
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-xs sm:text-sm leading-tight">Watch Full Showreel</p>
                  <p className="text-white/35 text-[0.65rem] sm:text-xs mt-0.5 tracking-wide">1 min · HD</p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3-D Coverflow Carousel ─────────────────────────────────── */}
      <div className="relative">
        {/* Nav arrows */}
        {(["prev", "next"] as const).map((dir) => (
          <div key={dir} className={`absolute top-1/2 ${dir === "prev" ? "left-3 md:left-10" : "right-3 md:right-10"} -translate-y-1/2 z-[60]`}>
            <button
              onClick={() => dir === "prev" ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext()}
              className="w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              aria-label={`${dir === "prev" ? "Previous" : "Next"} slide`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={dir === "prev" ? "M9 2L4 7l5 5" : "M5 2l5 5-5 5"} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Swiper
            className="works-swiper"
            modules={[EffectCoverflow, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            speed={600}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 140,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            onSwiper={(s) => { swiperRef.current = s; }}
          >
            {projects.map((p, idx) => (
              <SwiperSlide key={p.id}>
                {({ isActive }) => (
                  <SlideCard
                    project={p}
                    isActive={isActive}
                    isPlaying={playingId === p.id}
                    onPlay={() => startVideo(p.id)}
                    onClose={stopVideo}
                    onSlideToMe={() => swiperRef.current?.slideToLoop(idx)}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* ── Showreel lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {reel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => { setReel(false); swiperRef.current?.autoplay?.start(); }}
            role="dialog" aria-modal="true" aria-label="Showreel video"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl aspect-video bg-black relative rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video src="/showreel.mp4" className="w-full h-full object-cover" controls autoPlay playsInline />
              <button
                onClick={() => { setReel(false); swiperRef.current?.autoplay?.start(); }}
                className="absolute -top-10 right-0 text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors cursor-pointer"
                aria-label="Close showreel"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}