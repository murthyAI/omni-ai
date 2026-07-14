"use client";

type CodeToolbarProps = {
  output: string;
  selectedLanguage: string;
  loading: boolean;
  onRegenerate: () => void;
  onClear: () => void;
};

const fileExtensions: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  react: "tsx",
  nextjs: "tsx",
  html: "html",
  css: "css",
  tailwind: "html",
  python: "py",
  java: "java",
  dart: "dart",
  flutter: "dart",
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  php: "php",
  go: "go",
  rust: "rs",
  sql: "sql",
  json: "json",
  bash: "sh",
  auto: "txt",
};

function extractCodeBlocks(markdown: string) {
  const codeBlockPattern = /```[\w#+.-]*\n([\s\S]*?)```/g;
  const codeBlocks: string[] = [];

  let match: RegExpExecArray | null;

  while ((match = codeBlockPattern.exec(markdown)) !== null) {
    const code = match[1]?.trim();

    if (code) {
      codeBlocks.push(code);
    }
  }

  return codeBlocks.join("\n\n");
}

export default function CodeToolbar({
  output,
  selectedLanguage,
  loading,
  onRegenerate,
  onClear,
}: CodeToolbarProps) {
  const codeOnly = extractCodeBlocks(output);

  function downloadCode() {
    if (!codeOnly) {
      alert("No code block was found to download.");
      return;
    }

    const extension =
      fileExtensions[selectedLanguage] || "txt";

    const blob = new Blob([codeOnly], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `omni-ai-code-${Date.now()}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  async function shareCode() {
    if (!codeOnly) {
      alert("No code block was found to share.");
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "OMNI AI Generated Code",
          text: codeOnly,
        });

        return;
      }

      await navigator.clipboard.writeText(codeOnly);

      alert(
        "Sharing is unavailable. Only the generated code was copied."
      );
    } catch (error) {
      console.error("Unable to share generated code:", error);
    }
  }

  if (!output) return null;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      <div>
        <h2 className="text-xl font-bold text-white">
          Code Actions
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Use the Copy button beside each code block to copy only that
          specific code.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={downloadCode}
          disabled={loading || !codeOnly}
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 font-semibold text-white transition hover:border-cyan-400 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ⬇️ Download Code
        </button>

        <button
          type="button"
          onClick={shareCode}
          disabled={loading || !codeOnly}
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 font-semibold text-white transition hover:border-cyan-400 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          🔗 Share Code
        </button>

        <button
          type="button"
          onClick={onRegenerate}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-4 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating..." : "🔄 Regenerate"}
        </button>

        <button
          type="button"
          onClick={onClear}
          disabled={loading}
          className="rounded-xl border border-red-900 bg-red-950/20 px-4 py-3 font-semibold text-red-300 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          🗑 Clear
        </button>
      </div>
    </section>
  );
}