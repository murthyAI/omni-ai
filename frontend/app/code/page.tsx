"use client";

import { useEffect, useState } from "react";

import CodePrompt from "@/components/code/CodePrompt";
import CodeOutput from "@/components/code/CodeOutput";
import CodeToolbar from "@/components/code/CodeToolbar";
import CodeHistory, {
  CodeHistoryItem,
} from "@/components/code/CodeHistory";
import LoadingAnimation from "@/components/code/LoadingAnimation";

const CODE_HISTORY_KEY = "omni-ai-code-history";

export default function CodePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("auto");
  const [codeOutput, setCodeOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<CodeHistoryItem[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(CODE_HISTORY_KEY);

      if (savedHistory) {
        const parsedHistory = JSON.parse(
          savedHistory
        ) as CodeHistoryItem[];

        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        }
      }
    } catch (error) {
      console.error("Unable to load code history:", error);
    } finally {
      setHistoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!historyLoaded) return;

    try {
      localStorage.setItem(
        CODE_HISTORY_KEY,
        JSON.stringify(history)
      );
    } catch (error) {
      console.error("Unable to save code history:", error);
    }
  }, [history, historyLoaded]);

  async function generateCode() {
    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt || loading) return;

    setLoading(true);
    setCodeOutput("");

    try {
      const languageInstruction =
        selectedLanguage === "auto"
          ? "Detect the most suitable programming language automatically."
          : `Use ${selectedLanguage} as the primary programming language.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: [
            "You are OMNI AI Code Assistant.",
            "Generate clean, working, production-ready code.",
            languageInstruction,
            "Use markdown code blocks with the correct language tag.",
            "Explain briefly only when useful.",
            "",
            `Request: ${cleanedPrompt}`,
          ].join("\n"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.reply ||
            data?.error ||
            "Unable to generate code."
        );
      }

      const generatedOutput =
        data?.reply || "No code was generated.";

      setCodeOutput(generatedOutput);
      setPrompt("");

      const historyItem: CodeHistoryItem = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),
        prompt: cleanedPrompt,
        output: generatedOutput,
        language: selectedLanguage,
        createdAt: Date.now(),
      };

      setHistory((previousHistory) => [
        historyItem,
        ...previousHistory,
      ].slice(0, 12));
    } catch (error) {
      console.error("Code generation error:", error);

      setCodeOutput(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function clearOutput() {
    setCodeOutput("");
  }

  function selectHistoryItem(item: CodeHistoryItem) {
    if (loading) return;

    setPrompt(item.prompt);
    setSelectedLanguage(item.language);
    setCodeOutput(item.output);

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
    if (loading) return;

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
          <h1 className="text-4xl font-bold text-cyan-400">
            AI Code Generator
          </h1>

          <p className="mt-2 max-w-2xl text-zinc-400">
            Generate, explain, improve and debug code with OMNI AI.
          </p>
        </section>

        <div className="grid gap-7 lg:grid-cols-2">
          <CodePrompt
            prompt={prompt}
            selectedLanguage={selectedLanguage}
            loading={loading}
            onPromptChange={setPrompt}
            onLanguageChange={setSelectedLanguage}
            onGenerate={generateCode}
          />

          <div>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <CodeOutput
                output={codeOutput}
                selectedLanguage={selectedLanguage}
              />
            )}
          </div>
        </div>

        <div className="mt-7">
          <CodeToolbar
            output={codeOutput}
            selectedLanguage={selectedLanguage}
            loading={loading}
            onRegenerate={generateCode}
            onClear={clearOutput}
          />
        </div>

        <div className="mt-7">
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