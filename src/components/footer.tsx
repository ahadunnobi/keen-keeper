import Link from "next/link";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4 rounded-2xl border border-neutral-200/80 bg-white/90 px-4 py-4 text-sm text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/85 dark:text-neutral-300 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} KeenKeeper. All rights reserved.</p>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
