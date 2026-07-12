"use client";

type ImagePromptProps = {
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
};

export default function ImagePrompt({
  prompt,
  loading,
  onPromptChange,
  onGenerate,
}: ImagePromptProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Create Your Image
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Describe the image you want OMNI AI to generate.
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="image-prompt"
          className="text-sm font-semibold text-zinc-300"
        >
          Image Prompt
        </label>

        <textarea
          id="image-prompt"
          value={prompt}
          onChange={(event) =>
            onPromptChange(event.target.value)
          }
          disabled={loading}
          maxLength={2048}
          placeholder="Example: A futuristic AI robot teaching mathematics in a digital classroom, cinematic lighting, highly detailed..."
          className="mt-3 min-h-[280px] w-full resize-none rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
          <span>Describe the subject, style, lighting and background.</span>

          <span>{prompt.length} / 2048</span>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 bg-black p-4">
        <p className="text-sm font-semibold text-cyan-400">
          Prompt Tips
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          For better results, mention the subject, environment,
          art style, camera angle, colours and lighting.
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-5 w-full rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Generating Image..." : "Generate Image"}
      </button>
    </section>
  );
}