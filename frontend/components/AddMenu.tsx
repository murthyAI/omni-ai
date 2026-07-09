type AddMenuProps = {
  isOpen: boolean;
  onCamera: () => void;
  onGallery: () => void;
  onFiles: () => void;
  onCreateImage: () => void;
  onDeepResearch: () => void;
};

export default function AddMenu({
  isOpen,
  onCamera,
  onGallery,
  onFiles,
  onCreateImage,
  onDeepResearch,
}: AddMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-16 left-0 w-64 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
      <button onClick={onCamera} className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        📷 Camera
      </button>

      <button onClick={onGallery} className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        🖼️ Photos / Gallery
      </button>

      <button onClick={onFiles} className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        📎 Files / PDF
      </button>

      <button onClick={onCreateImage} className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        🎨 Create Image
      </button>

      <button onClick={onDeepResearch} className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-900">
        🔎 Deep Research
      </button>
    </div>
  );
}