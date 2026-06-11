"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-end overflow-hidden"
    >
      {/* Radial purple glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[46%] z-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(900px,90vw)",
          height: "min(900px,90vw)",
          background:
            "radial-gradient(circle, rgba(123,94,248,.20) 0%, rgba(123,94,248,.06) 38%, transparent 66%)",
        }}
      />

      {/* Three.js canvas */}
      <HeroCanvas />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,7,10,.6) 0%, rgba(7,7,10,.05) 26%, rgba(7,7,10,.1) 55%, rgba(7,7,10,.9) 90%, #07070a 100%)",
        }}
      />

      {/* HUD — top right */}
      <div className="absolute right-10 top-24 z-[3] hidden text-right font-mono text-[11px] leading-[2] tracking-[0.12em] text-white/45 md:block">
        <div className="flex items-center justify-end gap-[7px]">
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#67B35A] pulse-green" />
          <span>
            SPATIAL&nbsp;MESH&nbsp;<b className="font-normal text-[#67B35A]">ACTIVE</b>
          </span>
        </div>
        <div>SOURCE&nbsp;·&nbsp;iPhone&nbsp;LiDAR</div>
        <div>40°&nbsp;42′&nbsp;N&nbsp;&nbsp;74°&nbsp;00′&nbsp;W</div>
      </div>

      {/* Hero content */}
      <div className="pointer-events-none relative z-[3] w-full">
        <div className="mx-auto max-w-[1280px] px-10 pb-16 max-sm:px-5 max-sm:pb-12">
          <div className="pointer-events-auto">
            <div className="mb-6 font-mono text-[12px] uppercase tracking-[0.28em] text-accent-light">
              Built by a New York agent · for agents like you
            </div>
            <h1
              className="mb-[26px] text-[clamp(40px,7vw,104px)] font-black leading-[0.98] tracking-[-0.045em] text-white"
              style={{ maxWidth: "15ch" }}
            >
              Walk the listing
              <br />
              from <em className="not-italic text-accent-light">anywhere.</em>
            </h1>
            <p
              className="mb-[34px] text-[clamp(16px,1.5vw,19px)] leading-[1.7] text-white/70"
              style={{ maxWidth: "46ch" }}
            >
              SynergySo turns a 15-minute walk with your phone into a shareable 3D
              tour your buyers can explore from across the world — no hardware, no
              contractor, no app on their end.
            </p>
            <div className="flex flex-wrap items-center gap-[14px]">
              <a
                href="#contact"
                className="inline-flex items-center gap-[7px] rounded-full bg-accent px-[28px] py-[15px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Get in Touch <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#how"
                className="rounded-full border border-white/8 px-[22px] py-[15px] font-mono text-[13px] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-[26px] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
        Scroll
        <span
          className="block h-[34px] w-px origin-top animate-cue-drop"
          style={{ background: "linear-gradient(var(--color-accent-light), transparent)" }}
        />
      </div>
    </section>
  );
}
