"use client";

import { useEffect, useState } from "react";

import CodePrompt from "@/components/code/CodePrompt";
import CodeToolbar from "@/components/code/CodeToolbar";
import CodeHistory, {
  CodeHistoryItem,
} from "@/components/code/CodeHistory";
import CodeConversation, {
  CodeConversationItem,
} from "@/components/code/CodeConversation";

const CODE_HISTORY_KEY = "omni-ai-code-history";
const CODE_CONVERSATION_KEY = "omni-ai-code-conversation";

type GenerateOptions = {
  prompt?: string;
  language?: string;
  replaceLatest?: boolean;
};

export default function CodePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("auto");
  const [loading, setLoading] = useState(false);

  const [conversation, setConversation] = useState<
    CodeConversationItem[]
  >([]);

  const [history, setHistory] = useState<CodeHistoryItem[]>([]);
  const [storageLoaded, setStorageLoaded] = useState(false);

  const latestConversation =
    conversation.length > 0
      ? conversation[conversation.length - 1]
      : null;

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(CODE_HISTORY_KEY);
      const savedConversation = localStorage.getItem(
        CODE_CONVERSATION_KEY
      );

      if (savedHistory) {
        const parsedHistory = JSON.parse(
          savedHistory
        ) as CodeHistoryItem[];

        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        }
      }

      if (savedConversation) {
        const parsedConversation = JSON.parse(
          savedConversation
        ) as CodeConversationItem[];

        if (Array.isArray(parsedConversation)) {
          setConversation(parsedConversation);
        }
      }
    } catch (error) {
      console.error(
        "Unable to load the code workspace:",
        error
      );
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!storageLoaded) return;

    try {
      localStorage.setItem(
        CODE_HISTORY_KEY,
        JSON.stringify(history)
      );
    } catch (error) {
      console.error("Unable to save code history:", error);
    }
  }, [history, storageLoaded]);

  useEffect(() => {
    if (!storageLoaded) return;

    try {
      localStorage.setItem(
        CODE_CONVERSATION_KEY,
        JSON.stringify(conversation)
      );
    } catch (error) {
      console.error(
        "Unable to save the code conversation:",
        error
      );
    }
  }, [conversation, storageLoaded]);

  function createId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;
  }

  function buildConversationContext() {
    if (conversation.length === 0) {
      return "";
    }

    return conversation
      .slice(-4)
      .map(
        (item, index) =>
          [
            `Previous request ${index + 1}:`,
            item.prompt,
            "",
            `Previous response ${index + 1}:`,
            item.output,
          ].join("\n")
      )
      .join("\n\n---\n\n");
  }

  async function generateCode(
    options: GenerateOptions = {}
  ) {
    const requestedPrompt = (
      options.prompt ?? prompt
    ).trim();

    const requestedLanguage =
      options.language ?? selectedLanguage;

    const replaceLatest =
      options.replaceLatest ?? false;

    if (!requestedPrompt || loading) return;

    setLoading(true);

    try {
      const languageInstruction =
        requestedLanguage === "auto"
          ? "Detect the most suitable programming language automatically."
          : `Use ${requestedLanguage} as the primary programming language.`;

      const previousContext = buildConversationContext();

      const requestMessage = [
        "You are OMNI AI Code Assistant.",
        "Generate clean, complete, secure and working code.",
        languageInstruction,
        "Return every code section inside a markdown code block with the correct language tag.",
        "Keep explanations concise and place them outside code blocks.",
        "When the user asks to modify earlier code, preserve relevant previous functionality.",
        previousContext
          ? `Previous coding conversation:\n\n${previousContext}`
          : "",
        `Current request:\n${requestedPrompt}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: requestMessage,
          image: null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.reply ||
            data?.error ||
            data?.message ||
            "Unable to generate code."
        );
      }

      const generatedOutput =
        typeof data?.reply === "string"
          ? data.reply.trim()
          : "";

      if (!generatedOutput) {
        throw new Error(
          "OMNI AI did not return generated code."
        );
      }

      const generatedItem: CodeConversationItem = {
        id:
          replaceLatest && latestConversation
            ? latestConversation.id
            : createId(),
        prompt: requestedPrompt,
        output: generatedOutput,
        language: requestedLanguage,
        createdAt:
          replaceLatest && latestConversation
            ? latestConversation.createdAt
            : Date.now(),
      };

      if (replaceLatest && latestConversation) {
        setConversation((previousConversation) =>
          previousConversation.map((item) =>
            item.id === latestConversation.id
              ? generatedItem
              : item
          )
        );
      } else {
        setConversation((previousConversation) => [
          ...previousConversation,
          generatedItem,
        ]);
      }

      const historyItem: CodeHistoryItem = {
        ...generatedItem,
        id: createId(),
        createdAt: Date.now(),
      };

      setHistory((previousHistory) =>
        [historyItem, ...previousHistory].slice(0, 20)
      );

      setPrompt("");
      setSelectedLanguage(requestedLanguage);
    } catch (caughtError) {
      console.error(
        "Code generation error:",
        caughtError
      );

      const errorMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while generating code.";

      const failedItem: CodeConversationItem = {
        id: createId(),
        prompt: requestedPrompt,
        output: `## Code Generation Failed

${errorMessage}`,
        language: requestedLanguage,
        createdAt: Date.now(),
      };

      setConversation((previousConversation) => [
        ...previousConversation,
        failedItem,
      ]);
    } finally {
      setLoading(false);
    }
  }

  function regenerateLatestCode() {
    if (!latestConversation || loading) return;

    void generateCode({
      prompt: latestConversation.prompt,
      language: latestConversation.language,
      replaceLatest: true,
    });
  }

  function clearConversation() {
    if (loading || conversation.length === 0) return;

    const shouldClear = window.confirm(
      "Do you want to clear this code conversation?"
    );

    if (!shouldClear) return;

    setConversation([]);
    setPrompt("");
  }

  function selectHistoryItem(item: CodeHistoryItem) {
    if (loading) return;

    const conversationItem: CodeConversationItem = {
      id: createId(),
      prompt: item.prompt,
      output: item.output,
      language: item.language,
      createdAt: item.createdAt,
    };

    setConversation([conversationItem]);
    setSelectedLanguage(item.language);
    setPrompt("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function deleteHistoryItem(itemId: string) {
    if (loading) return;

    setHistory((previousHistory) =>
      previousHistory.filter(
        (item) => item.id !== itemId
      )
    );
  }

  function clearHistory() {
    if (loading || history.length === 0) return;

    const shouldClear = window.confirm(
      "Do you want to clear all code history?"
    );

    if (!shouldClear) return;

    setHistory([]);
  }

    return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-cyan-400">
                AI Code Workspace
              </h1>

              <p className="mt-2 max-w-3xl text-zinc-400">
                Generate code, continue previous work, request improvements
                and fix bugs through an ongoing coding conversation.
              </p>
            </div>

            {conversation.length > 0 && (
              <button
                type="button"
                onClick={clearConversation}
                disabled={loading}
                className="rounded-xl border border-red-900 bg-red-950/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                🗑 New Workspace
              </button>
            )}
          </div>
        </section>

        <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
          <div className="min-w-0">
            <CodeConversation
              conversations={conversation}
              loading={loading}
            />

            {latestConversation && !loading && (
              <div className="mt-7">
                <CodeToolbar
                  output={latestConversation.output}
                  selectedLanguage={latestConversation.language}
                  loading={loading}
                  onRegenerate={regenerateLatestCode}
                  onClear={clearConversation}
                />
              </div>
            )}
          </div>

          <div className="xl:sticky xl:top-6">
            <CodePrompt
              prompt={prompt}
              selectedLanguage={selectedLanguage}
              loading={loading}
              onPromptChange={setPrompt}
              onLanguageChange={setSelectedLanguage}
              onGenerate={() => {
                void generateCode();
              }}
            />

            {conversation.length > 0 && (
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm font-semibold text-cyan-400">
                  Continue this workspace
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Ask OMNI AI to modify the latest code, add a feature,
                  explain a section, improve performance or fix an error.
                </p>

                <div className="mt-3 space-y-2 text-sm text-zinc-500">
                  <p>• Add form validation to the previous code.</p>
                  <p>• Fix the errors and return the complete updated file.</p>
                  <p>• Convert this code to TypeScript.</p>
                  <p>• Make the previous UI mobile responsive.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <CodeHistory
            history={history}
            loading={loading}
            onSelect={selectHistoryItem}
            onDelete={deleteHistoryItem}
            onClearHistory={clearHistory}
          />
        </div>
      </div>
    </main>
  );
}