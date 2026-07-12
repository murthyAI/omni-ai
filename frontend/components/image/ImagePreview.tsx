"use client";

type ImagePreviewProps = {
  imageUrl: string;
  error: string;
};

export default function ImagePreview({
  imageUrl,
  error,
}: ImagePreviewProps) {
  if (error) {
    return (
      <section className="rounded-2xl border border-red-900 bg-red-950/30 p-6">
        <h2 className="text-xl font-bold text-red-400">
          Image Generation Failed
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-red-200">
          {error}
        </p>
      </section>
    );
  }

  if (!imageUrl) {
    return (
      <section className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-6">
        <div className="text-center">
          <div className="text-7xl">🎨</div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Your AI image will appear here
          </h2>

          <p className="mt-3 text-zinc-400">
            Enter a prompt and click
            <span className="font-semibold text-cyan-400">
              {" "}
              Generate Image
            </span>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-xl font-bold text-white">
        Generated Image
      </h2>

      <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <img
          src={imageUrl}
          alt="Generated AI artwork"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}