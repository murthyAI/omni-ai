"use client";

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-10">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-cyan-400" />

      <h2 className="mt-6 text-2xl font-bold text-white">
        Generating your image...
      </h2>

      <p className="mt-3 max-w-md text-center text-zinc-400">
        OMNI AI is creating your image using AI.
        Please wait a few seconds.
      </p>

      <div className="mt-8 flex gap-2">
        <div className="h-3 w-3 animate-bounce rounded-full bg-cyan-400" />

        <div
          className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.2s" }}
        />

        <div
          className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}