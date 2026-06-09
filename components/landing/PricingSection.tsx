function Check({ children, muted, dark }: { children: React.ReactNode; muted?: boolean; dark?: boolean }) {
  return (
    <div className={`flex items-start gap-2 text-sm leading-relaxed ${muted ? (dark ? "text-white/40" : "text-slate-400") : dark ? "text-white/65" : "text-slate-700"}`}>
      <span className={`mt-0.5 shrink-0 font-bold ${muted ? (dark ? "text-white/35" : "text-slate-300") : dark ? "text-accent-green" : "text-green-600"}`}>
        {muted ? "✗" : "✓"}
      </span>
      {children}
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-ink px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block text-center font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          Simple, transparent pricing
        </span>
        <h2 className="mb-3 text-center font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-white">
          Start with one listing. Scale when you&apos;re ready.
        </h2>
        <p className="mb-[52px] text-center text-[15px] text-white/38">
          No contracts. No per-scan fees. No hardware to buy. Cancel any time.
        </p>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {/* Starter */}
          <article className="flex flex-col rounded-xl border border-white/7 bg-ink-soft p-7">
            <div className="mb-1.5 text-base font-bold text-white">Starter</div>
            <div className="mb-2">
              <span className="font-display text-[32px] font-extrabold leading-none tracking-tight text-white">$29</span>
              <span className="font-mono text-sm text-white/40">/month</span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/50">For agents testing SynergySo on their first listings.</p>
            <a
              href="#cta"
              className="mb-5 block w-full rounded-[7px] border border-white/12 py-[11px] text-center text-sm font-semibold text-white/65 transition hover:border-white/28 hover:text-white"
            >
              Start Free →
            </a>
            <hr className="mb-4 border-white/7" />
            <div className="flex grow flex-col gap-2">
              <Check dark>Up to 5 active tours per month</Check>
              <Check dark>Phone capture — iPhone and Android</Check>
              <Check dark>Shareable tour link (no buyer app)</Check>
              <Check dark>AI Q&amp;A — unlimited buyer questions</Check>
              <Check dark>In-tour buyer call</Check>
              <Check dark>Basic redesign — wall colors and flooring</Check>
              <Check dark>Basic analytics — opens and time in tour</Check>
              <Check dark muted>Full analytics dashboard</Check>
              <Check dark muted>Furniture presets in redesign</Check>
              <Check dark muted>Seller preview</Check>
              <Check dark muted>Priority support</Check>
            </div>
            <p className="mt-3 text-center font-mono text-sm text-white/50">First tour always free · No credit card required</p>
          </article>

          {/* Pro (featured) */}
          <article className="relative flex flex-col rounded-xl border-2 border-accent bg-white p-7 md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
              Recommended
            </div>
            <div className="mb-1.5 text-base font-bold text-ink">Pro</div>
            <div className="mb-2">
              <span className="font-display text-[32px] font-extrabold leading-none tracking-tight text-ink">$49</span>
              <span className="font-mono text-sm text-slate-500">/month</span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-slate-600">For agents using SynergySo on every listing.</p>
            <a
              href="#cta"
              className="mb-5 block w-full rounded-[7px] bg-accent py-[11px] text-center text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              Start Pro Free for 14 Days →
            </a>
            <hr className="mb-4 border-black/7" />
            <div className="flex grow flex-col gap-2">
              <Check>Unlimited active tours</Check>
              <Check>Full analytics — rooms, AI questions, call tracking</Check>
              <Check>Furniture presets in redesign mode</Check>
              <Check>Seller preview before tour goes live</Check>
              <Check>Buyer intro card — personal note at tour start</Check>
              <Check>Priority support</Check>
              <Check>Early access to new features</Check>
              <Check>Everything in Starter</Check>
            </div>
            <p className="mt-3 text-center font-mono text-sm text-slate-500">Most popular among pilot agents.</p>
          </article>

          {/* Brokerage */}
          <article id="brokerages" className="flex flex-col rounded-xl border border-white/7 bg-ink-soft p-7 scroll-mt-20">
            <div className="mb-1.5 text-base font-bold text-white">Brokerage</div>
            <div className="mb-2">
              <span className="font-display text-[28px] font-extrabold leading-none tracking-tight text-white">Custom</span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/50">For small brokerages who want every agent on SynergySo.</p>
            <a
              href="#cta"
              className="mb-5 block w-full rounded-[7px] border border-white/12 py-[11px] text-center text-sm font-semibold text-white/65 transition hover:border-white/28 hover:text-white"
            >
              Talk to Us →
            </a>
            <hr className="mb-4 border-white/7" />
            <div className="flex grow flex-col gap-2">
              <Check dark>Team seats — manage multiple agents</Check>
              <Check dark>Brokerage-level analytics across your team</Check>
              <Check dark>Custom branding on tour links</Check>
              <Check dark>Dedicated onboarding and training call</Check>
              <Check dark>Volume pricing</Check>
              <Check dark>Everything in Pro</Check>
            </div>
            <p className="mt-3 text-center font-mono text-sm text-white/50">Volume pricing · Dedicated onboarding</p>
          </article>
        </div>
      </div>
    </section>
  );
}
