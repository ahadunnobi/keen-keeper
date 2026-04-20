import LoadingAnimation from "@/components/loading-animation";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <LoadingAnimation />
    </div>
  );
}
