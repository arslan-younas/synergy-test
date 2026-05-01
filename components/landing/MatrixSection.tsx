type Status = "yes" | "no";

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes") {
    return <span className="material-symbols-outlined text-2xl font-bold text-green-500">check</span>;
  }
  if (status === "no") {
    return <span className="material-symbols-outlined text-2xl font-bold text-red-400">close</span>;
  }
}

const MATRIX_ROWS: Array<
  | {
      feature: string;
      kind: "text";
      synergy: string;
      matterport: string;
      zillow: string;
    }
  | {
      feature: string;
      kind: "status";
      synergy: Status;
      matterport: Status;
      zillow: Status;
    }
> = [
  {
    feature: "Hardware Required",
    kind: "text",
    synergy: "Smartphone Only",
    matterport: "$3k+ Camera",
    zillow: "Smartphone",
  },
  {
    feature: "AI Q&A Agent",
    kind: "status",
    synergy: "yes",
    matterport: "no",
    zillow: "no",
  },
  {
    feature: "Virtual Staging",
    kind: "text",
    synergy: "yes",
    matterport: "Expensive Add-on",
    zillow: "no",
  },
  {
    feature: "Processing Time",
    kind: "text",
    synergy: "< 15 mins",
    matterport: "24-48 hours",
    zillow: "Hours",
  },
  {
    feature: "Platform Fee",
    kind: "text",
    synergy: "$0 (Flat subscription)",
    matterport: "Per-model hosting fees",
    zillow: "Free (but limited use)",
  },
];

export default function MatrixSection() {
  return (
    <section id="compare" className="scroll-mt-28 border-y border-surface-variant bg-surface-container-low py-section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-on-background md:text-5xl">How we stack up</h2>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-surface-variant bg-white shadow-sm">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-surface-variant bg-surface-container-lowest">
                <th className="w-1/4 rounded-tl-2xl px-6 py-5 font-display text-lg font-semibold text-on-background">Feature</th>
                <th className="w-1/4 border-x border-primary/10 bg-primary/5 px-6 py-5 font-display text-lg font-semibold text-primary">SynergySo</th>
                <th className="w-1/4 px-6 py-5 font-display text-lg font-semibold text-on-surface-variant">Matterport</th>
                <th className="w-1/4 rounded-tr-2xl px-6 py-5 font-display text-lg font-semibold text-on-surface-variant">Zillow 3D</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((row, i) => {
                const isLast = i === MATRIX_ROWS.length - 1;
                return (
                  <tr key={row.feature} className="border-b border-surface-variant last:border-b-0">
                    <th scope="row" className={`px-6 py-5 text-sm font-semibold text-on-surface ${isLast ? "rounded-bl-2xl" : ""}`}>
                      {row.feature}
                    </th>
                    <td className="border-x border-primary/10 bg-primary/5 px-6 py-5 text-sm font-medium text-primary">
                      {row.kind === "text" ? (
                        row.synergy === "yes" ? (
                          <StatusIcon status="yes" />
                        ) : (
                          row.synergy
                        )
                      ) : (
                        <StatusIcon status={row.synergy} />
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {row.kind === "text" ? (
                        row.matterport === "no" ? (
                          <StatusIcon status="no" />
                        ) : (
                          row.matterport
                        )
                      ) : (
                        <StatusIcon status={row.matterport} />
                      )}
                    </td>
                    <td className={`px-6 py-5 text-sm text-slate-500 ${isLast ? "rounded-br-2xl" : ""}`}>
                      {row.kind === "text" ? (row.zillow === "no" ? <StatusIcon status="no" /> : row.zillow) : <StatusIcon status={row.zillow} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
