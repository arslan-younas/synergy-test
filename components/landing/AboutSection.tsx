export default function AboutSection() {
  return (
    <section id="about" className="border-t border-white/8 px-10 py-[140px] max-sm:px-5 max-sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-start gap-[90px] lg:grid-cols-[300px_1fr]">

          {/* Left — sticky card */}
          <div className="lg:sticky lg:top-[100px]" data-reveal>
            {/* Avatar */}
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-extrabold text-white"
              style={{ background: "linear-gradient(135deg, #7c5cfc, #a688ff)" }}
            >
              B
            </div>
            <div className="text-[19px] font-extrabold tracking-[-0.02em] text-white">Bryan T.</div>
            <div className="mt-2 font-mono text-[12px] leading-[1.9] text-white/45">
              Active Real Estate Agent
              <br />
              New York Metro
              <br />
              Co-founder, SynergySo
            </div>
            <div className="mt-[22px] inline-flex items-center gap-[9px] rounded-[8px] border border-[rgba(103,179,90,.22)] bg-[rgba(103,179,90,.09)] px-[13px] py-[10px]">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#67B35A] pulse-green" />
              <span className="font-mono text-[10.5px] leading-[1.6] tracking-[0.04em] text-white/60">
                ACTIVE AGENT
                <br />
                Using SynergySo on live
                <br />
                New York Metro listings
              </span>
            </div>
          </div>

          {/* Right — story */}
          <div>
            <div
              className="mb-[22px] flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-light"
              data-reveal
            >
              <span className="block h-px w-[30px] bg-accent" />
              Why this exists
            </div>

            <blockquote
              className="mb-10 border-b border-white/8 pb-10 text-[clamp(24px,3.2vw,40px)] font-extrabold leading-[1.28] tracking-[-0.03em] text-white"
              data-reveal
            >
              &ldquo;I built this because I was tired of losing deals to{" "}
              <em className="not-italic text-accent-light">
                distance I couldn&apos;t close with a photo gallery.
              </em>
              &rdquo;
            </blockquote>

            <div className="space-y-5">
              <p className="text-[17px] leading-[1.9] text-white/70" data-reveal>
                I had a buyer in London interested in a Brooklyn two-bedroom. I sent
                photos. She said they looked great. Then she went quiet — not because
                she lost interest, but because{" "}
                <strong className="font-semibold text-white">
                  she couldn&apos;t picture herself in the space from a gallery of JPEG files.
                </strong>
              </p>
              <p className="text-[17px] leading-[1.9] text-white/70" data-reveal>
                I looked at Matterport: $309 a month, a specialist, three days of
                turnaround — for one listing. I looked at Zillow 3D: free, but now
                Zillow owns my client relationship and the tour lives on their
                platform, not mine.{" "}
                <strong className="font-semibold text-white">
                  Neither was built for an agent who works alone and moves fast.
                </strong>
              </p>
              <p className="text-[17px] leading-[1.9] text-white/70" data-reveal>
                So I built the thing I needed. Phone only. Published before I leave
                the building. A link I drop in a text. No hardware, no contractor, no
                waiting. I use it on every listing now — and the London buyer closed.
              </p>
            </div>

            <div
              className="mt-[34px] border-t border-white/8 pt-[26px] font-mono text-[13px] text-white/45"
              data-reveal
            >
              — Bryan T. · Active agent · New York Metro · Co-founder, SynergySo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
