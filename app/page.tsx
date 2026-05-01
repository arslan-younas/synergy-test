import AnimationObservers from "@/components/landing/AnimationObservers";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WedgeSection from "@/components/landing/WedgeSection";
import ProblemComparisonSection from "@/components/landing/ProblemComparisonSection";
import MatrixSection from "@/components/landing/MatrixSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import BuyerTourSectionLoader from "@/components/landing/BuyerTourSectionLoader";
import AILayerSection from "@/components/landing/AILayerSection";
// import BentoSection from "@/components/landing/BentoSection";

export default function Home() {
  return (
    <>
      <div className="relative z-2">
        <NavBar />
        <main className="pb-28">
          <HeroSection />
          <HowItWorksSection />
          <WedgeSection />
          <ProblemComparisonSection />
          <MatrixSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
          <BuyerTourSectionLoader />
          <AILayerSection />
          {/* <BentoSection /> */}
        </main>
        <footer id="footer" className="w-full border-t border-slate-900 bg-slate-950 px-8 py-12 text-sm leading-relaxed text-violet-400">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md space-y-3">
              <div className="text-lg font-bold text-white">SynergySo</div>
              <p className="text-slate-400">Transforming real estate visualization through precision technology and elegant design.</p>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href="#workflow" className="text-slate-400 transition duration-200 hover:text-violet-300">Features</a>
              <a href="#wedge" className="text-slate-400 transition duration-200 hover:text-violet-300">The Wedge</a>
              <a href="#compare" className="text-slate-400 transition duration-200 hover:text-violet-300">Compare</a>
              <a href="#pricing" className="text-slate-400 transition duration-200 hover:text-violet-300">Pricing</a>
              <a href="#cta" className="text-slate-400 transition duration-200 hover:text-violet-300">Join waitlist</a>
            </nav>
          </div>
          <div className="mx-auto mt-8 max-w-7xl border-t border-slate-900 pt-5 text-center">
            <p className="text-slate-500">© 2026 SynergySo 3D Technologies. Precision in Every Pixel.</p>
          </div>
        </footer>
      </div>
      <AnimationObservers />
    </>
  );
}
