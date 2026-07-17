"use client";

type ActivityItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  time: string;
};

type RecentActivityProps = {
  savedChats: number;
};

export default function RecentActivity({
  savedChats,
}: RecentActivityProps) {
  const activities: ActivityItem[] = [
    {
      id: 1,
      title: "AI Chat Workspace",
      description:
        savedChats > 0
          ? `${savedChats} saved conversation${
              savedChats === 1 ? "" : "s"
            } available in this browser.`
          : "No saved conversations yet. Start a new chat to create activity.",
      icon: "💬",
      time: "Available now",
    },
    {
      id: 2,
      title: "Image Generator",
      description:
        "Generate creative images from text prompts and manage image history.",
      icon: "🎨",
      time: "Ready to use",
    },
    {
      id: 3,
      title: "Code Workspace",
      description:
        "Continue coding conversations, generate code and review previous output.",
      icon: "💻",
      time: "Ready to use",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Your latest OMNI AI workspace activity.
          </p>
        </div>

        <span className="w-fit rounded-full border border-green-700 bg-green-950 px-3 py-1 text-xs font-semibold text-green-400">
          Workspace Active
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-black p-4 transition hover:border-cyan-500/50 hover:bg-zinc-900 sm:flex-row sm:items-center"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-xl">
              {activity.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-zinc-400">
                {activity.description}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-medium text-cyan-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}