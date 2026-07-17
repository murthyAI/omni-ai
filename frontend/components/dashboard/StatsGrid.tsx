"use client";

type StatsGridProps = {
  savedChats: number;
};

type StatItem = {
  label: string;
  value: string;
  description: string;
  icon: string;
};

export default function StatsGrid({
  savedChats,
}: StatsGridProps) {
  const stats: StatItem[] = [
    {
      label: "Saved Chats",
      value: String(savedChats),
      description: "Conversations saved in this browser",
      icon: "💬",
    },
    {
      label: "Daily Free Limit",
      value: "20",
      description: "Messages available every day",
      icon: "⚡",
    },
    {
      label: "AI Modules",
      value: "3",
      description: "Chat, Image and Code tools",
      icon: "🤖",
    },
    {
      label: "Current Plan",
      value: "Free",
      description: "Upgrade options coming soon",
      icon: "👤",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">
          Workspace Overview
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          A quick summary of your OMNI AI usage and account.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/60 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-black text-xl transition group-hover:border-cyan-500/40">
                {stat.icon}
              </div>

              <span className="rounded-full border border-zinc-800 bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Live
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-zinc-400">
              {stat.label}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-400">
              {stat.value}
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {stat.description}
            </p>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-3/4 rounded-full bg-cyan-500 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}