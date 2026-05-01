export default function FounderSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-section-padding text-center">
      <span className="material-symbols-outlined mb-8 block text-5xl text-primary">format_quote</span>
      <blockquote className="mb-12 font-display text-3xl font-medium leading-relaxed text-slate-800 md:text-4xl">
        &quot;We built SynergySo because we were tired of paying a &apos;tech tax&apos; just to market our listings. Beautiful, interactive 3D spaces shouldn&apos;t require an
        engineering degree or a massive hardware budget. They should be as easy to create as taking a photo.&quot;
      </blockquote>
      <div className="flex items-center justify-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-surface-variant shadow-sm">
          <div
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_60%_80%_at_50%_55%,rgba(101,0,225,0.2)_0%,transparent_70%)] font-display text-xl font-bold text-primary"
            aria-hidden
          >
            BT
          </div>
        </div>
        <div className="text-left">
          <div className="font-display text-lg font-bold text-slate-900">Bryan Thelismond</div>
          <div className="text-sm font-medium text-slate-600">Founder &amp; CEO, SynergySo</div>
        </div>
      </div>
    </section>
  );
}
