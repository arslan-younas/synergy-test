"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";

const links = [
  { href: "#wedge", label: "The Wedge", id: "wedge" },
  { href: "#how", label: "How it works", id: "how" },
  { href: "#ai", label: "AI Layer", id: "ai" },
  { href: "#matrix", label: "Compare", id: "matrix" },
  { href: "#pricing", label: "Pricing", id: "pricing" },
];

function joinClass() {
  return "rounded-full bg-brand-violet-deep px-[22px] py-2.5 text-xs font-semibold tracking-[0.03em] text-white transition-colors duration-200 hover:bg-brand-violet";
}

function linkClass(active: boolean) {
  return [
    "relative whitespace-nowrap text-[13px] text-black/60 transition-colors after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-px after:bg-brand-violet after:transition-transform after:content-['']",
    active ? "text-brand-violet after:scale-x-100" : "after:scale-x-0 hover:text-brand-violet hover:after:scale-x-100",
  ].join(" ");
}

export default function NavBar() {
  const active = useScrollSpy(links.map((l) => l.id));

  return (
    <nav className="sticky top-0 z-[100] border-b border-black/10 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-3.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-[52px] lg:py-4">
        <div className="flex items-center justify-between lg:justify-start">
          <a href="#" className="flex items-center gap-2.5 font-serif text-[22px] font-medium tracking-tight text-brand-text">
            <span className="relative h-[22px] w-[22px] shrink-0 rounded border border-brand-violet after:absolute after:inset-[3px] after:rounded-[2px] after:border after:border-brand-violet" />
            Synergy<em className="italic font-normal text-brand-violet">So</em>
          </a>
          <a href="#cta" className={`${joinClass()} shrink-0 lg:hidden`}>
            Join Pilot
          </a>
        </div>

        <ul className="-mx-1 flex list-none items-center gap-6 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] sm:gap-8 lg:flex-1 lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <li key={link.id} className="shrink-0">
              <a href={link.href} className={linkClass(active === link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#cta" className={`${joinClass()} hidden lg:inline-flex`}>
          Join Pilot
        </a>
      </div>
    </nav>
  );
}
