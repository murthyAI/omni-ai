"use client";

import { useState } from "react";

export default function ChatPage() {
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-cyan-400">AI Chat</h1>

        <p className="mt-2 text-zinc-400">
          Chat with OMNI AI and get instant answers.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="h-[400px] overflow-y-auto rounded-xl border border-zinc-800 bg-black p-4 space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl bg-zinc-900 px-4 py-3">
                <p className="font-semibold text-cyan-400">OMNI AI</p>
                <p className="mt-1">
                  Hello! 👋 Welcome to OMNI AI. How can I help you today?
                </p>

                <div className="mt-3 flex gap-3 text-lg text-zinc-400">
                  <button title="Copy" className="hover:text-cyan-400">📋</button>
                  <button title="Like" className="hover:text-cyan-400">👍</button>
                  <button title="Dislike" className="hover:text-cyan-400">👎</button>
                  <button title="Regenerate" className="hover:text-cyan-400">↻</button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl bg-cyan-600 px-4 py-3 text-white">
                <p className="text-xs font-semibold text-cyan-100">You</p>
                <p className="mt-1">Hello OMNI AI!</p>

                <div className="mt-3 flex justify-end gap-3 text-lg text-cyan-100">
                  <button title="Copy" className="hover:text-white">📋</button>
                  <button title="Share" className="hover:text-white">🔗</button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-xl hover:border-cyan-400"
              title="Add"
            >
              +
            </button>

            {showAddMenu && (
              <div className="absolute bottom-16 left-0 w-64 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
                  📷 Camera
                </button>
                <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
                  🖼️ Photos / Gallery
                </button>
                <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
                  📎 Files / PDF
                </button>
                <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
                  🎨 Create Image
                </button>
                <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
                  🔎 Deep Research
                </button>
              </div>
            )}

            <input
              placeholder="Ask OMNI AI anything..."
              className="flex-1 rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <button
              className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-xl hover:border-cyan-400"
              title="Voice"
            >
              🎤
            </button>

            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200">
              ➤
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}