"use client";

import CodeOutput from "./CodeOutput";
import LoadingAnimation from "./LoadingAnimation";

export type CodeConversationItem = {
  id: string;
  prompt: string;
  output: string;
  language: string;
  createdAt: number;
};

type CodeConversationProps = {
  conversations: CodeConversationItem[];
  loading: boolean;
};

function formatLanguage(language: string) {
  if (language === "auto") return "Auto Detect";
  if (language === "nextjs") return "Next.js";
  if (language === "cpp") return "C++";
  if (language === "csharp") return "C#";

  return language.charAt(0).toUpperCase() + language.slice(1);
}

function formatTime(createdAt: number) {
  return new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CodeConversation({
  conversations,
  loading,
}: CodeConversationProps) {
  if (conversations.length === 0 && !loading) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl">💻</div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Start a coding conversation
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Ask OMNI AI to generate code. You can then continue by requesting
            changes, bug fixes, explanations or new features.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-7">
      {conversations.map((conversation, index) => (
        <article
          key={conversation.id}
          className="space-y-4"
        >
          <div className="flex justify-end">
            <div className="max-w-[90%] rounded-2xl rounded-br-md bg-cyan-600 px-4 py-3 text-white sm:max-w-[80%]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-cyan-100">
                  You
                </p>

                <span className="text-xs text-cyan-100/70">
                  {formatTime(conversation.createdAt)}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap break-words leading-7">
                {conversation.prompt}
              </p>

              <p className="mt-3 text-xs text-cyan-100/80">
                Language: {formatLanguage(conversation.language)}
              </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="w-full">
              <div className="mb-2 flex items-center gap-2 px-1">
                <span className="text-sm font-semibold text-cyan-300">
                  🤖 OMNI AI
                </span>

                <span className="text-xs text-zinc-600">
                  Response {index + 1}
                </span>
              </div>

              <CodeOutput
                output={conversation.output}
                selectedLanguage={conversation.language}
              />
            </div>
          </div>
        </article>
      ))}

      {loading && <LoadingAnimation />}
    </section>
  );
}