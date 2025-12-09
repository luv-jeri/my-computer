// Simple toast hook for notifications
export interface Toast {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "destructive";
}

export const useToast = () => {
  return {
    toast: ({ title, description, variant }: Toast) => {
      // Simple console logging for now
      // Can be replaced with actual toast library later
      console.log(`[Toast ${variant || "default"}]`, title, description);
    },
  };
};
