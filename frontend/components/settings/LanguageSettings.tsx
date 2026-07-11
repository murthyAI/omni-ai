"use client";

import { useState } from "react";

export default function LanguageSettings() {
  const [language, setLanguage] = useState("English");

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">
        Language
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Select your preferred language.
      </p>

      <div className="mt-6 space-y-3">
        {["English", "తెలుగు"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            className={`w-full rounded-xl border px-4 py-3 text-left transition ${
              language === item
                ? "border-cyan-500 bg-cyan-500 text-black"
                : "border-zinc-800 bg-black text-white hover:border-cyan-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-cyan-400">
        Current Language: <strong>{language}</strong>
      </p>
    </section>
  );
}