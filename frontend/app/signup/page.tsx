"use client";

import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Signup error:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/email-already-in-use") {
          setErrorMessage(
            "An account already exists with this email address."
          );
        } else if (firebaseError.code === "auth/invalid-email") {
          setErrorMessage("Please enter a valid email address.");
        } else if (firebaseError.code === "auth/weak-password") {
          setErrorMessage("Please choose a stronger password.");
        } else {
          setErrorMessage(
            "Unable to create your account. Please try again."
          );
        }
      } else {
        setErrorMessage(
          "Unable to create your account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setErrorMessage("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      setErrorMessage(
        "Google signup was not completed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            OMNI AI
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Start using AI Chat, Code and Image tools.
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-semibold text-zinc-300">
              Full Name
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
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
              autoComplete="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-300">
              Password
            </label>

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 6 characters"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-300">
              Confirm Password
            </label>

            <input
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password again"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs uppercase text-zinc-500">or</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-3 font-semibold hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}