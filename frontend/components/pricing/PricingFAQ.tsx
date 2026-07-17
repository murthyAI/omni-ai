"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Can I start using OMNI AI for free?",
    answer:
      "Yes. You can create a free account and use OMNI AI with limited access to Chat, Image Generator and Code Generator.",
  },
  {
    question: "What is included in the Pro plan?",
    answer:
      "The Pro plan includes higher usage, faster responses, premium AI models, improved image generation, cloud history and priority processing.",
  },
  {
    question: "What is the difference between Pro and Pro+?",
    answer:
      "Pro is designed for regular students, developers and creators. Pro+ is designed for power users who need very high usage, the fastest processing, priority support and access to advanced future features.",
  },
  {
    question: "Are the launch prices permanent?",
    answer:
      "The launch prices are introductory prices for early users. Regular prices may apply later as OMNI AI adds more tools, models and infrastructure.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. After billing integration is enabled, you will be able to cancel your subscription anytime from your account settings.",
  },
  {
    question: "Will OMNI AI add PDF, voice, audio and video features?",
    answer:
      "Yes. PDF analysis, voice conversations, advanced document chat, audio creation and video tools are planned for future versions.",
  },
  {
    question: "Is Pro+ completely unlimited?",
    answer:
      "Pro+ provides very high usage for power users. To protect service quality and manage infrastructure costs, all plans may remain subject to a reasonable fair-use policy.",
  },
  {
    question: "Are payments active now?",
    answer:
      "The pricing page is ready, but paid subscriptions will become active after secure payment gateway and billing integration are completed.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
          Everything you need to know about OMNI AI plans,
          subscriptions and future upgrades.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-black"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-zinc-900"
              >
                <span className="font-semibold text-zinc-100">
                  {item.question}
                </span>

                <span
                  className={`text-2xl font-light text-cyan-400 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-zinc-800 px-5 py-5">
                  <p className="leading-7 text-zinc-400">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}