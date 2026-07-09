"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "Hello! Welcome to OMNI AI. How can I help you today?"
  );
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setReply(data.reply || "No response received.");
    setLoading(false);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-cyan-400">AI Chat</h1>

        <p className="mt-2 text-zinc-400">
          Chat with OMNI AI and get real AI answers.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="min-h-[350px] rounded-xl border border-zinc-800 bg-black p-4">
            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="font-semibold text-cyan-400">🤖 OMNI AI</p>

              <p className="mt-2 whitespace-pre-wrap">
                {loading ? "Thinking..." : reply}
              </p>

              <div className="mt-4 flex gap-3 text-xl">
                <button title="Copy">📋</button>
                <button title="Like">👍</button>
                <button title="Dislike">👎</button>
                <button title="Regenerate">🔄</button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button className="rounded-xl border border-zinc-700 px-4 py-3">
              +
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none"
              placeholder="Ask OMNI AI anything..."
            />

            <button className="rounded-xl border border-zinc-700 px-4 py-3">
              🎤
            </button>

            <button
              onClick={sendMessage}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}