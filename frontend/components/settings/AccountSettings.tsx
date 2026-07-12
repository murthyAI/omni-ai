"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountSettings() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogout() {
    const shouldLogout = window.confirm(
      "Do you want to log out from OMNI AI?"
    );

    if (!shouldLogout) return;

    setLoading(true);
    setErrorMessage("");

    try {
      await signOut(auth);

      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);

      setErrorMessage(
        "Unable to log out. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteAccount() {
    window.alert(
      "Account deletion will be enabled after cloud database integration."
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-white">
        Account
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Manage your OMNI AI account and login session.
      </p>

      {errorMessage && (
        <div className="mt-5 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-zinc-800 bg-black p-4">
          <h3 className="font-semibold text-white">
            Logout
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Sign out securely from your current OMNI AI session.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="mt-4 rounded-xl border border-cyan-500 px-5 py-3 font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
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