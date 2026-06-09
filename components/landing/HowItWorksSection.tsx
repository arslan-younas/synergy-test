const STEPS = [
  {
    n: "01",
    title: "Open & Walk",
    body: "Open the SynergySo app and walk the property as you normally would. The app captures as you move — no stopping, no tripod, no technique required. LiDAR on iPhone Pro models builds a precise 3D mesh in real time. Android devices use photogrammetry. Walk the property once and you're done.",
    time: "~15 minutes",
    timeColor: "purple" as const,
  },
  {
    n: "02",
    title: "Process & Tag",
    body: "The app stitches your walkthrough into a navigable 3D tour automatically. Add the listing details — address, price, key specs — and the AI uses them to answer buyer questions. Tag rooms you want to highlight. Add a personal note that appears at the tour entrance for your buyer.",
    time: "~2 minutes",
    timeColor: "purple" as const,
  },
  {
    n: "03",
    title: "Share One Link",
    body: "Copy the tour link and send it however you communicate — text, email, WhatsApp, DM. Your buyer opens it in their browser. No app. No account. No friction. Works on any modern smartphone, tablet, or laptop.",
    time: "10 seconds",
    timeColor: "purple" as const,
  },
  {
    n: "04",
    title: "Buyer Explores",
    body: "Your buyer walks every room at their own pace. They ask the AI anything. They swap the wall color, change the flooring, drop in furniture presets to see if their sofa fits. If they want to talk — they tap \"Call Agent\" and you pick up knowing which property, which room, how long they've been there.",
    time: "Their call",
    timeColor: "purple" as const,
  },
  {
    n: "05",
    title: "Close Smarter",
    body: "Your dashboard updates in real time. See who opened the tour, how long they stayed, what they asked, which rooms they lingered in, whether they called. Follow up with a buyer who's already emotionally invested in the space — not one you're pitching cold.",
    time: "Result",
    timeColor: "green" as const,
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-light-2 px-6 py-[88px] lg:px-14">
      <div className="mx-auto max-w-[860px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          How it works
        </span>
        <h2 className="mb-[56px] font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-ink">
          Five steps. Fifteen minutes.
        </h2>

        <div className="divide-y divide-black/7">
          {STEPS.map(({ n, title, body, time, timeColor }) => (
            <div key={n} className="grid grid-cols-[68px_1fr_auto] items-start gap-7 py-[26px]">
              <div className="font-display text-[40px] font-extrabold leading-none tracking-tight text-black/8">
                {n}
              </div>
              <div>
                <h3 className="mb-2 text-base font-bold text-ink">{title}</h3>
                <p className="max-w-[520px] text-[14px] leading-[1.7] text-slate-600">{body}</p>
              </div>
              <span
                className={`mt-0.5 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] ${
                  timeColor === "green"
                    ? "bg-green-50 text-green-700"
                    : "bg-accent/7 text-accent"
                }`}
              >
                {time}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-[7px] bg-accent px-[26px] py-[13px] text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-accent-dark"
          >
            Start Capturing Tours →
          </a>
        </div>
      </div>
    </section>
  );
}
