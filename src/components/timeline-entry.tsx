"use client";

import { InteractionType } from "@/context/friends-context";
import { MessageSquareText, Phone, Video } from "lucide-react";
import { useMemo } from "react";

interface TimelineEntryProps {
  date: string;
  type: InteractionType;
  title: string;
}

export default function TimelineEntry({ date, type, title }: TimelineEntryProps) {
  const Icon = useMemo(() => {
    switch (type) {
      case "call":
        return Phone;
      case "text":
        return MessageSquareText;
      case "video":
        return Video;
      default:
        return MessageSquareText;
    }
  }, [type]);

  const iconColors = {
    call: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    text: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    video: "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
  };

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      {/* Vertical Line */}
      <div className="absolute left-[11px] top-0 h-full w-[2px] bg-neutral-200 dark:bg-neutral-800 last:h-0" />
      
      {/* Bullet Point / Icon */}
      <div className={`absolute left-0 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white dark:ring-neutral-900 ${iconColors[type]}`}>
        <Icon size={12} />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
