"use client";

import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Switch,
} from "@repo/ui";
import {
  Cloud,
  Mic,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  ExternalLink,
} from "lucide-react";
import { mockAWSConfig, mockRevAIConfig } from "@/lib/mock-data";
import type { IntegrationStatus } from "@/lib/types";

const statusConfig: Record<
  IntegrationStatus,
  { icon: React.ElementType; color: string; label: string }
> = {
  connected: {
    icon: CheckCircle,
    color: "text-emerald-500",
    label: "Connected",
  },
  disconnected: {
    icon: XCircle,
    color: "text-gray-500",
    label: "Disconnected",
  },
  error: { icon: AlertCircle, color: "text-red-500", label: "Error" },
  pending: { icon: RefreshCw, color: "text-amber-500", label: "Pending" },
};

export default function IntegrationsPage() {
  const awsConfig = mockAWSConfig;
  const revAIConfig = mockRevAIConfig;

  const AWSStatus = statusConfig[awsConfig.status];
  const RevAIStatus = statusConfig[revAIConfig.status];

  return (
    <AppShell>
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Integrations</h1>
          <p className="text-muted-foreground text-sm">
            Manage AI and cloud service integrations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* AWS Rekognition */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                    <Cloud className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AWS Rekognition</CardTitle>
                    <CardDescription>Video and image analysis</CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${AWSStatus.color} border-current`}
                >
                  <AWSStatus.icon className="mr-1 h-3 w-3" />
                  {AWSStatus.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Enable Integration</span>
                <Switch checked={awsConfig.isEnabled} />
              </div>

              <div className="text-muted-foreground text-sm">
                <p>Region: {awsConfig.region}</p>
                {awsConfig.lastSyncAt && (
                  <p>
                    Last sync: {new Date(awsConfig.lastSyncAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(awsConfig.features).map(
                    ([feature, enabled]) => (
                      <div
                        key={feature}
                        className="flex items-center justify-between rounded border p-2"
                      >
                        <span className="text-xs capitalize">
                          {feature.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <Switch checked={enabled} />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rev.ai */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20">
                    <Mic className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Rev.ai</CardTitle>
                    <CardDescription>
                      Speech-to-text transcription
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${RevAIStatus.color} border-current`}
                >
                  <RevAIStatus.icon className="mr-1 h-3 w-3" />
                  {RevAIStatus.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Enable Integration</span>
                <Switch checked={revAIConfig.isEnabled} />
              </div>

              <div className="text-muted-foreground text-sm">
                <p>Language: {revAIConfig.language.toUpperCase()}</p>
                {revAIConfig.lastSyncAt && (
                  <p>
                    Last sync:{" "}
                    {new Date(revAIConfig.lastSyncAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(revAIConfig.features).map(
                    ([feature, enabled]) => (
                      <div
                        key={feature}
                        className="flex items-center justify-between rounded border p-2"
                      >
                        <span className="text-xs capitalize">
                          {feature.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <Switch checked={enabled} />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add More Integrations */}
        <Card className="mt-6">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-medium">Need more integrations?</h3>
              <p className="text-muted-foreground text-sm">
                Contact us to request additional service integrations
              </p>
            </div>
            <Button variant="outline">Request Integration</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
