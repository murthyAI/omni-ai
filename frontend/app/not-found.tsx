import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg shadow-blue-600/20">
          O
        </div>

        <p className="text-7xl font-extrabold tracking-tight text-blue-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Sorry, the page you are looking for doesn't exist, may have been
          moved, or the URL may be incorrect.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © 2026 OMNI AI. All rights reserved.
        </div>
      </div>
    </main>
  );
}