import AboutSettings from "@/components/settings/AboutSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import AIModelSettings from "@/components/settings/AIModelSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import ProfileCard from "@/components/settings/ProfileCard";
import ThemeSettings from "@/components/settings/ThemeSettings";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            Settings
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage your OMNI AI profile, appearance, language, model and account.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ProfileCard />
          <ThemeSettings />
          <LanguageSettings />
          <AIModelSettings />
          <AccountSettings />
          <AboutSettings />
        </div>
      </div>
    </main>
  );
}