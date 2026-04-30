"use client";

import { useEffect, useState } from "react";

function HeroWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="hero-word-mask inline-block align-baseline leading-[1.1]">
      <span className="hero-word-rise inline-block animate-rise">{children}</span>
    </span>
  );
}

export default function HeroSection() {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnswer(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative grid min-h-screen grid-cols-1 items-center gap-10 px-6 pb-16 pt-12 sm:pt-16 lg:grid-cols-2 lg:gap-[60px] lg:px-[52px] lg:pb-20 lg:pt-24">
      <div className="relative z-10 max-w-[560px] lg:order-none">
        <div className="hero-fade-d1 mb-[26px] inline-flex items-center gap-2 rounded-full border border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.08)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-violet">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-violet shadow-[0_0_10px_#A78BFA]" />
          NY Metro Pilot Live
        </div>
        <h1 className="mb-[26px] font-serif text-[clamp(46px,5.2vw,76px)] font-normal leading-[1.04] tracking-[-0.025em] text-brand-text">
          <HeroWord>The</HeroWord>{" "}
          <HeroWord>
            <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text font-medium italic text-transparent">15-minute</em>
          </HeroWord>{" "}
          <HeroWord>tour</HeroWord>
          <br />
          <HeroWord>that</HeroWord> <HeroWord>closes</HeroWord> <HeroWord>the</HeroWord> <HeroWord>deal.</HeroWord>
        </h1>
        <p className="hero-fade-d2 mb-9 max-w-[440px] text-[15px] leading-[1.7] text-black/60">
          Walk any property with your iPhone. Share an interactive 3D tour your buyers explore from their couch — no headset, no contractor, no install.
        </p>
        <div className="hero-fade-d3 flex flex-wrap gap-3.5">
          <a
            href="#cta"
            className="group inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-brand-violet-deep px-7 py-3.5 text-[13px] font-medium tracking-[0.01em] text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-violet hover:shadow-[0_10px_30px_-10px_rgba(167,139,250,0.6)]"
          >
            Join the waitlist{" "}
            <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-[3px]" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
          <a
            href="#how"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/15 bg-transparent px-7 py-3.5 text-[13px] font-medium tracking-[0.01em] text-brand-text transition-all duration-200 hover:border-brand-violet hover:bg-[rgba(167,139,250,0.08)] hover:text-brand-violet"
          >
            See how it works
          </a>
        </div>
      </div>

      <div className="hero-fade-d4 relative z-[1] mb-8 flex justify-center lg:mb-0 lg:justify-center">
        <div className="w-full max-w-[460px] rounded-[28px] border border-[rgba(167,139,250,0.25)] bg-gradient-to-br from-white to-[#eceffc] p-1.5 shadow-card-glow backdrop-blur-xl transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform:perspective(1200px)_rotateY(-8deg)_rotateX(4deg)] hover:[transform:perspective(1200px)_rotateY(-4deg)_rotateX(2deg)] max-lg:[transform:none] max-lg:hover:[transform:none]">
          <div className="relative h-[340px] overflow-hidden rounded-[calc(28px-6px)] bg-gradient-to-b from-[#f6f7ff] to-[#ebeefb]">
            <div className="absolute inset-0 bg-hero-device" />
            <div className="absolute left-1/2 top-[15%] h-[45%] w-[40%] -translate-x-1/2 rounded border border-black/10 bg-[radial-gradient(ellipse,rgba(236,185,255,0.25),rgba(167,139,250,0.08))]">
              <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-black/10" />
              <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black/10" />
            </div>
            <div className="absolute bottom-[20%] left-[15%] right-[15%] h-[90px] rounded-t-xl rounded-b-md bg-gradient-to-b from-[#6b4ea5] to-[#3d2a5c] shadow-[0_20px_50px_-10px_rgba(124,58,237,0.4)]">
              <div className="absolute -top-[15px] left-[8%] right-[8%] h-[55px] rounded-t-[10px] rounded-b-[4px] bg-gradient-to-b from-[#7a5dc4] to-[#4d357a]" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.85)]" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full border border-[rgba(167,139,250,0.3)] bg-white/90 px-4 py-2 backdrop-blur-md">
              <span className="relative h-3.5 w-3.5 shrink-0 rounded-sm border-[1.5px] border-brand-violet after:absolute after:inset-[3px] after:rounded-[1px] after:bg-brand-violet" />
              <div>
                <div className="text-[11px] font-medium tracking-[0.04em] text-brand-text">Phone Native Capture</div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-black/55">Scan any room in under 60 seconds.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-fade-d5 hero-ai absolute -bottom-5 -right-2 z-[4] hidden w-[290px] rounded-xl border border-[rgba(167,139,250,0.25)] bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(167,139,250,0.25)] backdrop-blur-lg min-[901px]:block">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-violet">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-green shadow-[0_0_10px_#4ADE80]" />
            SynergySo AI
          </div>
          <div className="mb-[7px] ml-4 rounded-md border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.1)] px-3 py-2 text-[12px] leading-[1.55] text-brand-violet-2">
            Could a king bed fit in the master?
          </div>
          {showAnswer ? (
            <div className="rounded-md border border-black/10 bg-black/[0.02] px-3 py-2 text-[12px] font-light leading-[1.55] text-brand-text">
              Yes — master is <strong className="font-medium text-brand-violet">14&apos; × 16&apos;</strong>. A king fits with{" "}
              <strong className="font-medium text-brand-violet">3 ft clearance</strong> on both sides.
            </div>
          ) : (
            <div className="flex w-fit gap-1 rounded-md border border-black/10 bg-black/[0.02] px-3 py-2">
              <span className="h-[5px] w-[5px] animate-typ-d1 rounded-full bg-black/45" />
              <span className="h-[5px] w-[5px] animate-typ-d2 rounded-full bg-black/45" />
              <span className="h-[5px] w-[5px] animate-typ-d3 rounded-full bg-black/45" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
