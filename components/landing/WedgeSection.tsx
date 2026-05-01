const WEDGE_ITEMS = [
  {
    icon: "smartphone",
    title: "Phone Only",
    description: "Your iPhone is your scanner. No rigs.",
  },
  {
    icon: "timer",
    title: "Self-Serve",
    description: "Scan to share in under 20 mins.",
  },
  {
    icon: "forum",
    title: "AI Q&A",
    description: "Answers buyer questions instantly.",
  },
  {
    icon: "architecture",
    title: "Redesign",
    description: "Swap materials and stage virtually.",
  },
  {
    icon: "link",
    title: "Frictionless",
    description: "One web link. No apps needed.",
  },
] as const;

export default function WedgeSection() {
  return (
    <section id="wedge" className="scroll-mt-28 mx-auto max-w-7xl px-6 py-section-padding">
      <div className="mb-16 text-center">
        <span className="mb-4 block font-display text-sm font-semibold uppercase tracking-widest text-primary">The SynergySo Edge</span>
        <h2 className="font-display text-4xl font-bold tracking-tight text-on-background md:text-5xl">5 Non-Negotiable Differentiators</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        {WEDGE_ITEMS.map(({ icon, title, description }) => (
          <article
            key={title}
            className="rounded-2xl border border-surface-variant bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
              <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-on-surface">{title}</h3>
            <p className="text-sm leading-relaxed text-on-surface-variant">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
