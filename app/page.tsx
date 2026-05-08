import AnimationObservers from "@/components/landing/AnimationObservers";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import FounderBridgeSection from "@/components/landing/FounderBridgeSection";
import ProblemComparisonSection from "@/components/landing/ProblemComparisonSection";
import WedgeSection from "@/components/landing/WedgeSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BuyerTourSectionLoader from "@/components/landing/BuyerTourSectionLoader";
import AILayerSection from "@/components/landing/AILayerSection";
import InTourCallSection from "@/components/landing/InTourCallSection";
import RedesignSection from "@/components/landing/RedesignSection";
import AgentAnalyticsSection from "@/components/landing/AgentAnalyticsSection";
import MatrixSection from "@/components/landing/MatrixSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FounderSection from "@/components/landing/FounderSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <div className="relative z-2">
        <NavBar />
        <main>
          <HeroSection />
          <FounderBridgeSection />
          <ProblemComparisonSection />
          <WedgeSection />
          <HowItWorksSection />
          <BuyerTourSectionLoader />
          <AILayerSection />
          <InTourCallSection />
          <RedesignSection />
          <AgentAnalyticsSection />
          <MatrixSection />
          <PricingSection />
          <TestimonialsSection />
          <FounderSection />
          <CTASection />
        </main>

        <footer className="border-t border-white/7 bg-ink px-6 py-[52px] pb-7 lg:px-14">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-11 grid grid-cols-1 gap-11 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <div className="mb-1 text-lg font-extrabold tracking-tight text-white">
                  Synergy<span className="text-accent-light">So</span>
                </div>
                <div className="mb-3.5 font-mono text-sm text-white/45">
                  Every listing, walkable.
                </div>
                <p className="max-w-55 text-sm leading-[1.65] text-white/45">
                  Built by agents, for agents. Starting in New York Metro. Rolling out nationally.
                </p>
              </div>

              {/* Product */}
              <div>
                <div className="mb-3.5 font-mono text-sm uppercase tracking-[0.15em] text-white/45">Product</div>
                {[
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "See a Live Tour", href: "#buyer-tour" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="mb-2 block text-sm text-white/45 transition hover:text-white">
                    {label}
                  </a>
                ))}
              </div>

              {/* Company */}
              <div>
                <div className="mb-3.5 font-mono text-sm uppercase tracking-[0.15em] text-white/45">Company</div>
                {["About", "Blog", "Contact", "Press"].map((label) => (
                  <a key={label} href="#" className="mb-2 block text-sm text-white/45 transition hover:text-white">
                    {label}
                  </a>
                ))}
              </div>

              {/* Legal */}
              <div>
                <div className="mb-3.5 font-mono text-sm uppercase tracking-[0.15em] text-white/45">Legal</div>
                {["Privacy Policy", "Terms of Service"].map((label) => (
                  <a key={label} href="#" className="mb-2 block text-sm text-white/45 transition hover:text-white">
                    {label}
                  </a>
                ))}
                <div className="mt-[18px] font-mono text-sm text-white/45">hello@synergyso.com</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-5 sm:flex-row">
              <span className="font-mono text-sm text-white/45">
                © 2026 SynergySo. Built by agents, for agents. New York.
              </span>
              <div className="flex gap-[18px]">
                {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#" className="font-mono text-sm text-white/45 transition hover:text-white/50">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
      <AnimationObservers />
    </>
  );
}
