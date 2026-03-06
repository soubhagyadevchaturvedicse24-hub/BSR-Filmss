"use client";

import { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const activeBg = openIndex !== null ? openIndex : hoveredBg;

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden pt-14 pb-14 min-h-[60vh] section-gradient-primary"
      aria-label="360 degree media services offered by BSR Films"
    >
      {/* Crossfading background images — skip on mobile for perf */}
      {!isMobile && services.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.title}
          src={s.bgImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-opacity duration-700 ${activeBg === i ? "opacity-30" : "opacity-0"}`}
          draggable={false}
        />
      ))}

      {/* Twilight overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1] services-overlay"
      />

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-5 md:px-14 lg:px-20 xl:px-28 z-[2]">

        {/* Header */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={isMobile ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] } : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 md:mb-16"
        >
          <p className="label-line justify-start">What We Do</p>
          <h2 className="text-[clamp(1.6rem,5.5vw,4rem)] font-extrabold text-white leading-tight tracking-tight mt-1.5 sm:mt-2 text-cinema">
            360°{" "}
            <span className="gold-text">Media Services</span>
          </h2>
          <p className="text-white/45 text-xs sm:text-sm md:text-base max-w-xl mt-2 sm:mt-3 md:mt-4 leading-relaxed">
            From script to screen, from jingle to campaign — tap a category to explore.
          </p>
          {/* Cinematic divider */}
          <div className="section-divider mt-4 sm:mt-6 md:mt-8 max-w-xs" />
        </motion.div>

        {/* Accordion rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={isMobile ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] } : { delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2 sm:gap-3 md:gap-4"
        >
          {services.map((svc, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={svc.title}
                onMouseEnter={() => !isMobile && setHoveredBg(i)}
                className={`rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'accordion-card-open' : 'accordion-card'} ${!isMobile ? 'backdrop-blur-[12px]' : ''}`}
              >
                {/* Row trigger — 44px min height for touch */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-3 sm:px-5 md:px-8 py-4 sm:py-5 md:py-8 gap-3 sm:gap-4 md:gap-6 group text-left cursor-pointer min-h-[48px]"
                  {...(isOpen ? { "aria-expanded": "true" } : {})}
                >
                  {/* Index + title */}
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
                    <span
                      className={`text-[0.6rem] sm:text-[0.65rem] md:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] flex-shrink-0 transition-all duration-300 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg flex items-center justify-center ${isOpen ? 'accordion-idx-open' : 'accordion-idx'}`}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={`font-extrabold tracking-tight transition-colors duration-300 text-[clamp(1.1rem,3.2vw,2.4rem)] ${isOpen ? 'gold-text' : 'text-white/[0.88]'}`}
                    >
                      {svc.title}
                    </h3>
                  </div>

                  {/* Animated arrow icon */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-400 ${isOpen ? 'accordion-arrow-open rotate-180' : 'accordion-arrow'}`}
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
                      <div className="px-3 sm:px-5 md:px-8 pb-4 sm:pb-5 md:pb-7 pt-1">
                        <div className="h-px w-full mb-3 sm:mb-4 md:mb-6 gold-divider-subtle" />
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-8 gap-y-1.5 sm:gap-y-2 md:gap-y-3">
                          {svc.items.map((item, idx) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 text-xs sm:text-sm md:text-base font-medium py-1.5 sm:py-2 px-1.5 sm:px-2 md:px-3 rounded-lg transition-colors duration-200 hover:bg-white/[0.03] hover:text-white/90 active:bg-white/[0.05]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 dot-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}