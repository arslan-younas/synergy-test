export default function BentoSection() {
  return (
    <section id="bento" className="scroll-mt-28 border-y border-surface-variant bg-surface-container-low py-section-padding">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 space-y-2 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-on-background md:text-5xl">Five steps. Fifteen minutes.</h2>
          <p className="mx-auto max-w-2xl text-on-surface-variant">
            A seamless pipeline from physical space to digital twin, engineered for speed and clarity.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-6 md:grid-cols-3">
          {/* 01 */}
          <article className="group flex flex-col justify-between rounded-2xl border border-[#E9E4FF] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-primary">view_in_ar</span>
            </div>
            <div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-on-surface">01. Open &amp; Walk</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Utilize built-in LiDAR technology to capture millions of data points per second simply by walking through the property.
              </p>
            </div>
          </article>

          {/* 02 spans 2 cols */}
          <article className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-[#E9E4FF] bg-white p-8 shadow-sm md:col-span-2">
            <div className="relative z-10 max-w-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-primary">memory</span>
              </div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-on-surface">02. Process &amp; Tag</h3>
              <p className="leading-relaxed text-on-surface-variant">
                Our secure cloud servers automatically stitch the data into a seamless 3D model, generating accurate floorplans and identifying key architectural
                features autonomously.
              </p>
            </div>
            <div className="pointer-events-none absolute -right-[10%] -top-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(127,51,255,0.08)_0%,transparent_70%)]" />
          </article>

          {/* 03 */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#E9E4FF] bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-primary">link</span>
            </div>
            <div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-on-surface">03. Share One Link</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Instantly generate a universal web link. Buyers explore the property in high-resolution directly from their browser—no app installations required.
              </p>
            </div>
          </article>

          {/* 04 */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#E9E4FF] bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-primary">forum</span>
            </div>
            <div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-on-surface">04. Buyer Explores</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Interactive AI embedded within the tour answers specific spatial questions in real-time, keeping buyers engaged.
              </p>
            </div>
          </article>

          {/* 05 */}
          <article className="flex flex-col justify-between rounded-2xl bg-primary p-8 text-on-primary shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-on-primary">monitoring</span>
            </div>
            <div>
              <h3 className="mb-2 font-display text-2xl font-semibold">05. Close Smarter</h3>
              <p className="text-sm leading-relaxed text-on-primary/90">
                Access deep analytics on buyer behavior. Know exactly which rooms captured the most attention to tailor your follow-up strategy.
              </p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
