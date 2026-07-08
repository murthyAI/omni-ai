export default function ImagePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-cyan-400">Image Generator</h1>
        <p className="mt-2 text-zinc-400">
          Create beautiful AI images from your text prompts.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <textarea
              placeholder="Describe the image you want to create..."
              className="min-h-[220px] w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400"
            />

            <button className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200">
              Generate Image
            </button>
          </section>

          <section className="flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">
            Generated image preview will appear here.
          </section>
        </div>
      </div>
    </main>
  );
}