"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StayroMark } from "@/components/shared/logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: wire to an error-reporting service (e.g. Sentry) when available.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <StayroMark className="h-16 w-16 text-primary/80" />
      <h1 className="text-3xl font-extrabold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button
        onClick={reset}
        className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
      >
        Try again
      </Button>
    </div>
  );
}
