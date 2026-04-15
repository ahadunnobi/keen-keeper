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

type FriendsContextValue = {
  friends: Friend[];
  loading: boolean;
  error: string | null;
  refreshFriends: () => Promise<void>;
};

const FriendsContext = createContext<FriendsContextValue | undefined>(undefined);

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>([]);
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

  const value = useMemo(
    () => ({ friends, loading, error, refreshFriends }),
    [friends, loading, error, refreshFriends],
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
