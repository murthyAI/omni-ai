"use client";

import { useRouter } from "next/navigation";

export default function AccountSettings() {
  const router = useRouter();

  function handleLogout() {
    const shouldLogout = window.confirm(
      "Do you want to log out from OMNI AI?"
    );

    if (!shouldLogout) return;

    localStorage.removeItem("omni-ai-active-conversation");

    alert("Logged out successfully.");

    router.push("/login");
  }

  function handleDeleteAccount() {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!shouldDelete) return;

    alert(
      "Account deletion will become available after authentication and database integration."
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">
        Account
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Manage your login session and account preferences.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <h3 className="font-semibold text-white">
            Logout
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Sign out from your current OMNI AI session.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-xl border border-cyan-500 px-5 py-3 font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-black"
          >
            Logout
          </button>
        </div>

        <div className="rounded-xl border border-red-900 bg-black p-4">
          <h3 className="font-semibold text-red-400">
            Delete Account
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Permanently delete your account and saved data.
          </p>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="mt-4 rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-400 hover:bg-red-500 hover:text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}