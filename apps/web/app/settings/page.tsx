"use client";

import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { Button } from "@repo/ui";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your application preferences
          </p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Select your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Theme Mode</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Light
                    </Button>
                    <Button variant="outline" size="sm">
                      Dark
                    </Button>
                    <Button variant="default" size="sm">
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Density</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Compact
                    </Button>
                    <Button variant="default" size="sm">
                      Comfortable
                    </Button>
                    <Button variant="outline" size="sm">
                      Spacious
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Preferences</CardTitle>
                <CardDescription>
                  Customize your search experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Show Recent Searches</p>
                    <p className="text-muted-foreground text-xs">
                      Display recent searches in command palette
                    </p>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    Enabled
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Enable Auto-complete</p>
                    <p className="text-muted-foreground text-xs">
                      Show suggestions as you type
                    </p>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    Enabled
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keyboard" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Keyboard Shortcuts</CardTitle>
                <CardDescription>
                  View and customize keyboard shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { key: "⌘ K", description: "Open Command Palette" },
                    { key: "/", description: "Focus Search" },
                    { key: "G", description: "Grid View" },
                    { key: "L", description: "List View" },
                    { key: "P", description: "Toggle Properties" },
                    { key: "N", description: "Notifications" },
                  ].map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <kbd className="bg-muted rounded border px-2 py-1 text-xs font-medium">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control what notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <p className="text-sm font-medium">Asset Shared</p>
                  <div className="text-sm font-medium text-green-600">
                    Enabled
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <p className="text-sm font-medium">Comments</p>
                  <div className="text-sm font-medium text-green-600">
                    Enabled
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <p className="text-sm font-medium">New Versions</p>
                  <div className="text-sm font-medium text-green-600">
                    Enabled
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <p className="text-sm font-medium">System Updates</p>
                  <div className="text-sm font-medium text-green-600">
                    Enabled
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </AppShell>
  );
}
