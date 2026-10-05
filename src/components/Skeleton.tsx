import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rect" | "circle" | "text" | "text-sm" | "image";
}

/**
 * Base Accessible Skeleton element.
 * Zero-JS shimmer animation powered by pure CSS variables and pseudo-elements.
 */
export function Skeleton({
  className = "",
  variant = "rect",
  ...props
}: SkeletonProps) {
  const variantClass =
    variant === "circle"
      ? "skeleton--circle"
      : variant === "text"
      ? "skeleton--text"
      : variant === "text-sm"
      ? "skeleton--text-sm"
      : variant === "image"
      ? "skeleton--image"
      : "";

  return (
    <div
      aria-hidden="true"
      className={`skeleton ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}

/**
 * Layout Pattern 1: Profile Header
 * 56px circular avatar with name (40%) and bio (65%) placeholders.
 */
export function ProfileSkeleton({ className = "" }: { className?: string }) {
  return (
    <section className={`pattern-profile ${className}`} aria-label="Loading profile...">
      <Skeleton variant="circle" className="pattern-profile__avatar" />
      <div className="pattern-profile__lines">
        <Skeleton variant="text" style={{ width: "40%" }} />
        <Skeleton variant="text-sm" style={{ width: "65%" }} />
      </div>
    </section>
  );
}

/**
 * Layout Pattern 2: Card Grid
 * 3-column responsive grid (collapses to 1 on mobile < 640px).
 * Each card features 16:9 image placeholder and 3 staggered text lines.
 */
export function CardGridSkeleton({
  count = 3,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <section className={`pattern-grid ${className}`} aria-label="Loading cards...">
      {Array.from({ length: count }).map((_, i) => (
        <article key={i} className="skeleton-card">
          <Skeleton variant="image" />
          <div className="skeleton-card__body">
            <Skeleton variant="text" style={{ width: "100%" }} />
            <Skeleton variant="text" style={{ width: "80%" }} />
            <Skeleton variant="text" style={{ width: "50%" }} />
          </div>
        </article>
      ))}
    </section>
  );
}

/**
 * Layout Pattern 3: Content List
 * 4 rows, each with 40px circular avatar and 2 staggered text lines (55% & 35%).
 */
export function ContentListSkeleton({
  rows = 4,
  className = "",
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <section className={`pattern-list ${className}`} aria-label="Loading list...">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="pattern-list__row">
          <Skeleton variant="circle" className="pattern-list__avatar" />
          <div className="pattern-list__lines">
            <Skeleton variant="text" style={{ width: "55%" }} />
            <Skeleton variant="text-sm" style={{ width: "35%" }} />
          </div>
        </div>
      ))}
    </section>
  );
}

/**
 * Full Page Skeleton Container
 * Renders all 3 patterns with aria-busy="true" for accessible loading state.
 */
export default function PageSkeleton() {
  return (
    <main
      className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-9 w-full"
      aria-busy="true"
      aria-label="Loading content..."
    >
      <ProfileSkeleton />
      <CardGridSkeleton count={3} />
      <ContentListSkeleton rows={4} />
    </main>
  );
}
