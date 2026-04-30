"use client";

import { revealY } from "./tw";

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[13px] text-black/60">
      <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full bg-brand-violet" />
      {children}
    </li>
  );
}

function PriceCardStarter() {
  return (
    <article
      data-reveal
      className={`${revealY} relative rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel px-8 pb-10 pt-12 backdrop-blur-md`}
    >
      <span className="mb-4 mt-2 inline-block font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-violet">Starter</span>
      <div className="font-serif text-[54px] font-normal leading-none tracking-[-0.03em]">
        <sup className=" align-super text-xl text-black/55">$</sup>
        29
      </div>
      <div className="mb-7 mt-1.5 text-[12.5px] text-black/60">per month · cancel anytime</div>
      <ul className="mb-7 flex flex-col gap-3">
        <Feature>Up to 10 tours/month</Feature>
        <Feature>LiDAR + photogrammetry</Feature>
        <Feature>Shareable no-install link</Feature>
        <Feature>AI Q&A on every tour</Feature>
        <Feature>Basic buyer analytics</Feature>
      </ul>
      <a
        href="#cta"
        className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-7 py-3.5 text-[13px] font-medium text-brand-text transition hover:border-brand-violet hover:bg-[rgba(167,139,250,0.08)] hover:text-brand-violet"
      >
        Join waitlist
      </a>
    </article>
  );
}

function PriceCardPro() {
  return (
    <article
      data-reveal
      className={`${revealY} relative rounded-[20px] border border-brand-violet bg-gradient-to-b from-[rgba(167,139,250,0.14)] from-0% to-white to-[60%] px-8 pb-10 pt-12 backdrop-blur-md`}
    >
      <span className="absolute left-1/2 top-[-12px] -translate-x-1/2 rounded-full bg-brand-violet-deep px-3.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white">
        Most popular
      </span>
      <span className="mb-4 mt-2 inline-block font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-violet">Pro</span>
      <div className="font-serif text-[54px] font-normal leading-none tracking-[-0.03em]">
        <sup className=" align-super text-xl text-black/55">$</sup>
        49
      </div>
      <div className="mb-7 mt-1.5 text-[12.5px] text-black/60">per month · cancel anytime</div>
      <ul className="mb-7 flex flex-col gap-3">
        <Feature>Unlimited tours</Feature>
        <Feature>Full AI Q&A suite</Feature>
        <Feature>Redesign layer (colors + furniture)</Feature>
        <Feature>Advanced client analytics</Feature>
        <Feature>Custom tour branding</Feature>
        <Feature>Priority processing</Feature>
      </ul>
      <a
        href="#cta"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-violet-deep px-7 py-3.5 text-[13px] font-medium text-white transition hover:-translate-y-px hover:bg-brand-violet hover:shadow-[0_10px_30px_-10px_rgba(167,139,250,0.6)]"
      >
        Join waitlist{" "}
        <svg className="h-3 w-3 transition-transform group-hover:translate-x-[3px]" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
    </article>
  );
}

function PriceCardBroker() {
  return (
    <article
      data-reveal
      className={`${revealY} relative rounded-[20px] border border-black/10 bg-gradient-to-br from-white to-brand-panel px-8 pb-10 pt-12 backdrop-blur-md`}
    >
      <span className="mb-4 mt-2 inline-block font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-violet">Brokerage</span>
      <div className="font-serif text-[38px] font-normal leading-none tracking-[-0.03em]">Custom</div>
      <div className="mb-7 mt-1.5 text-[12.5px] text-black/60">team licensing · launching year two</div>
      <ul className="mb-7 flex flex-col gap-3">
        <Feature>Everything in Pro</Feature>
        <Feature>Team dashboard</Feature>
        <Feature>MLS integration (v2)</Feature>
        <Feature>SSO + admin controls</Feature>
        <Feature>Dedicated onboarding</Feature>
      </ul>
      <a
        href="#cta"
        className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-7 py-3.5 text-[13px] font-medium text-brand-text transition hover:border-brand-violet hover:bg-[rgba(167,139,250,0.08)] hover:text-brand-violet"
      >
        Contact us
      </a>
    </article>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative px-6 py-[70px] lg:px-[52px] lg:py-[120px]">
      <div className="mb-14 text-center">
        <span className="mb-3.5 inline-block rounded-full border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.08)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-violet">
          Pricing
        </span>
        <h2 className="mt-4 font-serif text-[clamp(34px,4vw,54px)] font-normal leading-tight tracking-[-0.02em]">
          Agent-paid.
          <br />
          <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text font-medium italic text-transparent">No approval needed.</em>
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 lg:grid-cols-3">
        <PriceCardStarter />
        <PriceCardPro />
        <PriceCardBroker />
      </div>
    </section>
  );
}
