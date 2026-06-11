"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Why Us",       href: "#why" },
  { label: "Contact",      href: "#contact" },
] as const;

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[200] flex h-[70px] items-center justify-between px-10 transition-all duration-300 max-sm:px-5 ${
        scrolled
          ? "border-b border-white/8 bg-[rgba(7,7,10,0.78)] backdrop-blur-[18px]"
          : "border-b border-transparent"
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-[10px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="200 60 500 400" height="32" style={{ display: "block", flexShrink: 0 }}>
          <circle cx="400" cy="250" r="170" fill="none" stroke="#C89B2B" strokeWidth="24" />
          <path d="M400 420 C470 300 560 220 650 220 C610 320 540 400 430 470 Z" fill="none" stroke="#4F8F43" strokeWidth="24" />
          <path d="M300 350 C340 300 390 280 440 290 C410 340 370 380 320 400 Z" fill="#67B35A" />
          <path d="M470 360 C510 310 560 290 610 300 C580 350 540 390 490 410 Z" fill="#67B35A" />
        </svg>
        <span className="text-[18px] font-extrabold tracking-[-0.03em] text-white">
          Synergy<span className="text-accent-light">So</span>
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden items-center gap-[34px] md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="font-mono text-[12px] tracking-[0.04em] text-white/45 transition-colors duration-150 hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a
        href="#contact"
        className="hidden rounded-full border border-white/8 px-[18px] py-[10px] font-mono text-[12px] tracking-[0.04em] text-white transition hover:border-accent hover:bg-accent/12 md:inline-block"
      >
        Get in Touch
      </a>

      {/* Mobile links (simple inline) */}
      <div className="flex items-center gap-5 md:hidden">
        {NAV_LINKS.slice(0, 2).map(({ label, href }) => (
          <a key={label} href={href} className="font-mono text-[11px] text-white/45 hover:text-white">
            {label}
          </a>
        ))}
        <a href="#contact" className="rounded-full border border-white/8 px-3 py-1.5 font-mono text-[11px] text-white">
          Contact
        </a>
      </div>
    </nav>
  );
}
