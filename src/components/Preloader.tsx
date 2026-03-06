"use client";

import { useState, useEffect, useCallback } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  const finish = useCallback(() => {
    setProgress(100);
    /* Let the bar fill visually, then fade out */
    setTimeout(() => setLoaded(true), 400);
    /* Remove from DOM after exit animation */
    setTimeout(() => setHidden(true), 1200);
  }, []);

  useEffect(() => {
    /* Synthetic progress ramp — feels alive while real assets load */
    let frame: number;
    let start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      /* Fast to 30%, cruise to 70%, then hold at 85% until real load */
      let target: number;
      if (elapsed < 600) target = (elapsed / 600) * 30;
      else if (elapsed < 1800) target = 30 + ((elapsed - 600) / 1200) * 40;
      else target = Math.min(85, 70 + ((elapsed - 1800) / 4000) * 15);

      setProgress((p) => Math.max(p, target));
      if (target < 85) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    /* Real completion trigger */
    const onReady = () => finish();

    if (document.readyState === "complete") {
      /* Already loaded (cached visit) — quick flash then go */
      setTimeout(finish, 800);
    } else {
      window.addEventListener("load", onReady);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onReady);
    };
  }, [finish]);

  if (hidden) return null;

  return (
    <div
      className={`preloader ${loaded ? "preloader--done" : ""}`}
      aria-hidden={loaded}
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
