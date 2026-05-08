"use client";

import { useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
] as const;

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && items.some((item) => item.id === initialHash)) {
      setActiveId(initialHash);
    } else if (sections[0]) {
      setActiveId(sections[0].id);
    }

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/7 bg-ink/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[60px] w-full items-center justify-between px-6 lg:px-14">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
          <span>Synergy</span>
          <span className="text-accent-light">So</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`text-[13px] font-medium transition-colors duration-150 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a
            href="#cta"
            className="rounded-md bg-accent px-5 py-[9px] text-[13px] font-semibold text-white transition hover:bg-accent-dark"
          >
            Capture Your First Tour Free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="rounded p-2 text-white/70 transition hover:text-white md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/7 bg-ink-soft px-6 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 border-t border-white/7 pt-4">
              <a
                href="#cta"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white"
              >
                Capture Your First Tour Free
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
