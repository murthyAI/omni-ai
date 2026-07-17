"use client";

import Link from "next/link";

type PricingPlan = {
  name: string;
  description: string;
  regularPrice: string;
  launchPrice: string;
  period: string;
  badge?: string;
  highlighted?: boolean;
  buttonText: string;
  buttonHref: string;
  features: string[];
};

const plans: PricingPlan[] = [
  {
    name: "Free",
    description:
      "Explore OMNI AI with essential tools for everyday AI tasks.",
    regularPrice: "₹0",
    launchPrice: "₹0",
    period: "Forever",
    buttonText: "Start Free",
    buttonHref: "/signup",
    features: [
      "Limited AI usage",
      "AI Chat access",
      "Image Generator access",
      "Code Generator access",
      "Local browser history",
      "Standard response speed",
    ],
  },
  {
    name: "Pro",
    description:
      "More AI power for students, developers and content creators.",
    regularPrice: "₹399",
    launchPrice: "₹299",
    period: "per month",
    badge: "Most Popular",
    highlighted: true,
    buttonText: "Choose Pro",
    buttonHref: "/signup?plan=pro",
    features: [
      "Higher AI usage limits",
      "Faster AI responses",
      "Premium AI models",
      "Improved image generation",
      "Cloud chat history",
      "Priority processing",
      "Early access to new tools",
    ],
  },
  {
    name: "Pro+",
    description:
      "Maximum flexibility for power users and professional workflows.",
    regularPrice: "₹699",
    launchPrice: "₹599",
    period: "per month",
    badge: "Best Value",
    buttonText: "Choose Pro+",
    buttonHref: "/signup?plan=pro-plus",
    features: [
      "Very high AI usage limits",
      "Fastest response priority",
      "Latest premium models",
      "Advanced image generation",
      "Cloud history and sync",
      "Priority support",
      "Future PDF and voice tools",
      "Future advanced AI features",
    ],
  },
];

export default function PricingCards() {
  return (
    <section>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Simple plans for every kind of user
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
          Start free today and upgrade whenever you need more power,
          speed and advanced AI features.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={
              plan.highlighted
                ? "relative rounded-3xl border border-cyan-500 bg-gradient-to-b from-cyan-950/70 via-zinc-950 to-black p-7 shadow-2xl shadow-cyan-950/30"
                : "relative rounded-3xl border border-zinc-800 bg-zinc-950 p-7"
            }
          >
            {plan.badge && (
              <span
                className={
                  plan.highlighted
                    ? "absolute right-5 top-5 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-black"
                    : "absolute right-5 top-5 rounded-full border border-purple-700 bg-purple-950 px-3 py-1 text-xs font-bold text-purple-300"
                }
              >
                {plan.badge}
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white">
                {plan.name}
              </h3>

              <p className="mt-3 min-h-14 text-sm leading-6 text-zinc-400">
                {plan.description}
              </p>
            </div>

            <div className="mt-7">
              {plan.regularPrice !== plan.launchPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-500 line-through">
                    {plan.regularPrice}
                  </span>

                  <span className="rounded-full border border-yellow-700 bg-yellow-950 px-2.5 py-1 text-xs font-semibold text-yellow-300">
                    Launch Offer
                  </span>
                </div>
              )}

              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-white">
                  {plan.launchPrice}
                </span>

                <span className="pb-1 text-sm text-zinc-500">
                  {plan.period}
                </span>
              </div>
            </div>

            <Link
              href={plan.buttonHref}
              className={
                plan.highlighted
                  ? "mt-7 block rounded-xl bg-cyan-500 px-5 py-3 text-center font-bold text-black transition hover:bg-cyan-400"
                  : "mt-7 block rounded-xl border border-zinc-700 bg-black px-5 py-3 text-center font-bold text-white transition hover:border-cyan-500 hover:text-cyan-400"
              }
            >
              {plan.buttonText}
            </Link>

            <div className="mt-7 border-t border-zinc-800 pt-6">
              <p className="text-sm font-semibold text-zinc-200">
                What’s included
              </p>

              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <span className="mt-0.5 text-green-400">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-center text-xs leading-6 text-zinc-500">
        Paid subscriptions and payment processing will become active
        after billing integration. Usage is subject to fair-use limits.
      </p>
    </section>
  );
}