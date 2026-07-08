export default function CodePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-cyan-400">
          Code Generator
        </h1>

        <p className="mt-2 text-zinc-400">
          Generate, explain and debug code with OMNI AI.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <textarea
              placeholder="Describe the code you want..."
              className="min-h-[250px] w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400"
            />

            <button className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200">
              Generate Code
            </button>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="min-h-[250px] rounded-xl bg-black p-4 text-green-400 font-mono">
              Generated code will appear here...
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}