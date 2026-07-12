"use client";

import { auth, googleProvider } from "@/lib/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/invalid-email") {
          setErrorMessage("Please enter a valid email address.");
        } else if (
          firebaseError.code === "auth/invalid-credential" ||
          firebaseError.code === "auth/wrong-password" ||
          firebaseError.code === "auth/user-not-found"
        ) {
          setErrorMessage(
            "Email or password is incorrect. Please try again."
          );
        } else if (
          firebaseError.code === "auth/too-many-requests"
        ) {
          setErrorMessage(
            "Too many failed attempts. Please wait and try again."
          );
        } else if (
          firebaseError.code === "auth/network-request-failed"
        ) {
          setErrorMessage(
            "Network error. Please check your internet connection."
          );
        } else {
          setErrorMessage(
            "Unable to login. Please try again."
          );
        }
      } else {
        setErrorMessage(
          "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Google login error:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const firebaseError = error as { code: string };

        if (
          firebaseError.code === "auth/popup-closed-by-user"
        ) {
          setErrorMessage(
            "Google login window was closed before completion."
          );
        } else if (
          firebaseError.code === "auth/popup-blocked"
        ) {
          setErrorMessage(
            "Google login popup was blocked. Please allow popups and try again."
          );
        } else if (
          firebaseError.code ===
          "auth/account-exists-with-different-credential"
        ) {
          setErrorMessage(
            "An account already exists with this email using another login method."
          );
        } else {
          setErrorMessage(
            "Google login was not completed. Please try again."
          );
        }
      } else {
        setErrorMessage(
          "Google login was not completed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setErrorMessage("");
    setSuccessMessage("");

    const resetEmail = email.trim();

    if (!resetEmail) {
      setErrorMessage(
        "Enter your email address first, then click Forgot Password."
      );
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);

      setSuccessMessage(
        "Password reset email sent. Please check your inbox and spam folder."
      );
    } catch (error: unknown) {
      console.error("Password reset error:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/invalid-email") {
          setErrorMessage(
            "Please enter a valid email address."
          );
        } else if (
          firebaseError.code === "auth/user-not-found"
        ) {
          setErrorMessage(
            "No account was found with this email address."
          );
        } else if (
          firebaseError.code === "auth/too-many-requests"
        ) {
          setErrorMessage(
            "Too many requests. Please wait and try again."
          );
        } else {
          setErrorMessage(
            "Unable to send the password reset email."
          );
        }
      } else {
        setErrorMessage(
          "Unable to send the password reset email."
        );
      }
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
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Login to continue using your OMNI AI tools.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="text-sm font-semibold text-zinc-300">
              Email Address
            </label>

            <input
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-cyan-400 disabled:opacity-60"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-semibold text-zinc-300">
                Password
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
              >
                Forgot Password?
              </button>
            </div>

            <input
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-cyan-400 disabled:opacity-60"
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl border border-green-900 bg-green-950/40 px-4 py-3 text-sm text-green-300">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />

          <span className="text-xs uppercase text-zinc-500">
            or
          </span>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-3 font-semibold hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}