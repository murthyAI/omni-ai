export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-900 px-4 py-3">
        <p className="text-sm font-semibold text-cyan-300">
          🤖 OMNI AI
        </p>

        <div
          className="mt-3 flex items-center gap-2"
          role="status"
          aria-label="OMNI AI is generating a response"
        >
          <div className="flex gap-1.5">
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />

            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
          </div>

          <span className="text-sm text-zinc-400">
            Thinking...
          </span>
        </div>
      </div>
    </div>
  );
}