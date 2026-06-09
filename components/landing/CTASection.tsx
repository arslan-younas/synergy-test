"use client";

import { useState } from "react";

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = zip.length === 5 && email.includes("@");

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="scroll-mt-20 relative overflow-hidden border-t border-white/7 bg-ink px-6 py-[88px] text-center lg:px-14">
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-[-150px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,92,252,0.09)_0%,transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-[640px]">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
          SynergySo pilots by market
        </span>
        <h2 className="mb-3.5 font-display text-[clamp(22px,3vw,40px)] font-bold leading-[1.15] tracking-tight text-white">
          Secure your zip code before another agent in your market does.
        </h2>
        <p className="mx-auto mb-0 max-w-[560px] text-base leading-[1.75] text-white/50">
          SynergySo&apos;s early access program is limited by market — starting in the New York metro. When you secure your zip code, you&apos;re the only SynergySo agent in that area during the pilot.
        </p>

        {!submitted && (
          <div className="mx-auto mt-10 max-w-[480px] rounded-xl border border-white/7 bg-ink-soft p-8">
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-2 block text-left font-mono text-[10px] uppercase tracking-[0.13em] text-white/45">
                  Your zip code
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="10001"
                  className="w-full rounded-[7px] border border-white/10 bg-white/5 px-4 py-3 text-left text-xl font-bold tracking-[0.08em] text-white outline-none placeholder:text-white/20 focus:border-accent/45 transition"
                />
              </div>
              <div>
                <label className="mb-2 block text-left font-mono text-[10px] uppercase tracking-[0.13em] text-white/45">
                  Your email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="you@brokerage.com"
                  className="w-full rounded-[7px] border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/20 focus:border-accent/45 transition"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className={`w-full rounded-[7px] py-3 text-sm font-semibold text-white transition ${canSubmit ? "bg-accent hover:bg-accent-dark" : "cursor-not-allowed bg-white/10 text-white/30"}`}
              >
                Send →
              </button>
            </div>
            <p className="mt-4 font-mono text-sm text-white/45">
              Early access is free · No credit card required · We&apos;ll reach out within 24 hours
            </p>
          </div>
        )}

        {submitted && (
          <div className="mx-auto mt-10 max-w-120 rounded-xl border border-accent-green/20 bg-accent-green/6 px-9 py-9">
            <div className="mb-3 text-[32px]">✓</div>
            <div className="mb-1.5 text-xl font-bold text-white">You&apos;re on the list.</div>
            <p className="text-sm leading-relaxed text-white/45">
              Zip code <strong className="text-accent-green">{zip} </strong> is reserved for you. We&apos;ll reach out within 24 hours with next steps.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
