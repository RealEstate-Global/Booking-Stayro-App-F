"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ComingSoonFeature {
  icon: LucideIcon;
  label: string;
}

interface ComingSoonCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: ComingSoonFeature[];
  backToHomeLabel: string;
  /** Direction of the floating icon animation */
  floatAxis?: "y" | "x";
}

/** Reusable "launching soon" card used for upcoming Stayro services. */
export function ComingSoonCard({
  icon: Icon,
  title,
  description,
  features,
  backToHomeLabel,
  floatAxis = "y",
}: ComingSoonCardProps) {
  return (
    <div className="animate-fade-rise-late mx-auto w-full max-w-4xl">
      <Card className="border-primary/20 bg-card/50 p-8 text-center backdrop-blur-sm sm:p-12">
        <div className="mb-8 flex justify-center">
          <div
            className={cn(
              "rounded-full border border-primary/20 bg-primary/10 p-8",
              floatAxis === "y" ? "animate-float-y" : "animate-float-x"
            )}
          >
            <Icon className="h-16 w-16 text-primary md:h-20 md:w-20" />
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">{description}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: FeatureIcon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-primary/10 p-4">
                <FeatureIcon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Button
          asChild
          size="lg"
          className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/">
            {backToHomeLabel}
            <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
