"use client";

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-10 lg:p-14">

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 text-center">

        <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          OMNI AI Pricing
        </span>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
          Choose Your Plan
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          Start with our free plan and upgrade whenever you need
          more AI power. Whether you're a student, developer,
          creator or business user, OMNI AI has a plan built for you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <div className="rounded-full border border-green-700 bg-green-950 px-5 py-2 text-sm font-semibold text-green-400">
            ✓ No Hidden Charges
          </div>

          <div className="rounded-full border border-cyan-700 bg-cyan-950 px-5 py-2 text-sm font-semibold text-cyan-400">
            ✓ Cancel Anytime
          </div>

          <div className="rounded-full border border-yellow-700 bg-yellow-950 px-5 py-2 text-sm font-semibold text-yellow-400">
            🎉 Launch Offer Available
          </div>

        </div>

      </div>

    </section>
  );
}