"use client";

export type CodeHistoryItem = {
  id: string;
  prompt: string;
  output: string;
  language: string;
  createdAt: number;
};

type CodeHistoryProps = {
  history: CodeHistoryItem[];
  loading: boolean;
  onSelect: (item: CodeHistoryItem) => void;
  onDelete: (itemId: string) => void;
  onClearHistory: () => void;
};

function formatHistoryDate(createdAt: number) {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const isToday =
    createdDate.getDate() === now.getDate() &&
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return createdDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return createdDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatLanguage(language: string) {
  if (language === "auto") {
    return "Auto Detect";
  }

  if (language === "nextjs") {
    return "Next.js";
  }

  if (language === "csharp") {
    return "C#";
  }

  if (language === "cpp") {
    return "C++";
  }

  return language.charAt(0).toUpperCase() + language.slice(1);
}

export default function CodeHistory({
  history,
  loading,
  onSelect,
  onDelete,
  onClearHistory,
}: CodeHistoryProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">
            Code History
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Reopen your recently generated code.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            disabled={loading}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-950/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-800 bg-black p-8 text-center">
          <div className="text-4xl">🕘</div>

          <p className="mt-4 font-semibold text-zinc-300">
            No generated code yet
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Your recent code generations will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {history.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-zinc-800 bg-black p-4 transition hover:border-zinc-700"
            >
              <button
                type="button"
                onClick={() => onSelect(item)}
                disabled={loading}
                className="w-full text-left disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-md bg-cyan-950/50 px-2 py-1 text-xs font-semibold text-cyan-300">
                    {formatLanguage(item.language)}
                  </span>

                  <span className="text-xs text-zinc-600">
                    {formatHistoryDate(item.createdAt)}
                  </span>
                </div>

                <h3 className="mt-4 line-clamp-2 font-semibold leading-6 text-zinc-200">
                  {item.prompt}
                </h3>

                <p className="mt-3 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-zinc-500">
                  {item.output}
                </p>
              </button>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  disabled={loading}
                  className="rounded-lg px-2 py-1.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-950/30 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Open
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  disabled={loading}
                  className="rounded-lg px-2 py-1.5 text-sm text-red-400 transition hover:bg-red-950/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Delete code history item"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}