"use client";

const features = [
  {
    feature: "AI Chat",
    free: "✓",
    pro: "✓",
    proPlus: "✓",
  },
  {
    feature: "Image Generator",
    free: "✓",
    pro: "✓",
    proPlus: "✓",
  },
  {
    feature: "Code Generator",
    free: "✓",
    pro: "✓",
    proPlus: "✓",
  },
  {
    feature: "AI Usage",
    free: "Limited",
    pro: "Higher",
    proPlus: "Very High",
  },
  {
    feature: "AI Response Speed",
    free: "Standard",
    pro: "Fast",
    proPlus: "Fastest",
  },
  {
    feature: "Cloud History",
    free: "—",
    pro: "✓",
    proPlus: "✓",
  },
  {
    feature: "Premium AI Models",
    free: "—",
    pro: "✓",
    proPlus: "✓",
  },
  {
    feature: "Priority Processing",
    free: "—",
    pro: "✓",
    proPlus: "✓",
  },
  {
    feature: "PDF Analysis",
    free: "Future",
    pro: "Future",
    proPlus: "Future",
  },
  {
    feature: "Voice AI",
    free: "Future",
    pro: "Future",
    proPlus: "Future",
  },
];

export default function FeatureComparison() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Compare Plans
        </h2>

        <p className="mt-3 text-zinc-400">
          Compare features and choose the plan that best fits your
          workflow.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-5 py-4 text-left text-zinc-300">
                Feature
              </th>

              <th className="px-5 py-4 text-center text-white">
                Free
              </th>

              <th className="px-5 py-4 text-center text-cyan-400">
                Pro
              </th>

              <th className="px-5 py-4 text-center text-purple-400">
                Pro+
              </th>
            </tr>
          </thead>

          <tbody>
            {features.map((item) => (
              <tr
                key={item.feature}
                className="border-b border-zinc-900 hover:bg-zinc-900/50"
              >
                <td className="px-5 py-4 font-medium text-zinc-300">
                  {item.feature}
                </td>

                <td className="px-5 py-4 text-center text-zinc-400">
                  {item.free}
                </td>

                <td className="px-5 py-4 text-center font-semibold text-cyan-400">
                  {item.pro}
                </td>

                <td className="px-5 py-4 text-center font-semibold text-purple-400">
                  {item.proPlus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Features marked as "Future" will be released in upcoming
        OMNI AI versions.
      </p>
    </section>
  );
}