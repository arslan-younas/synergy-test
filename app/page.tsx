import AnimationObservers from "@/components/landing/AnimationObservers";
// import ScrollProgress from "@/components/landing/ScrollProgress";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import Marquee from "@/components/landing/Marquee";
import StatsStrip from "@/components/landing/StatsStrip";
import WedgeSection from "@/components/landing/WedgeSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AILayerSection from "@/components/landing/AILayerSection";
import BentoSection from "@/components/landing/BentoSection";
import MatrixSection from "@/components/landing/MatrixSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FounderSection from "@/components/landing/FounderSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      {/* <ScrollProgress /> */}
      <div className="pointer-events-none fixed inset-0 z-[3] opacity-[0.03] [&_svg]:h-full [&_svg]:w-full">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <filter id="noiseGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix values="0 0 0 0 0.45, 0 0 0 0 0.45, 0 0 0 0 0.58, 0 0 0 1 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#noiseGrain)" />
        </svg>
      </div>

      <div className="relative z-[2]">
        <NavBar />
        <HeroSection />
        <Marquee />
        <StatsStrip />
        <WedgeSection />
        <ProblemSection />
        <ShowcaseSection />
        <HowItWorksSection />
        <AILayerSection />
        <BentoSection />
        <MatrixSection />
        <PricingSection />
        <TestimonialsSection />
        <FounderSection />
        <CTASection />
        <footer className="relative z-[2] flex flex-wrap items-center justify-between gap-5 border-t border-black/10 bg-brand-surface px-6 py-10 lg:px-[52px] lg:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-7">
            <div className="font-serif text-[15px] font-medium">
              Synergy<em className="text-brand-violet not-italic">So</em>
            </div>
            <nav className="flex flex-wrap gap-5 lg:gap-6">
              {["Privacy", "Terms", "LinkedIn", "Documentation"].map((l) => (
                <a key={l} href="#" className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-black/55 transition hover:text-brand-violet">
                  {l}
                </a>
              ))}
            </nav>
          </div>
          <p className="max-w-xl font-mono text-[10px] uppercase tracking-[0.1em] text-black/45">
            © 2026 SynergySo · Architectural Intelligence for the Visionary Market
          </p>
        </footer>
      </div>
      <AnimationObservers />
    </>
  );
}
