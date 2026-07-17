"use client";

type UserProfileCardProps = {
  userName: string;
  userEmail: string;
};

export default function UserProfileCard({
  userName,
  userEmail,
}: UserProfileCardProps) {
  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-black">
          {initials || "U"}
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {userName}
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            {userEmail}
          </p>

          <span className="mt-3 inline-flex rounded-full border border-green-700 bg-green-950 px-3 py-1 text-xs font-semibold text-green-400">
            Active Account
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-black p-4">
          <p className="text-xs text-zinc-500">
            Current Plan
          </p>

          <p className="mt-2 text-lg font-bold text-cyan-400">
            Free
          </p>
        </div>

        <div className="rounded-xl bg-black p-4">
          <p className="text-xs text-zinc-500">
            AI Modules
          </p>

          <p className="mt-2 text-lg font-bold text-cyan-400">
            3 Active
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-cyan-900 bg-cyan-950/20 p-4">
        <p className="text-sm text-cyan-300">
          🚀 Your OMNI AI workspace is ready.
          Continue chatting, generating images, or writing code.
        </p>
      </div>
    </div>
  );
}