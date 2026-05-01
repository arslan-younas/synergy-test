import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 px-6 pb-[120px] pt-32 text-white md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-violet-deep/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 pt-12 lg:grid-cols-2 lg:pt-20">
          <div className="text-left">
            <h1 className="mb-6 font-serif text-[clamp(44px,6vw,72px)] font-bold leading-[1.1] tracking-[-0.02em]">
              The 15-minute tour that closes the deal.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-zinc-300">
              Walk any property with your iPhone. Share an interactive 3D tour your buyers explore from their couch, no headset, no contractor, no install.
            </p>
              <a href="#buyer-tour" className="rounded bg-brand-violet-deep px-8 py-4 font-semibold text-white transition hover:brightness-110">
                See Demo
              </a>
          </div>
          <div className="relative">
            <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
              <Image
                alt="SynergySo 3D Tour Interface"
                className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
                src="/home-hero-2.webp"
                width={1400}
                height={788}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/10" />
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-brand-violet-deep/25 blur-3xl" />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 text-center md:grid-cols-4">
          {[
            ["15 min", "Capture"],
            ["$0", "Hardware Fees"],
            ["2x", "Inquiries"],
            ["100%", "No Install"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl text-white">{value}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
