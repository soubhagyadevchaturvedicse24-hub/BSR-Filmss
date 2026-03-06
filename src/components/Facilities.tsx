"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Mic2, Camera, Zap } from "lucide-react";

const facilities = [
  {
    icon: Monitor,
    title: "2 Modern Editing Suites",
    body: "Powered by industry-standard NLE software (DaVinci Resolve, Adobe Premiere Pro) with calibrated reference monitors for colour-accurate grading.",
    accent: "from-blue-500/10 to-blue-600/5",
    iconBg: "bg-blue-500/15 text-blue-400",
    border: "hover:border-blue-500/30",
  },
  {
    icon: Mic2,
    title: "High-End Audio Recording Studio",
    body: "Acoustically treated recording booth, Neve-preamplified signal chain, Foley pit and full post-audio suite for radio serials, jingles and film mixes.",
    accent: "from-purple-500/10 to-purple-600/5",
    iconBg: "bg-purple-500/15 text-purple-400",
    border: "hover:border-purple-500/30",
  },
  {
    icon: Camera,
    title: "Green Screen Studio",
    body: "20×30 ft chroma-key cyclorama with multi-camera setup (up to 4K), motorised LED soft boxes, cinema-grade hard lights and a full equipment inventory.",
    accent: "from-emerald-500/10 to-emerald-600/5",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    border: "hover:border-emerald-500/30",
  },
  {
    icon: Zap,
    title: "End-to-End Production Pipeline",
    body: "From ideation & scripting, on-location shoots and studio recording, through post-production and delivery — all under one roof with timely turnaround.",
    accent: "from-[#E3A652]/10 to-[#E3A652]/5",
    iconBg: "bg-[#E3A652]/15 text-[#E3A652]",
    border: "hover:border-[#E3A652]/30",
  },
];

/** Stagger multiplier: faster on mobile (single-column) to reduce perceived lag */
const STAGGER_DESKTOP = 0.13;
const STAGGER_MOBILE = 0.08;

const makeCardVariants = (stagger: number, mobile: boolean) => ({
  hidden: { opacity: 0, y: mobile ? 16 : 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: mobile ? 0.35 : 0.75, delay: i * stagger, ease: [0.22, 1, 0.36, 1] },
  }),
});

export default function Facilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const cardVariants = makeCardVariants(isMobile ? STAGGER_MOBILE : STAGGER_DESKTOP, isMobile);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="section-padding bg-secondary-var"
      aria-label="BSR Films state-of-the-art facilities"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.35 : 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E3A652] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            In-House Infrastructure
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white gold-underline mx-auto inline-block mb-6">
            State-of-the-Art Facilities
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            Everything you need for a world-class production â€” editing, audio, studio and
            complete post â€” fully in-house so your project never loses momentum.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`relative group rounded-2xl p-8 bg-gradient-to-br ${f.accent} bg-[#1A1C23] border border-white/5 ${f.border} transition-all duration-400 overflow-hidden`}
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-white/[0.01]" />

              <div className={`inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 ${f.iconBg}`}>
                <f.icon size={26} />
              </div>

              <h3 className="text-white text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{f.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center text-[#E3A652] font-semibold text-lg mt-14 tracking-wide"
        >
          "End-to-end production with world-class quality and timely delivery."
        </motion.p>
      </div>
    </section>
  );
}
