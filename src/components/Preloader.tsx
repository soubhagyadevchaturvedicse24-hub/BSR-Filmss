"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "gone">("loading");
  const rafRef = useRef<number>(0);

  /* ── Reveal: unhide content, remove scroll lock, fade preloader ── */
  const reveal = useCallback(() => {
    setProgress(100);
    /* Small delay so the bar visually fills to 100% */
    setTimeout(() => {
      /* Unhide main content + unlock scroll */
      document.body.classList.remove("loading");
      setPhase("revealing");
      /* Remove preloader from DOM after CSS fade-out finishes */
      setTimeout(() => setPhase("gone"), 800);
    }, 300);
  }, []);

  useEffect(() => {
    /* Ensure body has loading class (safety net if SSR missed it) */
    document.body.classList.add("loading");

    /* ── Synthetic progress ramp ── */
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      let target: number;
      if (elapsed < 500) target = (elapsed / 500) * 25;
      else if (elapsed < 1500) target = 25 + ((elapsed - 500) / 1000) * 35;
      else target = Math.min(85, 60 + ((elapsed - 1500) / 5000) * 25);
      setProgress((p) => Math.max(p, target));
      if (target < 85) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* ── Real completion: window.load + fonts ready ── */
    const waitForLoad = () => {
      Promise.all([
        /* Wait for all sub-resources (images, scripts, iframes) */
        new Promise<void>((res) => {
          if (document.readyState === "complete") res();
          else window.addEventListener("load", () => res(), { once: true });
        }),
        /* Wait for web fonts so text doesn't reflow after reveal */
        document.fonts.ready,
      ]).then(() => {
        cancelAnimationFrame(rafRef.current);
        reveal();
      });
    };

    waitForLoad();

    /* Safety cap: never block longer than 8s even on very slow networks */
    const safety = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      reveal();
    }, 8000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(safety);
    };
  }, [reveal]);

  if (phase === "gone") return null;

  return (
    <div
      className={`preloader ${phase === "revealing" ? "preloader--done" : ""}`}
      aria-hidden={phase === "revealing"}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Logo mark */}
      <div className="preloader__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bsr-icon.png"
          alt=""
          width={64}
          height={64}
          className="preloader__icon"
        />
        <span className="preloader__brand">BSR FILMS</span>
      </div>

      {/* Progress bar */}
      <div className="preloader__track">
        <div
          className="preloader__bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Counter */}
      <span className="preloader__pct">{Math.round(progress)}%</span>
    </div>
  );
}
