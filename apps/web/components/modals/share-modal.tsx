"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@repo/ui";
import {
  Link2,
  Copy,
  Check,
  Mail,
  Clock,
  Lock,
  Eye,
  Download,
  Edit,
} from "lucide-react";
import { useShareStore } from "@/lib/stores/share-store";
import type { SharePermission } from "@/lib/types";
import { mockAssets } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

const permissionOptions: {
  value: SharePermission;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: "view",
    label: "View Only",
    description: "Recipients can preview but not download",
    icon: Eye,
  },
  {
    value: "download",
    label: "Download",
    description: "Recipients can view and download files",
    icon: Download,
  },
  {
    value: "edit",
    label: "Full Access",
    description: "Recipients can view, download, and edit metadata",
    icon: Edit,
  },
];

export function ShareModal() {
  const { toast } = useToast();
  const {
    isShareModalOpen,
    closeShareModal,
    selectedAssetIds,
    selectedCollectionId,
    createShareLink,
  } = useShareStore();

  const [permission, setPermission] = useState<SharePermission>("view");
  const [expiresInDays, setExpiresInDays] = useState<number | undefined>(7);
  const [hasPassword, setHasPassword] = useState(false);
  const [emailInvite, setEmailInvite] = useState("");
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedAssets = mockAssets.filter((a) =>
    selectedAssetIds.includes(a.id)
  );

  const handleCreateLink = () => {
    const link = createShareLink(permission, expiresInDays, hasPassword);
    setCreatedLink(link.url);
  };

  const handleCopyLink = async () => {
    if (createdLink) {
      await navigator.clipboard.writeText(createdLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setCreatedLink(null);
    setCopied(false);
    setPermission("view");
    setExpiresInDays(7);
    setHasPassword(false);
    setEmailInvite("");
    closeShareModal();
  };

  return (
    <Dialog open={isShareModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Share Assets
          </DialogTitle>
          <DialogDescription>
            {selectedCollectionId
              ? "Share this collection"
              : selectedAssetIds.length === 1
                ? `Share "${selectedAssets[0]?.title}"`
                : `Share ${selectedAssetIds.length} selected assets`}
          </DialogDescription>
        </DialogHeader>

        {createdLink ? (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Share Link Created!</h3>
              <p className="text-muted-foreground text-sm">
                Anyone with this link can{" "}
                {permission === "view"
                  ? "view"
                  : permission === "download"
                    ? "download"
                    : "edit"}{" "}
                the assets
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Input value={createdLink} readOnly className="flex-1 text-sm" />
              <Button size="icon" onClick={handleCopyLink}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="text-muted-foreground flex items-center justify-center gap-4 text-xs">
              {expiresInDays && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Expires in {expiresInDays} days
                </span>
              )}
              {hasPassword && (
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Password protected
                </span>
              )}
            </div>

            <Button className="w-full" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* Permission Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Permission Level</p>
              <RadioGroup
                value={permission}
                onValueChange={(v) => setPermission(v as SharePermission)}
                className="space-y-2"
              >
                {permissionOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.value}
                      className="hover:bg-muted/50 flex items-center space-x-3 rounded-lg border p-3 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Icon className="text-muted-foreground h-4 w-4" />
                      <label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-muted-foreground text-xs">
                          {option.description}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Link Options */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Link Expiration</p>
                  <p className="text-muted-foreground text-xs">
                    Link will expire after this period
                  </p>
                </div>
                <select
                  value={expiresInDays || ""}
                  onChange={(e) =>
                    setExpiresInDays(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="border-input bg-background rounded-md border px-3 py-1 text-sm"
                >
                  <option value="">Never</option>
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Password Protection</p>
                  <p className="text-muted-foreground text-xs">
                    Require password to access
                  </p>
                </div>
                <Switch
                  checked={hasPassword}
                  onCheckedChange={setHasPassword}
                />
              </div>
            </div>

            {/* Email Invite */}
            <div className="space-y-2 border-t pt-4">
              <p className="text-sm font-medium">Invite by Email (optional)</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={emailInvite}
                  onChange={(e) => setEmailInvite(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!emailInvite}
                  onClick={() => {
                    toast({
                      title: "Invitation sent",
                      description: `Invite sent to ${emailInvite}`,
                    });
                    setEmailInvite("");
                  }}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleCreateLink}>
                <Link2 className="mr-2 h-4 w-4" />
                Create Link
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
