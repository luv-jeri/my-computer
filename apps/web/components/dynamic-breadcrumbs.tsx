"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";
import { Home } from "lucide-react";

interface BreadcrumbSegment {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb segments from pathname
  const generateBreadcrumbs = (): BreadcrumbSegment[] => {
    const segments: BreadcrumbSegment[] = [
      { label: "Home", href: "/", isCurrentPage: pathname === "/" },
    ];

    if (pathname === "/") {
      return segments;
    }

    const pathParts = pathname.split("/").filter(Boolean);

    pathParts.forEach((part, index) => {
      const href = "/" + pathParts.slice(0, index + 1).join("/");
      const isLast = index === pathParts.length - 1;

      // Convert path segment to readable label
      const label = part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      segments.push({
        label,
        href,
        isCurrentPage: isLast,
      });
    });

    return segments;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.isCurrentPage ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>
                  {index === 0 ? (
                    <div className="flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      <span>{crumb.label}</span>
                    </div>
                  ) : (
                    crumb.label
                  )}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
