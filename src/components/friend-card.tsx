import type { Friend } from "@/context/friends-context";

type FriendCardProps = {
  friend: Friend;
};

const statusStyles: Record<string, string> = {
  overdue:
    "border-red-300 bg-red-50/80 dark:border-red-900/70 dark:bg-red-950/30",
  "almost due":
    "border-amber-300 bg-amber-50/80 dark:border-amber-900/70 dark:bg-amber-950/30",
  "on-track":
    "border-emerald-300 bg-emerald-50/80 dark:border-emerald-900/70 dark:bg-emerald-950/30",
};

const badgeStyles: Record<string, string> = {
  overdue: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  "almost due": "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  "on-track": "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
};

export default function FriendCard({ friend }: FriendCardProps) {
  const statusKey = friend.status.toLowerCase();
  const statusClass =
    statusStyles[statusKey] ??
    "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900";

  const badgeClass = badgeStyles[statusKey] ?? "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400";

  return (
    <article
      className={`h-full rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${statusClass}`}
    >
      <div className="flex items-start gap-3">
        <img
          src={friend.picture}
          alt={friend.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white/70 dark:ring-neutral-800/70"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="truncate text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {friend.name}
            </h3>

          </div>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
            {friend.days_since_contact} days since contact
          </p>
        </div>
      </div>
      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
        {friend.status}
      </span>
      <div className="mt-4 flex flex-wrap gap-2">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-300 bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-200"
          >
            {tag}
          </span>
        ))}

      </div>
    </article>
  );
}
