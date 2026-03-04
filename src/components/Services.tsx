"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Films & Videos",
    bgImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop",
    items: ["Documentaries", "Corporate Films", "Ad Films", "Feature Films", "TVCs", "Web Content"],
  },
  {
    title: "Audio Production",
    bgImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
    items: ["Radio Jingles", "Radio Serials", "Audio Songs", "Music Videos", "Podcast Production", "Voice-Over & Dubbing"],
  },
  {
    title: "Creative & Digital",
    bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop",
    items: ["2D / 3D Animation", "VFX & Compositing", "Graphic Designing", "Social Media Handling", "Digital Publicity", "Motion Graphics"],
  },
  {
    title: "Campaigns & Events",
    bgImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    items: ["Political Campaigns", "PR Campaigns", "Events & Outreach", "Public Awareness Films", "Workshops & Seminars", "Exhibition Media"],
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredBg, setHoveredBg] = useState<number>(0);

  /* The active background is whichever row is either open or hovered */
  const activeBg = openIndex !== null ? openIndex : hoveredBg;

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden"
      style={{ paddingTop: "7rem", paddingBottom: "7rem", minHeight: "70vh", background: "linear-gradient(180deg, #050608 0%, #0a0c12 50%, #050608 100%)" }}
      aria-label="360 degree media services offered by BSR Films"
    >
      {/* Crossfading background images */}
      {services.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.title}
          src={s.bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: activeBg === i ? 0.3 : 0, transition: "opacity 0.7s ease", zIndex: 0 }}
          draggable={false}
        />
      ))}

      {/* Twilight overlay for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, rgba(5,6,8,0.88) 0%, rgba(8,10,14,0.78) 50%, rgba(5,6,8,0.85) 100%)", zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-14 lg:px-20 xl:px-28" style={{ zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="mb-16"
        >
          <p className="label-line justify-start">What We Do</p>
          <h2 className="text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold text-white leading-tight tracking-tight mt-2 text-cinema">
            360°{" "}
            <span style={{ color: "#E3A652" }}>Media Services</span>
          </h2>
          <p className="text-white/45 text-base max-w-xl mt-4 leading-relaxed">
            From script to screen, from jingle to campaign — hover a category to explore, click to expand.
          </p>
          {/* Cinematic divider */}
          <div className="section-divider mt-8 max-w-xs" />
        </motion.div>

        {/* Accordion rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {services.map((svc, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={svc.title}
                layout
                onMouseEnter={() => setHoveredBg(i)}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: isOpen
                    ? 'linear-gradient(135deg, rgba(227,166,82,0.06) 0%, rgba(255,255,255,0.03) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: isOpen ? '1px solid rgba(227,166,82,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: isOpen
                    ? '0 8px 32px rgba(227,166,82,0.08), 0 0 0 1px rgba(227,166,82,0.05), inset 0 1px 0 rgba(255,255,255,0.04)'
                    : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              >
                {/* Row trigger */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 md:px-8 py-6 md:py-8 gap-6 group text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Index + title */}
                  <div className="flex items-center gap-5 md:gap-6">
                    <span
                      className="text-xs font-bold tracking-[0.2em] flex-shrink-0 transition-all duration-300 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        color: isOpen ? '#050608' : 'rgba(255,255,255,0.35)',
                        background: isOpen
                          ? 'linear-gradient(135deg, #E3A652 0%, #D4913E 100%)'
                          : 'rgba(255,255,255,0.04)',
                        boxShadow: isOpen ? '0 2px 8px rgba(227,166,82,0.3)' : 'none',
                      }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="font-extrabold tracking-tight transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1.4rem, 3.2vw, 2.4rem)",
                        color: isOpen ? "#E3A652" : "rgba(255,255,255,0.88)",
                      }}
                    >
                      {svc.title}
                    </h3>
                  </div>

                  {/* Animated arrow icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400"
                    style={{
                      border: `1px solid ${isOpen ? '#E3A652' : 'rgba(255,255,255,0.12)'}`,
                      background: isOpen
                        ? 'linear-gradient(135deg, rgba(227,166,82,0.2) 0%, rgba(227,166,82,0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                      boxShadow: isOpen
                        ? '0 4px 16px rgba(227,166,82,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 2px 8px rgba(0,0,0,0.2)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke={isOpen ? "#E3A652" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 md:px-8 pb-7 pt-1">
                        <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, rgba(227,166,82,0.3) 0%, rgba(227,166,82,0.05) 100%)' }} />
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                          {svc.items.map((item, idx) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.06, duration: 0.35 }}
                              className="flex items-center gap-3 text-white/70 text-sm md:text-base font-medium py-1.5 px-3 rounded-lg transition-colors duration-200 hover:bg-white/[0.03] hover:text-white/90"
                            >
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#E3A652", boxShadow: '0 0 6px rgba(227,166,82,0.4)' }} />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}