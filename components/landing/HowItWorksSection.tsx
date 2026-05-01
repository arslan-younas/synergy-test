const STEPS = [
  { n: "1", icon: "smartphone", title: "Capture", body: "Walk the property holding your phone naturally.", highlight: false },
  { n: "2", icon: "cloud_sync", title: "Process", body: "Our AI stitches the LiDAR data in the cloud.", highlight: false },
  { n: "3", icon: "share", title: "Share", body: "Get a universal web link to post anywhere.", highlight: false },
  { n: "4", icon: "real_estate_agent", title: "Close", body: "Buyers engage more, ask questions, and decide faster.", highlight: true },
] as const;

export default function HowItWorksSection() {
  return (
    <section id="workflow" className="scroll-mt-28 mx-auto max-w-7xl px-6 py-section-padding">
      <div className="mb-20 space-y-2 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-on-background md:text-5xl">How It Works</h2>
        <p className="mx-auto max-w-2xl text-on-surface-variant">From pocket to property tour in under 30 minutes.</p>
      </div>
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
        <div className="absolute left-20 right-20 top-8 z-0 hidden h-0.5 bg-primary/20 md:block" aria-hidden />
        {STEPS.map((step) => (
          <div key={step.n} className="relative z-10 flex flex-col items-center text-center">
            <div
              className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-md ${
                step.highlight ? "bg-primary text-on-primary" : "border-2 border-primary bg-white text-primary"
              }`}
            >
              <span
                className={`absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step.highlight
                    ? "border border-primary bg-surface text-primary"
                    : "bg-primary text-on-primary"
                }`}
              >
                {step.n}
              </span>
              <span className={`material-symbols-outlined text-2xl ${step.highlight ? "text-on-primary" : ""}`}>{step.icon}</span>
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-on-surface">{step.title}</h3>
            <p className="text-sm text-on-surface-variant">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
