export default function ShowcaseSection() {
  return (
    <section className="relative px-6 py-[70px] lg:px-[52px] lg:py-[120px]">
      <div className="mb-14 text-center">
        <span className="mb-3.5 inline-block rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          The product
        </span>
        <h2 className="mt-4 font-display text-[clamp(34px,4vw,54px)] font-normal leading-tight tracking-[-0.02em] text-on-surface">
          One phone in.
          <br />
          An{" "}
          <em className="bg-gradient-to-br from-inverse-primary to-primary bg-clip-text font-medium italic text-transparent">interactive 3D tour</em> out.
        </h2>
        <p className="mx-auto mt-[18px] max-w-xl text-[14.5px] leading-relaxed text-on-surface-variant">
          Capture on an iPhone. Share a link. Your buyer walks the home from their couch.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1160px] grid-cols-1 items-center gap-[52px] lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Phone */}
        <div className="relative isolate mx-auto h-[568px] w-[280px] overflow-hidden rounded-[42px] border-[10px] border-[#d7dbef] bg-[#f6f8ff] shadow-phone before:absolute before:left-1/2 before:top-3 before:z-10 before:h-[26px] before:w-[84px] before:-translate-x-1/2 before:rounded-[13px] before:bg-[#eef1fb] before:content-['']">
          <div className="absolute inset-0 flex flex-col overflow-hidden bg-gradient-to-b from-[#f9faff] to-[#eaeef9]">
            <div className="flex justify-between px-6 pb-0 pt-3.5 font-mono text-[11px] font-medium">
              <span>9:41</span>
              <span>● ● ●</span>
            </div>
            <div className="border-b border-black/10 px-[18px] pb-3.5 pt-[54px]">
              <h3 className="mb-1 font-display text-lg font-medium text-on-surface">123 Oak Street</h3>
              <p className="text-[11px] text-on-surface-variant">Brooklyn, NY · Capture in progress</p>
            </div>
            <div className="relative flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(101,0,225,0.1),transparent_70%)]">
              <div className="absolute left-[18px] right-[18px] top-[18px] flex gap-[3px]">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <span key={i} className="h-[3px] flex-1 rounded-sm bg-primary" />
                ))}
                {[7, 8].map((i) => (
                  <span key={i} className="h-[3px] flex-1 rounded-sm bg-black/15" />
                ))}
              </div>
              <div className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full border border-primary/40 before:absolute before:inset-[-28px] before:animate-pring before:rounded-full before:border before:border-primary/15 before:content-[''] after:absolute after:inset-[-56px] after:animate-pring-delay after:rounded-full after:border after:border-primary/10 after:content-['']">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary shadow-[0_0_50px_rgba(101,0,225,0.45)]">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
                    <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2" />
                    <circle cx="16" cy="16" r="4" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Scanning · Living room
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-black/10 px-[18px] pb-5 pt-3.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-on-surface-variant">
                Progress <em className="not-italic text-primary">75%</em>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-on-surface-variant">
                Remaining <em className="not-italic text-primary">3:42</em>
              </span>
            </div>
          </div>
        </div>

        {/* Browser */}
        <div className="overflow-hidden rounded-[20px] border border-outline-variant/50 bg-gradient-to-br from-white to-surface-container-low shadow-browser backdrop-blur-md">
          <div className="flex items-center gap-3.5 border-b border-outline-variant/50 bg-white/70 px-[18px] py-3.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-md border border-outline-variant/50 bg-white px-3 py-1.5 font-mono text-[11px] text-on-surface-variant">
              <span className="h-2 w-2 shrink-0 rounded-full border-[1.5px] border-primary" />
              tour.synergyso.app/123-oak-st
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden bg-[radial-gradient(ellipse_at_40%_40%,rgba(101,0,225,0.12),transparent_55%),radial-gradient(ellipse_at_75%_70%,rgba(101,0,225,0.1),transparent_50%),linear-gradient(160deg,#ffffff_0%,#eef1fa_70%)]">
            <div className="absolute inset-y-0 -left-1/2 w-[150%] animate-scanline bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
            <Hotspot className="left-[28%] top-[42%]" />
            <Hotspot className="left-[62%] top-[58%]" />
            <Hotspot className="left-[78%] top-[34%]" />
            <div className="absolute bottom-[18px] left-[18px] right-[18px] flex items-end justify-between gap-3">
              <div className="rounded-md border border-outline-variant/50 bg-white/90 px-3.5 py-2.5 backdrop-blur-md">
                <h4 className="mb-0.5 font-display text-sm font-medium text-on-surface">Master Bedroom</h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-on-surface-variant">North-west exposure · 224 sq ft</p>
              </div>
              <div className="flex gap-3.5 rounded-md border border-outline-variant/50 bg-white/90 px-3.5 py-2.5 backdrop-blur-md">
                {[
                  ["14′", "Width"],
                  ["16′", "Length"],
                  ["9′", "Ceiling"],
                ].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-[17px] text-primary">{n}</div>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-on-surface-variant">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1160px] flex-wrap items-center justify-between gap-4 border-t border-outline-variant/40 pt-7 font-mono text-[11px] uppercase tracking-[0.12em] text-on-surface-variant">
        <div className="flex items-center gap-3 text-primary">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-[11px]">1</span>
          Agent captures on iPhone
        </div>
        {[
          ["2", "Server stitches tour"],
          ["3", "Buyer explores in browser"],
          ["4", "Agent closes deal"],
        ].map(([n, label]) => (
          <div key={n} className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-on-surface/30 text-[11px]">{n}</span>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}

function Hotspot({ className }: { className: string }) {
  return (
    <div
      className={`absolute flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary/20 before:absolute before:inset-[-8px] before:animate-hotspot-ring before:rounded-full before:border before:border-primary/45 before:content-[''] ${className}`}
    >
      <span className="relative z-[1] h-1.5 w-1.5 rounded-full bg-primary" />
    </div>
  );
}
