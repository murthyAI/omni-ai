"use client";

import { useState } from "react";

export default function ProfileCard() {
  const [name, setName] = useState("Murthy");
  const [email, setEmail] = useState("murthybalakrishna123@gmail.com");
  const [saved, setSaved] = useState(false);

  function saveProfile() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-black">
          {name.trim().charAt(0).toUpperCase() || "U"}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your OMNI AI profile information.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="text-sm font-semibold text-zinc-300">
            Full Name
          </label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-zinc-300">
            Email Address
          </label>

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="button"
          onClick={saveProfile}
          className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-400 sm:w-fit"
        >
          {saved ? "Saved ✓" : "Save Profile"}
        </button>
      </div>
    </section>
  );
}