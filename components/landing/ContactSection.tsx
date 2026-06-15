"use client";

import { useState } from "react";
import { CheckCircle2, Send, ChevronDown } from "lucide-react";

export default function ContactSection() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [role, setRole]       = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  const valid =
    name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    role !== "" &&
    message.trim().length > 9;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-white/8 px-10 py-[140px] max-sm:px-5 max-sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* Head */}
        <div className="mx-auto mb-[70px] max-w-[680px] text-center">
          <div
            className="mb-[22px] flex items-center justify-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-light"
            data-reveal
          >
            <span className="block h-px w-[30px] bg-accent" />
            Get in touch
          </div>
          <h2
            className="text-[clamp(30px,4.6vw,68px)] font-black leading-[1.02] tracking-[-0.04em] text-white"
            data-reveal
          >
            Interested in SynergySo?
            <br />
            Let&apos;s talk.
          </h2>
          <p
            className="mt-[18px] text-[clamp(17px,1.5vw,20px)] leading-[1.75] text-white/45"
            data-reveal
          >
            Whether you&apos;re an agent looking to try it on your next listing, a
            brokerage exploring it for your team, or an investor — reach out and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div className="mx-auto max-w-[620px]" data-reveal>
          <div className="rounded-[18px] border border-white/8 bg-[#15151d] p-[44px] max-sm:p-6">
            {sent ? (
              <div className="py-[26px] text-center">
                <div className="mb-5 flex justify-center">
                    <CheckCircle2 className="h-14 w-14 text-[#67B35A]" strokeWidth={1.5} />
                  </div>
                <div className="mb-[10px] text-2xl font-extrabold text-white">
                  Message received.
                </div>
                <p className="text-[15px] leading-[1.7] text-white/45">
                  Thanks for reaching out. We&apos;ll be in touch within 24 hours — keep
                  an eye on{" "}
                  <strong className="text-accent-light">{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-[9px]">
                    <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45" htmlFor="cf-name">
                      Your name
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-[9px] border border-white/8 bg-white/5 px-4 py-[14px] text-[15px] text-white placeholder-white/22 outline-none transition focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-[9px]">
                    <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45" htmlFor="cf-email">
                      Email address
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      placeholder="jane@brokerage.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-[9px] border border-white/8 bg-white/5 px-4 py-[14px] text-[15px] text-white placeholder-white/22 outline-none transition focus:border-accent"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-[9px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45" htmlFor="cf-role">
                    I&apos;m a...
                  </label>
                  <select
                    id="cf-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-[9px] border border-white/8 bg-white/5 px-4 py-[14px] text-[15px] text-white outline-none transition focus:border-accent"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="agent">Real estate agent</option>
                    <option value="brokerage">Brokerage or team lead</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4 flex flex-col gap-[9px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45" htmlFor="cf-msg">
                    Message
                  </label>
                  <textarea
                    id="cf-msg"
                    placeholder="Tell us a bit about what you're looking for — we read every message."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full resize-y rounded-[9px] border border-white/8 bg-white/5 px-4 py-[14px] text-[15px] leading-[1.6] text-white placeholder-white/22 outline-none transition focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!valid}
                  className="mt-[22px] inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-[15px] font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" strokeWidth={2} />
                </button>
                <p className="mt-4 text-center font-mono text-[11px] text-white/28">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
