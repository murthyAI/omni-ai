import Link from "next/link";
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-cyan-400">
          OMNI AI Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Welcome to Version 1 Dashboard
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
  href="/chat"
  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 hover:border-cyan-400 hover:bg-zinc-900"
>
  <h2 className="text-xl font-bold">💬 AI Chat</h2>
  <p className="mt-2 text-zinc-400">
    Ask questions and chat with AI.
  </p>
</Link>

          <Link
  href="/image"
  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 hover:border-cyan-400 hover:bg-zinc-900"
>
  <h2 className="text-xl font-bold">🎨 Image Generator</h2>
  <p className="mt-2 text-zinc-400">
    Create AI images from text prompts.
  </p>
</Link>

          <Link
  href="/code"
  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 hover:border-cyan-400 hover:bg-zinc-900"
>
  <h2 className="text-xl font-bold">💻 Code Generator</h2>
  <p className="mt-2 text-zinc-400">
    Generate code with AI.
  </p>
</Link>
        </div>
      </div>
    </main>
  );
}