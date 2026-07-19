import Footer from "@/components/Footer";
export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <div className="mb-10 border-b border-gray-200 pb-6 dark:border-gray-800">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            OMNI AI
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms and Conditions
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Last updated: July 19, 2026
          </p>
        </div>

        <div className="space-y-8 leading-7 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              1. Acceptance of Terms
            </h2>

            <p>
              These Terms and Conditions govern your access to and use of OMNI
              AI, including its website, applications, AI chat, image
              generation, code generation, and related services.
            </p>

            <p className="mt-3">
              By creating an account or using OMNI AI, you agree to these Terms.
              If you do not agree, you must not use the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              2. Eligibility and Accounts
            </h2>

            <p>
              You must meet the minimum legal age required in your country to
              independently use online services. Users below that age may use
              OMNI AI only with the permission and supervision of a parent or
              legal guardian.
            </p>

            <p className="mt-3">
              You are responsible for providing accurate account information,
              maintaining the confidentiality of your login credentials, and
              all activity performed through your account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              3. Permitted Use
            </h2>

            <p>
              You may use OMNI AI for lawful personal, educational,
              professional, creative, and business purposes, subject to these
              Terms and applicable laws.
            </p>

            <p className="mt-3">
              You are responsible for reviewing AI-generated content before
              relying on, publishing, distributing, or using it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              4. Prohibited Activities
            </h2>

            <p>You must not use OMNI AI to:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Break any applicable law or regulation.</li>
              <li>Harass, threaten, exploit, deceive, or harm another person.</li>
              <li>
                Generate or distribute malware, phishing content, fraudulent
                material, or instructions intended to compromise security.
              </li>
              <li>
                Upload content that infringes intellectual property, privacy, or
                other legal rights.
              </li>
              <li>
                Attempt to gain unauthorized access to OMNI AI, its servers, or
                another user&apos;s account.
              </li>
              <li>
                Abuse, overload, scrape, reverse engineer, or interfere with the
                service, except where permitted by applicable law.
              </li>
              <li>
                Bypass usage limits, payment requirements, safety protections,
                or account restrictions.
              </li>
              <li>
                Misrepresent AI-generated content as verified professional
                advice or guaranteed factual information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              5. AI-Generated Content
            </h2>

            <p>
              OMNI AI uses artificial intelligence systems that may produce
              incomplete, inaccurate, outdated, or unexpected results. Generated
              responses, images, and code are provided for general informational
              and creative assistance.
            </p>

            <p className="mt-3">
              OMNI AI does not guarantee that generated content is accurate,
              unique, error-free, secure, suitable for a particular purpose, or
              free from third-party rights.
            </p>

            <p className="mt-3">
              You should independently verify important information and test all
              generated code before using it in production systems.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              6. Professional Advice Disclaimer
            </h2>

            <p>
              OMNI AI is not a substitute for qualified medical, legal,
              financial, tax, engineering, cybersecurity, or other professional
              advice. Decisions involving significant risk should be reviewed
              by an appropriately qualified professional.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              7. User Content
            </h2>

            <p>
              You retain ownership of content you submit to OMNI AI, subject to
              any rights held by third parties.
            </p>

            <p className="mt-3">
              You grant OMNI AI the limited rights necessary to host, process,
              transmit, and display your content for the purpose of providing,
              securing, maintaining, and improving the service.
            </p>

            <p className="mt-3">
              You confirm that you have the necessary rights and permissions to
              submit the content you provide.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              8. Intellectual Property
            </h2>

            <p>
              OMNI AI, its branding, interface, software, features, designs, and
              original materials are owned by or licensed to OMNI AI and are
              protected by applicable intellectual property laws.
            </p>

            <p className="mt-3">
              These Terms do not transfer ownership of OMNI AI technology,
              trademarks, or other proprietary rights to users.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              9. Free and Paid Plans
            </h2>

            <p>
              OMNI AI may provide free and paid subscription plans with
              different features, usage allowances, availability, and service
              limits.
            </p>

            <p className="mt-3">
              Plan features, prices, limits, and availability may change. Any
              material changes affecting an active paid subscription will be
              communicated where required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              10. Payments, Renewals, and Cancellations
            </h2>

            <p>
              Paid subscriptions may be processed through an authorized
              third-party payment provider. By purchasing a plan, you authorize
              the applicable charges displayed at checkout.
            </p>

            <p className="mt-3">
              Subscriptions may renew automatically unless cancelled before the
              next billing date, where automatic renewal is offered.
              Cancellation prevents future renewal but does not normally provide
              a refund for an already-started billing period, except where
              required by law or stated otherwise at purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              11. Availability and Modifications
            </h2>

            <p>
              We may update, modify, suspend, or discontinue any part of OMNI AI
              for maintenance, security, legal, technical, or business reasons.
            </p>

            <p className="mt-3">
              We do not guarantee uninterrupted availability, response speed,
              permanent storage of generated content, or compatibility with
              every device or browser.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              12. Account Suspension and Termination
            </h2>

            <p>
              We may restrict, suspend, or terminate access where we reasonably
              believe a user has violated these Terms, created security or legal
              risk, abused the service, failed to pay applicable fees, or harmed
              other users or the platform.
            </p>

            <p className="mt-3">
              Users may stop using OMNI AI at any time and may request account
              deletion through the available support or account options.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              13. Third-Party Services
            </h2>

            <p>
              OMNI AI may rely on or link to third-party services, including
              authentication, hosting, AI models, analytics, and payment
              providers. Those services may be governed by their own terms and
              privacy policies.
            </p>

            <p className="mt-3">
              OMNI AI is not responsible for third-party services that are
              outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              14. Disclaimer of Warranties
            </h2>

            <p>
              To the fullest extent permitted by law, OMNI AI is provided on an
              &quot;as is&quot; and &quot;as available&quot; basis without
              warranties of any kind, whether express or implied.
            </p>

            <p className="mt-3">
              We do not warrant that the service will always be available,
              secure, accurate, error-free, or suitable for every intended use.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              15. Limitation of Liability
            </h2>

            <p>
              To the fullest extent permitted by applicable law, OMNI AI and its
              operators will not be liable for indirect, incidental, special,
              consequential, exemplary, or punitive damages arising from the use
              of, inability to use, or reliance on the service.
            </p>

            <p className="mt-3">
              Users remain responsible for decisions, actions, publications,
              deployments, and business activities based on AI-generated
              content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              16. Indemnification
            </h2>

            <p>
              To the extent permitted by law, you agree to be responsible for
              claims, losses, or expenses arising from your unlawful use of OMNI
              AI, violation of these Terms, or infringement of another
              person&apos;s rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              17. Governing Law and Disputes
            </h2>

            <p>
              These Terms will be governed by the applicable laws of India,
              without regard to conflict-of-law principles.
            </p>

            <p className="mt-3">
              Subject to applicable consumer protection laws, disputes relating
              to these Terms or OMNI AI will be handled by the courts having
              lawful jurisdiction in India.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              18. Changes to These Terms
            </h2>

            <p>
              We may update these Terms when the service, legal requirements, or
              business practices change. The updated date will appear at the top
              of this page.
            </p>

            <p className="mt-3">
              Continued use of OMNI AI after revised Terms become effective
              indicates acceptance of those revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              19. Contact Us
            </h2>

            <p>
              For questions about these Terms, subscription concerns, or account
              support, please contact the OMNI AI support team through the
              Contact Us page.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © 2026 OMNI AI. All rights reserved.
        </div>
      </div>
      <Footer />
    </main>
  );
}