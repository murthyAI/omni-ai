"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hello! Welcome to OMNI AI. How can I help you today?",
    },
  ]);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: data.reply || "No response received." },
    ]);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-cyan-400">AI Chat</h1>

        <p className="mt-2 text-zinc-400">
          Chat with OMNI AI and get real AI answers.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="h-[430px] overflow-y-auto rounded-xl border border-zinc-800 bg-black p-4 space-y-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    item.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-900 text-white"
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      item.role === "user" ? "text-cyan-100" : "text-cyan-400"
                    }`}
                  >
                    {item.role === "user" ? "You" : "🤖 OMNI AI"}
                  </p>

                  <p className="mt-2 whitespace-pre-wrap">{item.text}</p>

                  <div className="mt-3 flex gap-3 text-lg opacity-80">
                    <button title="Copy">📋</button>
                    {item.role === "ai" && (
                      <>
                        <button title="Like">👍</button>
                        <button title="Dislike">👎</button>
                        <button title="Regenerate">🔄</button>
                      </>
                    )}
                    {item.role === "user" && <button title="Share">🔗</button>}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-zinc-900 px-4 py-3 text-zinc-400">
                  🤖 OMNI AI is thinking...
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-2">
            <button className="rounded-xl border border-zinc-700 px-4 py-3">
              +
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
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