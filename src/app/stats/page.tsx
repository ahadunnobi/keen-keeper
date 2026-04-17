"use client";

import { useFriends } from "@/context/friends-context";
import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CHART_COLORS = ["#22c55e", "#3b82f6", "#8b5cf6"];

export default function StatsPage() {
  const { timeline } = useFriends();

  const interactionData = useMemo(() => {
    const counts = {
      call: 0,
      text: 0,
      video: 0,
    };

    for (const event of timeline) {
      counts[event.type] += 1;
    }

    return [
      { name: "Calls", value: counts.call },
      { name: "Texts", value: counts.text },
      { name: "Videos", value: counts.video },
    ];
  }, [timeline]);

  const totalInteractions = interactionData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Friendship Analytics
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Breakdown of all logged call, text, and video check-ins.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Total Interactions
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {totalInteractions}
          </p>
        </article>
        {interactionData.map((item) => (
          <article
            key={item.name}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {item.name}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Interaction Distribution
        </h2>

        {totalInteractions > 0 ? (
          <div className="mt-4 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={108}
                  dataKey="value"
                  paddingAngle={3}
                  label
                >
                  {interactionData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            No interactions yet. Add check-ins from friend profiles to populate this chart.
          </p>
        )}
      </section>
    </section>
  );
}
