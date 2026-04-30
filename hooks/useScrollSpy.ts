"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] || "");

  useEffect(() => {
    const handler = () => {
      let current = ids[0] || "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 96) current = id;
      }
      setActiveId(current);
    };

    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);

  return activeId;
}
