function Tag({ color, children }: { color: "red" | "amber" | "purple"; children: React.ReactNode }) {
  const styles = {
    red: "bg-red-50 text-red-700",
    amber: "bg-amber-50 text-amber-700",
    purple: "bg-accent/10 text-accent-light",
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.13em] ${styles[color]}`}>
      {children}
    </span>
  );
}

function CheckItem({ ok, children, dark }: { ok: boolean; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-start gap-2 text-sm leading-[1.4] ${dark ? "text-white/72" : "text-slate-600"}`}>
      <span className={`mt-px shrink-0 font-bold ${ok ? "text-accent-green" : "text-red-500"}`}>
        {ok ? "✓" : "✗"}
      </span>
      {children}
    </div>
  );
}

export default function ProblemComparisonSection() {
  return (
    <section id="problem" className="scroll-mt-20 bg-light-1 px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          The gap every agent knows
        </span>
        <h2
          className="mb-[52px] font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-ink"
          style={{ letterSpacing: "-0.02em" }}
        >
          You&apos;ve had two choices.<br />Neither one was good enough.
        </h2>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {/* Left: Matterport */}
          <article className="rounded-xl border border-slate-200 bg-white p-7">
            <Tag color="red">Too slow. Too expensive.</Tag>
            <h3 className="mb-3 mt-3 text-[17px] font-bold tracking-tight text-ink">Matterport</h3>
            <p className="mb-5 text-sm leading-[1.65] text-slate-600">
              The gold standard — if you have $309/month, dedicated hardware, and three days to wait for a contractor. Great for large brokerages with marketing budgets. A non-starter for the listing you need to show tomorrow.
            </p>
            <div className="flex flex-col gap-2">
              <CheckItem ok={false}>Requires specialist hardware or contractor</CheckItem>
              <CheckItem ok={false}>$69–$309/month before per-scan fees</CheckItem>
              <CheckItem ok={false}>3–5 day turnaround — too slow for an active market</CheckItem>
              <CheckItem ok={false}>No AI layer — buyers still call you for basic questions</CheckItem>
              <CheckItem ok={false}>No redesign — buyers see staging, not their life</CheckItem>
            </div>
          </article>

          {/* Center: SynergySo (hero) */}
          <article className="relative -translate-y-0 rounded-xl border-2 border-accent bg-ink p-7 md:-translate-y-2">
            <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
              Built for the working agent
            </div>
            <div className="mt-2">
              <Tag color="purple">The full stack solution</Tag>
            </div>
            <h3 className="mb-3 mt-3 text-[17px] font-bold tracking-tight text-white">SynergySo</h3>
            <p className="mb-5 text-sm leading-[1.65] text-white/50">
              The showing experience your buyers need — captured by you, on your phone, in 15 minutes. Shared as a link. Explored like they&apos;re standing inside.
            </p>
            <div className="flex flex-col gap-2">
              <CheckItem ok={true} dark>Phone only — iPhone or Android, no extras</CheckItem>
              <CheckItem ok={true} dark>15 minutes to capture any property</CheckItem>
              <CheckItem ok={true} dark>Shareable link — opens in any browser, nothing to download</CheckItem>
              <CheckItem ok={true} dark>AI Q&amp;A — buyers get answers day or night</CheckItem>
              <CheckItem ok={true} dark>In-tour buyer call — one tap to reach you</CheckItem>
              <CheckItem ok={true} dark>Redesign layer — walls, floors, furniture presets</CheckItem>
              <CheckItem ok={true} dark>Analytics — see who&apos;s serious before you call</CheckItem>
            </div>
          </article>

          {/* Right: Zillow */}
          <article className="rounded-xl border border-slate-200 bg-white p-7">
            <Tag color="amber">Free — but at a cost.</Tag>
            <h3 className="mb-3 mt-3 text-[17px] font-bold tracking-tight text-ink">Zillow 3D Home</h3>
            <p className="mb-5 text-sm leading-[1.65] text-slate-600">
              It works and it costs nothing. But the moment you use it, you&apos;ve handed your client relationship to Zillow&apos;s ecosystem. Your listing. Their platform. Their retargeting.
            </p>
            <div className="flex flex-col gap-2">
              <CheckItem ok={false}>360° photos — not true 3D navigation</CheckItem>
              <CheckItem ok={false}>Locked to Zillow — you don&apos;t own the tour</CheckItem>
              <CheckItem ok={false}>No AI Q&amp;A — buyers still wait for answers</CheckItem>
              <CheckItem ok={false}>No redesign layer</CheckItem>
              <CheckItem ok={false}>No agent analytics</CheckItem>
            </div>
          </article>
        </div>

        <div className="mt-9 rounded-lg border border-accent/12 bg-accent/5 px-6 py-4 text-[14px] italic leading-[1.65] text-slate-600">
          &ldquo;The presence of well-funded competitors isn&apos;t the problem. The gap between what they offer and what the working agent actually needs — that&apos;s the problem. That&apos;s what SynergySo closes.&rdquo;
        </div>
      </div>
    </section>
  );
}
