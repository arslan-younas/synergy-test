const TESTIMONIALS = [
  {
    quote:
      "I built SynergySo because I was tired of choosing between an expensive contractor and a free tool that handed my clients to Zillow. I use it on every listing now. My buyers in other time zones feel like they've walked the property before they've booked a flight.",
    initials: "B",
    name: "Bryan T.",
    role: "Independent Agent, New York Metro\nCo-founder, SynergySo",
    placeholder: false,
  },
  {
    quote:
      "Pilot agent quote — to be replaced with a real testimonial from the weeks 5–8 pilot. Your most powerful closing story goes here.",
    initials: "A",
    name: "Pilot Agent",
    role: "Independent Agent, New York Metro",
    placeholder: true,
  },
  {
    quote:
      "Pilot agent quote — focused on ease of capture and how it changed the follow-up conversation with buyers who couldn't visit.",
    initials: "A",
    name: "Pilot Agent",
    role: "Independent Agent, New York Metro",
    placeholder: true,
  },
] as const;

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-20 border-t border-white/7 bg-ink-mid px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-4 block text-center font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          Trusted by agents who close
        </span>
        <h2 className="mb-[48px] text-center font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-white">
          Real agents. Real listings. Real results.
        </h2>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, initials, name, role, placeholder }) => (
            <article
              key={name + role}
              className={`rounded-xl border p-7 transition-colors ${placeholder ? "border-white/5 bg-white/2" : "border-white/7 bg-white/3 hover:bg-white/5"}`}
            >
              <div className={`mb-3 font-serif text-[32px] leading-none text-accent ${placeholder ? "opacity-25" : "opacity-50"}`}>&ldquo;</div>
              <p className={`mb-[22px] text-sm leading-[1.75] ${placeholder ? "italic text-white/45" : "text-white/70"}`}>
                {quote}
              </p>
              <hr className={`mb-4 ${placeholder ? "border-white/4" : "border-white/6"}`} />
              <div className="flex items-center gap-2.5">
                <div className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${placeholder ? "border border-white/10 bg-white/5 text-white/35" : "border border-accent/22 bg-accent/15 text-accent-light"}`}>
                  {initials}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${placeholder ? "text-white/50" : "text-white"}`}>{name}</div>
                  <div className={`font-mono text-sm leading-[1.4] ${placeholder ? "text-white/30" : "text-white/40"}`}>
                    {role.split("\n").map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
