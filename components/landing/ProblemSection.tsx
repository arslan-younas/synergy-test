import { revealX } from "./tw";

export default function ProblemSection() {
  return (
    <section id="problem" className="relative px-6 py-[70px] lg:px-[52px] lg:py-[120px]">
      <div className="mb-14 text-center">
        <span className="mb-3.5 inline-block rounded-full border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.08)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-violet">
          The problem
        </span>
        <h2 className="mt-4 font-serif text-[clamp(34px,4vw,54px)] font-normal leading-tight tracking-[-0.02em]">
          Two bad options.
          <br />
          <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text font-medium italic text-transparent">
            One real solution.
          </em>
        </h2>
      </div>
      <div className="mx-auto mt-[60px] grid max-w-[1200px] grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-[22px] rounded-xl border border-black/10 bg-gradient-to-br from-white to-brand-panel px-[26px] py-6 opacity-70 backdrop-blur-md">
            <div className="min-w-[120px] font-serif text-[40px] font-normal tracking-tighter line-through decoration-black/25">
              $350
            </div>
            <p className="text-[13px] leading-relaxed text-black/60">
              <strong className="mb-1 block text-sm font-medium text-brand-text">Matterport + contractor</strong>
              2–4 day turnaround · $3,500+ camera or monthly fees · not sustainable on listings under $1M
            </p>
          </div>
          <div className="flex items-center gap-[22px] rounded-xl border border-black/10 bg-gradient-to-br from-white to-brand-panel px-[26px] py-6 opacity-70 backdrop-blur-md">
            <div className="min-w-[120px] font-serif text-[40px] font-normal tracking-tighter line-through decoration-black/25">
              Free
            </div>
            <p className="text-[13px] leading-relaxed text-black/60">
              <strong className="mb-1 block text-sm font-medium text-brand-text">Zillow 3D Home</strong>
              Locked to Zillow&apos;s ecosystem · no AI layer · modest quality · zero agent analytics
            </p>
          </div>
          <div className="relative flex items-center gap-[22px] overflow-hidden rounded-xl border border-[rgba(167,139,250,0.45)] bg-gradient-to-br from-[rgba(167,139,250,0.1)] to-[rgba(167,139,250,0.02)] px-[26px] py-6 backdrop-blur-md before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-brand-violet">
            <div className="min-w-[120px] font-serif text-[40px] font-normal tracking-tighter text-brand-violet">
              $29<span className="text-xl text-black/55">/mo</span>
            </div>
            <p className="text-[13px] leading-relaxed text-black/60">
              <strong className="mb-1 block text-sm font-medium text-brand-violet">SynergySo</strong>
              Phone-only · 15-min capture · AI Q&A · redesign layer · works on every listing · agent-owned
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {[
            {
              n: "1",
              title: "Remote buyers are everywhere",
              body: "Post-pandemic, relocating and time-constrained buyers are a growing share of every transaction. A Zillow gallery isn't enough to commit.",
            },
            {
              n: "2",
              title: "2D photos hide what matters",
              body: "Spatial feel, adjacency, natural light, actual dimensions — photos can't convey any of it. Buyers text. You answer a day later.",
            },
            {
              n: "3",
              title: "The hardware exists. The product doesn't.",
              body: "Every iPhone Pro since 2020 has LiDAR. Every browser renders WebGL. LLMs answer spatial questions. Nobody combined them — until now.",
            },
          ].map((item) => (
            <div key={item.n} data-reveal className={`${revealX} flex gap-[22px]`}>
              <span className="min-w-[46px] font-serif text-[56px] font-normal leading-none tracking-tighter text-brand-violet/[0.22]">
                {item.n}
              </span>
              <div>
                <h3 className="mb-2 text-[17px] font-medium">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-black/60">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
