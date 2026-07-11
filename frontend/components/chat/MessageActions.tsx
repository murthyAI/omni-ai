type Props = {
  role: "user" | "ai";
  text: string;
  onCopy: () => void;
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
  return (
    <div className="mt-3 flex gap-3 text-lg opacity-80">

      <button
        type="button"
        title="Copy"
        onClick={onCopy}
        className="hover:scale-110 transition"
      >
        📋
      </button>

      {role === "ai" && (
        <>
          <button
            type="button"
            title="Like"
            onClick={onLike}
            className="hover:scale-110 transition"
          >
            👍
          </button>

          <button
            type="button"
            title="Dislike"
            onClick={onDislike}
            className="hover:scale-110 transition"
          >
            👎
          </button>

          <button
            type="button"
            title="Regenerate"
            onClick={onRegenerate}
            className="hover:scale-110 transition"
          >
            🔄
          </button>
        </>
      )}

      {role === "user" && (
        <button
          type="button"
          title="Share"
          onClick={onShare}
          className="hover:scale-110 transition"
        >
          🔗
        </button>
      )}

    </div>
  );
}