"use client";

import { useState } from "react";

const models = [
  "Gemini 2.5 Flash",
  "Gemini 2.5 Flash Lite",
  "Gemini 2.5 Pro",
  "OpenAI GPT-5.5",
  "Claude 4 Sonnet",
];

export default function AIModelSettings() {
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash");

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">
        AI Model
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Choose the AI model you want OMNI AI to use.
      </p>

      <div className="mt-6 space-y-3">
        {models.map((model) => (
          <button
            key={model}
            type="button"
            onClick={() => setSelectedModel(model)}
            className={`w-full rounded-xl border px-4 py-3 text-left transition ${
              selectedModel === model
                ? "border-cyan-500 bg-cyan-500 text-black"
                : "border-zinc-800 bg-black text-white hover:border-cyan-400"
            }`}
          >
            {model}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-cyan-400">
        Current Model: <strong>{selectedModel}</strong>
      </p>
    </section>
  );
}