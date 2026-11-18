import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small pill with a dot, used as an eyebrow above section headings. */
export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20",
        className
      )}
    >
      <div className="w-2 h-2 rounded-full bg-primary" />
      <span className="text-sm text-primary font-medium">{children}</span>
    </div>
  );
}
