"use client";

import { useCountUp } from "@/hooks/useCountUp";

function Stat({
  id,
  target,
  pre = "",
  post = "",
  label,
}: {
  id: string;
  target: number;
  pre?: string;
  post?: string;
  label: string;
}) {
  const { value, ref } = useCountUp(target, 1400);
  return (
    <div ref={ref} className="relative px-5 text-center lg:border-r lg:border-black/10 lg:last:border-r-0">
      <div className="font-display text-5xl font-normal leading-none tracking-[-0.025em]">
        {pre}
        <em id={id} className="not-italic text-primary">
          {value}
        </em>
        {post}
      </div>
      <div className="mt-2 text-[11px] font-normal uppercase tracking-[0.08em] text-on-surface-variant">{label}</div>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-b border-outline-variant/30 bg-surface-container-lowest px-6 py-7 backdrop-blur-md lg:grid-cols-4 lg:gap-0 lg:px-[52px] lg:py-10">
      <Stat id="s1" target={15} post=" min" label="to capture any property" />
      <Stat id="s2" target={0} pre="$" label="contractor fees, ever" />
      <Stat id="s3" target={3} post="×" label="more buyer inquiries" />
      <Stat id="s4" target={100} post="%" label="no app install required" />
    </div>
  );
}
