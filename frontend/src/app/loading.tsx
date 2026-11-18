import { StayroMark } from "@/components/shared/logo";

/**
 * First-load splash: the house-S mark and ستيرو on the charcoal canvas —
 * the same centered composition as stayro.com.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-4 bg-background md:min-h-[calc(100svh-5rem)]"
      role="status"
      aria-label="Loading"
    >
      <StayroMark className="h-24 w-24 animate-pulse text-primary/80 md:h-32 md:w-32" />
      <p className="text-3xl font-extrabold text-foreground md:text-5xl">ستيرو</p>
      <p className="text-sm text-foreground/70 md:text-base">لكل إقامة هناك قصة</p>
    </div>
  );
}
