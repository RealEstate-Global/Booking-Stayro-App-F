"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { StayroMark } from "@/components/shared/logo";

export default function NotFound() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute start-10 top-24 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-24 end-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <div className="animate-fade-rise mb-8 flex justify-center">
          <div className="animate-float-y rounded-full border border-primary/20 bg-primary/10 p-8">
            <StayroMark className="h-20 w-20 text-primary" />
          </div>
        </div>

        <h1 className="animate-fade-rise mb-4 text-8xl font-extrabold leading-none text-primary md:text-9xl">
          404
        </h1>

        <h2 className="animate-fade-rise-late mb-4 text-2xl font-bold text-foreground md:text-4xl">
          {t.notFound.heading}
        </h2>
        <p className="animate-fade-rise-late mb-8 text-lg text-muted-foreground">
          {t.notFound.description}
        </p>

        <div className="animate-fade-rise-later flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/">
              <Home className="me-2 h-5 w-5" />
              {t.notFound.returnHome}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-foreground/20 px-8 text-foreground hover:bg-foreground/5"
            onClick={() => window.history.back()}
          >
            {t.notFound.goBack}
          </Button>
        </div>

        <p className="mt-10 font-mono text-sm text-muted-foreground" dir="ltr">
          {t.notFound.pathLabel}: {pathname}
        </p>
      </div>
    </div>
  );
}
