"use client";

import { useEffect, useRef, useState } from "react";

type Palette = {
  bg: string;
  orb: string;
  accent: string;
};

type StoryStep = {
  id: string;
  n: string;
  stepLabel: string;
  title: string;
  body: string;
  foot: string;
  palette: Palette;
  visualType: "scan" | "process" | "share" | "chat" | "dashboard" | "v2";
};

const steps: StoryStep[] = [
  {
    id: "step-01",
    n: "01",
    stepLabel: "STEP 01 — ~15 MINUTES",
    title: "Open & walk",
    body: "Open the app, tap Start, walk every room. The app guides you: stand in the corner, sweep slowly. LiDAR on iPhone Pro. Photogrammetry fallback on other devices.",
    foot: "~15 MINUTES",
    palette: { bg: "#f3f7ff", orb: "#cfe5ff", accent: "#38bdf8" },
    visualType: "scan",
  },
  {
    id: "step-02",
    n: "02",
    stepLabel: "STEP 02 — ~5 MINUTES",
    title: "Process & tag",
    body: "Upload. Servers stitch the tour in ~5 minutes. Floorplan and room tags auto-generate. You review, name rooms, add listing notes.",
    foot: "~5 MINUTES",
    palette: { bg: "#f8f3ff", orb: "#e8d9ff", accent: "#8b5cf6" },
    visualType: "process",
  },
  {
    id: "step-03",
    n: "03",
    stepLabel: "STEP 03 — INSTANT",
    title: "Share one link",
    body: "One link. Text it to your buyer. They open it in any mobile browser — no app install required. They're standing inside the home.",
    foot: "INSTANT",
    palette: { bg: "#f2f5ff", orb: "#d8e0ff", accent: "#818cf8" },
    visualType: "share",
  },
  {
    id: "step-04",
    n: "04",
    stepLabel: "STEP 04 — NO INSTALL NEEDED",
    title: "Buyer explores & asks",
    body: "They walk the home, point to measure, ask questions in plain language. 'Could my sectional fit?' 'How tall are the ceilings?' The AI answers instantly.",
    foot: "NO INSTALL NEEDED",
    palette: { bg: "#f1fcf7", orb: "#d3f3e2", accent: "#34d399" },
    visualType: "chat",
  },
  {
    id: "step-05",
    n: "05",
    stepLabel: "STEP 05 — YOUR EDGE",
    title: "You close smarter",
    body: "Your dashboard shows which rooms they lingered in, what questions they asked, where they dropped off. Use that to tailor the offer conversation.",
    foot: "YOUR EDGE",
    palette: { bg: "#fffaef", orb: "#f8e7bd", accent: "#f59e0b" },
    visualType: "dashboard",
  },
  {
    id: "step-v2",
    n: "v2",
    stepLabel: "V2 — COMING IN V2",
    title: "Headset upgrade",
    body: "Meta Quest and Apple Vision Pro support coming in v2. v1 deliberately doesn't require one — buyer-side hardware penetration isn't there yet.",
    foot: "COMING IN V2",
    palette: { bg: "#fdf3ff", orb: "#efd7ff", accent: "#e879f9" },
    visualType: "v2",
  },
];

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const chunk = normalized.length === 3
    ? normalized.split("").map((c) => `${c}${c}`).join("")
    : normalized;
  const value = Number.parseInt(chunk, 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function toRgba(hex: string, alpha: number) {
  const c = hexToRgb(hex);
  return `rgba(${c.r},${c.g},${c.b},${alpha})`;
}

export default function HowItWorksSection() {
  const snapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = snapRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index || 0);
            setActiveStep(index);
          }
        }
      },
      { root, threshold: 0.55 }
    );

    chapterRefs.current.forEach((node) => { if (node) observer.observe(node); });

    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight;
      setScrollProgress(max > 0 ? root.scrollTop / max : 0);
    };

    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); root.removeEventListener("scroll", onScroll); };
  }, [activeStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = snapRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = {
      bg: hexToRgb(steps[0].palette.bg),
      orb: hexToRgb(steps[0].palette.orb),
      accent: hexToRgb(steps[0].palette.accent),
      tBg: hexToRgb(steps[0].palette.bg),
      tOrb: hexToRgb(steps[0].palette.orb),
      tAccent: hexToRgb(steps[0].palette.accent),
    };

    let raf = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(root.clientWidth * dpr);
      canvas.height = Math.floor(root.clientHeight * dpr);
      canvas.style.width = `${root.clientWidth}px`;
      canvas.style.height = `${root.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      const p = steps[activeStep].palette;
      state.tBg = hexToRgb(p.bg);
      state.tOrb = hexToRgb(p.orb);
      state.tAccent = hexToRgb(p.accent);

      for (const k of ["r", "g", "b"] as const) {
        state.bg[k] = lerp(state.bg[k], state.tBg[k], 0.025);
        state.orb[k] = lerp(state.orb[k], state.tOrb[k], 0.025);
        state.accent[k] = lerp(state.accent[k], state.tAccent[k], 0.025);
      }

      const W = root.clientWidth;
      const H = root.clientHeight;

      ctx.fillStyle = `rgb(${state.bg.r|0},${state.bg.g|0},${state.bg.b|0})`;
      ctx.fillRect(0, 0, W, H);

      // Orbs — asymmetric placement for depth
      const orbConfigs = [
        { xFactor: 0.15, yFactor: 0.3, rFactor: 0.42, alpha: 0.38 },
        { xFactor: 0.6,  yFactor: 0.55, rFactor: 0.36, alpha: 0.28 },
        { xFactor: 0.88, yFactor: 0.2,  rFactor: 0.28, alpha: 0.18 },
      ];
      orbConfigs.forEach(({ xFactor, yFactor, rFactor, alpha }, i) => {
        const ox = W * xFactor + Math.sin(time * 0.00022 + i * 2.1) * 55;
        const oy = H * yFactor + Math.cos(time * 0.00018 + i * 1.7) * 38;
        const r  = Math.max(W, H) * rFactor;
        const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, `rgba(${state.orb.r},${state.orb.g},${state.orb.b},${alpha})`);
        g.addColorStop(0.5, `rgba(${state.orb.r},${state.orb.g},${state.orb.b},${alpha * 0.3})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Accent glow — bottom left corner signature
      const ag = ctx.createRadialGradient(W * 0.05, H * 0.9, 0, W * 0.05, H * 0.9, W * 0.3);
      ag.addColorStop(0, `rgba(${state.accent.r},${state.accent.g},${state.accent.b},0.12)`);
      ag.addColorStop(1, "transparent");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += 72) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += 72) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Horizontal scan line — subtle accent
      const scanY = (H * 0.5) + Math.sin(time * 0.0004) * (H * 0.12);
      const sg = ctx.createLinearGradient(0, scanY - 1, 0, scanY + 1);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.5, `rgba(${state.accent.r},${state.accent.g},${state.accent.b},0.07)`);
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 40, W, 80);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [activeStep]);

  const scrollToStep = (index: number) => {
    const root = snapRef.current;
    const chapter = chapterRefs.current[index];
    if (!root || !chapter) return;
    root.scrollTo({ top: chapter.offsetTop, behavior: "smooth" });
  };

  const accentColor = steps[activeStep].palette.accent;

  return (
    <section id="how" className="relative">
      {/* ── Section header ── */}
      <div className="px-6 pb-16 pt-[80px] text-center lg:px-[52px] lg:pt-[120px]">
        <span className="inline-block rounded-full border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.08)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#a78bfa]">
          How it works
        </span>
        <h2 className="mt-5 font-serif text-[clamp(34px,4vw,54px)] font-normal leading-tight tracking-[-0.02em] text-brand-text">
          Five steps.
          <br />
          <em className="bg-gradient-to-br from-[#c4b5fd] to-[#a78bfa] bg-clip-text font-medium italic text-transparent">
            Fifteen minutes.
          </em>
        </h2>
      </div>

      {/* ── Scroll experience — edge-to-edge, no card wrapper ── */}
      <div className="relative h-[600vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Canvas bg */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0"
          />

          {/* Top edge fade — blends into site above */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#f7f8fc] to-transparent" />
          {/* Bottom edge fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#f7f8fc] to-transparent" />

          {/* ── Left panel ── */}
          <div className="pointer-events-none absolute left-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-0 lg:flex">
            {/* Step number */}
            <div
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-500"
              style={{ color: toRgba(accentColor, 0.7) }}
            >
              {activeStep < steps.length - 1 ? steps[activeStep].n : "V2"}
            </div>

            {/* Progress track */}
            <div className="relative h-44 w-px bg-black/15">
              <div
                className="absolute left-0 top-0 w-full transition-all duration-500"
                style={{
                  height: `${Math.max(4, scrollProgress * 100)}%`,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 10px ${toRgba(accentColor, 0.8)}, 0 0 20px ${toRgba(accentColor, 0.3)}`,
                }}
              />
              {/* Glow dot at tip */}
              <div
                className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full transition-all duration-500"
                style={{
                  top: `${Math.max(4, scrollProgress * 100)}%`,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 12px ${accentColor}`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>

            {/* Step label — vertical */}
            <div
              className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-black/45"
              style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
            >
              {activeStep < steps.length - 1 ? `Step ${steps[activeStep].n} of 5` : "V2 Preview"}
            </div>
          </div>

          {/* ── Navigation dots ── */}
          <div className="pointer-events-none absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-[10px] md:flex">
            {steps.map((s, i) => (
              <button
                key={`dot-${s.id}`}
                type="button"
                title={s.title}
                onClick={() => scrollToStep(i)}
                className="pointer-events-auto group relative flex h-3 w-3 items-center justify-center"
              >
                {/* Outer ring on active */}
                {i === activeStep && (
                  <span
                    className="absolute h-5 w-5 rounded-full border transition-all duration-300"
                    style={{ borderColor: toRgba(s.palette.accent, 0.4) }}
                  />
                )}
                <span
                  className="block h-1.5 w-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === activeStep ? s.palette.accent : "rgba(23,26,43,0.22)",
                    boxShadow: i === activeStep ? `0 0 8px ${s.palette.accent}` : "none",
                    transform: i === activeStep ? "scale(1.3)" : "scale(1)",
                  }}
                />
                {/* Tooltip */}
                <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-black/10 bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-black/65 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* ── Snap scroll container ── */}
          <div
            ref={snapRef}
            className="relative z-10 h-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isAbove = index < activeStep;

              return (
                <article
                  key={step.id}
                  ref={(node) => { chapterRefs.current[index] = node; }}
                  data-index={index}
                  className="relative flex h-screen snap-start items-center justify-center px-6 md:px-14 lg:px-24"
                >
                  <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">

                    {/* ── Text column ── */}
                    <div
                      className="flex flex-col"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateY(0) translateX(0)"
                          : isAbove
                          ? "translateY(-18px) translateX(-6px)"
                          : "translateY(28px) translateX(6px)",
                        transition: isActive
                          ? "opacity 0.75s ease, transform 0.75s ease"
                          : "opacity 0.4s ease, transform 0.4s ease",
                      }}
                    >
                      {/* Step tag */}
                      <div
                        className="font-mono text-[10px] uppercase tracking-[0.25em]"
                        style={{ color: toRgba(step.palette.accent, 0.8) }}
                      >
                        {step.stepLabel}
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 font-serif text-[clamp(38px,5.5vw,62px)] font-medium leading-[1.02] tracking-[-0.03em] text-brand-text">
                        {step.title}
                      </h3>

                      {/* Accent underline */}
                      <div
                        className="mt-4 h-px w-12 transition-all duration-700"
                        style={{
                          backgroundColor: step.palette.accent,
                          boxShadow: `0 0 12px ${toRgba(step.palette.accent, 0.7)}`,
                          width: isActive ? "3rem" : "0rem",
                        }}
                      />

                      {/* Body */}
                      <p className="mt-5 max-w-[500px] text-[15px] font-light leading-[1.75] text-black/60">
                        {step.body}
                      </p>

                      {/* Footer badge */}
                      <div className="mt-7 flex items-center gap-3">
                        <div
                          className="h-px w-5"
                          style={{ backgroundColor: toRgba(step.palette.accent, 0.5) }}
                        />
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ color: toRgba(step.palette.accent, 0.65) }}
                        >
                          {step.foot}
                        </span>
                      </div>

                      {/* Scroll hint — step 1 only */}
                      {index === 0 && (
                        <div
                          className="mt-10 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 transition-opacity duration-700"
                          style={{ opacity: activeStep === 0 ? 1 : 0 }}
                        >
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-black/15"
                            style={{ color: toRgba(step.palette.accent, 0.6) }}
                          >
                            ↓
                          </span>
                          Scroll to continue
                        </div>
                      )}
                    </div>

                    {/* ── Visual column ── */}
                    <div
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                        transition: isActive
                          ? "opacity 0.85s ease 0.12s, transform 0.85s ease 0.12s"
                          : "opacity 0.35s ease, transform 0.35s ease",
                      }}
                    >
                      {/* Glow halo behind card */}
                      <div
                        className="relative rounded-2xl"
                        style={{
                          boxShadow: `0 0 0 1px ${toRgba(step.palette.accent, 0.12)}, 0 32px 80px -20px ${toRgba(step.palette.accent, 0.35)}, inset 0 1px 0 ${toRgba(step.palette.accent, 0.08)}`,
                          background: `linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(245,247,255,0.96) 100%)`,
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        {/* Top accent line */}
                        <div
                          className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${toRgba(step.palette.accent, 0.5)}, transparent)`,
                          }}
                        />
                        <div className="p-7">
                          <StepVisual step={step} isActive={isActive} />
                        </div>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepVisual({ step, isActive }: { step: StoryStep; isActive: boolean }) {
  const accent = step.palette.accent;

  if (step.visualType === "scan") {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: toRgba(accent, 0.7) }}>
            Scanning · Living Room
          </span>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]"
            style={{
              backgroundColor: toRgba(accent, 0.12),
              color: toRgba(accent, 0.85),
              border: `1px solid ${toRgba(accent, 0.25)}`,
            }}
          >
            LiDAR
          </span>
        </div>

        {/* Scan ring */}
        <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center">
          {/* Outer rings */}
          {[1, 0.72, 0.48].map((scale, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                borderColor: toRgba(accent, 0.15 + i * 0.08),
                animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
          {/* Sweep line */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ animation: isActive ? "spin 3s linear infinite" : "none" }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 80%, ${toRgba(accent, 0.4)} 100%)`,
              }}
            />
          </div>
          {/* Core */}
          <div
            className="relative h-[68px] w-[68px] rounded-full"
            style={{
              backgroundColor: toRgba(accent, 0.9),
              boxShadow: `0 0 40px ${toRgba(accent, 0.6)}, 0 0 80px ${toRgba(accent, 0.25)}`,
            }}
          />
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: isActive ? "75%" : "0%",
                backgroundColor: accent,
                boxShadow: `0 0 8px ${toRgba(accent, 0.6)}`,
              }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-black/50">
            <span>Progress 75%</span>
            <span>Remaining 3:42</span>
          </div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse { 0%,100%{ opacity:0.6; } 50%{ opacity:1; } }
        `}</style>
      </div>
    );
  }

  if (step.visualType === "process") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: toRgba(accent, 0.7) }}>
            Processing · Stitching
          </span>
          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em]"
            style={{ backgroundColor: toRgba(accent, 0.1), color: toRgba(accent, 0.85), border: `1px solid ${toRgba(accent, 0.2)}` }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent, animation: "blink 1.2s ease-in-out infinite" }}
            />
            Live
          </span>
        </div>

        {/* Main progress */}
        <div className="space-y-1.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-all duration-[1500ms]"
              style={{
                width: isActive ? "66%" : "10%",
                background: `linear-gradient(90deg, ${toRgba(accent, 0.6)}, ${accent})`,
                boxShadow: `0 0 12px ${toRgba(accent, 0.5)}`,
              }}
            />
          </div>
          <div className="flex justify-between font-mono text-[9px] text-black/45">
            <span>66%</span>
            <span>~2 min remaining</span>
          </div>
        </div>

        {/* Room list */}
        <div className="space-y-2 pt-1">
          {[
            { name: "Living Room", status: "Tagged", done: true },
            { name: "Kitchen", status: "Tagged", done: true },
            { name: "Master Bedroom", status: "Processing", done: false },
            { name: "Bathroom", status: "Queued", done: false },
          ].map((room, i) => (
            <div
              key={room.name}
              className="flex items-center justify-between rounded-lg px-3.5 py-2.5 transition-all duration-500"
              style={{
                background: room.done ? toRgba(accent, 0.06) : "rgba(255,255,255,0.02)",
                border: `1px solid ${room.done ? toRgba(accent, 0.18) : "rgba(255,255,255,0.06)"}`,
                opacity: isActive ? 1 : 0,
                transitionDelay: `${i * 80}ms`,
                transform: isActive ? "translateX(0)" : "translateX(8px)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: room.done ? accent : "rgba(255,255,255,0.2)" }}
                />
                <span className="text-[13px] text-black/80">{room.name}</span>
              </div>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.12em]"
                style={{ color: room.done ? toRgba(accent, 0.8) : "rgba(255,255,255,0.3)" }}
              >
                {room.status}
              </span>
            </div>
          ))}
        </div>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
      </div>
    );
  }

  if (step.visualType === "share") {
    return (
      <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${toRgba(accent, 0.15)}` }}>
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: "rgba(0,0,0,0.4)", borderBottom: `1px solid ${toRgba(accent, 0.1)}` }}
        >
          <div className="flex gap-1.5">
            {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
              <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div
            className="flex flex-1 items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[11px]"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
          >
            <span style={{ color: toRgba(accent, 0.6) }}>●</span>
            tour.synergyso.app/123-oak-st
          </div>
        </div>

        {/* Tour preview */}
        <div
          className="relative h-[200px]"
          style={{
            background: `radial-gradient(circle at 35% 40%, ${toRgba(accent, 0.28)}, transparent 55%), radial-gradient(circle at 72% 65%, rgba(168,85,247,0.18), transparent 45%), #070b18`,
          }}
        >
          {/* Floor grid */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(${toRgba(accent, 0.3)} 1px, transparent 1px), linear-gradient(90deg, ${toRgba(accent, 0.3)} 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: "perspective(300px) rotateX(35deg)",
              transformOrigin: "bottom",
            }}
          />
          {/* Hotspot dots */}
          {[
            { left: "22%", top: "42%" },
            { left: "55%", top: "60%" },
            { left: "74%", top: "35%" },
          ].map((pos, i) => (
            <div key={i} className="absolute" style={pos}>
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 16px ${toRgba(accent, 0.9)}`,
                  animation: `ripple 2s ease-out infinite`,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            </div>
          ))}
          {/* Room label */}
          <div
            className="absolute bottom-3 left-3 rounded-lg px-3 py-2"
            style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
          >
            <div className="text-[12px] font-medium text-white">Master Bedroom</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/50">224 sq ft · NW exposure</div>
          </div>
        </div>
        <style>{`@keyframes ripple{0%{box-shadow:0 0 0 0 ${toRgba(accent,0.6)}}70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}`}</style>
      </div>
    );
  }

  if (step.visualType === "chat") {
    return (
      <div className="space-y-3">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2.5 pb-3" style={{ borderBottom: `1px solid ${toRgba(accent, 0.12)}` }}>
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[9px] font-bold"
            style={{ backgroundColor: toRgba(accent, 0.2), color: accent, border: `1px solid ${toRgba(accent, 0.3)}` }}
          >
            AI
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: toRgba(accent, 0.7) }}>
            SynergySo AI · 123 Oak St
          </span>
          <span
            className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]"
            style={{ backgroundColor: toRgba(accent, 0.1), color: toRgba(accent, 0.8), border: `1px solid ${toRgba(accent, 0.2)}` }}
          >
            <span className="h-1 w-1 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            Live
          </span>
        </div>

        {/* Messages */}
        {[
          { role: "user", text: "Could my sectional fit?" },
          { role: "ai", text: "Yes — living room supports an 8ft sectional with clear walking space near both entry points." },
          { role: "user", text: "How tall are the ceilings?" },
          { role: "ai", text: "9ft on the main floor, 8ft 4in in the hallway." },
        ].map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity 0.5s ease ${i * 120 + 200}ms, transform 0.5s ease ${i * 120 + 200}ms`,
              transform: isActive ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div
              className="max-w-[88%] rounded-xl px-3.5 py-2.5 text-[12.5px] leading-snug"
              style={msg.role === "user" ? {
                backgroundColor: toRgba(accent, 0.14),
                color: toRgba(accent, 0.95),
                border: `1px solid ${toRgba(accent, 0.25)}`,
                borderBottomRightRadius: "4px",
              } : {
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottomLeftRadius: "4px",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (step.visualType === "dashboard") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${toRgba(accent, 0.12)}` }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: toRgba(accent, 0.7) }}>
            Buyer session · 12 min ago
          </span>
          <span className="font-mono text-[9px] text-black/45">3 rooms · 7:44 total</span>
        </div>

        {[
          { room: "Master Bedroom", stat: "4:22 spent", bar: 0.72, note: "Highest dwell" },
          { room: "Kitchen", stat: "2 questions", bar: 0.45, note: "Asked about island" },
          { room: "Living Room", stat: "Dropped off", bar: 0.18, note: "Left at 1:02" },
        ].map((row, i) => (
          <div key={row.room} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-black/80">{row.room}</span>
                <span className="rounded px-1.5 py-0.5 font-mono text-[8px] text-black/45" style={{ background: "rgba(23,26,43,0.05)" }}>
                  {row.note}
                </span>
              </div>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.1em]"
                style={{ color: toRgba(accent, 0.75) }}
              >
                {row.stat}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full transition-all duration-[800ms]"
                style={{
                  width: isActive ? `${row.bar * 100}%` : "0%",
                  transitionDelay: `${i * 120}ms`,
                  background: `linear-gradient(90deg, ${toRgba(accent, 0.5)}, ${accent})`,
                  boxShadow: `0 0 6px ${toRgba(accent, 0.5)}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // v2
  return (
    <div className="flex h-[260px] flex-col items-center justify-center gap-5 text-center">
      <div
        className="rounded-full px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em]"
        style={{
          border: `1px solid ${toRgba(accent, 0.35)}`,
          color: toRgba(accent, 0.85),
          backgroundColor: toRgba(accent, 0.08),
        }}
      >
        Coming in v2
      </div>

      {/* Headset icon */}
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          border: `1px solid ${toRgba(accent, 0.25)}`,
          backgroundColor: toRgba(accent, 0.06),
          boxShadow: `0 0 40px ${toRgba(accent, 0.2)}`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ animation: "glowPulse 2.5s ease-in-out infinite", boxShadow: `0 0 30px ${toRgba(accent, 0.3)}` }}
        />
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden style={{ color: accent }}>
          <path d="M4 10a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2h-1.4l-1.6 2h-6l-1.6-2H6a2 2 0 01-2-2v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="9" cy="12" r="1.2" fill="currentColor" />
          <circle cx="15" cy="12" r="1.2" fill="currentColor" />
        </svg>
      </div>

      <p className="max-w-[260px] text-[13px] leading-relaxed text-black/60">
        Spatial viewing on Meta Quest and Apple Vision Pro. v1 works on any phone — no headset needed.
      </p>

      <div className="flex gap-3">
        {["Meta Quest", "Vision Pro"].map((label) => (
          <span
            key={label}
            className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-black/45"
            style={{ border: "1px solid rgba(23,26,43,0.15)" }}
          >
            {label}
          </span>
        ))}
      </div>

      <style>{`@keyframes glowPulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
    </div>
  );
}