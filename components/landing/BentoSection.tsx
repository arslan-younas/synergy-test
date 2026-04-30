"use client";

import { useRef } from "react";
import { revealY } from "./tw";

function TiltCard({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
    el.style.transition = "transform 0.1s linear";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      data-reveal
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </article>
  );
}

function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.07)`;
    el.style.transition = "transform 0.2s cubic-bezier(0.22,1,0.36,1)";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  );
}

export default function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const spot = spotRef.current;
    const section = sectionRef.current;
    if (!spot || !section) return;
    const r = section.getBoundingClientRect();
    spot.style.background = `radial-gradient(600px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(167,139,250,0.08), transparent 60%)`;
    spot.style.opacity = "1";
  };

  const onMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative px-6 py-[80px] lg:px-[52px]"
    >
      {/* Cursor spotlight overlay */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto grid max-w-[1100px] grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-4">
        <TiltCard className={`${revealY} relative min-h-[200px] overflow-hidden rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel p-8 backdrop-blur-md transition-colors hover:border-[rgba(167,139,250,0.3)] lg:col-start-1 lg:row-start-1`}>
          <span className="mb-2.5 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-brand-violet">Conversational AI</span>
          <h3 className="mb-2 font-serif text-2xl font-medium leading-snug tracking-tight">Semantic Tour Intelligence</h3>
          <p className="max-w-[92%] text-[12.5px] leading-relaxed text-black/60">
            Our AI doesn&apos;t just show images — it understands the blueprints. It answers questions about square footage, structural integrity, and local zoning in
            real-time.
          </p>
          <div className="absolute right-6 top-1/2 hidden h-20 w-[140px] -translate-y-1/2 opacity-90 md:block">
            <svg viewBox="0 0 140 80" fill="none" aria-hidden className="h-full w-full">
              <path
                d="M5 60 Q20 30, 40 40 T75 25 T110 15 L135 10"
                stroke="#A78BFA"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
              <path d="M5 70 Q25 55, 45 50 T80 40 T120 30 L135 28" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="40" cy="40" r="2.5" fill="#A78BFA" />
              <circle cx="75" cy="25" r="2.5" fill="#A78BFA" />
              <circle cx="110" cy="15" r="2.5" fill="#C4B5FD" />
              <g opacity="0.4">
                <line x1="5" y1="75" x2="135" y2="75" stroke="#6b5f9e" strokeWidth="0.5" strokeDasharray="2 3" />
                <line x1="5" y1="45" x2="135" y2="45" stroke="#6b5f9e" strokeWidth="0.5" strokeDasharray="2 3" />
              </g>
            </svg>
          </div>
        </TiltCard>

        <TiltCard className={`${revealY} flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel p-8 backdrop-blur-md transition-colors hover:border-[rgba(167,139,250,0.3)] lg:col-start-2 lg:row-start-1`}>
          <div>
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgba(167,139,250,0.25)] bg-[rgba(167,139,250,0.1)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 13l3.5-3.5M3 13h3m-3 0v-3M13 3l-3.5 3.5M13 3h-3m3 0v3"
                  stroke="#A78BFA"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-serif text-2xl font-medium tracking-tight">Redesign Mode</h3>
            <p className="max-w-[92%] text-[12.5px] leading-relaxed text-black/60">
              Instant virtual renovation to help buyers visualize the &quot;hidden&quot; potential of every room.
            </p>
          </div>
          <div className="mt-3.5 flex items-center gap-1.5">
            {["#C4B5FD", "#7C3AED", "#3B2963", "#EDE8F5", "#6B4EA5"].map((c) => (
              <span key={c} className="h-4 w-4 rounded-full border border-white/15 transition-transform duration-200 hover:scale-125" style={{ backgroundColor: c }} />
            ))}
          </div>
        </TiltCard>

        <TiltCard className={`${revealY} min-h-[180px] overflow-hidden rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel p-8 backdrop-blur-md transition-colors hover:border-[rgba(167,139,250,0.3)] lg:col-start-1 lg:row-start-2`}>
          <span className="mb-3.5 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-brand-violet">Intelligence</span>
          <h3 className="mb-2 font-serif text-2xl font-medium tracking-tight">Agent Command Center</h3>
          <p className="max-w-xl text-[12.5px] leading-relaxed text-black/60">
            Track buyer hotspots, see which rooms they spend the most time in, and get alerted when they ask specific questions.
          </p>
        </TiltCard>

        <TiltCard className={`${revealY} flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[20px] border border-[rgba(167,139,250,0.3)] bg-gradient-to-br from-[rgba(124,58,237,0.18)] to-[rgba(167,139,250,0.08)] p-8 backdrop-blur-md transition-colors hover:border-[rgba(167,139,250,0.5)] lg:col-start-2 lg:row-start-2`}>
          <div>
            <h3 className="mb-2 font-serif text-[26px] font-medium tracking-tight">Join the Elite 10</h3>
            <p className="max-w-[92%] text-[12.5px] leading-relaxed text-black/60">
              Exclusive NY Metro Pilot Program for top-tier agents looking to dominate high-end listings.
            </p>
          </div>
          <MagneticButton
            href="#cta"
            className="mt-6 flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center self-end rounded-full bg-brand-violet text-center font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-brand-violet-2 hover:text-[#1a1030]"
          >
            <span className="leading-[1.1]">
              JOIN
              <br />
              NOW →
            </span>
          </MagneticButton>
        </TiltCard>
      </div>
    </section>
  );
}
