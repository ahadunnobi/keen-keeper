import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        404 Not Found
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        The page you are looking for does not exist.
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Check the URL or return to the home page.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Back to Home
      </Link>
    </section>
  );
}
