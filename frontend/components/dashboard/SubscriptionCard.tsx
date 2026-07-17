"use client";

import Link from "next/link";

export default function SubscriptionCard() {
  return (
    <section className="rounded-2xl border border-cyan-800 bg-gradient-to-br from-cyan-950 via-zinc-950 to-black p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-cyan-600 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Coming Soon
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Upgrade to OMNI AI Pro
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            Unlock higher usage limits, faster AI responses, premium
            models, cloud history, document analysis, voice features
            and many more powerful tools in future updates.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/40 p-3">
              <span className="text-green-400">✓</span>
              <span className="text-sm text-zinc-300">
                Higher Daily Limits
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/40 p-3">
              <span className="text-green-400">✓</span>
              <span className="text-sm text-zinc-300">
                Premium AI Models
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/40 p-3">
              <span className="text-green-400">✓</span>
              <span className="text-sm text-zinc-300">
                Cloud Chat History
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/40 p-3">
              <span className="text-green-400">✓</span>
              <span className="text-sm text-zinc-300">
                Priority Support
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:w-64">
          <Link
            href="/pricing"
            className="rounded-xl bg-cyan-500 px-6 py-3 text-center font-bold text-black transition hover:bg-cyan-400"
          >
            View Pricing
          </Link>

          <button
            disabled
            className="cursor-not-allowed rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-zinc-500"
          >
            Pro Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}