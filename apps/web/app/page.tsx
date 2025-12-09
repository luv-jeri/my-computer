import { AppShell } from "@/components/layout/app-shell";
import { SearchInput } from "@/components/search/search-input";
import { Button } from "@repo/ui";
import { ImageIcon, FileText, Clock, Star } from "lucide-react";
import { mockAssets, mockRecentSearches } from "@/lib/mock-data";
import Image from "next/image";

export default function HomePage() {
  return (
    <AppShell>
      <div className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden p-4 md:p-6">
        {/* Background Decor (Subtle) */}
        <div className="via-background to-background absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5" />

        {/* Main Content Container */}
        <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-6">
          {/* Brand/Logo Area (Minimal - kept empty for focus) */}
          <div className="animate-in fade-in slide-in-from-bottom-4 mb-4 h-8 duration-700">
            {/* Optional: <Logo className="h-8 w-auto" /> */}
          </div>

          {/* Hero Search Bar */}
          <div className="w-full transform transition-all duration-500 hover:scale-[1.01]">
            <SearchInput variant="hero" autoFocus />
          </div>

          {/* COMPACT DASHBOARD WIDGETS */}
          <div className="animate-in fade-in slide-in-from-bottom-8 grid w-full grid-cols-1 gap-4 px-2 duration-700 md:grid-cols-3">
            {/* 1. Recent VIews */}
            <DashboardCard title="Recent Views" icon={Clock}>
              <div className="space-y-1">
                {mockAssets.slice(0, 3).map((asset) => (
                  <div
                    key={asset.id}
                    className="hover:bg-muted/50 group flex cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors"
                  >
                    <div className="bg-muted text-muted-foreground relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded text-[10px] font-medium">
                      {asset.thumbnail ? (
                        <Image
                          src={asset.thumbnail}
                          alt={asset.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        "IMG"
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="group-hover:text-primary truncate text-[10px] font-medium leading-tight transition-colors">
                        {asset.title}
                      </p>
                      <p className="text-muted-foreground text-[9px] leading-tight">
                        Edited {new Date(asset.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* 2. Favorites */}
            <DashboardCard title="Favorites" icon={Star}>
              <div className="grid grid-cols-5 gap-1.5">
                {mockAssets.slice(3, 13).map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-muted/40 hover:bg-primary/10 hover:ring-primary/20 group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-md transition-all hover:ring-1"
                    title={asset.title}
                  >
                    {asset.thumbnail ? (
                      <Image
                        src={asset.thumbnail}
                        alt={asset.title}
                        fill
                        className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                        unoptimized
                      />
                    ) : (
                      <div className="h-full w-full bg-indigo-500/20" />
                    )}
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* 3. Recent Searches / Quick Actions */}
            <DashboardCard title="Recent Searches" icon={FileText}>
              <div className="flex h-full flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {mockRecentSearches.slice(0, 6).map((search) => (
                    <span
                      key={search.id}
                      className="bg-muted/30 text-muted-foreground hover:bg-muted hover:border-border max-w-[120px] cursor-pointer truncate rounded-md border border-transparent px-1.5 py-0.5 text-[10px] transition-colors"
                      title={search.query}
                    >
                      {search.query}
                    </span>
                  ))}
                </div>
                <div className="border-border/50 mt-auto flex gap-2 border-t border-dashed pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-full justify-start px-2 text-[10px]"
                  >
                    <ImageIcon className="mr-1.5 h-3 w-3" /> Upload
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-full justify-start px-2 text-[10px]"
                  >
                    <Clock className="mr-1.5 h-3 w-3" /> History
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Footer / Status Area (Compact) */}
        <div className="text-muted-foreground absolute bottom-6 left-0 right-0 flex justify-center text-xs opacity-60">
          <div className="bg-background/50 border-border/40 flex items-center gap-4 rounded-full border px-4 py-2 shadow-sm backdrop-blur-sm">
            <span>Ready to search</span>
            <div className="bg-border h-3 w-px" />
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              System Online
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function DashboardCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border/40 bg-background/40 hover:bg-background/60 flex h-[140px] flex-col rounded-xl border p-3 backdrop-blur-sm transition-colors">
      <div className="text-muted-foreground mb-2 flex shrink-0 items-center gap-1.5">
        <Icon className="h-3 w-3" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
