const SPECS = [
  { value: "15",    unit: "min", label: "to capture any property, any size" },
  { value: "Any phone", unit: "", label: "iPhone or Android — no extra hardware" },
  { value: "One link",  unit: "", label: "opens in any browser, no download" },
  { value: "$0",    unit: "", label: "to capture your very first listing" },
] as const;

export default function IntroSection() {
  return (
    <section id="intro" className="border-t border-white/8 px-10 py-[140px] max-sm:px-5 max-sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left */}
          <div>
            <div className="eyebrow mb-[22px] flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-light" data-reveal>
              <span className="block h-px w-[30px] bg-accent" />
              The problem, made concrete
            </div>
            <h2
              className="text-[clamp(30px,4.6vw,68px)] font-black leading-[1.02] tracking-[-0.04em] text-white"
              data-reveal
            >
              Distance shouldn&apos;t be the
              <br />
              reason a deal{" "}
              <em className="not-italic text-accent-light">goes quiet.</em>
            </h2>
            <div className="mt-[22px] space-y-[22px]">
              <p
                className="text-[clamp(16px,1.4vw,19px)] leading-[1.85] text-white/70"
                data-reveal
              >
                For years, the out-of-town buyer got a gallery of JPEGs and a phone
                call. "Looks great," they say — then nothing. Not because they lost
                interest, but because{" "}
                <strong className="font-semibold text-white">
                  a photo can&apos;t tell you if your furniture fits, or how the light
                  falls at 4pm.
                </strong>
              </p>
              <p
                className="text-[clamp(16px,1.4vw,19px)] leading-[1.85] text-white/70"
                data-reveal
              >
                SynergySo closes that gap. A buyer in London walks a Brooklyn
                two-bedroom on their lunch break, room to room, at true scale.{" "}
                <strong className="font-semibold text-white">
                  They call you back ready to move
                </strong>{" "}
                — not ready to think about it.
              </p>
            </div>
          </div>

          {/* Right — spec list */}
          <div className="border-t border-white/8" data-reveal>
            {SPECS.map(({ value, unit, label }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-[18px] border-b border-white/8 py-[22px]"
              >
                <div className="font-mono text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] text-white">
                  {value}
                  {unit && (
                    <span className="text-[0.5em]">{unit}</span>
                  )}
                </div>
                <div className="max-w-[18ch] text-right text-[13px] leading-[1.5] text-white/45">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
