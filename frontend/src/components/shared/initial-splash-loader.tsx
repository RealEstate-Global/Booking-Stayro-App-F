"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/i18n/language-provider";
import { WelcomeExperience } from "@/components/shared/welcome-experience";

/**
 * First-load welcome screen: the exact Stayro brand experience (animated mark,
 * name, tagline and social links) shown above the entire app — header included.
 *
 * Hydration-safe: the initial render is identical on server and client. The
 * returning-visitor decision is made in the effect, and the pre-hydration
 * script in layout.tsx hides the SSR overlay via `html.splash-seen` so it can
 * never remain stuck on reload.
 */
export function InitialSplashLoader() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const html = document.documentElement;
    let alreadySeen = false;
    try {
      alreadySeen = Boolean(sessionStorage.getItem("stayro-splash-done"));
    } catch {
      // Storage unavailable (private mode) — treat as a first visit.
    }

    if (alreadySeen) {
      // One-shot post-hydration sync: the first render must be identical on
      // server and client, so this decision can only be made in the effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe dismissal for returning visitors
      setVisible(false);
      html.classList.remove("splash-active");
      return;
    }

    html.classList.add("splash-active");
    // The mark draws over 2.2s; then the welcome screen fades away.
    const timer = setTimeout(() => setVisible(false), 2200);

    return () => {
      clearTimeout(timer);
      html.classList.remove("splash-active");
    };
  }, [visible]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.classList.remove("splash-active");
        // Kick off the modern staggered reveal of the real app.
        document.documentElement.classList.add("welcome-complete");
        try {
          sessionStorage.setItem("stayro-splash-done", "1");
        } catch {
          // Ignore storage errors.
        }
      }}
    >
      {visible && (
        <motion.div
          key="stayro-welcome"
          data-stayro-splash
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999]"
          role="status"
          aria-label={t.home.splashAriaLabel}
        >
          <WelcomeExperience />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
