"use client";

type ImageHistoryProps = {
  history: string[];
  onSelect: (image: string) => void;
};

export default function ImageHistory({
  history,
  onSelect,
}: ImageHistoryProps) {
  if (history.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-xl font-bold text-white">
          Image History
        </h2>

        <p className="mt-3 text-zinc-400">
          No generated images yet.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-xl font-bold text-white">
        Recent Images
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Click any image to preview it again.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {history.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(image)}
            className="overflow-hidden rounded-xl border border-zinc-800 transition hover:border-cyan-400"
          >
            <img
              src={image}
              alt={`History ${index + 1}`}
              className="h-40 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}