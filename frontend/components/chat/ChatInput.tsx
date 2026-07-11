"use client";

import AddMenu from "../AddMenu";
import { useRef } from "react";

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

  return (
    <>
      {selectedFile && (
        <div className="mt-4 rounded-xl border border-zinc-800 bg-black p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm text-zinc-300">
              Selected: {selectedFile.name}
            </p>

            <button
              type="button"
              onClick={onRemoveSelectedFile}
              className="shrink-0 text-sm text-red-400 hover:text-red-300"
            >
              ✕ Remove
            </button>
          </div>

          {selectedPreview && (
            <img
              src={selectedPreview}
              alt="Selected preview"
              className="mt-3 max-h-40 rounded-xl border border-zinc-700"
            />
          )}
        </div>
      )}

      <div className="relative mt-5 flex gap-2">
        <button
          type="button"
          onClick={onToggleAddMenu}
          className="rounded-xl border border-zinc-700 px-4 py-3 hover:border-cyan-400"
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

        <input
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
          disabled={loading}
          className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-cyan-400 disabled:opacity-60"
          placeholder="Ask OMNI AI anything..."
        />

        <button
          type="button"
          className="rounded-xl border border-zinc-700 px-4 py-3 hover:border-cyan-400"
          title="Voice"
        >
          🎤
        </button>

        <button
          type="button"
          onClick={onSend}
          disabled={loading || (!message.trim() && !selectedFile)}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "..." : "➤"}
        </button>
      </div>
    </>
  );
}