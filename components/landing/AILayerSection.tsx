export default function AILayerSection() {
  return (
    <section id="ai" className="mx-auto max-w-7xl px-6 py-section-padding">
      <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-inverse-surface text-inverse-on-surface shadow-2xl lg:flex-row">
        <div className="flex flex-col justify-center p-12 lg:w-1/2 lg:p-16">
          <div className="mb-6 inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-inverse-primary">
            <span className="material-symbols-outlined text-base">smart_toy</span>
            Semantic Tour Intelligence
          </div>
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Conversational AI.
            <br />
            Built into the walls.
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-300">
            The tour doesn&apos;t just show the space; it understands it. Buyers can ask spatial and dimensional questions naturally, and our AI, powered by the
            LiDAR data, provides instant, accurate answers.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300">
              <span className="material-symbols-outlined mt-0.5 text-inverse-primary">check_circle</span>
              <span>Instant dimensional verification</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <span className="material-symbols-outlined mt-0.5 text-inverse-primary">check_circle</span>
              <span>Material and appliance identification</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <span className="material-symbols-outlined mt-0.5 text-inverse-primary">check_circle</span>
              <span>Keeps buyers engaged, not guessing</span>
            </li>
          </ul>
        </div>
        <div className="relative flex min-h-[500px] flex-1 items-center justify-center bg-slate-900 p-8 lg:p-12">
          <div className="absolute inset-0 opacity-40">
            <img
              alt="Digital twin room background"
              className="h-full w-full object-cover opacity-50 mix-blend-luminosity grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXi6FntxPkV4NP3PwoLmTtbtnl-JUk-i6p7plytTpKZnjd2DnCCVUwl7NNzbtQHr4h5h-9_TzHD50zt298iNS5Gv8DbYkLbmDgUSOVdS4_sK3LOfyjLo40Jxa9daVeVdTlTNI0mlOh4DLMz8k7on8SzaH87RaHHDrtNJk3oyUT16hX78zskrL-dZec1qmGX2nVfg4Xge8fFaV_lh1oVmr2wAW_zxYjYYuhgSjJ_kfqERx37BkgcjGvTims4OZGDugz_v_Amy_BpI8"
            />
          </div>
          <div className="relative z-10 w-full max-w-sm space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
            <div className="flex justify-end gap-3">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-white p-3 font-sans text-sm text-slate-900 shadow-sm">
                Could my 110&quot; sectional fit along that back window wall?
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                <span className="material-symbols-outlined text-sm text-slate-500">person</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <span className="material-symbols-outlined text-sm text-on-primary">architecture</span>
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-800 p-3 font-sans text-sm text-white shadow-sm">
                Yes. The wall below the window measures <strong>134 inches</strong> in width and 36 inches in height to the sill. Your 110&quot; sectional will fit
                comfortably with 24 inches of clearance remaining.
                <div className="mt-2 cursor-pointer text-xs font-medium text-inverse-primary hover:underline">Show measurement in tour</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
