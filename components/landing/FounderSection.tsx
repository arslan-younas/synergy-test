export default function FounderSection() {
  return (
    <section className="relative px-6 py-[70px] lg:px-[52px] lg:py-[120px]">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-black/10 bg-gradient-to-br from-[#f1edff] via-[#ecebfb] to-[#dddff4]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_55%,rgba(124,58,237,0.12)_0%,transparent_70%),radial-gradient(ellipse_40%_50%_at_50%_25%,rgba(167,139,250,0.18)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-[15%] right-[15%] top-[55%] rounded-t-[45%] bg-gradient-to-b from-[rgba(167,139,250,0.28)] to-[rgba(124,58,237,0.25)]" />
          <div className="absolute left-[42%] top-[28%] aspect-square w-[16%] rounded-full bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,255,255,0.8),rgba(167,139,250,0.55)_75%)]" />
          <p className="absolute bottom-[18px] left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 truncate rounded-full bg-white/85 px-4 py-1.5 text-center font-serif text-[12.5px] italic text-black/60 backdrop-blur-md">
            Built by an agent, for the agents.
          </p>
        </div>
        <div>
          <h3 className="mb-6 font-serif text-[clamp(28px,3vw,42px)] font-medium uppercase italic leading-snug tracking-[0.01em]">The Founder&apos;s Vision</h3>
          <p className="mb-4 max-w-lg text-[14.5px] leading-relaxed text-black/60">
            Bryan Thelismond isn&apos;t just a tech founder — he&apos;s a practicing real estate agent in the heart of New York. He saw the friction, the wasted thousands on
            equipment, and the ghosted buyers.
          </p>
          <p className="mb-4 max-w-lg text-[14.5px] leading-relaxed text-black/60">
            SynergySo was born in the field, designed to solve the &quot;last mile&quot; problem of property sales using the power of mobile spatial computing.
          </p>
          <div className="mt-8 border-t border-black/10 pt-6">
            <div className="font-serif text-xl font-medium">Bryan Thelismond</div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-black/55">Founder & CEO, SynergySo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
