export default function ProblemComparisonSection() {
  return (
    <section id="problem" className="scroll-mt-28 border-y border-surface-variant bg-surface-container-low py-section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-on-background md:text-5xl">Two bad options. One real solution.</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Bad Option 1 */}
          <article className="rounded-2xl border border-red-100 bg-white p-8 opacity-80 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-600">
              <span className="material-symbols-outlined text-sm">close</span>
              Option 1: The Expensive Rig
            </div>
            <h3 className="mb-3 text-xl font-bold text-on-surface">Matterport</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Requires a $3,000+ camera, specialized training, and takes hours to scan a single property. Platform fees eat into your margins forever.
            </p>
          </article>

          {/* Solution */}
          <article className="relative -translate-y-0 rounded-2xl border-2 border-primary bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-on-primary">
              The SynergySo Way
            </div>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
              <span className="material-symbols-outlined text-sm">check</span>
              The Solution
            </div>
            <h3 className="mb-3 text-2xl font-bold text-on-surface">SynergySo App</h3>
            <p className="mb-6 text-on-surface">
              Use the LiDAR scanner already in your pocket. 15 minutes to scan, automated cloud processing, one simple link to share. Zero hardware costs.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">done</span>
                No equipment to buy
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">done</span>
                Zero training required
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">done</span>
                AI-enhanced tours included
              </li>
            </ul>
          </article>

          {/* Bad Option 2 */}
          <article className="rounded-2xl border border-red-100 bg-white p-8 opacity-80 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-600">
              <span className="material-symbols-outlined text-sm">close</span>
              Option 2: The Basic App
            </div>
            <h3 className="mb-3 text-xl font-bold text-on-surface">Zillow 3D Home</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Low quality stitched photos that distort dimensions. No measurement tools, no redesign options, and a clunky user experience for buyers.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
