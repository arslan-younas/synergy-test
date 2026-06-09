"use client";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 pb-20 pt-[120px] text-center md:px-14">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/72 via-ink/60 to-ink/82" />
      <div
        className="absolute inset-0"/>
      <div className="pointer-events-none absolute left-1/2 top-[35%] h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,92,252,0.18)_0%,transparent_65%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[820px]">
        <span className="hero-fade-d1 mb-5 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          Built by a New York agent. For agents like you.
        </span>
        <h1 className="hero-fade-d2 font-display text-[clamp(30px,3.6vw,50px)] font-extrabold leading-[1.1] tracking-tight text-white">
          Your buyer is in Chicago.<br />
          The listing is in Brooklyn.<br />
          <span className="text-accent-light">Photos aren&apos;t going to close this.</span>
        </h1>
        <p className="hero-fade-d3 mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.75] text-white/50">
          SynergySo turns a 15-minute phone walkthrough into a shareable, interactive 3D tour your buyers can explore, question, and fall in love with — from anywhere in the world. No hardware. No contractor. No app download on their end.
        </p>
        <div className="hero-fade-d4 mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-[7px] bg-accent px-[26px] py-[13px] text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-accent-dark"
          >
            Capture Your First Tour Free →
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 rounded-[7px] border border-white/13 px-[22px] py-3 text-sm font-medium text-white/60 transition hover:border-white/30 hover:text-white"
          >
            See How It Works
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero-fade-d5 mt-14 flex flex-wrap justify-center border-t border-white/7 pt-7">
          {[
            { val: "15 min", label: "to capture any property" },
            { val: "Any phone", label: "iPhone or Android" },
            { val: "Zero friction", label: "buyers click a link — that's it" },
            { val: "100%", label: "of listings qualify" },
          ].map(({ val, label }) => (
            <div key={val} className="border-r border-white/7 px-9 text-center last:border-r-0">
              <div className="mb-1 text-lg font-bold text-white">{val}</div>
              <div className="font-mono text-[10px] tracking-[0.05em] text-white/32">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
