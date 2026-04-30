/** Shared Tailwind class strings for scroll reveals (pair with data-reveal + AnimationObservers). */
export const revealY =
  "opacity-0 translate-y-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0";

export const revealX =
  "opacity-0 translate-x-[22px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-x-0";

export const stepReveal =
  "relative overflow-hidden opacity-0 translate-y-[22px] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-transparent before:via-brand-violet before:to-transparent before:transition-transform before:duration-700 before:[transition-delay:100ms] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:before:scale-x-100";
