import { create } from "zustand";
import type { Asset } from "@/lib/types";

interface SelectionStore {
  selectedAssetIds: string[];
  selectedAssets: Asset[];

  // Actions
  selectAsset: (asset: Asset) => void;
  deselectAsset: (assetId: string) => void;
  toggleAsset: (asset: Asset) => void;
  selectRange: (assets: Asset[]) => void;
  clearSelection: () => void;
  isSelected: (assetId: string) => boolean;
}

export const useSelectionStore = create<SelectionStore>()((set, get) => ({
  selectedAssetIds: [],
  selectedAssets: [],

  selectAsset: (asset) => {
    const { selectedAssetIds, selectedAssets } = get();
    if (!selectedAssetIds.includes(asset.id)) {
      set({
        selectedAssetIds: [...selectedAssetIds, asset.id],
        selectedAssets: [...selectedAssets, asset],
      });
    }
  },

  deselectAsset: (assetId) => {
    const { selectedAssetIds, selectedAssets } = get();
    set({
      selectedAssetIds: selectedAssetIds.filter((id) => id !== assetId),
      selectedAssets: selectedAssets.filter((a) => a.id !== assetId),
    });
  },

  toggleAsset: (asset) => {
    const { selectedAssetIds } = get();
    if (selectedAssetIds.includes(asset.id)) {
      get().deselectAsset(asset.id);
    } else {
      get().selectAsset(asset);
    }
  },

  selectRange: (assets) => {
    set({
      selectedAssetIds: assets.map((a) => a.id),
      selectedAssets: assets,
    });
  },

  clearSelection: () => {
    set({
      selectedAssetIds: [],
      selectedAssets: [],
    });
  },

  isSelected: (assetId) => {
    return get().selectedAssetIds.includes(assetId);
  },
}));
