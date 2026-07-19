import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-blue-600">
              OMNI AI
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
              One platform for AI Chat, Image Generation, Code Generation,
              and future AI productivity tools.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © 2026 OMNI AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}