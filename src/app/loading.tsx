import PageSkeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <PageSkeleton />
    </div>
  );
}
