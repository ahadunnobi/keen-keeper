"use client";

import { useFriends } from "@/context/friends-context";
import { Archive, Clock3, MessageSquareText, Pencil, Phone, Trash2, Video } from "lucide-react";
import Image from "next/image";
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

  const statusStyles: Record<string, string> = {
    overdue:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300",
    "almost due":
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300",
    "on-track":
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
  };
  const statusClass =
    statusStyles[friend.status.toLowerCase()] ??
    "border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200";

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
          <div className="space-y-5">
            <Image
              src={friend.picture}
              alt={friend.name}
              width={320}
              height={320}
              className="h-56 w-full rounded-2xl object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
            />

            <div className="space-y-2">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}
              >
                {friend.status}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {friend.name}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {friend.bio}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {friend.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Email
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {friend.email}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-violet-700 dark:hover:bg-violet-950/40 dark:hover:text-violet-300"
              >
                <Clock3 size={16} />
                Snooze 2 Weeks
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-amber-700 dark:hover:bg-amber-950/40 dark:hover:text-amber-300"
              >
                <Archive size={16} />
                Archive
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-red-400 hover:bg-red-50 hover:text-red-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-300"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold tracking-tight">Stats</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                  Days Since Contact
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {friend.days_since_contact}
                </p>
              </article>
              <article className="rounded-xl border border-violet-200 bg-violet-50/70 p-4 dark:border-violet-900/60 dark:bg-violet-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  Goal (days)
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {friend.goal}
                </p>
              </article>
              <article className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Next Due Date
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {friend.next_due_date}
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight">
                Relationship Goal
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-violet-700 dark:hover:bg-violet-950/40 dark:hover:text-violet-300"
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>
            <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Target Cadence
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Every {friend.goal} days
              </p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                Next touchpoint due on {friend.next_due_date}.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold tracking-tight">
              Quick Check-In
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Reach out now and keep this connection strong.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
              >
                <Phone size={16} />
                Call
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-300 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40"
              >
                <MessageSquareText size={16} />
                Text
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/40"
              >
                <Video size={16} />
                Video
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
