"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { useLanguage } from "@/context/LanguageContext";

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

const projectsEn: Project[] = [
  { id: 1, tag: "Documentary", title: "DOCUMENTARY FILMS", desc: "Telling real stories from the soul of Chhattisgarh.", yt: "https://youtu.be/bg0PxI6_QZI?si=Wrwnp5ZfK5rsW1-x", accent: "#34d399" },
  { id: 2, tag: "Corporate", title: "CORPORATE FILMS", desc: "Cinematic storytelling for global brands.", yt: "https://youtu.be/pyAS6rpfw0Y?si=k0cS-UyAKMb3rUj1", accent: "#60a5fa" },
  { id: 3, tag: "Ad Film", title: "AD FILMS & JINGLES", desc: "Creative TVCs that capture hearts at first frame.", yt: "https://youtu.be/WxsYGECivmQ?si=Pzujhxe-bRQ_rkkN", accent: "#E3A652" },
  { id: 4, tag: "Audio", title: "AUDIO PRODUCTION", desc: "Memorable audio production that stays with you.", yt: "https://youtu.be/up7w3WY_dvI?si=2DrbR25LBJv8lcBG", accent: "#f472b6" },
  { id: 5, tag: "Animation", title: "ANIMATION & VFX", desc: "Bringing imagination to life with cutting-edge tech.", yt: "https://youtu.be/g4OJZP6sa18", accent: "#c084fc" },
  { id: 6, tag: "Event", title: "EVENT COVERAGE", desc: "Impactful event films across 27 districts.", yt: "https://youtu.be/HlEgtE828N4?si=v_3aFWU1DYFj0kiu", accent: "#38bdf8" },
  { id: 7, tag: "Short Film", title: "SHORT FILMS", desc: "Compact cinematic narratives with lasting impact.", yt: "https://youtu.be/nBjr3Qgd0LY?si=7WUdVlRymjHjfQ8L", accent: "#fb923c" },
];

const projectsHi: Project[] = [
  { id: 1, tag: "वृत्तचित्र", title: "वृत्तचित्र फिल्में (डॉक्यूमेंट्री)", desc: "छत्तीसगढ़ की माटी और आत्मा से उपजी सच्ची कहानियां।", yt: "https://youtu.be/bg0PxI6_QZI?si=Wrwnp5ZfK5rsW1-x", accent: "#34d399" },
  { id: 2, tag: "कॉर्पोरेट", title: "कॉर्पोरेट एवं औद्योगिक फिल्में", desc: "वैश्विक ब्रांड्स और औद्योगिक घरानों के लिए सिनेमाई प्रस्तुति।", yt: "https://youtu.be/pyAS6rpfw0Y?si=k0cS-UyAKMb3rUj1", accent: "#60a5fa" },
  { id: 3, tag: "विज्ञापन", title: "विज्ञापन फिल्में एवं जिंगल्स", desc: "क्रिएटिव टीवीसी जो पहले ही फ्रेम में दर्शकों का दिल जीत लें।", yt: "https://youtu.be/WxsYGECivmQ?si=Pzujhxe-bRQ_rkkN", accent: "#E3A652" },
  { id: 4, tag: "ऑडियो", title: "ऑडियो प्रोडक्शन एवं संगीत", desc: "मनभावन संगीत और कर्णप्रिय धुनें जो सदैव दिल में बसी रहें।", yt: "https://youtu.be/up7w3WY_dvI?si=2DrbR25LBJv8lcBG", accent: "#f472b6" },
  { id: 5, tag: "एनिमेशन", title: "3D एनिमेशन एवं वीएफएक्स", desc: "अत्याधुनिक तकनीक से कल्पनाओं को जीवंत रूप देना।", yt: "https://youtu.be/g4OJZP6sa18", accent: "#c084fc" },
  { id: 6, tag: "इवेंट", title: "भव्य इवेंट कवरेज", desc: "27+ जिलों में विशाल शासकीय व सांस्कृतिक आयोजनों की भव्य कवरेज।", yt: "https://youtu.be/HlEgtE828N4?si=v_3aFWU1DYFj0kiu", accent: "#38bdf8" },
  { id: 7, tag: "लघु फिल्म", title: "लघु फिल्में (शॉर्ट फिल्म्स)", desc: "गहन संदेश देने वाली संक्षिप्त और प्रभावशाली सिनेमाई कथाएं।", yt: "https://youtu.be/nBjr3Qgd0LY?si=7WUdVlRymjHjfQ8L", accent: "#fb923c" },
];

const TAG_STYLE: Record<string, { bg: string; border: string; text: string }> = {
  Documentary: { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.4)", text: "#34d399" },
  Corporate: { bg: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.4)", text: "#60a5fa" },
  "Ad Film": { bg: "rgba(227,166,82,0.15)", border: "rgba(227,166,82,0.4)", text: "#E3A652" },
  Audio: { bg: "rgba(244,114,182,0.15)", border: "rgba(244,114,182,0.4)", text: "#f472b6" },
  Animation: { bg: "rgba(192,132,252,0.15)", border: "rgba(192,132,252,0.4)", text: "#c084fc" },
  Event: { bg: "rgba(56,189,248,0.15)", border: "rgba(56,189,248,0.4)", text: "#38bdf8" },
  "Short Film": { bg: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.4)", text: "#fb923c" },
  // Hindi keys
  वृत्तचित्र: { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.4)", text: "#34d399" },
  कॉर्पोरेट: { bg: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.4)", text: "#60a5fa" },
  विज्ञापन: { bg: "rgba(227,166,82,0.15)", border: "rgba(227,166,82,0.4)", text: "#E3A652" },
  ऑडियो: { bg: "rgba(244,114,182,0.15)", border: "rgba(244,114,182,0.4)", text: "#f472b6" },
  एनिमेशन: { bg: "rgba(192,132,252,0.15)", border: "rgba(192,132,252,0.4)", text: "#c084fc" },
  इवेंट: { bg: "rgba(56,189,248,0.15)", border: "rgba(56,189,248,0.4)", text: "#38bdf8" },
  "लघु फिल्म": { bg: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.4)", text: "#fb923c" },
};

/* ═══════════════════════════════════════════════════════════════════
   SLIDE CARD
   ═══════════════════════════════════════════════════════════════════ */

interface SlideCardProps {
  project: Project;
  isActive: boolean;
  isPlaying: boolean;
  isMobile: boolean;
  onPlay: () => void;
  onClose: () => void;
  onSlideToMe: () => void;
}

function SlideCard({ project: p, isActive, isPlaying, isMobile, onPlay, onClose, onSlideToMe }: SlideCardProps) {
  const videoId = ytId(p.yt);
  const thumbUrl = isMobile
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const ts = TAG_STYLE[p.tag];

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
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl select-none cursor-pointer aspect-video transition-shadow duration-500 ${isActive ? 'slide-card-shadow-active' : 'slide-card-shadow'}`}
    >
      {/* Dark overlay for non-active slides */}
      <div
        className="slide-overlay absolute inset-0 z-[5] pointer-events-none rounded-xl sm:rounded-2xl slide-overlay-bg"
      />

      {isPlaying && isActive ? (
        /* ── YouTube iframe embed ── */
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={p.title}
            className="absolute inset-0 w-full h-full z-[6] border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-[15] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-200 hover:scale-110 cursor-pointer close-btn-dark"
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
            loading="lazy"
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-0 pointer-events-none slide-gradient-bottom"
          />
          {/* Top gradient */}
          <div
            className="absolute inset-0 pointer-events-none slide-gradient-top"
          />

          {/* Tag badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-[6]">
            <span
              className="text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.18em] uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded"
              style={{ color: ts.text, background: ts.bg, border: `1px solid ${ts.border}` }}
            >
              {p.tag}
            </span>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-[6]">
            <button
              onClick={(e) => { e.stopPropagation(); if (isActive) onPlay(); else onSlideToMe(); }}
              className={`group flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 cursor-pointer w-[52px] h-[52px] ${isActive ? 'play-btn-active' : 'play-btn-inactive'}`}
              aria-label={`Play ${p.title} video`}
            >
              <svg width="16" height="18" viewBox="0 0 18 20" fill="none" className="ml-0.5">
                <path d="M2 1.5l14 8.5-14 8.5V1.5z" fill={isActive ? "#050608" : "white"} />
              </svg>
            </button>
          </div>

          {/* Bottom text content */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 md:p-5 lg:p-7 z-[6] text-left">
            <h3
              className={`font-black uppercase leading-tight tracking-wide text-[clamp(0.8rem,2.2vw,1.3rem)] transition-colors duration-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${isActive ? 'text-[#F4D090]' : 'text-white'}`}
            >
              {p.title}
            </h3>
            <p
              className={`mt-1 leading-snug text-[clamp(0.65rem,1.4vw,0.88rem)] font-medium transition-colors duration-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] ${isActive ? 'text-[#FFF8E7]' : 'text-[#E2D9C8]'}`}
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
  const [isMobile, setIsMobile] = useState(false);
  const { isHindi } = useLanguage();
  const projects = isHindi ? projectsHi : projectsEn;

  const [reel, setReel] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const playingIdRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  /* ── Video / autoplay orchestration ── */
  const startVideo = useCallback((id: number) => {
    playingIdRef.current = id;
    setPlayingId(id);
    const sw = swiperRef.current;
    if (sw) {
      sw.autoplay?.stop();
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
      sw.allowTouchMove = true;
      sw.allowSlideNext = true;
      sw.allowSlidePrev = true;
      sw.autoplay?.start();
    }
  }, []);

  return (
    <motion.section
      id="work"
      ref={ref}
      initial={isMobile ? { opacity: 0, y: 16 } : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: isMobile ? 0.4 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 pt-10 pb-12 bg-[var(--bg-primary)]"
      aria-label="Selected Works"
    >
      {/* Top edge gradient fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-24 sm:h-32 works-top-fade"
      />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-5 md:px-14 lg:px-20 xl:px-28">
        <motion.div
          initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.35 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-8 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <div className="lens-flare text-left">
              <p className="label-line justify-start mb-3 sm:mb-4">
                {isHindi ? "चयनित कृतियां" : "Portfolio"}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-heading)] leading-none tracking-tight">
                {isHindi ? (
                  <>प्रमुख <span className="gold-text">सिनेमाई कृतियां</span></>
                ) : (
                  <>SELECTED <span className="gold-text">WORKS</span></>
                )}
              </h2>
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-[var(--text-muted)] mt-1.5 sm:mt-2 md:mt-3 font-medium tracking-wide">
                {isHindi
                  ? "ऐसी कृतियां जो जनमानस और बाजार दोनों को गहराई से प्रभावित करें।"
                  : "Craft that moves people & markets."}
              </p>
              <div className="mt-4 sm:mt-5"><div className="fade-line" /></div>
            </div>

            {/* Showreel CTA */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={() => { setReel(true); swiperRef.current?.autoplay?.stop(); }}
                className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 transition-all duration-300 hover-lift cursor-pointer rounded-xl sm:rounded-2xl showreel-btn ${!isMobile ? 'backdrop-blur-[12px]' : 'bg-black/60'} border border-[#F4D090]/30 shadow-lg`}
                aria-label="Watch full showreel"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border border-[#E3A652]/50 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-[4px] sm:inset-[5px] md:inset-[6px] rounded-full bg-gradient-to-r from-[#F4D090] to-[#E3A652] flex items-center justify-center">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M1 1l8 5-8 5V1z" fill="#050608" />
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white font-extrabold text-xs sm:text-sm leading-tight drop-shadow-sm">
                    {isHindi ? "फुल शूरिल देखें" : "Watch Full Showreel"}
                  </p>
                  <p className="text-[#F4D090] text-[0.6rem] sm:text-xs mt-0.5 tracking-wide font-medium">
                    {isHindi ? "1 मिनट · HD" : "1 min · HD"}
                  </p>
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
          <div key={dir} className={`absolute top-1/2 ${dir === "prev" ? "left-0.5 sm:left-2 md:left-10" : "right-0.5 sm:right-2 md:right-10"} -translate-y-1/2 z-[60]`}>
            <button
              onClick={() => dir === "prev" ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext()}
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all cursor-pointer nav-arrow-dark${isMobile ? '' : ' backdrop-blur-md'}`}
              aria-label={`${dir === "prev" ? "Previous" : "Next"} slide`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={dir === "prev" ? "M9 2L4 7l5 5" : "M5 2l5 5-5 5"} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}

        <motion.div
          initial={isMobile ? { opacity: 0, y: 16 } : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0.35 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Swiper
            className="works-swiper"
            modules={[EffectCoverflow, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            speed={isMobile ? 450 : 650}
            autoplay={isMobile ? false : {
              delay: 5000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: isMobile ? 0 : 140,
              modifier: isMobile ? 1 : 2.5,
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
                    isMobile={isMobile}
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
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-3 sm:p-4 md:p-6"
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
                className="absolute -top-8 sm:-top-10 right-0 text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors cursor-pointer min-h-[44px] flex items-center"
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