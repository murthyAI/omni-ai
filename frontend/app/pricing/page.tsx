import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-12">

        <PricingHero />

        <PricingCards />

        <FeatureComparison />

        <PricingFAQ />

        <footer className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-500">
            © 2026 OMNI AI • All Rights Reserved
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            AI features, pricing and availability may change as OMNI AI
            continues to evolve.
          </p>
        </footer>

      </div>
    </main>
  );
}