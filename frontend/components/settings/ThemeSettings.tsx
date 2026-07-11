"use client";

import { useState } from "react";

export default function ThemeSettings() {
  const [theme, setTheme] = useState("Dark");

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">
        Theme
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Choose your preferred appearance.
      </p>

      <div className="mt-6 space-y-3">
        {["Dark", "Light", "System"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTheme(item)}
            className={`w-full rounded-xl border px-4 py-3 text-left transition ${
              theme === item
                ? "border-cyan-500 bg-cyan-500 text-black"
                : "border-zinc-800 bg-black text-white hover:border-cyan-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-cyan-400">
        Current Theme: <strong>{theme}</strong>
      </p>
    </section>
  );
}