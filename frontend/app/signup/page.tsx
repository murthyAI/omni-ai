export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          OMNI AI
        </p>

        <h1 className="mb-2 text-3xl font-bold">Create Account</h1>

        <p className="mb-8 text-zinc-400">
          Start your journey with OMNI AI Version 1.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <button className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200">
            Sign Up
          </button>

          <button className="w-full rounded-xl border border-zinc-700 py-3 font-semibold text-white hover:bg-zinc-900">
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </section>
    </main>
  );
}