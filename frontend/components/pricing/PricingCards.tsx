"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { auth } from "@/lib/firebase";

type PaidPlanId = "pro" | "pro-plus";

type PricingPlan = {
  id: "free" | PaidPlanId;
  name: string;
  description: string;
  regularPrice: string;
  launchPrice: string;
  period: string;
  badge?: string;
  highlighted?: boolean;
  buttonText: string;
  buttonHref?: string;
  features: string[];
};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (
    response: RazorpaySuccessResponse
  ) => Promise<void>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (
      response: RazorpayFailureResponse
    ) => void
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

const plans: PricingPlan[] = [
  {
    id: "free",
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
    id: "pro",
    name: "Pro",
    description:
      "More AI power for students, developers and content creators.",
    regularPrice: "₹399",
    launchPrice: "₹299",
    period: "per month",
    badge: "Most Popular",
    highlighted: true,
    buttonText: "Choose Pro",
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
    id: "pro-plus",
    name: "Pro+",
    description:
      "Maximum flexibility for power users and professional workflows.",
    regularPrice: "₹699",
    launchPrice: "₹599",
    period: "per month",
    badge: "Best Value",
    buttonText: "Choose Pro+",
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
  const [processingPlan, setProcessingPlan] =
    useState<PaidPlanId | null>(null);

  const [statusMessage, setStatusMessage] =
    useState("");

  const [statusType, setStatusType] = useState<
    "success" | "error" | ""
  >("");

  async function startPayment(plan: PaidPlanId) {
    setStatusMessage("");
    setStatusType("");

    const publicKey =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!publicKey) {
      setStatusType("error");
      setStatusMessage(
        "Payment configuration is currently unavailable."
      );
      return;
    }

    if (!window.Razorpay) {
      setStatusType("error");
      setStatusMessage(
        "Payment checkout did not load. Please refresh and try again."
      );
      return;
    }

    setProcessingPlan(plan);

    try {
      const currentUser = auth.currentUser;

if (!currentUser) {
  throw new Error("Please login before purchasing a plan.");
}

const idToken = await currentUser.getIdToken();
      const orderResponse = await fetch(
        "/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plan }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData?.error ||
            "Unable to start the payment."
        );
      }

      const options: RazorpayOptions = {
        key: publicKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "OMNI AI",
        description:
          plan === "pro"
            ? "OMNI AI Pro Plan"
            : "OMNI AI Pro+ Plan",
        order_id: orderData.orderId,

        handler: async (
          paymentResponse: RazorpaySuccessResponse
        ) => {
          try {
            const verifyResponse = await fetch(
              "/api/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                     Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                  ...paymentResponse,
                  plan,
                }),
              }
            );

            const verifyData =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !verifyData?.success
            ) {
              throw new Error(
                verifyData?.error ||
                  "Payment verification failed."
              );
            }

            setStatusType("success");
            setStatusMessage(
              `Payment successful. Your ${
                plan === "pro" ? "Pro" : "Pro+"
              } payment has been verified.`
            );
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setStatusType("error");
            setStatusMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed."
            );
          } finally {
            setProcessingPlan(null);
          }
        },

        theme: {
          color: "#06b6d4",
        },

        modal: {
          ondismiss: () => {
            setProcessingPlan(null);
            setStatusType("error");
            setStatusMessage(
              "Payment window was closed before completion."
            );
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        (response: RazorpayFailureResponse) => {
          setProcessingPlan(null);
          setStatusType("error");
          setStatusMessage(
            response?.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error("Payment start error:", error);

      setProcessingPlan(null);
      setStatusType("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to start the payment."
      );
    }
  }

  return (
    <section>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Simple plans for every kind of user
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
          Start free today and upgrade whenever you need
          more power, speed and advanced AI features.
        </p>
      </div>

      {statusMessage && (
        <div
          className={
            statusType === "success"
              ? "mx-auto mb-6 max-w-2xl rounded-xl border border-green-800 bg-green-950/40 px-4 py-3 text-center text-sm text-green-300"
              : "mx-auto mb-6 max-w-2xl rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-center text-sm text-red-300"
          }
        >
          {statusMessage}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
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
              {plan.regularPrice !==
                plan.launchPrice && (
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

            {plan.id === "free" ? (
              <Link
                href={plan.buttonHref || "/signup"}
                className="mt-7 block rounded-xl border border-zinc-700 bg-black px-5 py-3 text-center font-bold text-white transition hover:border-cyan-500 hover:text-cyan-400"
              >
                {plan.buttonText}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                   void startPayment(plan.id as PaidPlanId)
                }
                disabled={processingPlan !== null}
                className={
                  plan.highlighted
                    ? "mt-7 block w-full rounded-xl bg-cyan-500 px-5 py-3 text-center font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    : "mt-7 block w-full rounded-xl border border-zinc-700 bg-black px-5 py-3 text-center font-bold text-white transition hover:border-cyan-500 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                }
              >
                {processingPlan === plan.id
                  ? "Opening Payment..."
                  : plan.buttonText}
              </button>
            )}

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
        Payments are securely processed by Razorpay.
        Usage is subject to fair-use limits.
      </p>
    </section>
  );
}