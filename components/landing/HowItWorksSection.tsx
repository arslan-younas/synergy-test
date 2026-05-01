export default function HowItWorksSection() {
  return (
    <section id="workflow" className="scroll-mt-28 mx-auto max-w-[1280px] bg-[#f8f9fb] px-6 py-[120px]">
      <div className="mb-16 space-y-2 text-center">
        <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.02em] text-[#191c1e]">The SynergySo Workflow</h2>
        <p className="mx-auto max-w-2xl text-[#4a4456]">
          A seamless pipeline from physical space to digital twin, engineered for speed and clarity.
        </p>
      </div>
      <div className="grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-3">
        <article className="row-span-1 flex flex-col justify-between rounded-xl border border-[#E9E4FF] bg-white p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] transition hover:shadow-[0px_8px_30px_rgba(127,51,255,0.08)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6500e1]/10 text-[#6500e1]">◉</div>
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-[#191c1e]">1. Open &amp; Walk</h3>
            <p className="text-sm text-[#4a4456]">
              Utilize built-in LiDAR technology to capture millions of data points per second simply by walking through the property.
            </p>
          </div>
        </article>

        <article className="relative row-span-1 flex flex-col justify-center overflow-hidden rounded-xl border border-[#E9E4FF] bg-white p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] md:col-span-2">
          <div className="relative z-10 max-w-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6500e1]/10 text-[#6500e1]">◎</div>
            <h3 className="mb-2 text-2xl font-semibold text-[#191c1e]">2. Process &amp; Tag</h3>
            <p className="text-[#4a4456]">
              Our secure cloud servers automatically stitch the data into a seamless 3D model, generating accurate floorplans and identifying key architectural
              features autonomously.
            </p>
          </div>
          <div className="absolute right-[-10%] top-[-20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(127,51,255,0.1)_0%,transparent_70%)]" />
        </article>

        <article className="row-span-1 flex flex-col justify-between rounded-xl border border-[#E9E4FF] bg-white p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6500e1]/10 text-[#6500e1]">↗</div>
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-[#191c1e]">3. Share One Link</h3>
            <p className="text-sm text-[#4a4456]">
              Instantly generate a universal web link. Buyers explore the property in high-resolution directly from their browser—no app installations required.
            </p>
          </div>
        </article>

        <article className="row-span-1 flex flex-col justify-between rounded-xl border border-[#E9E4FF] bg-white p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6500e1]/10 text-[#6500e1]">✦</div>
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-[#191c1e]">4. Buyer Explores</h3>
            <p className="text-sm text-[#4a4456]">
              Interactive AI embedded within the tour answers specific spatial questions in real-time, keeping buyers engaged.
            </p>
          </div>
        </article>

        <article className="row-span-1 flex flex-col justify-between rounded-xl bg-[#6500e1] p-8 text-white shadow-[0px_10px_30px_rgba(101,0,225,0.3)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">✓</div>
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-white">5. Close Smarter</h3>
            <p className="text-sm text-white/90">
              Access deep analytics on buyer behavior. Know exactly which rooms captured the most attention to tailor your follow-up strategy.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
