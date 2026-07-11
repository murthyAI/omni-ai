"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardStat = {
  label: string;
  value: string;
  description: string;
};

const tools = [
  {
    title: "AI Chat",
    description:
      "Chat with OMNI AI, upload images, analyze content and manage multiple conversations.",
    href: "/chat",
    icon: "💬",
    status: "Live",
  },
  {
    title: "Image Generator",
    description:
      "Create AI images from text prompts. Image generation billing is currently pending.",
    href: "/image",
    icon: "🎨",
    status: "Limited",
  },
  {
    title: "Code Generator",
    description:
      "Generate, explain and debug code using OMNI AI.",
    href: "/code",
    icon: "💻",
    status: "Live",
  },
  {
    title: "Settings",
    description:
      "Manage your profile, theme, language, AI model and account preferences.",
    href: "/settings",
    icon: "⚙️",
    status: "Live",
  },
];

export default function DashboardPage() {
  const [chatCount, setChatCount] = useState(0);

  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("omni-ai-conversations");

      if (!savedChats) return;

      const parsedChats = JSON.parse(savedChats);

      if (Array.isArray(parsedChats)) {
        setChatCount(parsedChats.length);
      }
    } catch (error) {
      console.error("Unable to load dashboard chat count:", error);
    }
  }, []);

  const stats: DashboardStat[] = [
    {
      label: "Saved Chats",
      value: String(chatCount),
      description: "Conversations saved in this browser",
    },
    {
      label: "Free Messages",
      value: "20 / Day",
      description: "Planned Version 1 free usage limit",
    },
    {
      label: "AI Modules",
      value: "3",
      description: "Chat, Image and Code modules",
    },
    {
      label: "Current Plan",
      value: "Free",
      description: "Premium plans will be added later",
    },
  ];

  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                OMNI AI Dashboard
              </p>

              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                Welcome back, Murthy
              </h1>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Access your AI tools, continue saved conversations and manage
                your OMNI AI preferences from one place.
              </p>
            </div>

            <Link
              href="/chat"
              className="w-full rounded-xl bg-cyan-500 px-6 py-3 text-center font-bold text-black hover:bg-cyan-400 lg:w-auto"
            >
              Start New Chat
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>

              <p className="mt-2 text-3xl font-bold text-cyan-400">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold">AI Tools</h2>

              <p className="mt-2 text-zinc-400">
                Select a module and continue building with OMNI AI.
              </p>
            </div>

            <Link
              href="/settings"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Manage Settings →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl">
                    {tool.icon}
                  </div>

                  <span
                    className={
                      tool.status === "Live"
                        ? "rounded-full border border-green-700 bg-green-950 px-3 py-1 text-xs font-semibold text-green-400"
                        : "rounded-full border border-yellow-700 bg-yellow-950 px-3 py-1 text-xs font-semibold text-yellow-400"
                    }
                  >
                    {tool.status}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold group-hover:text-cyan-400">
                  {tool.title}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {tool.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-cyan-400">
                  Open {tool.title} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold">Version 1 Progress</h2>

            <p className="mt-2 text-zinc-400">
              Core OMNI AI modules currently completed.
            </p>

            <div className="mt-6 space-y-4">
              {[
                ["AI Chat", "100%"],
                ["Chat History", "100%"],
                ["Code Generator", "100%"],
                ["Settings", "100%"],
                ["Image Generator", "70%"],
              ].map(([name, progress]) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{name}</span>
                    <span className="text-cyan-400">{progress}</span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{ width: progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold">Next Milestones</h2>

            <p className="mt-2 text-zinc-400">
              Features planned before Version 1 launch.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Real authentication and user accounts",
                "Cloud database and chat sync",
                "Voice input and voice replies",
                "PDF and document analysis",
                "Image generation billing or alternate provider",
                "Production deployment and final testing",
              ].map((milestone) => (
                <div
                  key={milestone}
                  className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-black p-4"
                >
                  <span className="text-cyan-400">○</span>
                  <p className="text-zinc-300">{milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}