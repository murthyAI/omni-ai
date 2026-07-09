"use client";

import AddMenu from "@/components/AddMenu";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
  fileName?: string;
  filePreview?: string;
};

export default function ChatPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState("");

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hello! Welcome to OMNI AI. How can I help you today?",
    },
  ]);

  useEffect(() => {
    if (loading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Copied ✅");
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleFileSelect(file?: File) {
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setSelectedPreview(url);
    } else {
      setSelectedPreview("");
    }

    setShowAddMenu(false);
  }

  async function sendMessage() {
    if ((!message.trim() && !selectedFile) || loading) return;

    const userMessage =
      message || "Please analyze this uploaded image clearly.";

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
        fileName: selectedFile?.name,
        filePreview: selectedPreview,
      },
    ]);

    setMessage("");
    setLoading(true);

    let imagePayload = null;

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const base64Data = await fileToBase64(selectedFile);

      imagePayload = {
        mimeType: selectedFile.type,
        data: base64Data,
      };
    }

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        image: imagePayload,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: data.reply || "No response received.",
      },
    ]);

    setSelectedFile(null);
    setSelectedPreview("");
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
                  <p className="font-semibold text-cyan-300">
                    {item.role === "user" ? "You" : "🤖 OMNI AI"}
                  </p>

                  {item.filePreview && (
                    <img
                      src={item.filePreview}
                      alt="Uploaded preview"
                      className="mt-3 max-h-56 rounded-xl border border-zinc-700"
                    />
                  )}

                  {item.fileName && (
                    <p className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-sm">
                      📎 {item.fileName}
                    </p>
                  )}

                  <p className="mt-2 whitespace-pre-wrap">{item.text}</p>

                  <div className="mt-3 flex gap-3 text-lg opacity-80">
                    <button title="Copy" onClick={() => copyText(item.text)}>
                      📋
                    </button>

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
                  🤖 OMNI AI is analyzing...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {selectedFile && (
            <div className="mt-4 rounded-xl border border-zinc-800 bg-black p-3">
              <p className="text-sm text-zinc-300">
                Selected: {selectedFile.name}
              </p>

              {selectedPreview && (
                <img
                  src={selectedPreview}
                  alt="Selected preview"
                  className="mt-3 max-h-40 rounded-xl border border-zinc-700"
                />
              )}
            </div>
          )}

          <div className="relative mt-5 flex gap-2">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="rounded-xl border border-zinc-700 px-4 py-3"
              title="Add"
            >
              +
            </button>

            <AddMenu
              isOpen={showAddMenu}
              onCamera={() => cameraInputRef.current?.click()}
              onGallery={() => galleryInputRef.current?.click()}
              onFiles={() => fileInputRef.current?.click()}
              onCreateImage={() => router.push("/image")}
              onDeepResearch={() =>
                alert("Deep Research will be available soon.")
              }
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.csv,.zip,.js,.ts,.tsx,.jsx,.dart,.py,.java,.html,.css"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

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