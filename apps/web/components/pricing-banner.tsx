"use client";

import { Button, Progress } from "@repo/ui";
import { Sparkles, X, Clock, Zap } from "lucide-react";
import { mockUsageStats } from "@/lib/mock-data";
import { useState } from "react";

interface PricingBannerProps {
  onDismiss?: () => void;
}

export function PricingBanner({ onDismiss }: PricingBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const stats = mockUsageStats;

  if (isDismissed) return null;

  const timelinesPercentage =
    (stats.timelinesUsed / stats.timelinesLimit) * 100;
  const hoursPercentage = (stats.hoursProcessed / stats.hoursLimit) * 100;

  const daysUntilTrialEnds = stats.trialEndsAt
    ? Math.ceil(
        (new Date(stats.trialEndsAt).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div className="from-primary/10 via-primary/5 relative overflow-hidden rounded-lg bg-gradient-to-r to-transparent p-4">
      {/* Background decorations */}
      <div className="bg-primary/5 absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary mt-0.5 flex h-10 w-10 items-center justify-center rounded-full">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="font-semibold">Free Trial - AI Timeline Search</h3>
              <p className="text-muted-foreground text-sm">
                You have access to {stats.timelinesLimit} timelines and{" "}
                {stats.hoursLimit} hours of processing
              </p>
            </div>

            {/* Usage Stats */}
            <div className="flex gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Zap className="h-3 w-3" />
                  <span>
                    {stats.timelinesUsed} / {stats.timelinesLimit} timelines
                  </span>
                </div>
                <Progress value={timelinesPercentage} className="h-1.5 w-24" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>
                    {stats.hoursProcessed} / {stats.hoursLimit} hours
                  </span>
                </div>
                <Progress value={hoursPercentage} className="h-1.5 w-24" />
              </div>
            </div>

            {daysUntilTrialEnds && daysUntilTrialEnds > 0 && (
              <p className="text-muted-foreground text-xs">
                {daysUntilTrialEnds} days remaining in trial
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="default">
            Upgrade to Pro
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
