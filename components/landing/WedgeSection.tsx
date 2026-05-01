const WEDGE_ITEMS = [
  {
    icon: "◈",
    title: "Phone-only capture",
    description:
      "Ditch the $4k Matterport cameras. SynergySo uses the LiDAR you already carry in your pocket.",
  },
  {
    icon: "★",
    title: "Self-serve, instant",
    description:
      "Don't wait for a technician. Agents scan a full home in 15 minutes and go live instantly.",
  },
  {
    icon: "❝",
    title: "AI Q&A Inside",
    description:
      'Tours that talk back. Buyers ask "Is this wall load-bearing?" and get instant data-backed answers.',
  },
  {
    icon: "⌂",
    title: "Light redesign layer",
    description:
      "Buyers swap floor materials, wall colors, and virtual furniture in real-time — visionary intelligence at play.",
  },
  {
    icon: "✓",
    title: "Zero Buyer Friction",
    description:
      "No apps. No logins. One link sent via text opens the entire 3D world in any mobile browser.",
  },
  {
    icon: "A",
    title: "Buyer Analytics",
    description:
      "Dashboard shows which rooms they lingered in and what questions they asked — intel for the offer.",
  },
] as const;

const cardClass =
  "flex flex-col rounded-xl border border-[#E9E4FF] bg-white p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] transition hover:shadow-[0px_8px_30px_rgba(127,51,255,0.08)]";

export default function WedgeSection() {
  return (
    <section id="wedge" className="scroll-mt-28 mx-auto max-w-[1280px] px-6 py-[120px] md:px-12">
      <div className="mb-16 space-y-3 text-center">
        <h2 className="font-serif text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.02em] text-[#191c1e]">
          THE WEDGE
        </h2>
        <p className="mx-auto max-w-2xl text-[#4a4456]">
          5 Non-Negotiable Differentiators defining the new market standard.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WEDGE_ITEMS.map(({ icon, title, description }) => (
          <article key={title} className={cardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6500e1]/10 text-lg font-semibold text-[#6500e1]">
              {icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-[#191c1e]">{title}</h3>
            <p className="text-sm leading-relaxed text-[#4a4456]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
