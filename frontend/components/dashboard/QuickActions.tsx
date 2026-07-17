"use client";

import Link from "next/link";

const actions = [
  {
    title: "AI Chat",
    description: "Start a new AI conversation",
    href: "/chat",
    icon: "💬",
    color: "bg-cyan-500",
  },
  {
    title: "Image Generator",
    description: "Generate AI images",
    href: "/image",
    icon: "🎨",
    color: "bg-pink-500",
  },
  {
    title: "Code Generator",
    description: "Write and debug code",
    href: "/code",
    icon: "💻",
    color: "bg-green-500",
  },
  {
    title: "Settings",
    description: "Manage your account",
    href: "/settings",
    icon: "⚙️",
    color: "bg-yellow-500",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Open your favorite OMNI AI tools with one click.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:bg-zinc-900"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color} text-2xl`}
            >
              {action.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold text-white group-hover:text-cyan-400">
              {action.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {action.description}
            </p>

            <div className="mt-5 flex items-center text-sm font-semibold text-cyan-400">
              Open →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}