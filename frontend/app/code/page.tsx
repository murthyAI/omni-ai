"use client";

import { useState } from "react";

export default function CodePage() {
  const [prompt, setPrompt] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateCode() {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setCodeOutput("Generating code...");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `You are OMNI AI Code Assistant. Generate clean, working code for this request. Explain briefly if needed.\n\nRequest: ${prompt}`,
      }),
    });

    const data = await res.json();

    setCodeOutput(data.reply || "No code generated.");
    setLoading(false);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(codeOutput);
    alert("Code copied ✅");
  }

  function downloadCode() {
    const blob = new Blob([codeOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "omni-ai-code.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-cyan-400">Code Generator</h1>

        <p className="mt-2 text-zinc-400">
          Generate, explain and debug code with OMNI AI.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <label className="text-sm font-semibold text-zinc-300">
              Code Request
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create a responsive login page using React and Tailwind CSS..."
              className="mt-3 min-h-[280px] w-full rounded-xl border border-zinc-800 bg-black p-4 text-white outline-none focus:border-cyan-400"
            />

            <button
              onClick={generateCode}
              className="mt-4 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-zinc-200"
            >
              {loading ? "Generating..." : "Generate Code"}
            </button>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-300">Output</p>

              <div className="flex gap-3 text-lg text-zinc-400">
                <button title="Copy Code" onClick={copyCode} className="hover:text-cyan-400">
                  📋
                </button>
                <button title="Download Code" onClick={downloadCode} className="hover:text-cyan-400">
                  ⬇️
                </button>
                <button title="Share Code" className="hover:text-cyan-400">
                  🔗
                </button>
              </div>
            </div>

            <pre className="min-h-[330px] overflow-auto rounded-xl border border-zinc-800 bg-black p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
              {codeOutput || "Generated code will appear here..."}
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
}