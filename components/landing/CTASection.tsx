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
      <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[28px] border border-outline-variant bg-gradient-to-br from-white to-surface-container-low px-10 py-[70px] text-center backdrop-blur-md lg:px-[52px] before:pointer-events-none before:absolute before:left-1/2 before:top-[-200px] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(101,0,225,0.1),transparent_60%)] before:content-['']">
        <h2 className="relative mb-4 font-display text-[clamp(36px,4vw,52px)] font-medium tracking-tight text-on-surface">
          Secure Your{" "}
          <em className="bg-gradient-to-br from-inverse-primary to-primary bg-clip-text italic text-transparent">Zip Code.</em>
        </h2>
        <p className="relative mx-auto mb-9 max-w-md text-sm leading-relaxed text-on-surface-variant">
          We are currently accepting 10 visionary agents for our NY Metro Pilot. Be the first to bring phone-native AI tours to your market.
        </p>
        <div className="relative mx-auto flex max-w-[440px] items-center rounded-full border border-outline-variant bg-white p-[5px] transition focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(101,0,225,0.12)]">
          <input
            id="email-in"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="agent@luxuryhomes.com"
            className="min-w-0 flex-1 border-0 bg-transparent px-5 py-3 text-[13.5px] text-on-surface outline-none placeholder:text-on-surface-variant/50"
          />
          <button
            type="button"
            className="shrink-0 rounded-full bg-primary px-[26px] py-3 text-[13px] font-semibold text-on-primary transition hover:bg-primary/90"
            onClick={joinList}
          >
            Apply
          </button>
        </div>
        <p id="wl-note" className="relative mt-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant/80">
          {note}
        </p>
      </div>
    </section>
  );
}
