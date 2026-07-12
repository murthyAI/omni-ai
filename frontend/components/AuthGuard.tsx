"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

const protectedRoutes = [
  "/dashboard",
  "/chat",
  "/code",
  "/image",
  "/settings",
];

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const routeNeedsLogin = protectedRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(route + "/")
    );

    if (!routeNeedsLogin) {
      setIsAllowed(true);
      setAuthChecked(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAllowed(true);
        setAuthChecked(true);
        return;
      }

      setIsAllowed(false);
      setAuthChecked(true);
      router.replace("/login");
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (!authChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-cyan-400" />

          <p className="mt-4 text-zinc-400">
            Checking your OMNI AI session...
          </p>
        </div>
      </main>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}