import { revealY } from "./tw";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#f8f9fb] px-6 py-[120px] md:px-12">
      <div className="mb-14 text-center">
        <h2 className="mt-4 font-serif text-[clamp(34px,4vw,54px)] font-bold text-brand-text leading-tight tracking-[-0.02em]">
          Built from 
          <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text font-semibold italic text-transparent"> real deals.</em>
        </h2>
      </div>
      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-[18px] lg:grid-cols-3">
        {[
          {
            quote:
              "Every week I send buyers a Zillow gallery and know it's not enough to close on. This is what the other 95% of agents have needed for years.",
            initials: "BT",
            name: "Bryan Thelismond",
            role: "Founder · NY licensed agent",
          },
          {
            quote:
              "I've paid $400 for a Matterport scan on a $700k listing. The math never worked. Agent-paid pricing at this quality changes the economics completely.",
            initials: "MR",
            name: "Marcus R.",
            role: "Pilot agent · Brooklyn, NY",
          },
          {
            quote:
              "My relocating buyers ask the same five questions on every listing. If the AI just answers them while I'm on another call, that's the product.",
            initials: "AP",
            name: "Ana P.",
            role: "Pilot agent · Miami, FL",
          },
        ].map((t) => (
          <article key={t.initials} data-reveal className={`${revealY} rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel px-8 py-9 backdrop-blur-md`}>
            <div className="mb-3.5 font-serif text-[56px] font-normal leading-none text-brand-violet">&quot;</div>
            <p className="mb-6 font-serif text-lg font-normal leading-snug tracking-tight text-brand-text">{t.quote}</p>
            <div className="flex items-center gap-3.5 border-t border-black/10 pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.15)] font-serif text-sm font-medium text-brand-violet">
                {t.initials}
              </div>
              <div>
                <h4 className="text-sm font-medium text-brand-text">{t.name}</h4>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/55">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
