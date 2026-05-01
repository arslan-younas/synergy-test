"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [captureMins, setCaptureMins] = useState(0);
  const [inquiriesX, setInquiriesX] = useState(0);
  const [noInstallPct, setNoInstallPct] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCaptureMins(Math.round(15 * progress));
      setInquiriesX(Math.round(2 * progress));
      setNoInstallPct(Math.round(100 * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <section className="relative -mt-24 overflow-hidden rounded-b-[60px] bg-inverse-surface pb-24 pt-60 shadow-2xl md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-inverse-surface to-inverse-surface" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.1] tracking-tight text-white">
            The 15-minute tour that <span className="text-primary-container">closes the deal.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300">
            Transform any property into a fully immersive, interactive 3D experience with just your smartphone. Designed for real estate professionals who demand
            precision without the complexity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <a
              href="#cta"
              className="rounded bg-primary px-8 py-3 font-display text-base font-semibold text-on-primary shadow-[0px_4px_20px_rgba(101,0,225,0.4)] transition hover:bg-primary/90"
            >
              Join waitlist
            </a>
            <a
              href="#buyer-tour"
              className="rounded border-[1.5px] border-slate-600 px-8 py-3 font-display text-base font-semibold text-white transition hover:bg-white/5"
            >
              View Demo Tour
            </a>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-slate-800 pt-12 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 font-display text-3xl font-bold text-white">{captureMins} min</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Average Capture</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-display text-3xl font-bold text-white">$0</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Platform Fees</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-display text-3xl font-bold text-white">{inquiriesX}x</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inquiries</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-display text-3xl font-bold text-white">{noInstallPct}%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">No Install</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
