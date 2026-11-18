import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Decorative shimmer placeholder. The surrounding region should carry
 * role="status" / aria-label so assistive tech announces loading, not the shapes.
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton rounded-lg bg-muted/60", className)}
      {...props}
    />
  );
}
