export default function AILayerSection() {
  return (
    <section id="ai" className="border-t border-white/7 bg-ink-soft px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          Conversational AI. Built into the walls.
        </span>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="mb-4 font-display text-[clamp(20px,2.5vw,34px)] font-bold leading-[1.15] tracking-tight text-white">
              Every question a buyer has at 11pm — answered instantly.
            </h2>
            <p className="mb-6 text-base leading-[1.75] text-white/50">
              Your buyers don&apos;t stop thinking about a property when your working day ends. SynergySo&apos;s AI knows the tour&apos;s spatial data, room dimensions, ceiling heights, and your listing details. It answers the questions that would otherwise land in your DMs at midnight.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                "Answers grounded in real spatial data from the LiDAR scan — not guesswork",
                "Available in the tour 24/7 — your buyers explore on their schedule",
                "Every question logged — you see what your buyer cares about most before you call",
                "When the AI can't answer, it directs the buyer to call you directly",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-white/50">
                  <span className="mt-px shrink-0 text-accent-light">→</span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* Right: chat window */}
          <div className="overflow-hidden rounded-xl border border-white/7 bg-ink">
            <div className="flex items-center gap-2 border-b border-white/5 px-[18px] py-3">
              <span className="h-[7px] w-[7px] rounded-full bg-accent-green" />
              <span className="font-mono text-[10px] text-white/35">123 Main St, Brooklyn — AI Assistant</span>
            </div>
            <div className="flex flex-col gap-[9px] p-[18px]">
              {[
                { role: "user", text: "Will a king-size bed fit comfortably in the master bedroom?" },
                { role: "ai", text: "Yes — the master is 14' × 16', giving you a king bed with approximately 3 feet of clearance on each side." },
                { role: "user", text: "Is there enough closet space for two people?" },
                { role: "ai", text: "The master has a walk-in closet measuring 6' × 8'. There's also a second closet in the hallway — navigate left from the bedroom to see it." },
                { role: "user", text: "What's the natural light like in the living room?" },
                { role: "ai", text: "Two south-facing windows — strong afternoon light. The tour was captured at 10am so you're seeing morning light now." },
              ].map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[84%] rounded-[10px] px-[13px] py-[9px] text-[13px] leading-[1.5] ${
                    msg.role === "user"
                      ? "self-end rounded-br-[2px] bg-accent text-white"
                      : "self-start rounded-bl-[2px] bg-white/6 text-white/70"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-white/6 bg-white/4 px-5 py-4 text-[13px] leading-[1.6] text-white/45">
          Every question is logged. You see exactly what your buyer asked — before you call them back. Show up to the conversation knowing what matters to them most.
        </div>
      </div>
    </section>
  );
}
