"use client";

import { Bell } from "lucide-react";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui";
import { ScrollArea } from "@repo/ui";
import { useState } from "react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "asset_shared",
    title: "Sarah Johnson shared 3 files",
    message: "Product Launch Hero Image.jpg and 2 others",
    timestamp: "2h ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    title: "New comment on Q4 Report",
    message: "Michael: 'Please review the updated projections'",
    timestamp: "5h ago",
    read: false,
  },
  {
    id: "3",
    type: "version",
    title: "New version uploaded",
    message: "Emma uploaded v2.0 of Brand Guidelines",
    timestamp: "1d ago",
    read: true,
  },
];

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-3 ${
                    notification.read ? "bg-background" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="bg-primary h-2 w-2 rounded-full" />
                    )}
                  </div>
                  <p className="text-muted-foreground mt-2 text-xs">
                    {notification.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              Clear all
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
