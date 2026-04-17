"use client";

import TimelineEntry from "@/components/timeline-entry";
import {
  type InteractionType,
  type TimelineEvent,
  useFriends,
} from "@/context/friends-context";
import { Clock3 } from "lucide-react";
import { useMemo, useState } from "react";

const FILTER_OPTIONS: Array<{ id: "all" | InteractionType; label: string }> = [
  { id: "all", label: "All" },
  { id: "call", label: "Call" },
  { id: "text", label: "Text" },
  { id: "video", label: "Video" },
];

export default function TimelinePage() {
  const { timeline } = useFriends();
  const [activeFilter, setActiveFilter] = useState<"all" | InteractionType>("all");

  const sortedTimeline = useMemo(() => {
    return [...timeline].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [timeline]);

  const visibleTimeline = useMemo(() => {
    if (activeFilter === "all") {
      return sortedTimeline;
    }

    return sortedTimeline.filter((event) => event.type === activeFilter);
  }, [activeFilter, sortedTimeline]);

  const getTypeCount = (type: InteractionType) =>
    sortedTimeline.filter((event: TimelineEvent) => event.type === type).length;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Timeline
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          All logged interactions ordered newest to oldest.
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => {
            const isActive = option.id === activeFilter;
            const count =
              option.id === "all" ? sortedTimeline.length : getTypeCount(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveFilter(option.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
                  isActive
                    ? "border-violet-600 bg-violet-600 text-white dark:border-violet-500 dark:bg-violet-500 dark:text-violet-950"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-violet-300 hover:text-violet-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-violet-700 dark:hover:text-violet-300"
                }`}
              >
                {option.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs ${
                    isActive
                      ? "bg-white/25 text-white dark:bg-violet-900/30 dark:text-violet-100"
                      : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {visibleTimeline.length > 0 ? (
          <div className="space-y-1">
            {visibleTimeline.map((event) => (
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
            <p className="mt-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
              No timeline activity found
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Try logging a check-in from a friend profile.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
