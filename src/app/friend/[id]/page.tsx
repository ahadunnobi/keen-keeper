type FriendDetailsPageProps = {
  params: {
    id: string;
  };
};

export default function FriendDetailsPage({ params }: FriendDetailsPageProps) {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Friend Details</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Dynamic friend route configured at <code>/friend/{params.id}</code>.
      </p>
    </section>
  );
}
