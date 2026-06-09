"use client";

import { useEffect } from "react";

function reveal(el: HTMLElement) {
  el.dataset.inview = "true";
}

function isInViewport(rect: DOMRect, pad = 80) {
  return rect.bottom > -pad && rect.top < (typeof window !== "undefined" ? window.innerHeight : 800) + pad;
}

export default function AnimationObservers() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]")) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" }
    );

    const syncImmediate = () => {
      targets.forEach((el) => {
        if (el.dataset.inview === "true") return;
        if (isInViewport(el.getBoundingClientRect())) reveal(el);
      });
    };

    targets.forEach((el, idx) => {
      el.style.transitionDelay = `${(idx % 6) * 0.06}s`;
      observer.observe(el);
    });

    syncImmediate();
    requestAnimationFrame(syncImmediate);

    window.addEventListener("resize", syncImmediate);

    return () => {
      window.removeEventListener("resize", syncImmediate);
      observer.disconnect();
    };
  }, []);

  return null;
}
