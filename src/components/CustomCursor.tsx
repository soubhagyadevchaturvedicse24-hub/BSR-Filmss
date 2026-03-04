"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor
 * A premium two-layer cursor: a small gold dot that tracks instantly,
 * and a larger gold ring that follows with smooth lerp.
 * On hovering interactive elements the ring expands.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    // Lerp ring toward cursor
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };

    const expand = () => {
      dot.classList.add("expanded");
      ring.classList.add("expanded");
    };
    const contract = () => {
      dot.classList.remove("expanded");
      ring.classList.remove("expanded");
    };

    document.addEventListener("mousemove", onMouseMove);

    // Use event delegation so dynamically-added elements are covered
    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, label, [tabindex]:not([tabindex='-1'])";

    let hovered = false;
    const onOver = (e: Event) => {
      if ((e.target as Element)?.closest?.(interactiveSelector) && !hovered) {
        hovered = true;
        expand();
      }
    };
    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as Element | null;
      if (hovered && !related?.closest?.(interactiveSelector)) {
        hovered = false;
        contract();
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        role="presentation"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        role="presentation"
      />
    </>
  );
}
