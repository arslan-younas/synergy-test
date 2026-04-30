import { revealY } from "./tw";

const wedgeIcons = [
  <svg key="1" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="4" y="2" width="8" height="12" rx="1.5" stroke="#A78BFA" strokeWidth="1.3" />
    <circle cx="8" cy="12" r=".9" fill="#A78BFA" />
  </svg>,
  <svg key="2" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M8 1.5l1.8 4.4 4.7.4-3.6 3.1 1.1 4.6L8 11.6l-4 2.4 1.1-4.6L1.5 6.3l4.7-.4L8 1.5z"
      stroke="#A78BFA"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key="3" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 4.5a1.5 1.5 0 011.5-1.5h7a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5H7l-2.5 2v-2h-0a1.5 1.5 0 01-1.5-1.5v-5z"
      stroke="#A78BFA"
      strokeWidth="1.2"
    />
    <circle cx="8" cy="7" r=".7" fill="#A78BFA" />
    <circle cx="5.5" cy="7" r=".7" fill="#A78BFA" />
    <circle cx="10.5" cy="7" r=".7" fill="#A78BFA" />
  </svg>,
  <svg key="4" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 13V5l5-3 5 3v8" stroke="#A78BFA" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M6.5 13V8.5h3V13" stroke="#A78BFA" strokeWidth="1.2" />
  </svg>,
  <svg key="5" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2.5 8l3 3 8-8" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="6" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 11L7 2l5 9" stroke="#A78BFA" strokeLinecap="round" strokeWidth="1.2" />
    <path d="M4 8h6" stroke="#A78BFA" strokeLinecap="round" strokeWidth="1.2" />
  </svg>,
];

const cards = [
  ["Phone-only capture", "Ditch the $4k Matterport cameras. SynergySo uses the LiDAR you already carry in your pocket."],
  ["Self-serve, instant", "Don't wait for a technician. Agents scan a full home in 15 minutes and go live instantly."],
  ["AI Q&A Inside", 'Tours that talk back. Buyers ask "Is this wall load-bearing?" and get instant data-backed answers.'],
  [
    "Light redesign layer",
    "Buyers swap floor materials, wall colors, and virtual furniture in real-time — visionary intelligence at play.",
  ],
  ["Zero Buyer Friction", "No apps. No logins. One link sent via text opens the entire 3D world in any mobile browser."],
  ["Buyer Analytics", "Dashboard shows which rooms they lingered in and what questions they asked — intel for the offer."],
];

export default function WedgeSection() {
  return (
    <section id="wedge" className="relative px-6 py-[70px] lg:px-[52px] lg:py-[120px]">
      <div className="mb-14 text-center">
        <div className="mb-2.5 font-serif text-[clamp(36px,4.5vw,60px)] font-medium uppercase tracking-[0.01em]">The Wedge</div>
        <div className="font-mono text-[13px] tracking-[0.04em] text-black/55">
          5 Non-Negotiable Differentiators defining the new market standard.
        </div>
      </div>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(([title, text], idx) => (
          <div
            key={title}
            data-reveal
            className={`${revealY} min-h-[180px] rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel px-[26px] py-[30px] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(167,139,250,0.35)] hover:from-[rgba(167,139,250,0.08)] hover:to-white`}
          >
            <div className="mb-[18px] flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgba(167,139,250,0.25)] bg-[rgba(167,139,250,0.1)]">
              {wedgeIcons[idx]}
            </div>
            <h3 className="mb-2 text-base font-medium">{title}</h3>
            <p className="text-[12.5px] leading-snug text-black/60">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
