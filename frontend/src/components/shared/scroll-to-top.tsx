"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating scroll-to-top button — fixed to the LEFT side of the viewport.
 * Appears after scrolling 400px, disappears at the top.
 * Smooth hardware-accelerated entrance/exit with spring physics.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          aria-label="العودة للأعلى / Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className={cn(
            "fixed bottom-6 left-5 z-40",
            "flex h-11 w-11 items-center justify-center",
            "rounded-full border border-primary/30 bg-primary shadow-lg shadow-primary/30",
            "text-white backdrop-blur-md",
            "hover:bg-primary/90 hover:shadow-primary/50",
            "transition-shadow duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
        >
          <ChevronUp className="h-5 w-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
