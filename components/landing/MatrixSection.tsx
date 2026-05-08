function Yes() {
  return <span className="text-base text-green-600">✓</span>;
}
function No() {
  return <span className="text-base text-red-500">✗</span>;
}
function Part() {
  return <span className="text-sm text-amber-600">~</span>;
}

const ROWS: Array<{
  feature: string;
  synergy: React.ReactNode;
  matterport: React.ReactNode;
  zillow: React.ReactNode;
  giraffe: React.ReactNode;
}> = [
  {
    feature: "Phone-only capture",
    synergy: <Yes />,
    matterport: <Part />,
    zillow: <Yes />,
    giraffe: <No />,
  },
  {
    feature: "True 3D navigation",
    synergy: <Yes />,
    matterport: <Yes />,
    zillow: <No />,
    giraffe: <Yes />,
  },
  {
    feature: "AI Q&A in tour",
    synergy: <Yes />,
    matterport: <No />,
    zillow: <No />,
    giraffe: <No />,
  },
  {
    feature: "In-tour buyer call",
    synergy: <Yes />,
    matterport: <No />,
    zillow: <No />,
    giraffe: <No />,
  },
  {
    feature: "Redesign layer",
    synergy: <Yes />,
    matterport: <No />,
    zillow: <No />,
    giraffe: <No />,
  },
  {
    feature: "No buyer app needed",
    synergy: <Yes />,
    matterport: <Yes />,
    zillow: <No />,
    giraffe: <Yes />,
  },
  {
    feature: "Agent analytics",
    synergy: <Yes />,
    matterport: <Part />,
    zillow: <No />,
    giraffe: <No />,
  },
  {
    feature: "Price / month",
    synergy: <span className="font-mono text-[12px] text-slate-600">$29–$49</span>,
    matterport: <span className="font-mono text-[12px] text-slate-500">$69–$309</span>,
    zillow: <span className="font-mono text-[12px] text-slate-500">Free*</span>,
    giraffe: <span className="font-mono text-[12px] text-slate-500">~$149</span>,
  },
];

export default function MatrixSection() {
  return (
    <section id="compare" className="scroll-mt-20 border-t border-slate-200 bg-light-1 px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          How we stack up
        </span>
        <h2 className="mb-3 font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-ink">
          The only tool with the full stack.
        </h2>
        <p className="mb-10 max-w-[580px] text-base leading-[1.75] text-slate-600">
          Every competitor is missing at least two of SynergySo&apos;s five core differentiators. Most are missing three or four.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-xl border border-slate-200 bg-white">
            <thead>
              <tr className="bg-ink">
                <th className="rounded-tl-xl px-[18px] py-3.5 text-left font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">Feature</th>
                <th className="border-x border-x-accent/20 bg-accent/8 px-[18px] py-3.5 text-center text-[13px] font-semibold text-accent-light">SynergySo</th>
                <th className="px-[18px] py-3.5 text-center text-[13px] font-semibold text-white/40">Matterport</th>
                <th className="px-[18px] py-3.5 text-center text-[13px] font-semibold text-white/40">Zillow 3D</th>
                <th className="rounded-tr-xl px-[18px] py-3.5 text-center text-[13px] font-semibold text-white/40">Giraffe360</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 1 ? "bg-slate-50/60" : ""}>
                  <td className="border-t border-slate-100 px-[18px] py-3 text-[13px] font-medium text-slate-700">
                    {row.feature}
                  </td>
                  <td className="border-x border-x-accent/10 border-t border-slate-100 bg-accent/3 px-[18px] py-3 text-center">
                    {row.synergy}
                  </td>
                  <td className="border-t border-slate-100 px-[18px] py-3 text-center">{row.matterport}</td>
                  <td className="border-t border-slate-100 px-[18px] py-3 text-center">{row.zillow}</td>
                  <td className="border-t border-slate-100 px-[18px] py-3 text-center">{row.giraffe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3.5 text-[12px] italic text-slate-500">
          * Zillow 3D is free — but your client relationship belongs to Zillow. &nbsp;|&nbsp; Matterport is the category benchmark for enterprise. SynergySo is for the agent who needs to show a property tomorrow.
        </p>
      </div>
    </section>
  );
}
