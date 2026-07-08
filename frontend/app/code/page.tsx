export default function CodePage() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-cyan-400">Code Generator</h1>

        <p className="mt-2 text-zinc-400">
          Generate, explain and debug code with OMNI AI.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="text-sm font-semibold text-zinc-300">
              Code Request
            </label>

            <textarea
              placeholder="Example: Create a responsive login page using React and Tailwind CSS..."
              className="mt-3 min-h-[280px] w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400"
            />

            <button className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200">
              Generate Code
            </button>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="mb-3 text-sm font-semibold text-zinc-300">
              Output
            </p>

            <div className="min-h-[330px] rounded-xl border border-zinc-800 bg-black p-4 font-mono text-sm text-green-400">
              Generated code will appear here...
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}