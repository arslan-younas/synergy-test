const items = [
  ["Brooklyn", "NY"],
  ["Manhattan", "NY"],
  ["Miami", "FL"],
  ["Los Angeles", "CA"],
  ["Austin", "TX"],
  ["Chicago", "IL"],
  ["Seattle", "WA"],
  ["Boston", "MA"],
  ["Denver", "CO"],
  ["Nashville", "TN"],
];

function Row({ loop }: { loop: typeof items }) {
  return (
    <>
      {loop.map(([city, st], i) => (
        <div
          key={`${city}-${st}-${i}`}
          className="flex shrink-0 items-center gap-12 whitespace-nowrap font-serif text-xl font-normal tracking-tight text-black/55"
        >
          <span>
            {city}, <em className="italic text-brand-violet">{st}</em>
          </span>
          <span className="text-[10px] text-brand-violet">✦</span>
        </div>
      ))}
    </>
  );
}

export default function Marquee() {
  /* Two identical runs so translateX(-50%) loops seamlessly */
  const loop = items;
  return (
    <div className="relative overflow-hidden border-y border-black/10 bg-brand-surface py-6 backdrop-blur-md">
      <div className="flex w-max flex-nowrap animate-marquee">
        <Row loop={loop} />
        <Row loop={loop} />
      </div>
    </div>
  );
}
