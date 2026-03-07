"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const team = [
  {
    name: "Bishmdev Chaturvedi",
    role: "Director & Founder",
    img: "/team/bhishma.png",          // hero — large card, left column
    bio: "Visionary storyteller with 25+ years of shaping Chhattisgarh's media landscape through purposeful cinema.",
    hero: true,
  },
  {
    name: "Ayush Dev Chaturvedi",
    role: "Production Head",
    img: "",                              // ← drop image path here when ready
    bio: "Driving end-to-end production with a sharp eye for detail and seamless project delivery.",
    hero: false,
  },
  {
    name: "Anthony",
    role: "Technical Director",
    img: "",                              // ← drop image path here when ready
    bio: "Engineering the technical backbone of every shoot — from gear to post-production pipelines.",
    hero: false,
  },
  {
    name: "Tukesh Sahu",
    role: "Creative Team",
    img: "",                              // ← drop image path here when ready
    bio: "Creative force behind BSR Films' visual identity, campaigns, and motion graphics output.",
    hero: false,
  },
  {
    name: "Homesh Sahu",
    role: "Director of Photography",
    img: "/team/homesh.png",             // ← update image path when ready
    bio: "Master of light and lens, bringing cinematic richness to every frame across documentaries and ad films.",
    hero: false,
  },
];

/* 3D perspective tilt — sets CSS custom props on mousemove, CSS handles rotation */
const handleTilt = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.style.setProperty("--rx", `${(-y * 12).toFixed(1)}deg`);
  e.currentTarget.style.setProperty("--ry", `${(x * 12).toFixed(1)}deg`);
};
const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

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

          {/* Right: team showcase — cinematic bento with 3D tilt & spotlight */}
          <div className={`flex flex-col team-section ${inView ? 'team-section--active' : ''}`}>
            <p className="label-line gold-text">
              <span className="w-6 h-px block gold-bg" />The Team
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight team-heading">
              The people behind the lens.
            </h3>

            <div className="team-bento">
              {team.map((m, i) => (
                <article
                  key={m.name}
                  className={`team-card ${m.hero ? 'team-card--hero' : 'team-card--side'}`}
                  style={{ '--stagger': `${i * 180 + 200}ms` } as React.CSSProperties}
                  onMouseMove={!isMobile ? handleTilt : undefined}
                  onMouseLeave={!isMobile ? resetTilt : undefined}
                >
                  <div className="team-card__frame">
                    {m.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.img}
                        alt={m.name}
                        className="team-card__img"
                        draggable={false}
                        loading="lazy"
                      />
                    ) : (
                      <div className="team-card__placeholder" role="img" aria-label={`Placeholder for ${m.name}`}>
                        <span className="team-card__initials" aria-hidden="true">
                          {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                    )}

                    {/* Cinematic spotlight sweep on entry */}
                    <div className="team-card__spotlight" aria-hidden="true" />

                    {/* Bottom gradient */}
                    <div className="team-card__gradient" aria-hidden="true" />

                    {/* Name + role (default state) */}
                    <div className="team-card__info">
                      <h4 className="team-card__name">{m.name}</h4>
                      <p className="team-card__role">{m.role}</p>
                    </div>

                    {/* Hover detail overlay (desktop, CSS-driven) */}
                    <div className="team-card__detail" aria-hidden="true">
                      <h4 className="team-card__name">{m.name}</h4>
                      <p className="team-card__role">{m.role}</p>
                      <p className="team-card__bio">{m.bio}</p>
                    </div>
                  </div>

                  {/* Mobile: bio always visible below card */}
                  <p className="team-card__mobile-bio">{m.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}