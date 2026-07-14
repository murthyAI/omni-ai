"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import MessageActions from "./MessageActions";
import TypingIndicator from "./TypingIndicator";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
  fileName?: string;
  filePreview?: string;
};

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  onCopy: (text: string) => void;
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
  const codeText = String(children ?? "").replace(/\n$/, "");
  const languageMatch = /language-(\w+)/.exec(className || "");
  const language = languageMatch?.[1] || "text";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(codeText);
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
          {language}
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="rounded-md px-2 py-1 text-xs text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          Copy code
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
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

export default function ChatMessages({
  messages,
  loading,
  onCopy,
}: Props) {
  

  return (
    <div className="h-[430px] space-y-5 overflow-y-auto rounded-xl border border-zinc-800 bg-black p-4 scroll-smooth">
      {messages.map((message, index) => {
        const isUser = message.role === "user";

        return (
          <div
            key={`${message.role}-${index}`}
            className={isUser ? "flex justify-end" : "flex justify-start"}
          >
            <article
              className={
                isUser
                  ? "max-w-[88%] rounded-2xl rounded-br-md bg-cyan-600 px-4 py-3 text-white sm:max-w-[80%]"
                  : "max-w-[92%] rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-white sm:max-w-[85%]"
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    isUser
                      ? "text-sm font-semibold text-cyan-100"
                      : "text-sm font-semibold text-cyan-300"
                  }
                >
                  {isUser ? "You" : "🤖 OMNI AI"}
                </span>
              </div>

              {message.filePreview && (
                <img
                  src={message.filePreview}
                  alt="Uploaded preview"
                  className="mt-3 max-h-64 w-auto max-w-full rounded-xl border border-zinc-700 object-contain"
                />
              )}

              {message.fileName && (
                <p className="mt-3 rounded-lg bg-black/30 px-3 py-2 text-sm text-zinc-100">
                  📎 {message.fileName}
                </p>
              )}

              <div className="mt-3">
                {isUser ? (
                  <p className="whitespace-pre-wrap break-words leading-7">
                    {message.text}
                  </p>
                ) : (
                  <div className="break-words text-zinc-100">
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
                          <thead className="bg-zinc-800">{children}</thead>
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
                      {message.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              <MessageActions
                role={message.role}
                onCopy={() => onCopy(message.text)}
              />
            </article>
          </div>
        );
      })}

      {loading && <TypingIndicator />}

      
    </div>
  );
}