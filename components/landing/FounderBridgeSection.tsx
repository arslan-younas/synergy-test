export default function FounderBridgeSection() {
  return (
    <section className="border-t border-white/7 bg-ink-soft px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[860px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          Why we built this
        </span>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-[72px]">
          {/* Left: founder card */}
          <div>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/15 font-display text-[22px] font-bold text-accent-light">
              B
            </div>
            <div className="mb-0.5 text-base font-bold text-white">Bryan T.</div>
            <div className="font-mono text-xs text-white/32">
              Active Real Estate Agent<br />
              New York Metro<br />
              Co-founder, SynergySo
            </div>
            <div className="mt-5 rounded-lg border border-accent/18 bg-accent/8 p-3.5">
              <span className="inline-block h-1.75 w-1.75 animate-pulse-dot rounded-full bg-accent-green align-middle" />
              <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/38">
                Active Agent
              </span>
              <p className="mt-1.5 font-mono text-xs text-white/30">
                Currently using SynergySo on active listings in New York Metro
              </p>
            </div>
          </div>

          {/* Right: quote + story */}
          <div>
            <blockquote className="mb-6 border-l-[3px] border-accent pl-6 font-display text-[clamp(18px,2vw,26px)] font-bold leading-[1.3] tracking-tight text-white">
              &ldquo;I&apos;m a real estate agent in New York. I built this because I was losing deals I couldn&apos;t show.&rdquo;
            </blockquote>
            <div className="space-y-4 pl-6">
              <p className="text-[15px] leading-[1.8] text-white/50">
                I had a buyer in London interested in a Brooklyn two-bedroom. I sent photos. She said they looked great. Then she went quiet — not because she lost interest, but because she couldn&apos;t picture herself in the space from a gallery of JPEG files.
              </p>
              <p className="text-[15px] leading-[1.8] text-white/50">
                I looked at Matterport. $309 a month, a contractor, three days of turnaround. For one listing. I looked at Zillow 3D. Free — but now Zillow owns my client relationship and the &ldquo;3D tour&rdquo; is just stitched 360° photos. Neither option was built for me.
              </p>
              <p className="text-[15px] leading-[1.8] text-white/50">
                So I built SynergySo. I walk the property with my phone. Fifteen minutes later, my buyer in London is walking the same rooms, asking the AI whether her couch fits, and calling me directly from inside the tour when she&apos;s ready to talk. That&apos;s the product. I use it on every listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
