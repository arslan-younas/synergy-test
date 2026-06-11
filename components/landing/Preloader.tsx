"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const vRef = useRef(0);
  const targetRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const started = Date.now();
    let rafId: number;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setCount(100);
      setTimeout(() => {
        setDone(true);
        setTimeout(() => setRemoved(true), 1100);
      }, 260);
    };

    const onLoad = () => { targetRef.current = 100; };
    window.addEventListener("load", onLoad);
    const cap = setTimeout(() => { targetRef.current = 100; }, 3200);

    const tick = () => {
      targetRef.current = Math.max(
        targetRef.current,
        Math.min(92, (Date.now() - started) / 26),
      );
      vRef.current += (targetRef.current - vRef.current) * 0.08;
      const shown = Math.min(100, Math.round(vRef.current));
      setCount(shown);
      if (shown >= 100) { finish(); return; }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(cap);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-[30px] bg-[#07070a] transition-transform duration-1000 ${
        done ? "-translate-y-full" : ""
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(.76,0,.24,1)" }}
    >
      {/* Logo mark */}
      <div className="flex items-center gap-[10px] opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 60 500 400" height="26" style={{ display: "block", flexShrink: 0 }}>
          <circle cx="400" cy="250" r="170" fill="none" stroke="#C89B2B" strokeWidth="24" />
          <path d="M400 420 C470 300 560 220 650 220 C610 320 540 400 430 470 Z" fill="none" stroke="#4F8F43" strokeWidth="24" />
          <path d="M300 350 C340 300 390 280 440 290 C410 340 370 380 320 400 Z" fill="#67B35A" />
          <path d="M470 360 C510 310 560 290 610 300 C580 350 540 390 490 410 Z" fill="#67B35A" />
        </svg>
        <span className="text-[17px] font-extrabold tracking-[-0.03em] text-white">
          Synergy<span className="text-accent-light">So</span>
        </span>
      </div>

      {/* Counter */}
      <div className="font-mono text-[clamp(64px,16vw,160px)] font-bold leading-none tracking-[-0.04em] text-white">
        {count}
        <sup className="ml-1 align-super text-[0.28em] text-accent-light">%</sup>
      </div>

      {/* Progress bar */}
      <div className="relative h-px w-[min(340px,62vw)] overflow-hidden bg-white/12">
        <div
          className="absolute inset-0 origin-left bg-accent"
          style={{ transform: `scaleX(${count / 100})`, transition: "transform 0.1s linear" }}
        />
      </div>

      <div className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/45">
        Building the space
      </div>
    </div>
  );
}
