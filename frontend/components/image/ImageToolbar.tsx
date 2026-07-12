"use client";

type ImageToolbarProps = {
  imageUrl: string;
  loading: boolean;
  onRegenerate: () => void;
};

export default function ImageToolbar({
  imageUrl,
  loading,
  onRegenerate,
}: ImageToolbarProps) {
  function downloadImage() {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `omni-ai-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!imageUrl) return null;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-xl font-bold text-white">
        Image Actions
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Download your generated image or generate a new variation.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={downloadImage}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
        >
          ⬇️ Download Image
        </button>

        <button
          type="button"
          onClick={onRegenerate}
          disabled={loading}
          className="rounded-xl border border-zinc-700 bg-black px-5 py-3 font-bold text-white transition hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating..." : "🔄 Regenerate"}
        </button>
      </div>
    </section>
  );
}