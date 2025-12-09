"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Button } from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";

export default function AccountPage() {
  const storageUsed = 85;

  return (
    <AppShell>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Account</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://i.pravatar.cc/150?u=005" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-sm">Olivia Martinez</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm">olivia.martinez@example.com</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Role</p>
                <p className="text-muted-foreground text-sm">UX Designer</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Department</p>
                <p className="text-muted-foreground text-sm">Design</p>
              </div>

              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Storage Used</span>
                  <span className="font-medium">{storageUsed}GB / 100GB</span>
                </div>
                <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${storageUsed}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Usage by Type</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Images</span>
                    <span>35 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Videos</span>
                    <span>42 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Documents</span>
                    <span>6 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Other</span>
                    <span>2 GB</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Upgrade Storage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
