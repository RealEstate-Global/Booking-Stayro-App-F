import { cn } from "@/lib/utils";

interface SaudiRiyalSymbolProps {
  className?: string;
  title?: string;
}

/**
 * The official Saudi Riyal symbol (رمز الريال السعودي).
 *
 * Uses the official emblem with `bg-current` and CSS mask so it seamlessly
 * inherits whatever text color is applied (white, foreground, primary, muted)
 * across both light and dark modes with 100% vector-sharp rendering.
 */
export function SaudiRiyalSymbol({
  className,
  title = "ر.س",
}: SaudiRiyalSymbolProps) {
  return (
    <span
      role="img"
      aria-label={title}
      title={title}
      className={cn(
        "inline-block shrink-0 bg-current align-[-0.14em]",
        "h-[1.15em] w-[1.02em]",
        "[mask-image:url('/images/Saudi_Riyal_Symbol.svg.webp')]",
        "[mask-size:contain]",
        "[mask-repeat:no-repeat]",
        "[mask-position:center]",
        "[-webkit-mask-image:url('/images/Saudi_Riyal_Symbol.svg.webp')]",
        "[-webkit-mask-size:contain]",
        "[-webkit-mask-repeat:no-repeat]",
        "[-webkit-mask-position:center]",
        className
      )}
    />
  );
}
