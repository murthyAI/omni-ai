"use client";

export default function LoadingAnimation() {
  return (
    <section className="flex min-h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="text-center">
        <div className="mx-auto flex w-fit gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
        </div>

        <p className="mt-6 text-lg font-semibold text-white">
          OMNI AI is generating your code...
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Please wait a few seconds.
        </p>
      </div>
    </section>
  );
}