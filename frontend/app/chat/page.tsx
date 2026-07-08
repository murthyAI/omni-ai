export default function ChatPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-cyan-400">AI Chat</h1>
        <p className="mt-2 text-zinc-400">
          Chat with OMNI AI and get instant answers.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="min-h-[350px] rounded-xl border border-zinc-800 bg-black p-4 text-zinc-500">
            Your conversation will appear here...
          </div>

          <div className="mt-4 flex gap-3">
            <input
              placeholder="Ask OMNI AI anything..."
              className="flex-1 rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200">
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}