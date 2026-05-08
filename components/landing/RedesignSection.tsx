"use client";

import { useState } from "react";

const WALL_SWATCHES = [
  { hex: "#f5f0e8", label: "Warm White" },
  { hex: "#e8e0d0", label: "Linen" },
  { hex: "#d4cabb", label: "Greige" },
  { hex: "#c9d4c5", label: "Sage" },
  { hex: "#b8c5cc", label: "Slate" },
  { hex: "#2d2d2d", label: "Charcoal" },
];

const FLOOR_SWATCHES = [
  { hex: "#c8a882", label: "Oak" },
  { hex: "#a07850", label: "Walnut" },
  { hex: "#e8e0d4", label: "Light Oak" },
  { hex: "#b0b0b0", label: "Concrete" },
  { hex: "#f0ece4", label: "Marble" },
];

const FURNITURE = ["+ Sectional sofa", "+ King bed", "+ Dining table", "+ Desk"];

export default function RedesignSection() {
  const [activeWall, setActiveWall] = useState(0);
  const [activeFloor, setActiveFloor] = useState(0);

  return (
    <section className="border-t border-slate-200 bg-light-1 px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Let them picture their life in the space
        </span>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <h2 className="mb-4 font-display text-[clamp(20px,2.5vw,34px)] font-bold leading-[1.15] tracking-tight text-ink">
              Buyers don&apos;t buy walls and floors. They buy the home they imagine living in.
            </h2>
            <p className="mb-6 text-base leading-[1.75] text-slate-600">
              SynergySo&apos;s redesign layer lets buyers swap paint colors, change the flooring, and drop in furniture presets — all without leaving the tour. It&apos;s not CAD. It&apos;s not architectural rendering. It&apos;s a &ldquo;what if&rdquo; layer that turns an empty or staged room into something that feels like theirs.
            </p>
            <div className="flex flex-col gap-5">
              {[
                {
                  title: "Wall colors",
                  body: "A curated palette of paint colors — not a rainbow of options, but the colors buyers actually consider. One tap to see the living room in warm white instead of builder beige.",
                },
                {
                  title: "Flooring",
                  body: "Swap between hardwood tones, light oak, concrete, and tile. The change applies across the room in real time. No imagination required.",
                },
                {
                  title: "Furniture presets",
                  body: "Drop in a sectional, a king bed, a dining table. See if the layout works before making an offer. No measuring tape needed — the AI already knows the room dimensions.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="border-l-2 border-accent/30 pl-[18px]">
                  <div className="mb-1 text-sm font-semibold text-ink">{title}</div>
                  <p className="text-[13px] leading-[1.65] text-slate-600">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-accent/12 bg-accent/6 px-[18px] py-3.5 text-[13px] leading-[1.6] text-slate-700">
              <strong>Important:</strong> The redesign layer is cosmetic only — colors, surfaces, furniture. It never alters the structure, dimensions, or spatial accuracy of the tour. What your buyer sees is always a truthful representation of the property.
            </div>
          </div>

          {/* Right: mockup UI */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {/* Browser-style header */}
            <div className="flex items-center gap-2.5 border-b border-slate-100 bg-white px-[18px] py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[12px] text-slate-400">Living Room — Redesign Mode</span>
            </div>

            {/* Room preview */}
            <div
              className="relative flex h-[180px] items-end justify-center pb-5 transition-colors duration-300"
              style={{ backgroundColor: WALL_SWATCHES[activeWall].hex }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-6 transition-colors duration-300"
                style={{ backgroundColor: FLOOR_SWATCHES[activeFloor].hex }}
              />
              <span className="relative z-10 font-mono text-[10px] tracking-[0.1em] text-black/35">
                LIVING ROOM PREVIEW
              </span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3.5 p-[18px]">
              {/* Wall swatches */}
              <div className="flex items-center gap-2">
                <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">Walls</span>
                {WALL_SWATCHES.map((s, i) => (
                  <button
                    key={s.label}
                    title={s.label}
                    onClick={() => setActiveWall(i)}
                    className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                      activeWall === i ? "ring-2 ring-offset-2 ring-accent" : ""
                    }`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>

              {/* Floor swatches */}
              <div className="flex items-center gap-2">
                <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">Flooring</span>
                {FLOOR_SWATCHES.map((s, i) => (
                  <button
                    key={s.label}
                    title={s.label}
                    onClick={() => setActiveFloor(i)}
                    className={`h-6 w-6 rounded transition-transform hover:scale-110 ${
                      activeFloor === i ? "ring-2 ring-offset-2 ring-accent" : ""
                    }`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>

              {/* Furniture pills */}
              <div className="flex flex-wrap gap-2">
                {FURNITURE.map((f) => (
                  <span
                    key={f}
                    className="cursor-pointer rounded px-2.5 py-1 font-mono text-[10px] text-slate-500 transition hover:bg-slate-100"
                    style={{ background: "#F2F4F6" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
