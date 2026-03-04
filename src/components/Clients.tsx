"use client";

import { useRef } from "react";
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
    <span className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm md:text-base font-medium whitespace-nowrap mx-4 backdrop-blur-md flex items-center flex-shrink-0 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#E3A652]/20 hover:shadow-[0_0_20px_rgba(227,166,82,0.08)]"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#E3A652] mr-3 flex-shrink-0" style={{ opacity: 0.85 }} />
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

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "80vh", marginTop: "-100vh", zIndex: 10 }}
      aria-label="Organizations and government departments that trust BSR Films"
    >
      {/* Full-bleed logo video */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Heavy dark overlay — dims the 3D logo so foreground pops */}
      <div className="absolute inset-0 bg-[#050608]/85 backdrop-blur-sm z-0" aria-hidden="true" />

      {/* Page-blend top/bottom edge fades */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #050608, transparent)" }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #050608, transparent)" }} />

      {/* ── Floating glass card ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85 }}
        className="relative z-30 mx-auto text-center px-10 py-8 rounded-2xl border-glow"
        style={{
          marginTop: "4rem",
          background: "rgba(5,6,8,0.78)",
          backdropFilter: "blur(32px) saturate(160%)",
          WebkitBackdropFilter: "blur(32px) saturate(160%)",
          border: "1px solid rgba(227,166,82,0.12)",
          boxShadow: "0 12px 56px rgba(0,0,0,0.7), 0 0 0 1px rgba(227,166,82,0.08), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px rgba(227,166,82,0.05)",
          maxWidth: "560px",
          width: "calc(100% - 3rem)",
        }}
      >
        <p className="label-line justify-center">Trusted By</p>
        <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white leading-tight tracking-tight mt-1 text-cinema">
          Clients &amp; <span style={{ color: "#E3A652" }}>Partners</span>
        </h2>
        <p className="text-white/50 text-sm mt-3 leading-relaxed">
          Global bodies and state authorities that place their trust in BSR Films.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-7 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {[["29+", "Clients"], ["20+", "Govt. Depts"], ["500+", "Campaigns"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold leading-none" style={{ color: "#E3A652" }}>{n}</p>
              <p className="text-white/40 text-[0.6rem] tracking-[0.18em] uppercase mt-1">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>

        {/* Full-width edge-to-edge marquees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="w-full flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div>
            <p className="text-[#E3A652] text-xs font-bold tracking-widest uppercase mb-4 text-center z-10 relative">
              International &amp; National Organizations
            </p>
            <FullWidthMarquee items={majorOrgs} direction="left" />
          </div>

          {/* Row 2 */}
          <div>
            <p className="text-[#E3A652] text-xs font-bold tracking-widest uppercase mb-4 text-center z-10 relative" style={{ opacity: 0.65 }}>
              Chhattisgarh Government Departments
            </p>
            <FullWidthMarquee items={govtDepts} direction="right" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}