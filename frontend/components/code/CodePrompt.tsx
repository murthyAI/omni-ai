"use client";

import LanguageSelector from "./LanguageSelector";

type CodePromptProps = {
  prompt: string;
  selectedLanguage: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onLanguageChange: (language: string) => void;
  onGenerate: () => void;
};

export default function CodePrompt({
  prompt,
  selectedLanguage,
  loading,
  onPromptChange,
  onLanguageChange,
  onGenerate,
}: CodePromptProps) {
  function handleGenerate() {
    if (!prompt.trim() || loading) return;

    onGenerate();
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Generate Code
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Describe what you want to build. OMNI AI will generate clean,
          structured and working code.
        </p>
      </div>

      <div className="mt-6">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          loading={loading}
          onLanguageChange={onLanguageChange}
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="code-request"
          className="text-sm font-semibold text-zinc-300"
        >
          Code Request
        </label>

        <textarea
          id="code-request"
          value={prompt}
          disabled={loading}
          maxLength={8000}
          onChange={(event) =>
            onPromptChange(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              event.ctrlKey &&
              !loading
            ) {
              event.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Example: Create a responsive login page using React, TypeScript and Tailwind CSS with form validation..."
          className="mt-3 min-h-[280px] w-full resize-y rounded-xl border border-zinc-800 bg-black p-4 leading-7 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="mt-2 flex items-center justify-between gap-4 text-xs text-zinc-500">
          <span>
            Press Ctrl + Enter to generate
          </span>

          <span>
            {prompt.length} / 8000
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 bg-black p-4">
        <p className="text-sm font-semibold text-cyan-400">
          Prompt Tips
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Mention the framework, features, design style, validation rules
          and expected output format for better results.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-5 flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            Generating Code...
          </>
        ) : (
          "Generate Code"
        )}
      </button>
    </section>
  );
}