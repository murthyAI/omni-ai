"use client";

import Link from "next/link";

type DashboardHeaderProps = {
  userName: string;
  userEmail: string;
};

export default function DashboardHeader({
  userName,
  userEmail,
}: DashboardHeaderProps) {
  const firstName = userName.trim().split(" ")[0] || "User";

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 17
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              OMNI AI Workspace
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {greeting},{" "}
            <span className="text-cyan-400">
              {firstName}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Create conversations, generate images, build code and
            manage your entire AI workspace from one powerful dashboard.
          </p>

          {userEmail && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-black text-sm font-bold text-cyan-400">
                {firstName.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Signed in as
                </p>

                <p className="text-sm text-zinc-300">
                  {userEmail}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col xl:flex-row">
          <Link
            href="/chat"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 active:scale-[0.98] sm:w-auto"
          >
            <span>💬</span>
            Start New Chat
          </Link>

          <Link
            href="/settings"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-black px-6 py-3 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400 active:scale-[0.98] sm:w-auto"
          >
            <span>⚙️</span>
            Settings
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid gap-3 border-t border-zinc-800 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Workspace
          </p>

          <p className="mt-1 text-sm font-semibold text-zinc-200">
            Personal AI Studio
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Available Tools
          </p>

          <p className="mt-1 text-sm font-semibold text-zinc-200">
            Chat · Image · Code
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            System Status
          </p>

          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            All Systems Ready
          </p>
        </div>
      </div>
    </section>
  );
}