import { Check, X } from "lucide-react";

const COMP_ROWS = [
  { label: "Hardware required",        mat: false, syn: true,  zil: false, synText: "Any iPhone or Android" },
  { label: "Cost",                     mat: false, syn: true,  zil: false, synText: "Flat subscription — no per-scan charges" },
  { label: "Turnaround",               mat: false, syn: true,  zil: false, synText: "Published before you leave the building" },
  { label: "You own the tour link",    mat: false, syn: true,  zil: false, synText: "Your link, your brand — not Zillow's" },
] as const;

const FAQS = [
  {
    q: "Does my buyer need to download anything?",
    a: "Nothing. Opens directly in Safari or Chrome. No account, no app store. If they can open a YouTube video, they can walk a SynergySo tour in three seconds.",
  },
  {
    q: "What phones work for capture?",
    a: "Any iPhone or Android. iPhone Pro uses LiDAR for the most precise mesh. Everything else uses photogrammetry — sharp, fully navigable, slightly longer capture time.",
  },
  {
    q: "How long does capture actually take?",
    a: "15 minutes for a standard unit. Larger homes closer to 25. Either way, published before you leave the building — not waiting three days for a contractor's turnaround.",
  },
  {
    q: "Do I own the tour link?",
    a: "Yes. Your link, your control. Share it, take it down when the listing closes. You're not building Zillow's audience. Your client relationship stays yours.",
  },
  {
    q: "Is it hard to learn?",
    a: "Walk the property like you normally would. The app does the rest. Most agents capture their first tour within 20 minutes of downloading the app.",
  },
  {
    q: "What happens after the pilot?",
    a: "Tours stay live. You'll move to a paid plan — early access agents will be the first to know when pricing is announced and will receive preferential rates for being part of the pilot.",
  },
] as const;

export default function WhySection() {
  return (
    <section id="why" className="border-t border-white/8 px-10 py-[140px] max-sm:px-5 max-sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* Head */}
        <div className="mb-20 max-w-[820px]">
          <div
            className="mb-[22px] flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-light"
            data-reveal
          >
            <span className="block h-px w-[30px] bg-accent" />
            Why SynergySo
          </div>
          <h2
            className="text-[clamp(30px,4.6vw,68px)] font-black leading-[1.02] tracking-[-0.04em] text-white"
            data-reveal
          >
            You already know photos
            <br />
            aren&apos;t enough.
          </h2>
        </div>

        {/* Before / After */}
        <div
          className="mb-[90px] grid grid-cols-1 overflow-hidden rounded-[18px] gap-[2px] md:grid-cols-2"
          data-reveal
        >
          {/* Before */}
          <div className="bg-[#15151d] px-[44px] py-[48px]">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
              Without SynergySo
            </div>
            <h3 className="mb-4 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.02em] text-white">
              Your buyer is interested. Then they go quiet.
            </h3>
            <p className="mb-[26px] text-[15px] leading-[1.8] text-white/70">
              They saw the photos. The photos looked fine. But "fine" doesn't make someone
              book a flight or wire a deposit. They have questions they can't answer from
              a gallery, and nobody to ask at 11pm.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Can't tell if the primary bedroom fits a king",
                "Can't picture their furniture in the space",
                "They sit on it. Someone else makes an offer.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] text-[14.5px] leading-[1.5] text-white/42">
                  <X className="mt-0.5 h-[15px] w-[15px] shrink-0 text-white/28" strokeWidth={2.5} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-accent px-[44px] py-[48px]">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
              With SynergySo
            </div>
            <h3 className="mb-4 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.02em] text-white">
              They walk the property on their lunch break. From Chicago.
            </h3>
            <p className="mb-[26px] text-[15px] leading-[1.8] text-white/88">
              You send a link. They open it in Safari, no download. They navigate every room,
              see real dimensions, understand exactly how the space feels. Then they call you
              ready to move.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Navigate room to room like they're standing there",
                "See real spatial data — not staged photography",
                "Call you already emotionally invested in the space",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] text-[14.5px] leading-[1.5] text-white">
                  <Check className="mt-0.5 h-[15px] w-[15px] shrink-0 text-white" strokeWidth={2.5} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison table */}
        <div
          className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.12em] text-white/45"
          data-reveal
        >
          How SynergySo compares
        </div>
        <div
          className="mb-[90px] overflow-hidden rounded-[18px] border border-white/8 grid grid-cols-1 md:grid-cols-3"
          data-reveal
        >
          {/* Matterport */}
          <div className="bg-[#15151d] px-[30px] py-[32px] pb-[36px] hidden md:block">
            <div className="mb-[14px] font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
              Option A
            </div>
            <div className="mb-[22px] text-[19px] font-extrabold tracking-[-0.02em] text-white">
              Matterport
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Specialist hardware required",
                "$69–$309/month + per-scan fees",
                "3–5 day turnaround",
                "Unsustainable on every listing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] text-[13.5px] leading-[1.45] text-white/34">
                  <X className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#ef4444]/65" strokeWidth={2.5} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SynergySo */}
          <div
            className="relative bg-accent/10 px-[30px] py-[32px] pb-[36px]"
            style={{ borderLeft: "1px solid rgba(123,94,248,.25)", borderRight: "1px solid rgba(123,94,248,.25)" }}
          >
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-accent" />
            <div className="mb-[14px] font-mono text-[10px] uppercase tracking-[0.12em] text-accent-light">
              The solution
            </div>
            <div className="mb-[22px] text-[19px] font-extrabold tracking-[-0.02em] text-white">
              SynergySo
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Any iPhone or Android",
                "Flat subscription — no per-scan charges",
                "Published before you leave the building",
                "Your link, your brand — not Zillow's",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] text-[13.5px] leading-[1.45] text-white/88">
                  <Check className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#67B35A]" strokeWidth={2.5} /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-[18px] rounded-[8px] border border-white/8 bg-white/4 p-[13px] text-[12.5px] italic leading-[1.65] text-white/45">
              Honest note: Matterport wins on maximum fidelity for a dedicated shoot.
              SynergySo wins on speed, cost, and the fact you&apos;ll actually use it on
              every listing — not just your best one.
            </div>
          </div>

          {/* Zillow */}
          <div className="bg-[#15151d] px-[30px] py-[32px] pb-[36px] hidden md:block">
            <div className="mb-[14px] font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
              Option B
            </div>
            <div className="mb-[22px] text-[19px] font-extrabold tracking-[-0.02em] text-white">
              Zillow 3D
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "360° photos — not true 3D",
                "Tour lives on Zillow's platform",
                "You're building their audience",
                "Client relationship belongs to them",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] text-[13.5px] leading-[1.45] text-white/34">
                  <X className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#ef4444]/65" strokeWidth={2.5} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div
          className="mb-[26px] font-mono text-[12px] uppercase tracking-[0.12em] text-white/45"
          data-reveal
        >
          Questions agents ask before they sign up
        </div>
        <div
          className="overflow-hidden rounded-[18px] border border-white/8 grid grid-cols-1 md:grid-cols-2"
          data-reveal
        >
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`bg-[#15151d] px-[34px] py-[34px] ${
                i % 2 === 0 ? "md:border-r md:border-white/8" : ""
              } ${i < FAQS.length - 2 ? "border-b border-white/8" : ""} ${
                i === FAQS.length - 1 ? "max-md:border-t max-md:border-white/8" : ""
              }`}
            >
              <div className="mb-3 text-[16px] font-bold leading-[1.3] text-white">
                {faq.q}
              </div>
              <div className="text-[14px] leading-[1.8] text-white/45">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
