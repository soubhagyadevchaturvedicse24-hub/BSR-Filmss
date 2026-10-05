"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor
 * A luxury gold custom cursor with immediate dot response and smooth lerping ring.
 * - Safely handles hybrid touchscreen laptops without making cursor disappear.
 * - Only enables custom-cursor mode when mouse movement is actively detected.
 * - Restores default cursor on window blur, mouse leave, or touch events.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    let active = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      if (!active) {
        active = true;
        ringX = mouseX;
        ringY = mouseY;
        setIsVisible(true);
        document.documentElement.classList.add("has-custom-cursor");
      }
    };

    const animate = () => {
      if (active) {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
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

    const onMouseLeave = () => {
      active = false;
      setIsVisible(false);
      document.documentElement.classList.remove("has-custom-cursor");
    };

    const onTouchStart = () => {
      active = false;
      setIsVisible(false);
      document.documentElement.classList.remove("has-custom-cursor");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: isVisible ? 1 : 0 }}
        aria-hidden="true"
        role="presentation"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: isVisible ? 1 : 0 }}
        aria-hidden="true"
        role="presentation"
      />
    </>
  );
}
