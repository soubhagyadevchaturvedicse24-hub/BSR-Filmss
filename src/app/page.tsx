import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";

/* Lazy-load below-fold sections — reduces initial JS bundle on mobile */
const Works = dynamic(() => import("@/components/Works"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Clients = dynamic(() => import("@/components/Clients"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });

/**
 * BSR Films — Main Page
 *
 * Section Order:
 *  1. Hero (Canvas scroll-driven frame sequence)
 *  2. Selected Works / Showreel
 *  3. About Us & Vision
 *  4. State-of-the-Art Facilities
 *  5. 360° Media Services
 *  6. Clients & Partners (liquid glass over logo video)
 *  7. Contact / Project Brief + Footer
 *
 * Note: "Why Choose BSR Films" liquid glass cards are embedded in the
 * Hero end-overlay — they appear over the final waterfall frame as a hook.
 */
export default function Home() {
  return (
    <main id="main-content" aria-label="BSR Films — Main Content">
      {/* ── Premium custom cursor (non-touch only, rendered client-side) ── */}
      <CustomCursor />

      {/* ── Fixed glassmorphism navigation ─────────────────────────────── */}
      <Navbar />

      {/* ── 1. Hero: GSAP-pinned canvas + scroll-driven frame sequence ──── */}
      <HeroCanvas />

      {/* ── 2. Clients & Partners (liquid glass over logo video) ─────────── */}
      <Clients />

      {/* ── 3. Selected Works ───────────────────────────────────────────── */}
      <Works />

      {/* ── 4. About Us & Team ──────────────────────────────────────────────────── */}
      <About />

      {/* ── 5. 360° Media Services ─────────────────────────────────────────────── */}
      <Services />

      {/* ── 7. Contact + Footer ─────────────────────────────────────────── */}
      <Contact />
    </main>
  );
}
