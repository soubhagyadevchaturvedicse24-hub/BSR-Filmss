"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const majorOrgs = [
  "World Bank", "NABARD", "UNICEF", "SHRC", "CHRI",
  "IFFCO", "Birla Group", "DDUGKY", "SRLM", "PRIYA NGO",
];

const govtDepts = [
  "Public Relations", "Labour Dept.", "Panchayat & Rural Dev.", "PHED",
  "Tribal Department", "Urban Administration", "Health & Family Welfare",
  "Women & Child Dev.", "School Education", "Science & Technology",
  "Water Resources", "Agriculture", "CREDA", "Forest Department",
  "Swachh Bharat Mission", "Devbhog Dairy Fed.", "Police", "Yog Ayog",
  "AIDS Control Society",
];

/* Duplicate track for seamless loop (2x for -50% translateX keyframe) */
const buildTrack = (items: string[]) => [...items, ...items];

function MarqueeBadge({ label }: { label: string }) {
  return (
    <span className="px-3 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 rounded-full bg-white/5 border border-white/10 text-white/90 text-[0.65rem] sm:text-xs md:text-base font-medium whitespace-nowrap mx-1 sm:mx-2 md:mx-4 flex items-center flex-shrink-0 active:bg-white/[0.1]"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#E3A652] mr-1.5 sm:mr-2 md:mr-3 flex-shrink-0" style={{ opacity: 0.85 }} />
      {label}
    </span>
  );
}

function FullWidthMarquee({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const track = buildTrack(items);
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`marquee-track ${direction === "left" ? "marquee-track--left" : "marquee-track--right"}`}
        style={{ width: "max-content", gap: 0 }}
      >
        {track.map((item, idx) => (
          <MarqueeBadge key={`${item}-${idx}`} label={item} />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Detect mobile and lazy-load video ──────────────────────────
  useEffect(() => {
    const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobile);

    // On mobile, only play video when section is visible (saves battery)
    if (mobile && videoRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => { });
          } else {
            videoRef.current?.pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(sectionRef.current!);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "60vh", marginTop: "-100vh", zIndex: 10 }}
      aria-label="Organizations and government departments that trust BSR Films"
    >
      {/* Full-bleed logo video — lazy on mobile */}
      <video
        ref={videoRef}
        src="/hero-bg.mp4"
        autoPlay={!isMobile}
        muted
        loop
        playsInline
        preload={isMobile ? "none" : "auto"}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Heavy dark overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: 'rgba(5,6,8,0.85)',
          backdropFilter: isMobile ? 'none' : 'blur(4px)',
          WebkitBackdropFilter: isMobile ? 'none' : 'blur(4px)',
        }}
        aria-hidden="true"
      />

      {/* Page-blend top/bottom edge fades */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-16 sm:h-24 md:h-36 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, var(--bg-primary), transparent)" }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-36 pointer-events-none z-10" style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }} />

      {/* ── Floating glass card ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 mx-auto text-center px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 rounded-xl sm:rounded-2xl border-glow"
        style={{
          marginTop: "2rem",
          background: isMobile ? "rgba(5,6,8,0.92)" : "rgba(5,6,8,0.78)",
          ...(isMobile ? {} : { backdropFilter: "blur(24px) saturate(140%)", WebkitBackdropFilter: "blur(24px) saturate(140%)" }),
          border: "1px solid rgba(227,166,82,0.12)",
          boxShadow: "0 12px 56px rgba(0,0,0,0.7), 0 0 0 1px rgba(227,166,82,0.08), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px rgba(227,166,82,0.05)",
          maxWidth: "560px",
          width: "calc(100% - 2rem)",
        }}
      >
        <p className="label-line justify-center">Trusted By</p>
        <h2 className="text-[clamp(1.3rem,4.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight mt-1 text-cinema">
          Clients &amp; <span style={{ color: "#E3A652" }}>Partners</span>
        </h2>
        <p className="text-white/50 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
          Global bodies and state authorities that place their trust in BSR Films.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mt-3 sm:mt-5 md:mt-7 pt-3 sm:pt-4 md:pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {[["29+", "Clients"], ["20+", "Govt. Depts"], ["500+", "Campaigns"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-lg sm:text-xl md:text-3xl font-extrabold leading-none" style={{ color: "#E3A652" }}>{n}</p>
              <p className="text-white/40 text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] tracking-[0.15em] sm:tracking-[0.18em] uppercase mt-0.5 sm:mt-1">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>

        {/* Full-width marquees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col gap-3 sm:gap-4 md:gap-6"
        >
          {/* Row 1 */}
          <div>
            <p className="text-[#E3A652] text-[0.55rem] sm:text-[0.65rem] md:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 text-center z-10 relative">
              International &amp; National Organizations
            </p>
            <FullWidthMarquee items={majorOrgs} direction="left" />
          </div>

          {/* Row 2 */}
          <div>
            <p className="text-[#E3A652] text-[0.55rem] sm:text-[0.65rem] md:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 text-center z-10 relative" style={{ opacity: 0.65 }}>
              Chhattisgarh Government Departments
            </p>
            <FullWidthMarquee items={govtDepts} direction="right" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}