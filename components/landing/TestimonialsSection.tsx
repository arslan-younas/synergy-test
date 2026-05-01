import { revealY } from "./tw";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-28 border-t border-slate-800 bg-inverse-surface py-section-padding text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Trusted by Top Producers</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            <article
              key={t.initials}
              data-reveal
              className={`${revealY} rounded-3xl border border-slate-700 bg-slate-800/40 p-10 transition-colors hover:bg-slate-800/60`}
            >
              <p className="mb-8 font-sans text-lg italic leading-relaxed text-slate-300">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 font-display text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-white">{t.name}</div>
                  <div className="text-sm text-slate-400">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
