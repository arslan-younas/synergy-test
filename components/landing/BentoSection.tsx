export default function BentoSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[120px]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <article className="flex flex-col">
            <div className="group relative mb-6 h-64 overflow-hidden rounded-xl">
              <img
                alt="Before and after virtual staging concept"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_dFUpglq1SGuE80RLE3ui7nIlC0Ql0SEtthG-qD5sO1l_WxgXxNj-BMv5p7X8F_7nrXqd3Kxn9V1Psyg2ZXd1E3Hwc2JvPMunybmS8Iek8S7puRcctd8Mx5zmJTTcGXwGd3tb1GFpve4xu11KLE4BSp00kxPN3v5KCRFvGogPtxtSnu3mNNLD2rvLMb5-yKDBfdU9kAZOuEXrBE5eHEf-NtANeXowpSgbYGi6gUV9zPmcGhYjmlQAPKOEtqRuQ56L9webIpclrvgy"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-6">
                <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-sm text-white backdrop-blur-sm">Virtual Staging Engine</span>
              </div>
            </div>
            <h3 className="mb-3 text-[32px] font-semibold text-[#191c1e]">Redesign Mode</h3>
            <p className="mb-4 text-[#4a4456]">
              Don&apos;t let an empty or outdated space kill the deal. Redesign Mode allows buyers to toggle virtual staging, swap out flooring materials, and visualize renovations instantly within the 3D tour.
            </p>
            <a href="#" className="mt-auto inline-flex items-center font-semibold text-[#6500e1] hover:underline">Explore Redesign Mode <span className="ml-1">→</span></a>
          </article>

          <article className="flex flex-col">
            <div className="group relative mb-6 flex h-64 items-center justify-center rounded-xl border border-[#e1e2e4] bg-[#edeef0] p-8">
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-[#e1e2e4]/70 bg-white p-4 shadow-sm transition-transform duration-700 group-hover:scale-105">
                <div className="flex items-center justify-between border-b border-[#e1e2e4] pb-2">
                  <div className="h-3 w-24 rounded bg-[#e1e2e4]" />
                  <div className="h-3 w-8 rounded bg-[#6500e1]/20" />
                </div>
                <div className="mt-2 flex gap-4">
                  <div className="flex h-20 w-1/3 flex-col justify-end rounded-md border border-[#6500e1]/10 bg-[#6500e1]/5 p-2">
                    <div className="h-1/2 w-full rounded-sm bg-[#6500e1]/20" />
                  </div>
                  <div className="flex h-20 w-2/3 flex-col gap-2 rounded-md border border-[#e1e2e4]/50 bg-[#f2f4f6] p-2">
                    <div className="h-2 w-3/4 rounded bg-[#e1e2e4]" />
                    <div className="h-2 w-1/2 rounded bg-[#e1e2e4]" />
                    <div className="h-2 w-5/6 rounded bg-[#e1e2e4]" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#6500e1]/20 bg-[#6500e1]/10 text-[#6500e1]">
                  ▦
                </div>
              </div>
            </div>
            <h3 className="mb-3 text-[32px] font-semibold text-[#191c1e]">Intelligence Command Center</h3>
            <p className="mb-4 text-[#4a4456]">
              A centralized dashboard for brokers and agents. Track aggregate engagement metrics across all your active listings. Identify bottlenecks, measure marketing ROI, and prioritize leads based on actual tour behavior.
            </p>
            <a href="#" className="mt-auto inline-flex items-center font-semibold text-[#6500e1] hover:underline">View Agent Dashboard <span className="ml-1">→</span></a>
          </article>
        </div>
      </div>
    </section>
  );
}
