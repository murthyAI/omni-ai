import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-black text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-cyan-400">
          OMNI AI
        </Link>

        <div className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>
          <Link href="/chat" className="hover:text-cyan-400">
            Chat
          </Link>
          <Link href="/image" className="hover:text-cyan-400">
            Image
          </Link>
          <Link href="/code" className="hover:text-cyan-400">
            Code
          </Link>
          <Link href="/settings" className="hover:text-cyan-400">
  Settings
</Link>
          <Link
            href="/login"
            className="rounded-full bg-white px-4 py-2 font-semibold text-black hover:bg-zinc-200"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}