"use client";

import { revealY } from "./tw";

function Check({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={`flex items-center gap-3 text-sm ${className || "text-on-surface"}`}>
      <span className="material-symbols-outlined shrink-0 text-lg text-primary">check</span>
      {children}
    </li>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 px-6 py-section-padding">
      <div className="mb-16 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-on-background md:text-5xl">Simple, transparent pricing.</h2>
        <p className="mt-2 text-on-surface-variant">No hidden hosting fees. Ever.</p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Starter */}
        <article
          data-reveal
          className={`${revealY} flex flex-col rounded-2xl border border-surface-variant bg-white p-8 shadow-sm`}
        >
          <h3 className="mb-2 font-display text-xl font-bold text-on-surface">Starter</h3>
          <div className="mb-6 font-display text-4xl font-bold text-on-surface">
            $29<span className="text-base font-normal text-on-surface-variant">/mo</span>
          </div>
          <p className="mb-6 border-b border-surface-variant pb-6 text-sm text-on-surface-variant">Perfect for solo agents doing a few listings a month.</p>
          <ul className="mb-8 flex grow flex-col gap-4">
            <Check>Up to 10 tours/month</Check>
            <Check>LiDAR + photogrammetry</Check>
            <Check>Shareable no-install link</Check>
            <Check>AI Q&A on every tour</Check>
            <Check>Basic buyer analytics</Check>
          </ul>
          <a
            href="#cta"
            className="mt-auto w-full rounded-lg border-2 border-primary py-3 text-center font-display font-bold text-primary transition-colors hover:bg-primary/5"
          >
            Join waitlist
          </a>
        </article>

        {/* Pro */}
        <article
          data-reveal
          className={`${revealY} relative flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-8 shadow-md md:-translate-y-4`}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary">
            Most Popular
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-on-primary-fixed-variant">Pro</h3>
          <div className="mb-6 font-display text-4xl font-bold text-on-primary-fixed-variant">
            $49<span className="text-base font-normal text-on-primary-fixed-variant/70">/mo</span>
          </div>
          <p className="mb-6 border-b border-primary/20 pb-6 text-sm text-on-primary-fixed-variant/80">Everything you need to scale your listing marketing.</p>
          <ul className="mb-8 flex grow flex-col gap-4 text-on-primary-fixed-variant">
            <Check className="text-inherit">Unlimited tours</Check>
            <Check className="text-inherit">Full AI Q&A suite</Check>
            <Check className="text-inherit">Redesign layer (colors + furniture)</Check>
            <Check className="text-inherit">Advanced client analytics</Check>
            <Check className="text-inherit">Custom tour branding</Check>
            <Check className="text-inherit">Priority processing</Check>
          </ul>
          <a
            href="#cta"
            className="mt-auto w-full rounded-lg bg-primary py-3 text-center font-display font-bold text-on-primary shadow-lg shadow-primary/30 transition hover:bg-primary/90"
          >
            Join waitlist
          </a>
        </article>

        {/* Brokerage */}
        <article
          data-reveal
          className={`${revealY} flex flex-col rounded-2xl border border-surface-variant bg-white p-8 shadow-sm`}
        >
          <h3 className="mb-2 font-display text-xl font-bold text-on-surface">Brokerage</h3>
          <div className="mb-6 font-display text-4xl font-bold text-on-surface">Custom</div>
          <p className="mb-6 border-b border-surface-variant pb-6 text-sm text-on-surface-variant">Team management and white-labeling for offices.</p>
          <ul className="mb-8 flex grow flex-col gap-4">
            <Check>Everything in Pro</Check>
            <Check>Team dashboard</Check>
            <Check>MLS integration (v2)</Check>
            <Check>SSO + admin controls</Check>
            <Check>Dedicated onboarding</Check>
          </ul>
          <a
            href="#cta"
            className="mt-auto w-full rounded-lg border border-surface-variant py-3 text-center font-display font-bold text-on-surface transition-colors hover:bg-surface-variant"
          >
            Contact Sales
          </a>
        </article>
      </div>
    </section>
  );
}
