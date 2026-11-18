import Image from "next/image";
import { StayroMark } from "@/components/shared/logo";

/**
 * Stayro page loading splash:
 * Matches identical grand composition with stayro-hero.webp backdrop,
 * glowing prominent mark, and brand typography.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#121214] text-white"
      role="status"
      aria-label="Stayro Loading"
    >
      {/* Authentic Stayro Hero Backdrop */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/stayro-hero.webp"
          alt="Stayro Ambient Backdrop"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-50 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/90 via-[#121214]/80 to-[#121214]/95 backdrop-blur-[2px]" />
      </div>

      {/* Ambient glowing radial light */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-primary/25 blur-[130px]"
      />

      <div className="relative flex flex-col items-center gap-7 px-4 text-center">
        {/* Prominent house-S mark with brand glow */}
        <div className="animate-pulse duration-1000">
          <StayroMark className="h-44 w-44 drop-shadow-[0_0_25px_rgba(255,91,46,0.85)] drop-shadow-[0_0_55px_rgba(255,91,46,0.4)] sm:h-56 sm:w-56 md:h-64 md:w-64" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,91,46,0.7)] md:text-5xl">
            ستيرو
          </h1>
          <p className="text-sm font-medium tracking-wide text-white/85 drop-shadow md:text-base">
            لكل إقامة هناك قصة
          </p>
        </div>

        {/* Shimmering sleek neon progress indicator */}
        <div className="mt-1 h-1 w-36 overflow-hidden rounded-full bg-white/15 drop-shadow-[0_0_10px_rgba(255,91,46,0.8)]">
          <div className="h-full w-full origin-left animate-pulse bg-gradient-to-r from-primary via-[#FFA180] to-primary" />
        </div>
      </div>
    </div>
  );
}
