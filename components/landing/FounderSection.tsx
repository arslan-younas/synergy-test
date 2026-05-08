export default function FounderSection() {
  return (
    <section className="border-t border-slate-200 bg-light-2 px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          From the founder
        </span>
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Left: story */}
          <div>
            <h2 className="mb-5 font-display text-[clamp(22px,2.5vw,32px)] font-bold leading-[1.25] tracking-tight text-ink">
              &ldquo;We built SynergySo because we were tired of paying a{" "}
              <em className="not-italic text-accent">&lsquo;tech tax&rsquo;</em>{" "}
              to market our listings.&rdquo;
            </h2>
            <blockquote className="mb-7 border-l-[3px] border-accent pl-5 text-[17px] italic leading-[1.7] text-slate-600">
              &ldquo;Beautiful, interactive 3D spaces shouldn&apos;t require an engineering degree or a massive hardware budget. They should be as easy to create as taking a photo.&rdquo;
            </blockquote>
            <div className="space-y-4 text-[15px] leading-[1.8] text-slate-600">
              <p>
                The tools that existed were built for the wrong person. Matterport was built for marketing departments. Zillow 3D was built for Zillow. Nothing was built for the agent standing in an apartment at 9am with a listing that needs to go live today and a buyer who lands tomorrow.
              </p>
              <p>
                SynergySo started as the tool I wished existed. I&apos;m an active agent in New York. I have listings on my desk right now. My buyers are in London, Los Angeles, and Shanghai. The product I&apos;m building is the one I use every week.
              </p>
              <p>
                Everything we&apos;ve built comes from a simple question: what does the working agent actually need? Not the enterprise brokerage with a marketing team. Not the consumer doing a weekend home project. The independent agent with a real book of business, a real phone full of client contacts, and a listing that deserves more than a photo gallery.
              </p>
            </div>
            <div className="mt-7 border-t border-slate-200 pt-6">
              <div className="text-[15px] font-bold text-ink">Bryan T.</div>
              <div className="font-mono text-xs leading-[1.6] text-slate-500">
                Co-founder, SynergySo<br />
                Active Real Estate Agent, New York Metro
              </div>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                val: "1.5M",
                label: "Active US real estate licensees",
                body: "The addressable market. Independent agents and small brokerages who face this exact problem every week.",
              },
              {
                val: "$5.4M",
                label: "ARR from 1% of US agents at $29/mo",
                body: "A real business without requiring category dominance. We don't need to win the whole market to matter.",
              },
              {
                val: "Day 1",
                label: "Founder is customer zero",
                body: "Bryan uses SynergySo on his active New York listings. Every friction point becomes a product ticket. This is the strongest asymmetric advantage we have.",
              },
            ].map(({ val, label, body }) => (
              <div key={val} className="rounded-xl bg-light-1 p-[22px]">
                <div className="mb-1 font-display text-[28px] font-extrabold tracking-tight text-accent">{val}</div>
                <div className="mb-1 text-[13px] font-semibold text-ink">{label}</div>
                <p className="text-[12px] leading-[1.55] text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
