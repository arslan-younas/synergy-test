type Status = "yes" | "no" | "partial";

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes") {
    return (
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-base font-semibold text-emerald-600 ring-1 ring-emerald-600/15"
        title="Included"
      >
        ✓
      </span>
    );
  }
  if (status === "no") {
    return (
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-base font-semibold text-rose-500 ring-1 ring-rose-500/15"
        title="Not included"
      >
        ✕
      </span>
    );
  }
  return (
    <span
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-base font-semibold text-amber-600 ring-1 ring-amber-500/20"
      title="Partial"
    >
      ◐
    </span>
  );
}

const MATRIX_ROWS: Array<
  | {
      feature: string;
      kind: "text";
      synergy: string;
      matterport: string;
      zillow: string;
      sphere: string;
    }
  | {
      feature: string;
      kind: "status";
      synergy: Status;
      matterport: Status;
      zillow: Status;
      sphere: Status;
    }
> = [
  {
    feature: "Capture Time",
    kind: "text",
    synergy: "15–20 Mins",
    matterport: "2–4 Hours",
    zillow: "30–60 Mins",
    sphere: "~20 Mins",
  },
  {
    feature: "Hardware Cost",
    kind: "text",
    synergy: "$0 (iPhone)",
    matterport: "$3,500+",
    zillow: "$300 (Ricoh)",
    sphere: "$0 (iPhone)",
  },
  {
    feature: "AI Property Q&A",
    kind: "status",
    synergy: "yes",
    matterport: "no",
    zillow: "no",
    sphere: "partial",
  },
  {
    feature: "Interactive Design Mode",
    kind: "status",
    synergy: "yes",
    matterport: "no",
    zillow: "no",
    sphere: "partial",
  },
  {
    feature: "Buyer Friction",
    kind: "text",
    synergy: "Zero (Web-link)",
    matterport: "High (Loading)",
    zillow: "Medium (Zillow App)",
    sphere: "Low (Web-link)",
  },
];

export default function MatrixSection() {
  return (
    <section id="compare" className="scroll-mt-28 px-6 py-[120px] md:px-12">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.02em] text-[#191c1e]">
            Full Competitive Matrix
          </h2>
          <p className="mx-auto max-w-[640px] text-[17px] leading-relaxed text-[#4a4456]">
            We audited every major player in 3D real-estate tooling. Every one is missing at least two of our five differentiators. Most are missing three or four.
          </p>
        </header>

        <div className="relative rounded-2xl border border-[#E9E4FF] bg-[#fafafa] p-1 shadow-[0px_12px_40px_-12px_rgba(101,0,225,0.12)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6500e1]/25 to-transparent" />
          <div className="relative overflow-x-auto rounded-[14px]">
            <table className="w-full min-w-[720px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-20 whitespace-nowrap border-b border-[#E9E4FF] bg-white px-4 py-5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4a4456] sm:px-6 md:rounded-tl-xl md:px-8"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="border-b border-[#6500e1]/25 bg-[#6500e1]/[0.09] px-4 py-5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6500e1] sm:px-6 md:px-8"
                  >
                    SynergySo
                  </th>
                  <th
                    scope="col"
                    className="border-b border-[#E9E4FF] bg-white px-4 py-5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4a4456] sm:px-6 md:px-8"
                  >
                    Matterport
                  </th>
                  <th
                    scope="col"
                    className="border-b border-[#E9E4FF] bg-white px-4 py-5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4a4456] sm:px-6 md:px-8"
                  >
                    Zillow 3D Home
                  </th>
                  <th
                    scope="col"
                    className="border-b border-[#E9E4FF] bg-white px-4 py-5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4a4456] sm:px-6 md:rounded-tr-xl md:px-8"
                  >
                    Sphere.app
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {MATRIX_ROWS.map((row, i) => {
                  const isLast = i === MATRIX_ROWS.length - 1;
                  const bottomRadius = isLast ? "md:rounded-bl-xl md:rounded-br-xl" : "";
                  return (
                    <tr key={row.feature} className="group transition-colors hover:bg-[#6500e1]/[0.03]">
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 border-b border-[#E9E4FF] bg-white px-4 py-5 text-left font-semibold text-[#191c1e] shadow-[4px_0_12px_-8px_rgba(0,0,0,0.06)] group-hover:bg-[#fafafa] sm:px-6 md:px-8 ${isLast ? "md:rounded-bl-xl border-b-0" : ""}`}
                      >
                        {row.feature}
                      </th>
                      <td
                        className={`border-b border-[#6500e1]/15 bg-[#6500e1]/[0.06] px-4 py-5 font-semibold text-[#6500e1] sm:px-6 md:px-8 ${isLast ? "border-b-0 md:rounded-br-none" : ""}`}
                      >
                        {row.kind === "text" ? (
                          row.synergy
                        ) : (
                          <StatusIcon status={row.synergy} />
                        )}
                      </td>
                      <td
                        className={`border-b border-[#E9E4FF] bg-white px-4 py-5 text-[#4a4456] sm:px-6 md:px-8 ${isLast ? "border-b-0" : ""}`}
                      >
                        {row.kind === "text" ? row.matterport : <StatusIcon status={row.matterport} />}
                      </td>
                      <td
                        className={`border-b border-[#E9E4FF] bg-white px-4 py-5 text-[#4a4456] sm:px-6 md:px-8 ${isLast ? "border-b-0" : ""}`}
                      >
                        {row.kind === "text" ? row.zillow : <StatusIcon status={row.zillow} />}
                      </td>
                      <td
                        className={`border-b border-[#E9E4FF] bg-white px-4 py-5 text-[#4a4456] sm:px-6 md:px-8 ${isLast ? `border-b-0 ${bottomRadius}` : ""}`}
                      >
                        {row.kind === "text" ? row.sphere : <StatusIcon status={row.sphere} />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="border-t border-[#E9E4FF] bg-white px-4 py-3 text-center text-xs text-[#4a4456]/80 md:rounded-b-xl lg:hidden">
            Scroll horizontally to see all vendors.
          </p>
        </div>
      </div>
    </section>
  );
}
