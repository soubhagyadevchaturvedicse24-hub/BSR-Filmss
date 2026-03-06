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
    <span className="px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-semibold whitespace-nowrap mx-2 sm:mx-3 md:mx-4 flex items-center flex-shrink-0 marquee-badge-styled marquee-badge-shimmer">
      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mr-2.5 sm:mr-3 md:mr-3.5 flex-shrink-0 dot-gold-glow" />
      {label}
    </span>
  );
}

function FullWidthMarquee({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const track = buildTrack(items);
  return (
    <div
      className="relative w-full overflow-hidden marquee-mask"
    >
      <div
        className={`marquee-track ${direction === "left" ? "marquee-track--left" : "marquee-track--right"} w-max gap-0`}
      >
        {track.map((item, idx) => (
          <MarqueeBadge key={`${item}-${idx}`} label={item} />
        ))}
      </div>
    </div>
  );
}

/* Static wrapped grid for mobile — no animation, no duplicated track */
function StaticBadgeGrid({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-3">
      {items.map((label) => (
        <span
          key={label}
          className="px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap flex items-center marquee-badge-styled"
        >
          <span className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 dot-gold-glow" />
          {label}
        </span>
      ))}
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // ── Detect mobile & desktop breakpoints ──────────────────────────
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    setIsDesktop(window.innerWidth >= 1024);

    const mqList = window.matchMedia("(min-width: 1024px)");
    const syncDesktop = () => setIsDesktop(mqList.matches);
    mqList.addEventListener("change", syncDesktop);
    return () => mqList.removeEventListener("change", syncDesktop);
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className={`relative overflow-hidden min-h-[60vh] z-10 ${isDesktop ? '-mt-[100vh]' : ''}`}
      aria-label="Organizations and government departments that trust BSR Films"
    >
      {/* Full-bleed background — nothing on mobile, video on desktop */}
      {!isMobile && (
        <video
          ref={videoRef}
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/bsr-brand.png"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}

      {/* Overlay — solid on mobile, blurred on desktop */}
      <div
        className={`absolute inset-0 z-0 transition-colors duration-700 clients-overlay ${!isMobile ? 'backdrop-blur-[4px]' : ''}`}
        aria-hidden="true"
      />

      {/* Page-blend top/bottom edge fades */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-16 sm:h-24 md:h-36 pointer-events-none z-10 fade-to-bg-bottom" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-36 pointer-events-none z-10 fade-to-bg-top" />

      {/* ── Clients content: marquees first, compact card below ── */}
      <div className={`relative z-20 ${isDesktop ? 'pt-10 md:pt-14 pb-8 md:pb-12' : 'pt-4 pb-8'}`}>

        {/* Full-width marquees — visible layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0.3 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full flex flex-col ${isDesktop ? 'gap-6' : 'gap-3 sm:gap-4'}`}
        >
          {isDesktop ? (
            <>
              <FullWidthMarquee items={majorOrgs} direction="left" />
              <FullWidthMarquee items={govtDepts} direction="right" />
              <FullWidthMarquee items={govtDepts} direction="left" />
            </>
          ) : (
            <StaticBadgeGrid items={[...majorOrgs, ...govtDepts]} />
          )}
        </motion.div>

        {/* Compact glass card — in flow, below the marquees */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.35 : 0.85, delay: isMobile ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto text-center px-6 sm:px-8 md:px-12 py-5 sm:py-6 md:py-8 rounded-2xl sm:rounded-3xl border-glow transition-colors duration-500 max-w-[520px] w-[calc(100%-2rem)] mt-8 md:mt-10 ${isMobile ? 'clients-card-mobile' : 'clients-card-desktop'}`}
        >
          <p className="label-line justify-center text-[0.6rem] mb-2">Trusted By</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight transition-colors duration-500 heading-text-shadow">
            Clients &amp; <span className="color-gold">Partners</span>
          </h2>
          <p className="text-sm sm:text-base mt-2 sm:mt-3 leading-relaxed opacity-60 transition-colors duration-500 color-primary">
            Global bodies and state authorities that place their trust in BSR Films.
          </p>

          {/* Stats row — compact */}
          <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 transition-colors duration-500 border-top-subtle">
            {[["29+", "Clients"], ["20+", "Govt. Depts"], ["500+", "Campaigns"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-none transition-colors duration-500 color-gold">{n}</p>
                <p className="text-[0.55rem] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase mt-1 opacity-50 transition-colors duration-500 color-primary">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}