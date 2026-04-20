import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const links = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 rounded-2xl border border-neutral-200/80 bg-white/90 px-6 py-12 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/85 sm:px-10">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          KeenKeeper
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mt-10">
          <p className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-white">
            Social Links
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 sm:flex-row">
        <p>© {year} KeenKeeper. All rights reserved.</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
