export default function ImagePage() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-cyan-400">Image Generator</h1>

        <p className="mt-2 text-zinc-400">
          Turn your imagination into AI-generated images.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="text-sm font-semibold text-zinc-300">
              Image Prompt
            </label>

            <textarea
              placeholder="Example: A futuristic AI robot helping students..."
              className="mt-3 min-h-[280px] w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400"
            />

            <button className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200">
              Generate Image
            </button>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-300">Preview</p>

              <div className="flex gap-3 text-lg text-zinc-400">
                <button title="Copy Image" className="hover:text-cyan-400">📋</button>
                <button title="Download" className="hover:text-cyan-400">⬇️</button>
                <button title="Share" className="hover:text-cyan-400">🔗</button>
                <button title="Save" className="hover:text-cyan-400">❤️</button>
              </div>
            </div>

            <div className="flex min-h-[330px] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-black text-center text-zinc-500">
              Your generated image preview will appear here.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}