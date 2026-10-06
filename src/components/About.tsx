"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

const teamEn = [
  {
    name: "Bishmdev Chaturvedi",
    role: "Director & Founder",
    img: "/team/bhishma.webp",
    bio: "Visionary storyteller with 25+ years of shaping Chhattisgarh's media landscape through purposeful cinema.",
    hero: true,
  },
  {
    name: "Ayush Dev Chaturvedi",
    role: "Production Head",
    img: "",
    bio: "Driving end-to-end production with a sharp eye for detail and seamless project delivery.",
    hero: false,
  },
  {
    name: "Anthony",
    role: "Technical Director",
    img: "",
    bio: "Engineering the technical backbone of every shoot — from gear to post-production pipelines.",
    hero: false,
  },
  {
    name: "Tukesh Sahu",
    role: "Creative Team",
    img: "",
    bio: "Creative force behind BSR Films' visual identity, campaigns, and motion graphics output.",
    hero: false,
  },
  {
    name: "Homesh Sahu",
    role: "Director of Photography",
    img: "/team/homesh.webp",
    bio: "Master of light and lens, bringing cinematic richness to every frame across documentaries and ad films.",
    hero: false,
  },
];

const teamHi = [
  {
    name: "भीष्मदेव चतुर्वेदी",
    role: "संस्थापक एवं निर्देशक",
    img: "/team/bhishma.webp",
    bio: "लेखक, निर्देशक, निर्माता एवं 30+ वर्षों के समृद्ध अनुभव के साथ छत्तीसगढ़ के मीडिया परिदृश्य को सशक्त दिशा देने वाले दूरदर्शी।",
    hero: true,
  },
  {
    name: "आयुष देव चतुर्वेदी",
    role: "प्रोडक्शन हेड",
    img: "",
    bio: "बारीकियों पर गहरी पकड़ और निर्बाध प्रोजेक्ट क्रियान्वयन के साथ संपूर्ण प्रोडक्शन का कुशल नेतृत्व।",
    hero: false,
  },
  {
    name: "एंथनी",
    role: "तकनीकी निर्देशक",
    img: "",
    bio: "कैमरा, गियर और आधुनिक पोस्ट-प्रोडक्शन पाइपलाइन तक हर शूट की तकनीकी रीढ़।",
    hero: false,
  },
  {
    name: "तुकेश साहू",
    role: "क्रिएटिव टीम",
    img: "",
    bio: "बी.एस.आर. फिल्म्स की विजुअल पहचान, अभियानों और मोशन ग्राफिक्स के पीछे की रचनात्मक शक्ति।",
    hero: false,
  },
  {
    name: "होमेश साहू",
    role: "सिनेमैटोग्राफर (डीओपी)",
    img: "/team/homesh.webp",
    bio: "प्रकाश और लेंस के पारखी, वृत्तचित्रों और विज्ञापनों में सिनेमाई समृद्धि भरने वाले कलाविद्।",
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
  const { isHindi } = useLanguage();
  const team = isHindi ? teamHi : teamEn;

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
            className="text-left"
          >
            <p className="label-line mb-3 sm:mb-4">
              {isHindi ? "हमारा परिचय" : "Who We Are"}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--text-heading)] leading-[1.06] tracking-tight mb-3 sm:mb-4 md:mb-5">
              {isHindi ? (
                <>छत्तीसगढ़ की माटी से जुड़ा,<br />विश्वस्तरीय <span className="gold-text">फिल्म निर्माण संस्थान</span>।</>
              ) : (
                <>A production house<br />rooted in <span className="gold-text">Chhattisgarh</span>.</>
              )}
            </h2>
            <div className="w-10 sm:w-12 h-[2px] mb-4 sm:mb-5 md:mb-7 bg-gradient-to-r from-[#E3A652] to-transparent" />
            <p className="text-[var(--text-primary)] opacity-90 text-xs sm:text-sm md:text-base leading-[1.75] sm:leading-[1.85] mb-3 sm:mb-4 md:mb-5 font-normal">
              {isHindi ? (
                "बी.एस.आर. फिल्म्स रायपुर, छत्तीसगढ़ स्थित एक अग्रणी मीडिया व फिल्म निर्माण संस्थान है। राज्य गठन के समय से ही हमने ऐसे नवोन्मेषी व प्रभावशाली ऑडियो-विजुअल कंटेंट का सृजन किया है जो मनोरंजन, जन-सूचना और सामाजिक उत्तरदायित्व का सशक्त संगम है।"
              ) : (
                <>
                  BSR Films is a leading media production house based in{" "}
                  <strong className="text-[var(--text-heading)] font-bold">Raipur, Chhattisgarh</strong>. Since the state&apos;s
                  formation, we have created innovative and impactful audio-visual content that bridges
                  entertainment, information and social responsibility.
                </>
              )}
            </p>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm md:text-base leading-[1.75] sm:leading-[1.85] mb-6 sm:mb-8 md:mb-10 font-normal">
              {isHindi ? (
                "हमें NFDC (राष्ट्रीय फिल्म विकास निगम), आकाशवाणी सेंट्रल सेल्स यूनिट, एवं छत्तीसगढ़ संवाद द्वारा अधिकृत रूप से सूचीबद्ध होने का गौरव प्राप्त है — जो विगत 25+ वर्षों से हमारी गुणवत्ता और विश्वसनीयता का जीवंत प्रमाण है।"
              ) : (
                <>
                  We are proud to be empanelled with{" "}
                  <strong className="text-[var(--text-heading)] font-semibold">NFDC</strong> (National Film Development Corporation),{" "}
                  <strong className="text-[var(--text-heading)] font-semibold">Central Sales Unit of All India Radio</strong>, and{" "}
                  <strong className="text-[var(--text-heading)] font-semibold">Chhattisgarh Samvad</strong> — affirming our commitment
                  to quality and credibility that has spanned 25+ years.
                </>
              )}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 pt-3 sm:pt-4 md:pt-6">
              {[
                ["25+", isHindi ? "वर्षों का अनुभव" : "Years Exp"],
                ["500+", isHindi ? "पूर्ण प्रोजेक्ट्स" : "Projects"],
                ["20+", isHindi ? "शासकीय विभाग" : "Govt. Bodies"]
              ].map(([v, l]) => (
                <div key={l} className="group">
                  <p className="text-lg sm:text-xl md:text-3xl font-extrabold text-[#E3A652] leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(227,166,82,0.5)]">{v}</p>
                  <p className="text-[var(--text-muted)] text-[0.62rem] sm:text-xs tracking-[0.12em] uppercase mt-1 font-bold">{l}</p>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right: team showcase — cinematic bento with 3D tilt & spotlight */}
          <div className={`flex flex-col team-section text-left ${inView ? 'team-section--active' : ''}`}>
            <p className="label-line mb-3 sm:mb-4">
              {isHindi ? "हमारी टीम" : "The Team"}
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[var(--text-heading)] mb-4 sm:mb-6 md:mb-8 tracking-tight team-heading">
              {isHindi ? "कैमरे के पीछे के समर्पित कलाकार।" : "The people behind the lens."}
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
                      {m.hero && (
                        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#E3A652] tracking-wide bg-[#E3A652]/15 px-2.5 py-1 rounded-md border border-[#E3A652]/30 w-fit">
                          {isHindi ? "विस्तृत जीवन यात्रा पढ़ें →" : "View Founder Profile →"}
                        </span>
                      )}
                    </div>

                    {/* Clickable link overlay for Founder */}
                    {m.hero && (
                      <Link
                        href="/founder"
                        className="absolute inset-0 z-20 cursor-pointer"
                        aria-label="भीष्मदेव चतुर्वेदी - संस्थापक प्रोफ़ाइल देखें"
                      />
                    )}
                  </div>

                  {/* Mobile: bio always visible below card */}
                  <p className="team-card__mobile-bio">{m.bio}</p>
                  {m.hero && (
                    <Link
                      href="/founder"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#E3A652] hover:underline"
                    >
                      {isHindi ? "संस्थापक परिचय एवं संपूर्ण कृतित्व देखें →" : "Read Founder Profile & Career Journey →"}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}