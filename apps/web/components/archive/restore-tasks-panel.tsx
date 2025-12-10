"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Progress,
} from "@repo/ui";
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  X,
} from "lucide-react";
import { useArchiveStore } from "@/lib/stores/archive-store";
import type { RestoreTaskStatus } from "@/lib/types";

interface RestoreTasksPanelProps {
  compact?: boolean;
}

const statusConfig: Record<
  RestoreTaskStatus,
  { icon: React.ElementType; color: string; label: string }
> = {
  pending: { icon: Clock, color: "text-amber-500", label: "Pending" },
  "in-progress": {
    icon: RefreshCw,
    color: "text-blue-500",
    label: "In Progress",
  },
  completed: {
    icon: CheckCircle,
    color: "text-emerald-500",
    label: "Completed",
  },
  failed: { icon: XCircle, color: "text-red-500", label: "Failed" },
  cancelled: { icon: X, color: "text-gray-500", label: "Cancelled" },
};

export function RestoreTasksPanel({ compact = false }: RestoreTasksPanelProps) {
  const { restoreTasks, cancelRestore, retryRestore } = useArchiveStore();

  const displayTasks = compact ? restoreTasks.slice(0, 3) : restoreTasks;
  const activeTasks = restoreTasks.filter(
    (t) => t.status === "pending" || t.status === "in-progress"
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Restore Tasks
              {activeTasks.length > 0 && (
                <Badge variant="secondary">{activeTasks.length} active</Badge>
              )}
            </CardTitle>
            {!compact && (
              <CardDescription>
                Track and manage asset restore operations
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {displayTasks.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            <RefreshCw className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p>No restore tasks</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayTasks.map((task) => {
              const config = statusConfig[task.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={task.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className={`${config.color}`}>
                    <StatusIcon
                      className={`h-5 w-5 ${task.status === "in-progress" ? "animate-spin" : ""}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate font-medium">
                        {task.assetTitle}
                      </h4>
                      <Badge variant="outline" className="text-xs capitalize">
                        {task.tier.replace("-", " ")}
                      </Badge>
                    </div>

                    {task.status === "in-progress" ||
                    task.status === "pending" ? (
                      <div className="mt-2 space-y-1">
                        <Progress value={task.progress} className="h-2" />
                        <div className="text-muted-foreground flex justify-between text-xs">
                          <span>{task.progress}% complete</span>
                          <span>
                            ~{Math.ceil(task.estimatedTimeMinutes / 60)}h
                            remaining
                          </span>
                        </div>
                      </div>
                    ) : task.status === "failed" ? (
                      <div className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertTriangle className="h-3 w-3" />
                        {task.error}
                      </div>
                    ) : task.status === "completed" ? (
                      <p className="text-muted-foreground mt-1 text-sm">
                        Completed{" "}
                        {task.completedAt &&
                          new Date(task.completedAt).toLocaleString()}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex gap-2">
                    {task.status === "failed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => retryRestore(task.id)}
                      >
                        Retry
                      </Button>
                    )}
                    {(task.status === "pending" ||
                      task.status === "in-progress") && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => cancelRestore(task.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {compact && restoreTasks.length > 3 && (
              <Button variant="link" className="w-full">
                View all {restoreTasks.length} tasks
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
