"use client";

import { useState, useEffect } from "react";

/** Shared mobile detection hook. Returns `true` on viewports < 1024px. */
export function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Returns simplified Framer Motion transition props for mobile.
 * Desktop: full cinematic entrance. Mobile: quick subtle fade.
 */
export function useMobileMotion(isMobile: boolean) {
  return {
    /** Use as initial prop — minimal offset on mobile */
    initial: (desktopInitial: Record<string, unknown>) =>
      isMobile
        ? { opacity: 0, y: 12 }
        : desktopInitial,

    /** Simplified transition — shorter duration, no stagger delay */
    transition: (desktopTransition: Record<string, unknown>) =>
      isMobile
        ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        : desktopTransition,
  };
}
