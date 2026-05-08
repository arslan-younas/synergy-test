export default function InTourCallSection() {
  return (
    <section className="border-t border-white/7 bg-ink px-6 py-22 lg:px-14">
      <div className="mx-auto max-w-270">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          The moment it becomes a real showing
        </span>

        <div className="overflow-hidden rounded-xl border border-accent/16 bg-accent/6 p-8 md:p-13">
          <div className="grid grid-cols-1 gap-15 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <h2 className="mb-4 font-display text-[clamp(20px,2.5vw,34px)] font-bold leading-[1.15] tracking-tight text-white">
                Your buyer is inside the tour. They&apos;re ready to talk. One tap and they&apos;re talking to you.
              </h2>
              <p className="mb-6 text-base leading-[1.75] text-white/50">
                No hunting for your number. No lost context. No &ldquo;wait, which listing is this?&rdquo; moment. You pick up knowing which property, which rooms they spent time in, how long they&apos;ve been exploring. That&apos;s not a cold call. That&apos;s a closing conversation.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "For the buyer", text: "One tap. No app. No hunting for a number. The agent is one tap away from inside the tour." },
                  { label: "For the agent", text: "Every tour call is pre-qualified. They've walked the property. They're calling because they're serious." },
                  { label: "For the deal", text: "The moment of peak interest — buyer inside the space, emotionally engaged — is exactly when the call happens." },
                  { label: "Agent receives", text: "Property ID, time in tour, rooms visited, AI questions asked — before you say hello." },
                ].map(({ label, text }) => (
                  <div key={label} className="rounded-lg border border-white/6 bg-white/4 p-4">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-light">{label}</div>
                    <p className="text-sm leading-relaxed text-white/55">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className="flex flex-col items-center gap-3.5">
              {/* Call card */}
              <div className="w-full max-w-70 rounded-2xl border border-white/7 bg-ink p-6.5 text-center">
                <div className="mb-4 font-mono text-[10px] tracking-[0.08em] text-white/45">
                  123 MAIN ST, BROOKLYN
                </div>
                <div className="mb-1 text-base font-bold text-white">Ready to talk?</div>
                <p className="mb-5 text-sm leading-relaxed text-white/45">
                  Connect directly with your agent while you&apos;re inside the tour
                </p>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-1.5 rounded-[9px] bg-accent-green py-3.25 text-sm font-bold text-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Agent
                </button>
                <p className="mt-2.5 font-mono text-[10px] text-white">No app needed · Works from any browser</p>
              </div>

              {/* Agent receives card */}
              <div className="w-full max-w-70 rounded-lg border border-accent-green/16 bg-accent-green/7 p-3.25">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent-green">
                  Agent receives
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-white/55">
                  {[
                    "123 Main St, Brooklyn",
                    "Buyer active for 9 min",
                    "Lingered in: Master bedroom",
                    "Asked 4 AI questions",
                    "Changed wall color in living room",
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent-green/60" />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
