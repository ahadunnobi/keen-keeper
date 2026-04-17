"use client";

import { useFriends } from "@/context/friends-context";
import FriendCard from "@/components/friend-card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { friends, loading, error } = useFriends();
  const totalFriends = friends.length;
  const overdueConnections = friends.filter(
    (friend) => friend.status.toLowerCase() === "overdue",
  ).length;
  const upcomingDue = friends.filter(
    (friend) => friend.status.toLowerCase() === "almost due",
  ).length;
  const averageGoal =
    totalFriends === 0
      ? 0
      : Math.round(
          friends.reduce((sum, friend) => sum + friend.goal, 0) / totalFriends,
        );

  const summaryCards = [
    { label: "Total Friends", value: totalFriends.toString() },
    { label: "Overdue Connections", value: overdueConnections.toString() },
    { label: "Upcoming Due", value: upcomingDue.toString() },
    { label: "Average Goal", value: `${averageGoal} days` },
  ];

  return (
    <section className="space-y-6">
      <header className="overflow-hidden rounded-2xl border border-violet-200/70 bg-linear-to-br from-violet-100 via-white to-cyan-100 p-6 text-center shadow-sm dark:border-violet-900/60 dark:from-violet-950/60 dark:via-neutral-900 dark:to-cyan-950/40 sm:p-10">
        <div className="mx-auto max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Welcome to KeenKeeper
          </h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 sm:text-base">
            Build stronger friendships with intentional reminders and meaningful
            check-ins.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            <Plus size={16} />
            Add a Friend
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              {loading ? "..." : card.value}
            </p>
          </article>
        ))}
      </section>

      <header className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Your Friends
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Global mock data source with simulated loading state.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-neutral-200" />
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Loading friends...
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link
                href={`/friend/${friend.id}`}
                className="block h-full cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
              >
                <FriendCard friend={friend} />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
