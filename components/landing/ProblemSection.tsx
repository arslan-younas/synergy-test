export default function ProblemSection() {
  return (
    <section className="bg-surface-container-lowest py-[110px]">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 md:px-12 lg:grid-cols-2">
        <div className="space-y-5">
          <h3 className="font-display text-[34px] font-bold text-on-surface">Why now</h3>
          {[
            ["1", "Remote buyers are everywhere", "Post-pandemic, relocating and time-constrained buyers are a growing share of every transaction."],
            ["2", "2D photos hide what matters", "Spatial feel, adjacency, natural light, and true dimensions are lost in static images."],
            ["3", "The hardware exists. The product didn't.", "LiDAR, WebGL, and modern AI are ready. SynergySo combines all three in one workflow."],
          ].map(([n, title, body]) => (
            <div key={n} className="flex gap-4">
              <span className="font-display text-5xl text-primary/25">{n}</span>
              <div>
                <h4 className="text-lg font-semibold text-on-surface">{title}</h4>
                <p className="text-on-surface-variant">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8">
          <h4 className="mb-3 font-display text-2xl font-semibold text-on-surface">Outcome</h4>
          <p className="text-on-surface-variant">
            Capture fast, share instantly, and answer buyer questions in context. SynergySo removes friction from both sides of the transaction and helps agents close
            with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
