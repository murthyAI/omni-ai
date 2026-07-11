export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl bg-zinc-900 px-4 py-3 text-zinc-400">
        <div className="flex items-center gap-2">
          <span>🤖 OMNI AI</span>

          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}