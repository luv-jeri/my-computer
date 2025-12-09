import { create } from "zustand";
import type { Asset } from "@/lib/types";

interface AssetPropertiesStore {
  selectedAsset: Asset | null;
  isOpen: boolean;

  // Actions
  openProperties: (asset: Asset) => void;
  closeProperties: () => void;
}

export const useAssetPropertiesStore = create<AssetPropertiesStore>((set) => ({
  selectedAsset: null,
  isOpen: false,

  openProperties: (asset) => {
    set({ selectedAsset: asset, isOpen: true });
  },

  closeProperties: () => {
    set({ isOpen: false });
  },
}));
