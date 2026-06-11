import AnimationObservers from "@/components/landing/AnimationObservers";
import Preloader from "@/components/landing/Preloader";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import IntroSection from "@/components/landing/IntroSection";
import Marquee from "@/components/landing/Marquee";
import AboutSection from "@/components/landing/AboutSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhatBuyerGetsSection from "@/components/landing/WhatBuyerGetsSection";
import BuyerTourSectionLoader from "@/components/landing/BuyerTourSectionLoader";
import WhySection from "@/components/landing/WhySection";
import ContactSection from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="relative">
        <NavBar />
        <main>
          <HeroSection />
          <IntroSection />
          <Marquee />
          <AboutSection />
          <HowItWorksSection />
          <WhatBuyerGetsSection />

          {/* ── Interactive tour wrapper ── */}
          <section className="border-t border-white/8 bg-[#07070a] px-10 py-16 max-sm:px-5 max-sm:py-10" id="buyer-tour-outer">
            <div className="mx-auto max-w-[1280px]">

              {/* Section header */}
              <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="mb-3 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.26em] text-accent-light">
                    <span className="block h-px w-[30px] bg-accent" />
                    Live tour
                  </div>
                  <h2 className="text-[clamp(22px,3vw,40px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
                    Walk it yourself.
                  </h2>
                </div>
                <p className="max-w-[44ch] text-[14px] leading-[1.7] text-white/45">
                  Drag to pan · click to zoom in · click again to reset. Use the room
                  list to navigate, or ask the AI anything about the space.
                </p>
              </div>

              {/* Viewer card — rounded, bordered, overflow-hidden clips the PSV */}
              <div
                className="overflow-hidden rounded-2xl border border-white/8"
                style={{ boxShadow: "0 0 0 1px rgba(123,94,248,.12), 0 40px 80px -30px rgba(123,94,248,.18)" }}
              >
                <BuyerTourSectionLoader />
              </div>

              {/* Caption */}
              <p className="mt-5 font-mono text-[12px] text-white/28">
                What your buyer sees — navigable room-to-room, real dimensions, any device, no download.
              </p>
            </div>
          </section>

          <WhySection />
          <ContactSection />
        </main>

        <footer className="border-t border-white/8 bg-[#0c0c11] px-10 pb-9 pt-16 max-sm:px-5">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-wrap items-start justify-between gap-[30px]">
              {/* Brand */}
              <div>
                <div className="mb-3 flex items-center gap-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 60 500 400" height="28" style={{ display: "block", flexShrink: 0 }}>
                    <circle cx="400" cy="250" r="170" fill="none" stroke="#C89B2B" strokeWidth="24" />
                    <path d="M400 420 C470 300 560 220 650 220 C610 320 540 400 430 470 Z" fill="none" stroke="#4F8F43" strokeWidth="24" />
                    <path d="M300 350 C340 300 390 280 440 290 C410 340 370 380 320 400 Z" fill="#67B35A" />
                    <path d="M470 360 C510 310 560 290 610 300 C580 350 540 390 490 410 Z" fill="#67B35A" />
                  </svg>
                  <span className="text-[18px] font-extrabold tracking-[-0.03em] text-white">
                    Synergy<span className="text-accent-light">So</span>
                  </span>
                </div>
                <p className="max-w-[32ch] font-mono text-[12px] leading-[1.7] text-white/45">
                  The listing your out-of-town buyer can finally walk. Built by
                  agents, for agents.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-[30px]">
                {[
                  { label: "About",         href: "#about" },
                  { label: "How It Works",  href: "#how" },
                  { label: "Why Us",        href: "#why" },
                  { label: "Contact",       href: "#contact" },
                  { label: "hello@synergyso.com", href: "mailto:hello@synergyso.com" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="font-mono text-[13px] text-white/45 transition hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-[26px]">
              <span className="font-mono text-[11px] text-white/26">© 2026 SYNERGYSO · NEW YORK</span>
              <span className="font-mono text-[11px] text-white/26">HELLO@SYNERGYSO.COM</span>
            </div>
          </div>
        </footer>
      </div>
      <AnimationObservers />
    </>
  );
}
