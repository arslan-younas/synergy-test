export default function AILayerSection() {
  return (
    <section id="ai" className="mx-auto max-w-[1280px] px-6 py-[120px]">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#2e3132] text-[#f0f1f3] shadow-2xl lg:flex-row">
        <div className="p-12 lg:w-1/2 lg:p-16">
          <div className="mb-6 inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-[#d2bcff]">
            <span>◉</span> Semantic Tour Intelligence
          </div>
          <h2 className="mb-6 text-[clamp(34px,4vw,50px)] font-bold leading-[1.2] text-white">
            Conversational AI.
            <br />
            Built into the walls.
          </h2>
          <p className="mb-8 text-[18px] leading-[1.6] text-slate-300">
            The tour doesn&apos;t just show the space; it understands it. Buyers can ask spatial and dimensional questions naturally, and our AI, powered by the LiDAR data,
            provides instant, accurate answers.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300"><span className="mt-0.5 text-[#d2bcff]">✓</span>Instant dimensional verification</li>
            <li className="flex items-start gap-3 text-slate-300"><span className="mt-0.5 text-[#d2bcff]">✓</span>Material and appliance identification</li>
            <li className="flex items-start gap-3 text-slate-300"><span className="mt-0.5 text-[#d2bcff]">✓</span>Keeps buyers engaged, not guessing</li>
          </ul>
        </div>
        <div className="relative flex min-h-[500px] items-center justify-center bg-slate-900 p-8 lg:w-1/2 lg:p-12">
          <div className="absolute inset-0 opacity-40">
            <img
              alt="Digital twin room background"
              className="h-full w-full object-cover opacity-50 mix-blend-luminosity grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXi6FntxPkV4NP3PwoLmTtbtnl-JUk-i6p7plytTpKZnjd2DnCCVUwl7NNzbtQHr4h5h-9_TzHD50zt298iNS5Gv8DbYkLbmDgUSOVdS4_sK3LOfyjLo40Jxa9daVeVdTlTNI0mlOh4DLMz8k7on8SzaH87RaHHDrtNJk3oyUT16hX78zskrL-dZec1qmGX2nVfg4Xge8fFaV_lh1oVmr2wAW_zxYjYYuhgSjJ_kfqERx37BkgcjGvTims4OZGDugz_v_Amy_BpI8"
            />
          </div>
          <div className="relative z-10 w-full max-w-sm space-y-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
            <div className="flex justify-end gap-3">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-white p-3 text-sm text-slate-900 shadow-sm">
                Could my 110&quot; sectional fit along that back window wall?
              </div>
            </div>
            <div className="flex gap-3">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-800 p-3 text-sm text-white shadow-sm">
                Yes. The wall below the window measures <strong>134 inches</strong> in width and 36 inches in height to the sill. Your 110&quot; sectional will fit comfortably
                with 24 inches of clearance remaining.
                <div className="mt-2 text-xs text-[#d2bcff]">Show measurement in tour</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
