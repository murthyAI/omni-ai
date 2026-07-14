"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeOutputProps = {
  output: string;
  selectedLanguage: string;
};

type MarkdownCodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function MarkdownCode({
  inline,
  className,
  children,
}: MarkdownCodeProps) {
  const [copied, setCopied] = useState(false);

  const codeText = String(children ?? "").replace(/\n$/, "");
  const languageMatch = /language-(\w+)/.exec(className || "");
  const detectedLanguage = languageMatch?.[1] || "text";

  useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
    } catch (error) {
      console.error("Unable to copy code:", error);
    }
  }

  if (inline) {
    return (
      <code className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm text-cyan-300">
        {children}
      </code>
    );
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-700 bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {detectedLanguage}
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="min-w-[88px] rounded-md px-2 py-1 text-xs text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={detectedLanguage}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#1e1e1e",
          fontSize: "0.875rem",
        }}
        wrapLongLines
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}

export default function CodeOutput({
  output,
  selectedLanguage,
}: CodeOutputProps) {
  if (!output) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-center">
          <div className="text-6xl">💻</div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Generated code will appear here
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
            Describe what you want to build, select a language and click
            Generate Code.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[420px] rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">
            Generated Output
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Language:{" "}
            <span className="font-medium text-cyan-400">
              {selectedLanguage === "auto"
                ? "Auto Detect"
                : selectedLanguage}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-5 break-words text-zinc-100">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-3 mt-5 text-2xl font-bold text-white first:mt-0">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mb-3 mt-5 text-xl font-bold text-white first:mt-0">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mb-2 mt-4 text-lg font-semibold text-white first:mt-0">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="my-3 whitespace-pre-wrap leading-7 first:mt-0 last:mb-0">
                {children}
              </p>
            ),

            strong: ({ children }) => (
              <strong className="font-bold text-white">
                {children}
              </strong>
            ),

            ul: ({ children }) => (
              <ul className="my-3 list-disc space-y-2 pl-6">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="my-3 list-decimal space-y-2 pl-6">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li className="leading-7">{children}</li>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-4 border-cyan-500 bg-black/30 px-4 py-2 text-zinc-300">
                {children}
              </blockquote>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline decoration-cyan-600 underline-offset-4 hover:text-cyan-300"
              >
                {children}
              </a>
            ),

            code: ({
              inline,
              className,
              children,
            }: MarkdownCodeProps) => (
              <MarkdownCode
                inline={inline}
                className={className}
              >
                {children}
              </MarkdownCode>
            ),

            table: ({ children }) => (
              <div className="my-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  {children}
                </table>
              </div>
            ),

            thead: ({ children }) => (
              <thead className="bg-zinc-800">
                {children}
              </thead>
            ),

            th: ({ children }) => (
              <th className="border border-zinc-700 px-3 py-2 font-semibold text-white">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border border-zinc-700 px-3 py-2 text-zinc-300">
                {children}
              </td>
            ),

            hr: () => (
              <hr className="my-5 border-zinc-700" />
            ),
          }}
        >
          {output}
        </ReactMarkdown>
      </div>
    </section>
  );
}