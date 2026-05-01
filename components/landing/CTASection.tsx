"use client";

import { useState } from "react";
export default function CTASection() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("Applications reviewed within 48 hours · No credit card required");

  const joinList = () => {
    if (!email.includes("@")) {
      setNote("Please enter a valid email before applying.");
      return;
    }
    setNote("Application received. We will reach out within 48 hours.");
    setEmail("");
  };

  return (
    <section id="cta" className="relative scroll-mt-28 px-6 pb-24 pt-[100px] lg:px-[52px] lg:pb-28 lg:pt-[100px]">
      <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[28px] border border-black/10 bg-gradient-to-br from-white to-brand-panel px-10 py-[70px] text-center backdrop-blur-md lg:px-[52px] before:pointer-events-none before:absolute before:left-1/2 before:top-[-200px] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_60%)] before:content-['']">
        <h2 className="relative mb-4 font-serif text-[clamp(36px,4vw,52px)] font-medium tracking-tight">
          Secure Your{" "}
          <em className="bg-gradient-to-br from-brand-violet-2 to-brand-violet bg-clip-text text-transparent italic">Zip Code.</em>
        </h2>
        <p className="relative mx-auto mb-9 max-w-md text-[14px] leading-relaxed text-black/60">
          We are currently accepting 10 visionary agents for our NY Metro Pilot. Be the first to bring phone-native AI tours to your market.
        </p>
        <div className="relative mx-auto flex max-w-[440px] items-center rounded-full border border-black/15 bg-white p-[5px] transition focus-within:border-brand-violet focus-within:shadow-[0_0_0_4px_rgba(167,139,250,0.1)]">
          <input
            id="email-in"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="agent@luxuryhomes.com"
            className="min-w-0 flex-1 border-0 bg-transparent px-5 py-3 text-[13.5px] text-brand-text outline-none placeholder:text-black/35"
          />
          <button
            type="button"
            className="shrink-0 rounded-full bg-brand-violet px-[26px] py-3 text-[13px] font-semibold text-white transition hover:bg-brand-violet-2 hover:text-[#1a1030]"
            onClick={joinList}
          >
            Apply
          </button>
        </div>
        <p id="wl-note" className="relative mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-black/40">
          {note}
        </p>
      </div>
    </section>
  );
}
