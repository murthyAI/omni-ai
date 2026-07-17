"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatsGrid from "@/components/dashboard/StatsGrid";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const [savedChats, setSavedChats] = useState(0);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      const displayName =
        user.displayName?.trim() ||
        user.email?.split("@")[0] ||
        "User";

      setUserName(displayName);
      setUserEmail(user.email || "");
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    try {
      const storedConversations = localStorage.getItem(
        "omni-ai-conversations"
      );

      if (!storedConversations) {
        setSavedChats(0);
        return;
      }

      const parsedConversations = JSON.parse(storedConversations);

      if (Array.isArray(parsedConversations)) {
        setSavedChats(parsedConversations.length);
      } else {
        setSavedChats(0);
      }
    } catch (error) {
      console.error(
        "Unable to load dashboard conversations:",
        error
      );

      setSavedChats(0);
    }
  }, []);

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-cyan-400" />

          <h1 className="mt-5 text-xl font-bold text-white">
            OMNI AI
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Loading your professional workspace...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <DashboardHeader
          userName={userName}
          userEmail={userEmail}
        />

        <StatsGrid savedChats={savedChats} />

        <QuickActions />

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <RecentActivity savedChats={savedChats} />

          <UserProfileCard
            userName={userName}
            userEmail={userEmail}
          />
        </section>

        <SubscriptionCard />

        <footer className="border-t border-zinc-900 py-6 text-center">
          <p className="text-sm text-zinc-600">
            OMNI AI Version 1 · Your complete AI workspace
          </p>
        </footer>
      </div>
    </main>
  );
}