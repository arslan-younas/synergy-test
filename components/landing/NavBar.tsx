"use client";

import { useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { id: "wedge", label: "Features" },
  { id: "workflow", label: "How It Works" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Case Studies" },
] as const;

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const nextActive = visible[0].target.id;
        setActiveId((prev) => (prev === nextActive ? prev : nextActive));
      },
      {
        // Trigger when section occupies the middle viewport band.
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Initial state on refresh / deep-link.
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && items.some((item) => item.id === initialHash)) {
      setActiveId(initialHash);
    } else {
      setActiveId(sections[0].id);
    }

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800/80 bg-inverse-surface/90 font-display text-base font-semibold tracking-tight text-white shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5 text-xl font-bold tracking-tighter text-white">
          <span
            aria-hidden
            className="relative inline-flex h-6 w-6 items-center justify-center rounded-[6px] border border-current text-primary-container"
          >
            <span className="h-3 w-3 rounded-[2px] border border-current" />
          </span>
          <span>SynergySo</span>
        </div>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="rounded p-2 text-slate-200 transition hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <div className="hidden items-center space-x-8 md:flex">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-primary-container pb-1 font-semibold text-primary-container transition-colors hover:text-primary-container"
                    : "pb-1 font-semibold text-slate-300 transition-colors hover:text-white"
                }
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <div className="hidden items-center md:flex">
          <a
            href="#cta"
            className="rounded bg-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-[0px_4px_20px_rgba(127,51,255,0.2)] transition hover:opacity-95 active:scale-95"
          >
            Join waitlist
          </a>
        </div>
      </div>
      {isMobileMenuOpen ? (
        <div className="border-t border-slate-800 bg-inverse-surface px-6 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "text-base font-semibold text-primary-container transition-colors hover:text-primary-container"
                      : "text-base font-semibold text-slate-300 transition-colors hover:text-white"
                  }
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-2 flex flex-col gap-3 border-t border-slate-800 pt-4">
              <a
                href="#cta"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-fit rounded bg-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-[0px_4px_20px_rgba(127,51,255,0.2)]"
              >
                Join waitlist
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
