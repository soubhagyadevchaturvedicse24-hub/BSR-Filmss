import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import Works from "@/components/Works";
import About from "@/components/About";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";

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
