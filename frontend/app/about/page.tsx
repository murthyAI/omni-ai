import Footer from "@/components/Footer";
const features = [
  {
    title: "AI Chat",
    description:
      "Ask questions, explore ideas, learn faster, and receive helpful AI-powered responses.",
  },
  {
    title: "Image Generation",
    description:
      "Transform text prompts into creative images for projects, content, education, and business.",
  },
  {
    title: "Code Generation",
    description:
      "Generate, understand, improve, and copy code across multiple programming languages.",
  },
  {
    title: "Simple Experience",
    description:
      "Access powerful AI tools through one clean, easy-to-use platform.",
  },
];

const roadmap = [
  "Voice-powered AI assistance",
  "Video creation and editing tools",
  "PDF analysis and document tools",
  "Mobile applications",
  "More languages and AI models",
  "Team and business collaboration features",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="px-6 py-14 text-center sm:px-10 sm:py-20">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/20">
              <div className="h-7 w-7 rounded-full border-4 border-white" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              About OMNI AI
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Powerful AI tools united in one simple platform
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              OMNI AI is an all-in-one artificial intelligence platform created
              to help students, professionals, developers, creators, and
              businesses work smarter, create faster, and turn ideas into
              results.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Mission
            </p>

            <h2 className="text-2xl font-bold">
              Make useful AI accessible to everyone
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              Our mission is to bring essential AI capabilities into one
              reliable and easy-to-use product. We aim to reduce the complexity
              of using multiple tools and help people complete meaningful work
              from a single platform.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Vision
            </p>

            <h2 className="text-2xl font-bold">
              Build a trusted global AI platform
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              Our vision is to grow OMNI AI into a global technology platform
              that supports learning, creativity, software development,
              productivity, and business innovation across languages and
              devices.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              What We Offer
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              One account. Multiple AI capabilities.
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              OMNI AI Version 1 combines the core tools users need most, with a
              focus on simplicity, speed, and practical value.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="mb-4 h-2 w-12 rounded-full bg-blue-600" />

                <h3 className="text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Why OMNI AI?
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Designed around real user needs
            </h2>

            <div className="mt-6 space-y-5 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Everything in one place
                </h3>
                <p className="mt-1 leading-7">
                  Move between chat, image creation, and coding without managing
                  several different products.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Built for practical work
                </h3>
                <p className="mt-1 leading-7">
                  OMNI AI focuses on tasks people regularly perform in
                  education, content creation, programming, and professional
                  work.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Growing with its users
                </h3>
                <p className="mt-1 leading-7">
                  Future improvements will be guided by feedback, real-world
                  usage, safety, reliability, and user value.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-sm sm:p-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Future Roadmap
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              What comes next
            </h2>

            <ul className="mt-6 space-y-4">
              {roadmap.map((item) => (
                <li key={item} className="flex gap-3 text-gray-300">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-900 dark:bg-blue-950/40 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Our Commitment
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight">
            Creating a useful, responsible, and continuously improving AI
            experience
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-700 dark:text-gray-300">
            We are committed to improving OMNI AI through responsible product
            development, user feedback, better performance, stronger safety,
            and features that create genuine value.
          </p>
        </section>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2026 OMNI AI. All rights reserved.
        </div>
      </div>
      <Footer />
    </main>
  );
}