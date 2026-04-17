"use client";

import TimelineEntry from "@/components/timeline-entry";
import { type InteractionType, useFriends } from "@/context/friends-context";
import { Archive, Clock3, MessageSquareText, Pencil, Phone, Trash2, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function FriendDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number.parseInt(id, 10);
  const { friends, timeline, loading, error, addTimelineEvent } = useFriends();
  const friend = friends.find((item) => item.id === numericId);

  const friendTimeline = timeline.filter((event) => event.friendId === numericId);

  const handleCheckIn = (type: InteractionType) => {
    if (!friend) {
      return;
    }

    const labels: Record<InteractionType, string> = {
      call: "Call",
      text: "Text",
      video: "Video",
    };

    addTimelineEvent({
      friendId: friend.id,
      type,
      title: `${labels[type]} with ${friend.name}`,
      date: new Date().toISOString(),
    });

    toast.success(`${labels[type]} logged!`);
  };

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
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="transition hover:text-neutral-900 dark:hover:text-neutral-100">Friends</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100">{friend.name}</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">Friend Profile</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
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
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold tracking-tight">Status Overview</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <article className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                  Last Contacted
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {friend.days_since_contact}d
                </p>
              </article>
              <article className="rounded-xl border border-violet-200 bg-violet-50/70 p-4 dark:border-violet-900/60 dark:bg-violet-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  Goal Frequency
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {friend.goal}d
                </p>
              </article>
              <article className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Next Reminder
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {friend.next_due_date}
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Relationship Goal</h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  Contact every {friend.goal} days to maintain momentum.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <Pencil size={15} />
                Edit
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold tracking-tight">Quick Check-In</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Log a new interaction to reset the timer.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleCheckIn("call")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
              >
                <Phone size={16} />
                Call
              </button>
              <button
                type="button"
                onClick={() => handleCheckIn("text")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-300 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40"
              >
                <MessageSquareText size={16} />
                Text
              </button>
              <button
                type="button"
                onClick={() => handleCheckIn("video")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/40"
              >
                <Video size={16} />
                Video
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight">Timeline History</h2>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                {friendTimeline.length} Logs
              </span>
            </div>
            
            <div className="mt-6">
              {friendTimeline.length > 0 ? (
                <div className="space-y-1">
                  {friendTimeline.map((event) => (
                    <TimelineEntry
                      key={event.id}
                      date={event.date}
                      type={event.type}
                      title={event.title}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-neutral-50 p-3 dark:bg-neutral-950">
                    <Clock3 className="h-6 w-6 text-neutral-400" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">No history yet</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Time to reach out!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
