const COMPARE_CARDS = [
  {
    price: "$350",
    title: "Matterport + contractor",
    description:
      "2-4 day turnaround • $3,500+ camera or monthly fees • not sustainable on listings under $1M",
    highlight: false,
  },
  {
    price: "Free",
    title: "Zillow 3D Home",
    description:
      "Locked to Zillow's ecosystem • no AI layer • modest quality • zero agent analytics",
    highlight: false,
  },
  {
    price: "$29/mo",
    title: "SynergySo",
    description:
      "Phone-only • 15-min capture • AI Q&A • redesign layer • works on every listing • agent-owned",
    highlight: true,
  },
] as const;

const PAIN_POINTS = [
  {
    n: "1",
    title: "Remote buyers are everywhere",
    body: "Post-pandemic, relocating and time-constrained buyers are a growing share of every transaction. A Zillow gallery isn't enough to commit.",
  },
  {
    n: "2",
    title: "2D photos hide what matters",
    body: "Spatial feel, adjacent natural light, actual dimensions — photos can't convey any of it. Buyers text. You answer a day later.",
  },
  {
    n: "3",
    title: "The hardware exists. The product doesn't.",
    body: "Every iPhone Pro since 2020 has LiDAR. Every browser renders WebGL. LLMs answer spatial questions. Nobody combined them — until now.",
  },
] as const;

const cardBase =
  "rounded-xl border border-[#E9E4FF] bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] transition hover:shadow-[0px_8px_30px_rgba(127,51,255,0.08)]";

export default function ProblemComparisonSection() {
  return (
    <section id="problem" className="mx-auto max-w-[1280px] bg-[#f8f9fb] px-6 py-[120px] md:px-12">
      <div className="mb-14 mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#191c1e]">
          Two bad options.
          <br />
          <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text font-semibold italic text-transparent">
            One real solution.
          </em>
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className="flex flex-col gap-4">
          {COMPARE_CARDS.map((card) => (
            <article
              key={card.title}
              className={
                card.highlight
                  ? `${cardBase} border-[#6500e1]/35 bg-gradient-to-br from-[rgba(101,0,225,0.08)] to-white shadow-[0px_8px_32px_rgba(101,0,225,0.12)]`
                  : cardBase
              }
            >
              <div className="mb-3 flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#191c1e]">{card.price}</span>
                <h3 className="text-lg font-semibold text-[#191c1e]">{card.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#4a4456]">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-12 lg:gap-14">
          {PAIN_POINTS.map(({ n, title, body }) => (
            <div key={n} className="flex gap-5">
              <span className="shrink-0 pt-0.5 font-serif text-4xl font-bold tabular-nums text-[#6500e1]/35 md:text-5xl">
                {n}
              </span>
              <div className="min-w-0">
                <h3 className="mb-2 text-xl font-semibold text-[#191c1e]">{title}</h3>
                <p className="max-w-xl text-[17px] leading-relaxed text-[#4a4456]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
