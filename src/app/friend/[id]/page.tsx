"use client";

import { useFriends } from "@/context/friends-context";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FriendDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { friends, loading, error } = useFriends();
  const friend = friends.find((item) => item.id === id);

  if (loading) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Friend Details</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Loading friend profile...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
        <h1 className="text-xl font-semibold text-red-700 dark:text-red-300">
          Could not load friend details
        </h1>
        <p className="text-sm text-red-700/90 dark:text-red-300/90">{error}</p>
      </section>
    );
  }

  if (!friend) {
    return (
      <section className="space-y-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-xl font-semibold tracking-tight">
          Friend not found
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          We could not find a friend with id <code>{id}</code>.
        </p>
        <Link
          href="/"
          className="inline-flex w-fit rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Friend Details</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Viewing profile for <span className="font-medium">{friend.name}</span>.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-lg font-semibold tracking-tight">Friend Info</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Left column profile card.
          </p>
        </aside>

        <div className="space-y-4">
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold tracking-tight">Stats</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Right column content placeholder.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
