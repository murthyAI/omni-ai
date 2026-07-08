"use client";

import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          OMNI AI • VERSION 1
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to OMNI AI
        </h1>

        <p className="text-xl md:text-2xl text-zinc-300 mb-8">
          The All-in-One AI Platform for Chat, Images and Coding.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
  href="/login"
  className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200"
>
  Start Building
</Link>

<Link
  href="/dashboard"
  className="rounded-full border border-zinc-700 px-6 py-3 font-semibold text-white hover:bg-zinc-900"
>
  View Roadmap
</Link>
        </div>

        <p className="mt-10 text-sm text-zinc-500">
          Version 1 Development Started 🚀
        </p>
      </section>
    </main>
  );
}