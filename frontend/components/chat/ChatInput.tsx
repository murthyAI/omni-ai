"use client";

import { useEffect, useRef } from "react";
import AddMenu from "../AddMenu";

type ChatInputProps = {
  message: string;
  loading: boolean;
  showAddMenu: boolean;
  selectedFile: File | null;
  selectedPreview: string;
  onMessageChange: (value: string) => void;
  onToggleAddMenu: () => void;
  onFileSelect: (file?: File) => void;
  onRemoveSelectedFile: () => void;
  onSend: () => void;
  onCreateImage: () => void;
  onDeepResearch: () => void;
};

export default function ChatInput({
  message,
  loading,
  showAddMenu,
  selectedFile,
  selectedPreview,
  onMessageChange,
  onToggleAddMenu,
  onFileSelect,
  onRemoveSelectedFile,
  onSend,
  onCreateImage,
  onDeepResearch,
}: ChatInputProps) {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [message]);

  function handleSend() {
    if (loading || (!message.trim() && !selectedFile)) return;

    onSend();
  }

  return (
    <div className="mt-5">
      {selectedFile && (
        <section className="mb-4 rounded-xl border border-zinc-800 bg-black p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-200">
                📎 {selectedFile.name}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              type="button"
              onClick={onRemoveSelectedFile}
              disabled={loading}
              className="shrink-0 rounded-lg px-2 py-1 text-sm text-red-400 transition hover:bg-red-950/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ✕ Remove
            </button>
          </div>

          {selectedPreview && (
            <img
              src={selectedPreview}
              alt="Selected file preview"
              className="mt-3 max-h-48 w-auto max-w-full rounded-xl border border-zinc-700 object-contain"
            />
          )}
        </section>
      )}

      <div className="relative rounded-2xl border border-zinc-800 bg-black p-2 transition focus-within:border-cyan-500">
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={onToggleAddMenu}
            disabled={loading}
            aria-label="Open attachment menu"
            aria-expanded={showAddMenu}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700 text-xl text-zinc-200 transition hover:border-cyan-400 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
            title="Add"
          >
            +
          </button>

          <AddMenu
            isOpen={showAddMenu}
            onCamera={() => cameraInputRef.current?.click()}
            onGallery={() => galleryInputRef.current?.click()}
            onFiles={() => fileInputRef.current?.click()}
            onCreateImage={onCreateImage}
            onDeepResearch={onDeepResearch}
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(event) => {
              onFileSelect(event.target.files?.[0]);
              event.target.value = "";
            }}
          />

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              onFileSelect(event.target.files?.[0]);
              event.target.value = "";
            }}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.csv,.zip,.js,.ts,.tsx,.jsx,.dart,.py,.java,.html,.css"
            className="hidden"
            onChange={(event) => {
              onFileSelect(event.target.files?.[0]);
              event.target.value = "";
            }}
          />

          <textarea
            ref={textareaRef}
            value={message}
            rows={1}
            maxLength={8000}
            onChange={(event) => onMessageChange(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                handleSend();
              }
            }}
            disabled={loading}
            className="max-h-[180px] min-h-11 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-2.5 leading-6 text-white outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Ask OMNI AI anything..."
          />

          <button
            type="button"
            disabled
            aria-label="Voice input coming soon"
            className="flex h-11 w-11 shrink-0 cursor-not-allowed items-center justify-center rounded-xl border border-zinc-700 text-lg text-zinc-500 opacity-60"
            title="Voice input coming soon"
          >
            🎤
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={loading || (!message.trim() && !selectedFile)}
            aria-label={loading ? "Generating response" : "Send message"}
            className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500 px-4 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            ) : (
              "➤"
            )}
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 px-1 text-xs text-zinc-500">
          <span>
            Enter to send · Shift + Enter for a new line
          </span>

          <span>{message.length} / 8000</span>
        </div>
      </div>
    </div>
  );
}