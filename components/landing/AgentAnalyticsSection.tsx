const METRICS = [
  {
    title: "Tour opens",
    body: "Who opened it, when, and how many times. A buyer who opens the same tour three times in two days is not a casual browser.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Time in tour",
    body: "How long each buyer spent — and whether they came back. Most serious buyers spend 8–12 minutes. Know who's done their homework.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Room breakdown",
    body: "Which rooms they returned to. Where they spent the most time. Where they dropped off. See what matters to them before you have the conversation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    title: "AI questions asked",
    body: "Every question they asked the AI — and how it was answered. A buyer asking about storage and ceiling height is already thinking about moving in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Redesign activity",
    body: "Which changes they made. What the room looked like when they finished. A buyer who redesigned the master bedroom is picturing their life there.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <path d="M17.5 21.5a6 6 0 0 0-11.83-1.5" />
        <circle cx="6.5" cy="17.5" r="2.5" />
        <path d="M8.5 14.5L15 8" />
      </svg>
    ),
  },
  {
    title: "Call initiated",
    body: "Whether they tapped \"Call Agent\" and at what point in the tour. The moment of the call tells you as much as the call itself.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
] as const;

export default function AgentAnalyticsSection() {
  return (
    <section className="border-t border-slate-200 bg-light-2 px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Your dashboard
        </span>
        <h2 className="mb-3 font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-ink">
          Know who&apos;s serious before you pick up the phone.
        </h2>
        <p className="mb-12 max-w-[580px] text-base leading-[1.75] text-slate-600">
          Every tour link you send comes back to you as data. SynergySo&apos;s agent dashboard shows you the full picture of how each buyer engaged with each property.
        </p>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map(({ title, body, icon }) => (
            <div key={title} className="rounded-xl bg-light-1 p-5">
              <div className="mb-2.5 text-accent">{icon}</div>
              <div className="mb-1 text-sm font-semibold text-ink">{title}</div>
              <p className="text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-l-[3px] border-accent px-6 py-[2px] text-[15px] italic leading-[1.65] text-slate-600">
          &ldquo;A buyer who has spent 12 minutes in a tour, returned to the master bedroom three times, asked about storage space, and changed the wall color is not a cold lead. Follow up accordingly.&rdquo;
        </div>
      </div>
    </section>
  );
}
