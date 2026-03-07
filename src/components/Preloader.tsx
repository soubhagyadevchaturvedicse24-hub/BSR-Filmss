"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/*
 * ─── Asset manifest ────────────────────────────────────────────────
 * Everything preloaded here lands in the browser cache so that
 * when the actual components mount they get instant cache hits.
 */
const TOTAL_FRAMES = 120;
const frameUrl = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.webp`;

/* Weight each asset group for the 0→100 % display */
const W_FRAMES = 0.70;
const W_VIDEO  = 0.18;
const W_FONTS  = 0.12;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "gone">("loading");
  const buckets = useRef({ frames: 0, video: 0, fonts: 0 });

  /* Recalculate composite progress from individual buckets */
  const sync = useCallback(() => {
    const b = buckets.current;
    const next = Math.min(
      Math.round(
        b.frames * W_FRAMES +
        b.video  * W_VIDEO  +
        b.fonts  * W_FONTS
      ),
      100,
    );
    setProgress((p) => Math.max(p, next));
  }, []);

  /* ── Reveal: unhide content, remove scroll lock, fade preloader ── */
  const reveal = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      document.body.classList.remove("loading");
      setPhase("revealing");
      setTimeout(() => setPhase("gone"), 800);
    }, 300);
  }, []);

  useEffect(() => {
    document.body.classList.add("loading");
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    let revealed = false;
    const tryReveal = () => {
      if (revealed) return;
      revealed = true;
      reveal();
    };

    /* Safety cap — never block longer than 12 s */
    const safety = setTimeout(tryReveal, 12000);
    const tasks: Promise<void>[] = [];

    /* ── 1. Hero canvas frames ──────────────────────────────────────── */
    if (isDesktop) {
      tasks.push(
        new Promise<void>((resolve) => {
          let loaded = 0;
          const BATCH = 10;
          const loadBatch = async (start: number) => {
            const batch: Promise<void>[] = [];
            for (let i = start; i < Math.min(start + BATCH, TOTAL_FRAMES); i++) {
              batch.push(
                new Promise<void>((res) => {
                  const img = new Image();
                  img.decoding = "async";
                  img.src = frameUrl(i);
                  img.onload = img.onerror = () => {
                    loaded++;
                    buckets.current.frames = (loaded / TOTAL_FRAMES) * 100;
                    sync();
                    res();
                  };
                }),
              );
            }
            await Promise.all(batch);
            if (start + BATCH < TOTAL_FRAMES) await loadBatch(start + BATCH);
          };
          loadBatch(0).then(resolve);
        }),
      );
    } else {
      /* Mobile — only first frame needed */
      tasks.push(
        new Promise<void>((res) => {
          const img = new Image();
          img.src = frameUrl(0);
          img.onload = img.onerror = () => {
            buckets.current.frames = 100;
            sync();
            res();
          };
        }),
      );
    }

    /* ── 2. Clients background video (desktop only) ─────────────────── */
    if (isDesktop) {
      tasks.push(
        new Promise<void>((resolve) => {
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            buckets.current.video = 100;
            sync();
            resolve();
          };
          const v = document.createElement("video");
          v.preload = "auto";
          v.muted = true;
          v.addEventListener("canplaythrough", finish, { once: true });
          v.addEventListener("error", finish, { once: true });
          v.src = v.canPlayType("video/webm") ? "/clients-bg.webm" : "/clients-bg.mp4";
          v.load();
          setTimeout(finish, 6000);
        }),
      );
    } else {
      buckets.current.video = 100;
      sync();
    }

    /* ── 4. Fonts + document ready ──────────────────────────────────── */
    tasks.push(
      Promise.all([
        document.fonts.ready,
        new Promise<void>((res) => {
          if (document.readyState === "complete") res();
          else window.addEventListener("load", () => res(), { once: true });
        }),
      ]).then(() => {
        buckets.current.fonts = 100;
        sync();
      }),
    );

    /* All assets loaded → reveal */
    Promise.all(tasks).then(() => {
      clearTimeout(safety);
      tryReveal();
    });

    return () => clearTimeout(safety);
  }, [reveal, sync]);

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
