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
  RadioGroup,
  RadioGroupItem,
  Progress,
} from "@repo/ui";
import { Download, FileDown, Film, Image, Loader2 } from "lucide-react";
import { useDownloadStore } from "@/lib/stores/download-store";
import type { DownloadQuality } from "@/lib/types";
import { mockAssets } from "@/lib/mock-data";

const qualityOptions: {
  value: DownloadQuality;
  label: string;
  description: string;
}[] = [
  {
    value: "original",
    label: "Original Quality",
    description: "Full resolution, uncompressed files",
  },
  {
    value: "high",
    label: "High Quality",
    description: "Optimized for web, minimal compression",
  },
  {
    value: "medium",
    label: "Medium Quality",
    description: "Balance of quality and file size",
  },
  {
    value: "low",
    label: "Low Quality",
    description: "Small file size, faster download",
  },
  { value: "proxy", label: "Proxy", description: "Preview only, very small" },
];

export function DownloadModal() {
  const {
    isDownloadModalOpen,
    closeDownloadModal,
    selectedAssetIds,
    initiateDownload,
    downloadRequests,
  } = useDownloadStore();

  const [quality, setQuality] = useState<DownloadQuality>("original");
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<string | null>(null);

  const selectedAssets = mockAssets.filter((a) =>
    selectedAssetIds.includes(a.id)
  );

  const handleDownload = () => {
    setIsDownloading(true);
    const request = initiateDownload(quality);
    setCurrentRequest(request.id);
  };

  const activeRequest = downloadRequests.find((r) => r.id === currentRequest);

  const handleClose = () => {
    setIsDownloading(false);
    setCurrentRequest(null);
    closeDownloadModal();
  };

  return (
    <Dialog open={isDownloadModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Assets
          </DialogTitle>
          <DialogDescription>
            {selectedAssetIds.length === 1
              ? `Download "${selectedAssets[0]?.title}"`
              : `Download ${selectedAssetIds.length} selected assets`}
          </DialogDescription>
        </DialogHeader>

        {!isDownloading ? (
          <>
            {/* Selected Assets Preview */}
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg p-3">
              {selectedAssets.slice(0, 4).map((asset) => (
                <div
                  key={asset.id}
                  className="bg-muted relative h-12 w-12 overflow-hidden rounded"
                >
                  {asset.type === "video" ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <Film className="text-muted-foreground h-6 w-6" />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image className="text-muted-foreground h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
              {selectedAssets.length > 4 && (
                <div className="bg-muted text-muted-foreground flex h-12 w-12 items-center justify-center rounded text-sm font-medium">
                  +{selectedAssets.length - 4}
                </div>
              )}
            </div>

            {/* Quality Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Download Quality</p>
              <RadioGroup
                value={quality}
                onValueChange={(v) => setQuality(v as DownloadQuality)}
                className="space-y-2"
              >
                {qualityOptions.map((option) => (
                  <div
                    key={option.value}
                    className="hover:bg-muted/50 flex items-center space-x-3 rounded-lg border p-3 transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
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
                ))}
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleDownload}>
                <FileDown className="mr-2 h-4 w-4" />
                Download
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-4">
            {activeRequest?.status === "ready" ? (
              <>
                <div className="text-center">
                  <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Download className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold">Download Ready!</h3>
                  <p className="text-muted-foreground text-sm">
                    Your files are ready to download
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    // Simulate download start
                    if (activeRequest.downloadUrl) {
                      window.open(activeRequest.downloadUrl, "_blank");
                    }
                    handleClose();
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
              </>
            ) : (
              <>
                <div className="text-center">
                  <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
                  <h3 className="font-semibold">Preparing Download</h3>
                  <p className="text-muted-foreground text-sm">
                    Packaging your files...
                  </p>
                </div>
                <div className="space-y-2">
                  <Progress value={activeRequest?.progress || 0} />
                  <p className="text-muted-foreground text-center text-sm">
                    {activeRequest?.progress || 0}% complete
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
