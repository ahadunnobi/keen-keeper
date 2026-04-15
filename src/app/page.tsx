"use client";

import { useFriends } from "@/context/friends-context";

export default function Home() {
  const { friends, loading, error } = useFriends();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          KeenKeeper Friends
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Global mock data source with simulated loading state.
        </p>
      </header>

      {loading ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Loading friends...
        </p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {friend.name}
              </p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {friend.email}
              </p>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">
                Status: {friend.status} | Last contact: {friend.days_since_contact}d
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
