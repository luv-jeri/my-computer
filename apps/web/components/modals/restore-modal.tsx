"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Badge,
} from "@repo/ui";
import {
  RefreshCw,
  Clock,
  AlertTriangle,
  Snowflake,
  Archive,
} from "lucide-react";
import { useArchiveStore } from "@/lib/stores/archive-store";
import { mockAssets, getAssetArchiveStatus } from "@/lib/mock-data";

const tierInfo = {
  standard: {
    icon: null,
    restoreTime: "Instant",
    cost: "Free",
  },
  "infrequent-access": {
    icon: Clock,
    restoreTime: "Instant",
    cost: "Standard retrieval fee",
  },
  glacier: {
    icon: Snowflake,
    restoreTime: "3-5 hours",
    cost: "Retrieval fee applies",
  },
  "glacier-deep-archive": {
    icon: Archive,
    restoreTime: "12-48 hours",
    cost: "Higher retrieval fee",
  },
};

export function RestoreModal() {
  const {
    isRestoreModalOpen,
    closeRestoreModal,
    selectedAssetForRestore,
    initiateRestore,
  } = useArchiveStore();

  const asset = mockAssets.find((a) => a.id === selectedAssetForRestore);
  const archiveStatus = selectedAssetForRestore
    ? getAssetArchiveStatus(selectedAssetForRestore)
    : null;
  const tier = archiveStatus?.tier || "standard";
  const info = tierInfo[tier];
  const TierIcon = info.icon;

  const handleRestore = () => {
    if (asset) {
      initiateRestore(asset.id, asset.title);
    }
  };

  return (
    <Dialog open={isRestoreModalOpen} onOpenChange={closeRestoreModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Restore Asset
          </DialogTitle>
          <DialogDescription>
            Restore this asset from archive storage
          </DialogDescription>
        </DialogHeader>

        {asset && (
          <div className="space-y-4 py-4">
            {/* Asset Info */}
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">{asset.title}</h3>
              <p className="text-muted-foreground text-sm">
                {asset.description}
              </p>
            </div>

            {/* Storage Tier Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="mb-3 flex items-center gap-2">
                {TierIcon && <TierIcon className="h-5 w-5 text-blue-500" />}
                <span className="font-medium capitalize">
                  {tier.replace("-", " ")} Storage
                </span>
                <Badge variant="secondary" className="ml-auto">
                  {info.restoreTime}
                </Badge>
              </div>

              <div className="text-muted-foreground space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated restore time: {info.restoreTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{info.cost}</span>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="text-muted-foreground text-sm">
              <p>
                Once restored, the asset will be available for{" "}
                <strong>7 days</strong> before being automatically re-archived.
                You can download or work with the asset during this period.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={closeRestoreModal}>
            Cancel
          </Button>
          <Button onClick={handleRestore}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Restore
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
