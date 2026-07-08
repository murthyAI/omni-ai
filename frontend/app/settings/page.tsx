export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold text-cyan-400">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your OMNI AI preferences.
        </p>

        <div className="mt-8 space-y-6">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold">👤 Profile</h2>
            <p className="mt-2 text-zinc-400">
              User: Murthy
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold">
              🌙 Theme
            </h2>

            <div className="mt-4 flex gap-4">
              <button className="rounded-xl bg-white px-6 py-2 text-black">
                Dark
              </button>

              <button className="rounded-xl border border-zinc-700 px-6 py-2">
                Light
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold">
              🌐 Language
            </h2>

            <div className="mt-4 flex gap-4">
              <button className="rounded-xl bg-cyan-500 px-6 py-2">
                English
              </button>

              <button className="rounded-xl border border-zinc-700 px-6 py-2">
                తెలుగు
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold">
              📊 Free Plan
            </h2>

            <p className="mt-2 text-zinc-400">
              Messages Today
            </p>

            <p className="mt-2 text-3xl font-bold text-cyan-400">
              0 / 20
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}