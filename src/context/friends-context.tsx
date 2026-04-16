"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Friend = {
  id: string;
  name: string;
  picture: string;
  email: string;
  days_since_contact: number;
  status: string;
  tags: string[];
  bio: string;
  goal: string;
  next_due_date: string;
};

export type InteractionType = "call" | "text" | "video";

export type TimelineEvent = {
  id: string;
  friendId: string;
  type: InteractionType;
  title: string;
  date: string;
};

type FriendsContextValue = {
  friends: Friend[];
  timeline: TimelineEvent[];
  loading: boolean;
  error: string | null;
  refreshFriends: () => Promise<void>;
  addTimelineEvent: (event: Omit<TimelineEvent, "id">) => void;
};

const FriendsContext = createContext<FriendsContextValue | undefined>(undefined);

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshFriends = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/data/friends.json");
      if (!response.ok) {
        throw new Error("Could not load friends data.");
      }

      const data: Friend[] = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 600));
      setFriends(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshFriends();
  }, [refreshFriends]);

  useEffect(() => {
    const savedTimeline = localStorage.getItem("keenkeeper.timeline");
    if (!savedTimeline) {
      return;
    }

    try {
      const parsedTimeline = JSON.parse(savedTimeline) as TimelineEvent[];
      if (Array.isArray(parsedTimeline)) {
        setTimeline(parsedTimeline);
      }
    } catch {
      localStorage.removeItem("keenkeeper.timeline");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keenkeeper.timeline", JSON.stringify(timeline));
  }, [timeline]);

  const addTimelineEvent = useCallback((event: Omit<TimelineEvent, "id">) => {
    setTimeline((previous) => [
      {
        ...event,
        id: crypto.randomUUID(),
      },
      ...previous,
    ]);
  }, []);

  const value = useMemo(
    () => ({
      friends,
      timeline,
      loading,
      error,
      refreshFriends,
      addTimelineEvent,
    }),
    [friends, timeline, loading, error, refreshFriends, addTimelineEvent],
  );

  return (
    <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
  );
}

export function useFriends() {
  const context = useContext(FriendsContext);

  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider.");
  }

  return context;
}
