const ITEMS = [
  "Walk the listing from anywhere",
  "True 3D, not 360° photos",
  "Published before you leave",
] as const;

function Track() {
  return (
    <>
      {ITEMS.map((text) => (
        <span
          key={text}
          className="font-mono text-[clamp(20px,3vw,40px)] font-bold uppercase tracking-[-0.02em] text-white/16"
        >
          {text}&nbsp;<b className="text-accent">·</b>&nbsp;
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap border-y border-white/8 bg-[#0c0c11] py-[30px]"
      aria-hidden="true"
    >
      <div
        className="inline-flex gap-12"
        style={{ animation: "scrollX 26s linear infinite", willChange: "transform" }}
      >
        <Track />
        <Track />
      </div>
    </div>
  );
}
