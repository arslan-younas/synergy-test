const STEPS = [
  {
    num: "[ 01 ]",
    title: "Walk the property with your phone",
    body: "Open the SynergySo app and walk the property as you normally would. LiDAR on iPhone Pro models builds a precise 3D mesh in real time. Photogrammetry handles every other smartphone. No stopping, no technique, no tripod.",
    time: "~15 minutes",
  },
  {
    num: "[ 02 ]",
    title: "Review and publish",
    body: "Preview the tour before it goes live. Add listing details, room notes, and any context your buyers need. Hit publish — your shareable link is ready in under two minutes.",
    time: "~2 minutes",
  },
  {
    num: "[ 03 ]",
    title: "Send the link — anywhere it needs to go",
    body: "Text it, email it, add it to your MLS listing, share it on Instagram. Your buyer opens it in Safari or Chrome — no account, no download. They're inside the tour in three seconds.",
    time: "30 seconds",
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section id="how" className="border-t border-white/8 px-10 py-[140px] max-sm:px-5 max-sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* Head */}
        <div className="mb-[90px] max-w-[760px]">
          <div
            className="mb-[22px] flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-light"
            data-reveal
          >
            <span className="block h-px w-[30px] bg-accent" />
            How it works
          </div>
          <h2
            className="text-[clamp(30px,4.6vw,68px)] font-black leading-[1.02] tracking-[-0.04em] text-white"
            data-reveal
          >
            Three steps. Done before
            <br />
            you leave the building.
          </h2>
          <p
            className="mt-[18px] text-[clamp(17px,1.5vw,20px)] leading-[1.75] text-white/70"
            data-reveal
          >
            One link gives your buyer a walkable tour from anywhere in the world.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map(({ num, title, body, time }) => (
          <div
            key={num}
            className="grid grid-cols-1 items-start gap-[14px] border-t border-white/8 py-[48px] last:border-b last:border-white/8 md:grid-cols-[120px_1fr_auto] md:gap-[40px]"
            data-reveal
          >
            <div className="font-mono text-[15px] font-bold text-accent-light">{num}</div>
            <div>
              <h3 className="mb-[14px] text-[clamp(22px,2.4vw,32px)] font-extrabold tracking-[-0.03em] text-white">
                {title}
              </h3>
              <p className="max-w-[62ch] text-[16px] leading-[1.8] text-white/70">{body}</p>
            </div>
            <div className="hidden whitespace-nowrap rounded-full border border-white/8 px-[15px] py-[7px] font-mono text-[12px] text-white/45 md:block">
              {time}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
