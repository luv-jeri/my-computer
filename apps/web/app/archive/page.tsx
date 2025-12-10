"use client";

import { Archive, HardDrive, RefreshCw, Settings2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Switch,
} from "@repo/ui";
import { useArchiveStore } from "@/lib/stores/archive-store";
import { mockAssets, mockArchiveStatus } from "@/lib/mock-data";
import { ArchiveStatusBadge } from "@/components/archive/archive-status-badge";
import { RestoreTasksPanel } from "@/components/archive/restore-tasks-panel";
import Image from "next/image";

export default function ArchivePage() {
  const { archiveRules, toggleArchiveRule, openRestoreModal } =
    useArchiveStore();

  // Get archived assets
  const archivedAssets = mockAssets.filter((asset) => {
    const status = mockArchiveStatus[asset.id];
    return status?.isArchived;
  });

  // Calculate storage stats
  const storageStats = {
    glacier: archivedAssets.filter(
      (a) => mockArchiveStatus[a.id]?.tier === "glacier"
    ).length,
    deepArchive: archivedAssets.filter(
      (a) => mockArchiveStatus[a.id]?.tier === "glacier-deep-archive"
    ).length,
    infrequentAccess: archivedAssets.filter(
      (a) => mockArchiveStatus[a.id]?.tier === "infrequent-access"
    ).length,
    total: archivedAssets.length,
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <Archive className="h-6 w-6" />
            Archive Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage archived assets and storage tiers
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Archived Assets</TabsTrigger>
            <TabsTrigger value="restore">Restore Tasks</TabsTrigger>
            <TabsTrigger value="rules">Archive Rules</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Storage Breakdown */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Archived
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{storageStats.total}</div>
                  <p className="text-muted-foreground text-xs">assets</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    Glacier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {storageStats.glacier}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    3-5 hour restore
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    Deep Archive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {storageStats.deepArchive}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    12+ hour restore
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    Infrequent Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {storageStats.infrequentAccess}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Instant restore
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Cost Savings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Storage Cost Savings
                </CardTitle>
                <CardDescription>
                  Estimated savings from automated archiving
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Standard Storage Avoided</span>
                    <span className="font-semibold text-emerald-600">
                      $127.50/month
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Archive Storage Cost</span>
                    <span className="font-semibold">$12.30/month</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Net Savings</span>
                      <span className="text-lg font-bold text-emerald-600">
                        $115.20/month
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Restore Tasks Preview */}
            <RestoreTasksPanel compact />
          </TabsContent>

          {/* Archived Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {archivedAssets.map((asset) => {
                const status = mockArchiveStatus[asset.id];
                return (
                  <Card key={asset.id} className="overflow-hidden">
                    <div className="bg-muted relative aspect-video">
                      <Image
                        src={asset.thumbnail}
                        alt={asset.title}
                        fill
                        className="object-cover opacity-60"
                        unoptimized
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Archive className="text-muted-foreground h-8 w-8" />
                      </div>
                      <div className="absolute right-2 top-2">
                        <ArchiveStatusBadge status={status!} />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="truncate font-medium">{asset.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        Archived{" "}
                        {status?.archivedAt
                          ? new Date(status.archivedAt).toLocaleDateString()
                          : ""}
                      </p>
                      <Button
                        className="mt-3 w-full"
                        size="sm"
                        onClick={() => openRestoreModal(asset.id)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restore Asset
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Restore Tasks Tab */}
          <TabsContent value="restore">
            <RestoreTasksPanel />
          </TabsContent>

          {/* Archive Rules Tab */}
          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5" />
                  Automated Archive Rules
                </CardTitle>
                <CardDescription>
                  Configure rules for automatic asset archiving based on age and
                  usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {archiveRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge
                          variant={rule.isActive ? "default" : "secondary"}
                        >
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {rule.criteria.olderThanDays &&
                          `Assets older than ${rule.criteria.olderThanDays} days`}
                        {rule.criteria.unusedForDays &&
                          ` unused for ${rule.criteria.unusedForDays} days`}
                        {rule.criteria.projects &&
                          ` in projects: ${rule.criteria.projects.join(", ")}`}
                        {rule.criteria.tags &&
                          ` with tags: ${rule.criteria.tags.join(", ")}`}
                        {" → "}
                        <span className="font-medium capitalize">
                          {rule.targetTier.replace("-", " ")}
                        </span>
                      </p>
                    </div>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleArchiveRule(rule.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
