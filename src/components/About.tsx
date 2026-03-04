"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const team = [
  {
    name: "Bishmdev Chaturvedi",
    role: "Director & Founder",
    img: "/team/bhishma.png",
    bio: "Visionary storyteller with 25+ years of shaping Chhattisgarh's media landscape through purposeful cinema.",
  },
  {
    name: "Tukesh Sahu",
    role: "Creative Team",
    img: "",
    bio: "Creative force behind BSR Films' visual identity, campaigns, and motion graphics output.",
  },
  {
    name: "Homesh Sahu",
    role: "Director of Photography",
    img: "/team/homesh.png",
    bio: "Master of light and lens, bringing cinematic richness to every frame across documentaries and ad films.",
  },
];

const CARD_VARIANTS = {
  enter: (dir: number) => ({ y: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [teamIdx, setTeamIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [tapped, setTapped] = useState(false);

  const navigate = (delta: number) => {
    setDir(delta);
    setTapped(false);
    setTeamIdx((prev) => (prev + delta + team.length) % team.length);
  };

  const member = team[teamIdx];

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050608 0%, #080a0e 50%, #050608 100%)" }} aria-label="About BSR Films">
      {/* Decorative reel-dot pattern background */}
      <div className="absolute inset-0 reel-dots opacity-40 pointer-events-none" aria-hidden="true" />
      {/* Ambient lens flare */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(227,166,82,0.04) 0%, transparent 70%)", animation: "flarePulse 6s ease-in-out infinite" }} />

      <div className="relative max-w-screen-xl mx-auto">

        {/* Top row: copy (left) + team carousel (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-0">

          {/* Left: company copy — kept exactly */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85 }}
          >
            <p className="label-line" style={{ color: "#E3A652" }}>
              <span style={{ background: "#E3A652" }} className="w-6 h-px block" />Who We Are
            </p>
            <h2 className="text-4xl md:text-[2.75rem] font-extrabold text-white leading-[1.06] tracking-tight mb-5 text-cinema">
              A production house<br />rooted in <span style={{ color: "#E3A652" }}>Chhattisgarh</span>.
            </h2>
            <div className="w-9 h-[2px] mb-7" style={{ background: "linear-gradient(90deg, #E3A652, transparent)" }} />
            <p className="text-white/60 text-base leading-[1.85] mb-5">
              BSR Films is a leading media production house based in{" "}
              <strong className="text-white">Raipur, Chhattisgarh</strong>. Since the state&apos;s
              formation, we have created innovative and impactful audio-visual content that bridges
              entertainment, information and social responsibility.
            </p>
            <p className="text-white/45 text-base leading-[1.85] mb-10">
              We are proud to be empanelled with{" "}
              <strong className="text-white/70">NFDC</strong> (National Film Development Corporation),{" "}
              <strong className="text-white/70">Central Sales Unit of All India Radio</strong>, and{" "}
              <strong className="text-white/70">Chhattisgarh Samvad</strong> — affirming our commitment
              to quality and credibility that has spanned 25+ years.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6">
              {[["25+", "Years"], ["500+", "Projects"], ["20+", "Govt. Bodies"]].map(([v, l]) => (
                <div key={l} className="group">
                  <p className="text-2xl md:text-3xl font-extrabold text-[#E3A652] leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.5)]">{v}</p>
                  <p className="text-white/35 text-[.6rem] md:text-[.68rem] tracking-[.15em] uppercase mt-1">{l}</p>
                </div>
              ))}
            </div>


          </motion.div>

          {/* Right: vertical team carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="flex flex-col"
          >
            <p className="label-line" style={{ color: "#E3A652" }}>
              <span style={{ background: "#E3A652" }} className="w-6 h-px block" />The Team
            </p>
            <h3 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
              The people behind the lens.
            </h3>

            {/* Card */}
            <div className="relative">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={teamIdx}
                  custom={dir}
                  variants={CARD_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Slide-up hover card — tap to reveal on touch */}
                  <div
                    onClick={() => setTapped((t) => !t)}
                    className={`relative w-full max-w-[320px] h-[420px] group rounded-3xl overflow-hidden bg-black shadow-xl mx-auto hover-lift border border-white/[0.06] cursor-pointer${tapped ? " tapped" : ""}`}
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(227,166,82,0.05)" }}
                  >

                    {/* Image — scales + shifts up on hover */}
                    <div className="absolute inset-0 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[0.96] group-hover:-translate-y-4 group-hover:rounded-3xl overflow-hidden">
                      {member.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          draggable={false}
                        />
                      ) : (
                    <div className="w-full h-full bg-[#0a0c10] flex items-center justify-center">
                          <span className="text-6xl font-extrabold text-[#E3A652]/40 select-none">
                            {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Default: bottom name overlay — fades out on hover */}
                    <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0 z-10">
                      <h3 className="text-white text-2xl font-bold leading-tight">{member.name}</h3>
                    </div>

                    {/* Hover: info panel slides up from bottom */}
                    <div className="absolute bottom-0 left-0 w-full bg-[#0a0c10] rounded-t-3xl p-6 transform translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 z-20 flex flex-col justify-center" style={{ minHeight: "45%" }}>
                      <h3 className="text-white text-xl font-bold mb-1 leading-tight">{member.name}</h3>
                      <p className="text-[#E3A652] text-xs font-bold uppercase tracking-wider mb-3">{member.role}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows + dots */}
              <div className="flex items-center gap-3 mt-5 max-w-[320px] mx-auto">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 group rounded-full hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  aria-label="Previous team member"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-[#E3A652] transition-colors" />
                  </svg>
                </button>
                <div className="flex gap-2 flex-1">
                  {team.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDir(i > teamIdx ? 1 : -1); setTapped(false); setTeamIdx(i); }}
                      className="transition-all duration-300"
                      style={{ width: i === teamIdx ? "24px" : "6px", height: "6px", borderRadius: "3px", background: i === teamIdx ? "#E3A652" : "rgba(255,255,255,0.15)" }}
                      aria-label={`Go to team member ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => navigate(1)}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 group rounded-full hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  aria-label="Next team member"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-[#E3A652] transition-colors" />
                  </svg>
                </button>
                <span className="text-white/30 text-xs ml-1">{teamIdx + 1} / {team.length}</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}