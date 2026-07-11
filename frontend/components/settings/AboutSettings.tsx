"use client";

export default function AboutSettings() {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">
        About OMNI AI
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        AI Assistant for Chat, Images, Code, Documents and much more.
      </p>

      <div className="mt-6 space-y-4">

        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <h3 className="font-semibold text-cyan-400">
            Version
          </h3>

          <p className="mt-2 text-zinc-300">
            OMNI AI Version 1.0.0 Beta
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <h3 className="font-semibold text-cyan-400">
            Privacy Policy
          </h3>

          <p className="mt-2 text-zinc-300">
            Your conversations remain private. Future cloud sync will be
            protected through secure authentication.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <h3 className="font-semibold text-cyan-400">
            Terms & Conditions
          </h3>

          <p className="mt-2 text-zinc-300">
            By using OMNI AI you agree to use the platform responsibly and
            comply with all applicable laws.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <h3 className="font-semibold text-cyan-400">
            Developer
          </h3>

          <p className="mt-2 text-zinc-300">
            Developed by OMNI AI Team
          </p>
        </div>

      </div>
    </section>
  );
}