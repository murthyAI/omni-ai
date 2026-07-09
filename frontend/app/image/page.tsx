"use client";

import { useState } from "react";

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setImageUrl("");

    const res = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.image) {
      setImageUrl(data.image);
    } else {
      alert(data.error || "Image generation failed.");
    }

    setLoading(false);
  }

  function downloadImage() {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "omni-ai-image.png";
    link.click();
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    alert("Prompt copied ✅");
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-cyan-400">Image Generator</h1>

        <p className="mt-2 text-zinc-400">
          Create AI images from your imagination.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="text-sm font-semibold text-zinc-300">
              Image Prompt
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A futuristic AI robot helping students in a digital classroom..."
              className="mt-3 min-h-[280px] w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400"
            />

            <button
              onClick={generateImage}
              className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200"
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-300">Preview</p>

              <div className="flex gap-3 text-lg text-zinc-400">
                <button title="Copy Prompt" onClick={copyPrompt} className="hover:text-cyan-400">
                  📋
                </button>
                <button title="Download" onClick={downloadImage} className="hover:text-cyan-400">
                  ⬇️
                </button>
                <button title="Share" className="hover:text-cyan-400">
                  🔗
                </button>
                <button title="Save" className="hover:text-cyan-400">
                  ❤️
                </button>
              </div>
            </div>

            <div className="flex min-h-[330px] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-black text-center text-zinc-500">
              {loading && <p>Generating image...</p>}

              {!loading && imageUrl && (
                <img
                  src={imageUrl}
                  alt="Generated image"
                  className="max-h-[330px] rounded-xl"
                />
              )}

              {!loading && !imageUrl && (
                <p>Your generated image preview will appear here.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}