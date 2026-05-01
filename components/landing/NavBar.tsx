"use client";

import { useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { id: "workflow", label: "How It Works" },
  { id: "wedge", label: "The Wedge" },
  { id: "compare", label: "Compare" },
  { id: "pricing", label: "Pricing" },
] as const;

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>("");

  const items = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (!sections.length) return;

    const offset = 140;
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY + offset;
      let nextActive = "";

      for (const section of sections) {
        if (section.offsetTop <= scrollY) {
          nextActive = section.id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === nextActive ? prev : nextActive));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold tracking-tighter text-white">SynergySo</div>
        <div className="hidden space-x-8 md:flex">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-violet-400 pb-1 text-violet-400 transition-colors hover:text-violet-300"
                    : "text-slate-400 transition-colors hover:text-violet-300"
                }
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <a href="#cta" className="rounded bg-[#7f33ff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0px_4px_20px_rgba(127,51,255,0.2)] transition hover:bg-[#6f22f0]">
          Join waitlist
        </a>
      </div>
    </nav>
  );
}
