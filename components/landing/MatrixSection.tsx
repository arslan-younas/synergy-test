export default function MatrixSection() {
  return (
    <section id="matrix" className="relative px-6 py-[70px] lg:px-[52px] lg:py-[120px]">
      <div className="mb-5 text-center">
        <span className="mb-4 inline-block rounded-full border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.08)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-violet">
          Competitive landscape
        </span>
        <h2 className="mb-3 font-serif text-[clamp(32px,3.8vw,48px)] font-medium tracking-tight">Full Competitive Matrix</h2>
        <p className="mx-auto mb-10 max-w-[640px] text-[14px] leading-relaxed text-black/60">
          We audited every major player in 3D real-estate tooling. Every one is missing at least two of our five differentiators. Most are missing three or four.
        </p>
      </div>

      <div className="mx-auto max-w-[1100px] overflow-x-auto rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel backdrop-blur-md">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="border-b border-black/10">
              {[
                ["Feature", "text-black/80"],
                ["SynergySo", "text-brand-violet"],
                ["Matterport", "text-black/45"],
                ["Zillow 3D Home", "text-black/45"],
                ["Sphere.app", "text-black/45"],
              ].map(([label, cls]) => (
                <th key={label as string} className={`border-b border-black/10 px-7 py-6 text-left font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${cls}`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {[
              ["Capture Time", "15–20 Mins", "2–4 Hours", "30–60 Mins", "~20 Mins"],
              ["Hardware Cost", "$0 (iPhone)", "$3,500+", "$300 (Ricoh)", "$0 (iPhone)"],
              ["AI Property Q&A", "Yes", "No", "No", "Partial"],
              ["Interactive Design Mode", "Yes", "No", "No", "Partial"],
              ["Buyer Friction", "Zero (Web-link)", "High (Loading)", "Medium (Zillow App)", "Low (Web-link)"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-black/10 last:border-b-0 hover:bg-[rgba(167,139,250,0.06)]">
                <td className="px-7 py-6 font-medium text-brand-text">{row[0]}</td>
                <td className="bg-[rgba(167,139,250,0.08)] px-7 py-6 font-medium text-brand-violet">{row[1]}</td>
                <td className="px-7 py-6 text-black/50">{row[2]}</td>
                <td className="px-7 py-6 text-black/50">{row[3]}</td>
                <td className="px-7 py-6 text-black/50">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
