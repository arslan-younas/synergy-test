import { Building2, Smartphone, Ruler } from "lucide-react";

const CARDS = [
  {
    Icon: Building2,
    title: "A fully navigable 3D tour",
    body: "Not stitched 360° photos. Room-to-room navigation built from real spatial data — buyers move through the property the way they would in person, on any device.",
    tag: "True 3D · not 360° photos",
  },
  {
    Icon: Smartphone,
    title: "No app. No account. No friction.",
    body: "Your buyer taps a link and they're inside. Safari, Chrome, any browser, any device. If they can open a YouTube video, they can walk a SynergySo tour.",
    tag: "Works in 3 seconds · any device",
  },
  {
    Icon: Ruler,
    title: "Real dimensions. Real space.",
    body: "Built from actual spatial data — buyers see room dimensions, understand how their furniture fits, and feel the true scale of the space before they ever book a flight.",
    tag: "LiDAR-accurate dimensions",
  },
] as const;

export default function WhatBuyerGetsSection() {
  return (
    <section id="gets" className="bg-[#f4f3f0] px-10 py-[140px] text-[#13131a] max-sm:px-5 max-sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* Head */}
        <div className="mb-16 max-w-[680px]">
          <div
            className="mb-[22px] flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-dark"
            data-reveal
          >
            <span className="block h-px w-[30px] bg-accent-dark" />
            What your buyer gets
          </div>
          <h2
            className="text-[clamp(28px,3.6vw,52px)] font-black leading-[1.04] tracking-[-0.04em] text-[#13131a]"
            data-reveal
          >
            Not a slideshow. A space they can
            actually move through.
          </h2>
        </div>

        {/* Cards */}
        <div className="mb-[72px] grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ Icon, title, body, tag }) => (
            <div
              key={title}
              className="rounded-2xl border border-black/8 bg-white p-[34px] transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 24px 60px -28px rgba(95,67,224,0.15)" }}
              data-reveal
            >
              <div className="mb-[22px] flex h-11 w-11 items-center justify-center rounded-xl bg-accent/8">
                <Icon className="h-5 w-5 text-accent-dark" strokeWidth={1.75} />
              </div>
              <h4 className="mb-[10px] text-[18px] font-extrabold tracking-[-0.02em] text-[#13131a]">
                {title}
              </h4>
              <p className="text-[14.5px] leading-[1.75] text-[#13131a]/62">{body}</p>
              <span className="mt-[18px] inline-block rounded-[7px] bg-accent/8 px-[11px] py-[6px] font-mono text-[11px] text-accent-dark">
                {tag}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-center font-mono text-[12px] text-[#13131a]/45"
          data-reveal
        >
          What your buyer sees — a navigable walkthrough on any device, with real
          room dimensions built in.
        </p>
      </div>
    </section>
  );
}
