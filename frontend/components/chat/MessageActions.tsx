"use client";

import { useEffect, useState } from "react";

type Props = {
  role: "user" | "ai";
  onCopy: () => void | Promise<void>;
  onLike?: () => void;
  onDislike?: () => void;
  onRegenerate?: () => void;
  onShare?: () => void;
};

export default function MessageActions({
  role,
  onCopy,
  onLike,
  onDislike,
  onRegenerate,
  onShare,
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function handleCopy() {
    await onCopy();
    setCopied(true);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-white/10 pt-2 text-sm">
      <button
        type="button"
        title="Copy message"
        onClick={handleCopy}
        className="rounded-lg px-2 py-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
      >
        {copied ? "✓ Copied" : "📋 Copy"}
      </button>

      {role === "ai" && (
        <>
          <button
            type="button"
            title="Helpful response"
            onClick={onLike}
            disabled={!onLike}
            className="rounded-lg px-2 py-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            👍
          </button>

          <button
            type="button"
            title="Unhelpful response"
            onClick={onDislike}
            disabled={!onDislike}
            className="rounded-lg px-2 py-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            👎
          </button>

          <button
            type="button"
            title="Regenerate response"
            onClick={onRegenerate}
            disabled={!onRegenerate}
            className="rounded-lg px-2 py-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            🔄
          </button>
        </>
      )}

      {role === "user" && (
        <button
          type="button"
          title="Share message"
          onClick={onShare}
          disabled={!onShare}
          className="rounded-lg px-2 py-1.5 text-zinc-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          🔗
        </button>
      )}
    </div>
  );
}