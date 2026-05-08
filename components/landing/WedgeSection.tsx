const DIFF_ITEMS = [
  {
    title: "Phone only",
    tag: "No hardware to buy. No contractor to book.",
    body: "Walk the property with the iPhone in your pocket. LiDAR on Pro models, photogrammetry on everything else. The tour builds as you walk. Done before you leave the building.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
  },
  {
    title: "Shareable link",
    tag: "One link. That's the entire buyer experience.",
    body: "Text it, email it, WhatsApp it. Your buyer opens it in Safari or Chrome. No download. No account. No friction. In the tour in three seconds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "AI Q&A",
    tag: "Your buyers get answers at 11pm. You don't have to be awake.",
    body: "The AI answers using real spatial data and your listing details. Every answer is logged so you know exactly what your buyer cares about most.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "In-tour call",
    tag: "The warmest inbound call you'll take all week.",
    body: "One tap. You pick up knowing the property, which rooms they lingered in, how long they've explored. Not a cold call — a closing conversation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Analytics",
    tag: "See exactly who's serious before you follow up.",
    body: "Opens, time per room, AI questions, call activity. You follow up with context — not cold. Know who's serious before you pick up the phone.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
] as const;

export default function WedgeSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-ink px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          5 non-negotiable differentiators
        </span>
        <h2 className="mb-12 max-w-[640px] font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-white">
          Everything built around one idea: show the property to anyone, from anywhere, in a way that closes.
        </h2>

        {/* 5-col grid with gap lines */}
        <div className="grid grid-cols-1 gap-px bg-white/6 sm:grid-cols-2 lg:grid-cols-5" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
          {DIFF_ITEMS.map(({ title, tag, body, icon }) => (
            <div
              key={title}
              className="group bg-ink px-5 py-7 transition-colors duration-150 hover:bg-accent/6"
            >
              <div className="mb-4 text-accent-light">{icon}</div>
              <div className="mb-2 text-base font-bold text-white">{title}</div>
              <div className="mb-3 font-mono text-xs leading-normal text-accent-light">{tag}</div>
              <p className="text-sm leading-[1.7] text-white/38">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
