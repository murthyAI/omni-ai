"use client";

import Footer from "@/components/Footer";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "success";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
            O
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Contact OMNI AI
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            We are here to help
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Contact us for account support, subscriptions, technical issues,
            partnerships, business enquiries, feedback, or general questions
            about OMNI AI.
          </p>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Support
              </p>

              <h2 className="mt-2 text-2xl font-bold">How can we help?</h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                Send us a message with clear details about your question or
                issue. Our support team will review your request and respond as
                soon as possible.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold">General Support</h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Account access, product features, technical issues, and user
                assistance.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold">Billing and Plans</h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Questions related to subscriptions, payments, cancellations, or
                plan upgrades.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold">
                Partnerships and Business
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Contact us for partnerships, investment discussions,
                sponsorships, collaborations, and enterprise opportunities.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-950 p-7 text-white shadow-sm">
              <h3 className="text-lg font-semibold">Response Time</h3>

              <p className="mt-2 leading-7 text-gray-300">
                We aim to respond within 2 to 3 business days. Response times
                may vary depending on the number and complexity of requests.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Send a Message
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Contact our team
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Complete the form below and provide as much information as
              possible.
            </p>

            {status === "success" && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
                Your message has been recorded successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium"
                >
                  Enquiry Type
                </label>

                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950"
                >
                  <option value="" disabled>
                    Select an enquiry type
                  </option>
                  <option value="support">General Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing and Subscription</option>
                  <option value="feedback">Feedback or Suggestion</option>
                  <option value="partnership">
                    Partnership or Business Enquiry
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Briefly describe your enquiry"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  placeholder="Explain your question or issue in detail"
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-950"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
              >
                Send Message
              </button>

              <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
                Do not include passwords, payment card details, API keys, or
                other sensitive information in this form.
              </p>
            </form>
          </div>
        </section>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2026 OMNI AI. All rights reserved.
        </div>
      </div>
      <Footer />
    </main>
  );
}