"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile();

  const navigate = (delta: number) => {
    setDir(delta);
    setTapped(false);
    setTeamIdx((prev) => (prev + delta + team.length) % team.length);
  };

  const member = team[teamIdx];

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden section-gradient-primary" aria-label="About BSR Films">
      {/* Decorative reel-dot pattern background */}
      <div className="absolute inset-0 reel-dots opacity-40 pointer-events-none" aria-hidden="true" />
      {/* Ambient lens flare */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] pointer-events-none radial-glow-gold hidden md:block animate-[flarePulse_6s_ease-in-out_infinite]" />

      <div className="relative max-w-screen-xl mx-auto">

        {/* Top row: copy (left) + team carousel (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 xl:gap-24 mb-0">

          {/* Left: company copy */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-line gold-text">
              <span className="w-6 h-px block gold-bg" />Who We Are
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.06] tracking-tight mb-3 sm:mb-4 md:mb-5 text-cinema">
              A production house<br />rooted in <span className="gold-text">Chhattisgarh</span>.
            </h2>
            <div className="w-7 sm:w-9 h-[2px] mb-4 sm:mb-5 md:mb-7 gold-divider" />
            <p className="text-white/60 text-xs sm:text-sm md:text-base leading-[1.75] sm:leading-[1.85] mb-3 sm:mb-4 md:mb-5">
              BSR Films is a leading media production house based in{" "}
              <strong className="text-white">Raipur, Chhattisgarh</strong>. Since the state&apos;s
              formation, we have created innovative and impactful audio-visual content that bridges
              entertainment, information and social responsibility.
            </p>
            <p className="text-white/45 text-xs sm:text-sm md:text-base leading-[1.75] sm:leading-[1.85] mb-6 sm:mb-8 md:mb-10">
              We are proud to be empanelled with{" "}
              <strong className="text-white/70">NFDC</strong> (National Film Development Corporation),{" "}
              <strong className="text-white/70">Central Sales Unit of All India Radio</strong>, and{" "}
              <strong className="text-white/70">Chhattisgarh Samvad</strong> — affirming our commitment
              to quality and credibility that has spanned 25+ years.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 pt-3 sm:pt-4 md:pt-6">
              {[["25+", "Years"], ["500+", "Projects"], ["20+", "Govt. Bodies"]].map(([v, l]) => (
                <div key={l} className="group">
                  <p className="text-lg sm:text-xl md:text-3xl font-extrabold text-[#E3A652] leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.5)]">{v}</p>
                  <p className="text-white/35 text-[.5rem] sm:text-[.55rem] md:text-[.68rem] tracking-[.12em] sm:tracking-[.15em] uppercase mt-0.5 sm:mt-1">{l}</p>
                </div>
              ))}
            </div>


          </motion.div>

          {/* Right: vertical team carousel */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] } : { duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <p className="label-line gold-text">
              <span className="w-6 h-px block gold-bg" />The Team
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
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
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTapped((t) => !t); } }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={tapped}
                    aria-label={`${member.name} — ${tapped ? 'hide' : 'show'} details`}
                    className={`relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] h-[300px] sm:h-[350px] md:h-[380px] lg:h-[420px] group rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-black mx-auto hover-lift border border-white/[0.06] cursor-pointer shadow-card-gold${tapped ? " tapped" : ""}`}
                  >

                    {/* Image */}
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
                        <div className="w-full h-full bg-[#0a0c10] flex items-center justify-center" role="img" aria-label={`Placeholder for ${member.name}`}>
                          <span className="text-5xl sm:text-6xl font-extrabold text-[#E3A652]/40 select-none" aria-hidden="true">
                            {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Default: bottom name overlay */}
                    <div className="absolute bottom-0 w-full p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0 z-10">
                      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight">{member.name}</h3>
                    </div>

                    {/* Hover: info panel */}
                    <div className="absolute bottom-0 left-0 w-full bg-[#0a0c10] rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl p-3 sm:p-4 md:p-6 transform translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 z-20 flex flex-col justify-center min-h-[42%]">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 leading-tight">{member.name}</h3>
                      <p className="text-[#E3A652] text-[0.6rem] sm:text-[0.65rem] md:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2 md:mb-3">{member.role}</p>
                      <p className="text-white/50 text-[0.68rem] sm:text-xs md:text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows + dots */}
              <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-5 max-w-[240px] sm:max-w-[280px] md:max-w-[320px] mx-auto">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 group rounded-full hover:-translate-y-0.5 active:scale-95 btn-frosted-glass"
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
                      className={`transition-all duration-300 h-1.5 rounded-full ${i === teamIdx ? "w-6 bg-[#E3A652]" : "w-1.5 bg-white/15"}`}
                      aria-label={`Go to team member ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => navigate(1)}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 group rounded-full hover:-translate-y-0.5 active:scale-95 btn-frosted-glass"
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