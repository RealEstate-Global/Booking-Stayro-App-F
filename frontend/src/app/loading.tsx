import { StayroMark } from "@/components/shared/logo";

/**
 * Stayro page loading splash:
 * Identical composition to stayro.com with glowing mark, brand typography,
 * and ambient pulse on the dark luxury charcoal canvas.
 *
 * Strictly NO "coming soon" — active booking platform loader.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121214] text-white"
      role="status"
      aria-label="Stayro Loading"
    >
      {/* Ambient glowing radial light */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-primary/20 blur-[110px]"
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* Animated house-S mark with brand glow */}
        <div className="animate-pulse duration-1000">
          <StayroMark className="h-24 w-24 text-primary drop-shadow-[0_0_35px_rgba(255,91,46,0.65)] md:h-32 md:w-32" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            ستيرو
          </h1>
          <p className="text-sm font-medium tracking-wide text-white/80 md:text-base">
            لكل إقامة هناك قصة
          </p>
        </div>

        {/* Shimmering sleek progress indicator */}
        <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-pulse bg-primary" />
        </div>
      </div>
    </div>
  );
}
