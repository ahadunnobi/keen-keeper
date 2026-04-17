<p align="center">
  <img src="public/logo.png" width="120" alt="KeenKeeper Logo">
</p>

# KeenKeeper

KeenKeeper is a friendship relationship tracker built with Next.js. It helps you stay intentional about check-ins by organizing your friends, logging interactions (call, text, video), and showing timeline + analytics insights from those logs.

## Tech Stack

- Next.js (App Router) + React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons + React Hot Toast

## Key Features

- Friend dashboard with summary cards, responsive grid, and status indicators.
- Detailed profile page for each friend with quick check-in actions.
- Timeline system with reusable entries, newest-first sorting, and interaction-type filters.
- Friendship analytics page with totals and pie chart visualization.
- Persistent timeline data in local storage and toast feedback for check-ins.

## Pages and Routes

- `/` - Home dashboard with friend cards and summary metrics
- `/friend/[id]` - Friend details page with check-in logging
- `/timeline` - Global interaction history with type filters
- `/stats` - Interaction analytics and pie chart

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Build and Lint

```bash
npm run lint
npm run build
```

## Data and State Notes

- Friend data is loaded from `public/data/friends.json`.
- Timeline interactions are stored in `localStorage` under `keenkeeper.timeline`.
- Logging a check-in updates both the friend timeline and global timeline views.