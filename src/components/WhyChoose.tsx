"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
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

const GoldCheck = () => (
  <svg
    width="22" height="22" viewBox="0 0 22 22" fill="none"
    aria-hidden="true" className="flex-shrink-0 mt-0.5"
  >
    <circle cx="11" cy="11" r="10.5" stroke="#E3A652" strokeWidth="1.2" fill="rgba(227,166,82,0.12)" />
    <path d="M6.5 11.2l3.2 3.2 5.8-6" stroke="#E3A652" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative overflow-hidden py-28 px-6 md:px-14 lg:px-20 xl:px-28"
      aria-label="Why choose BSR Films"
    >
      {/* ── Cinematic video background ────────────────────────────────── */}
      <video
        src="/hero-bg.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* ── Gradient overlays for depth & readability ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.28) 100%)",
        }}
      />
      {/* subtle top/bottom fades so section blends with neighbours */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050608] to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050608] to-transparent" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left: Liquid glass text panel ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* inner specular sheen */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
            />

            {/* Eyebrow */}
            <p className="text-[0.65rem] font-bold tracking-[0.28em] uppercase text-white/50 mb-4">
              The BSR Difference
            </p>

            {/* H2 */}
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              Why Choose{" "}
              <span className="text-[#E3A652]">BSR Films?</span>
            </h2>

            {/* Body */}
            <p className="text-white/65 text-[1.05rem] leading-relaxed mb-8">
              We combine the intimacy of regional storytelling with the
              discipline of a professional studio — producing content that
              resonates locally and competes globally.
            </p>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="w-10 h-[2px] mb-8"
              style={{ background: "linear-gradient(90deg, #E3A652, transparent)" }}
            />

            {/* Quote */}
            <blockquote className="border-l-[3px] border-[#E3A652]/60 pl-5 py-1">
              <p className="text-white/80 text-lg italic leading-relaxed font-light">
                "We see Chhattisgarh through the lens of BSR Films."
              </p>
              <footer className="text-white/35 text-xs mt-2 tracking-wide">
                — Our guiding philosophy
              </footer>
            </blockquote>
          </motion.div>

          {/* ── Right: Liquid glass cards ───────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.12 + i * 0.1,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.055)",
                  backdropFilter: "blur(22px) saturate(160%)",
                  WebkitBackdropFilter: "blur(22px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "4px solid #E3A652",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 36px rgba(0,0,0,0.38), 0 0 0 1px rgba(227,166,82,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.055)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)";
                }}
              >
                {/* top specular sheen */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(227,166,82,0.3), rgba(255,255,255,0.12), transparent)" }}
                />

                <div className="flex gap-4 items-start p-5 md:p-6">
                  <GoldCheck />
                  <div>
                    <h3 className="text-white font-bold text-[0.92rem] mb-1.5 leading-snug group-hover:text-[#E3A652] transition-colors duration-250">
                      {r.title}
                    </h3>
                    <p className="text-base md:text-lg text-white/80 leading-snug font-medium mt-2">
                      {r.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}