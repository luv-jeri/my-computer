"use client";

import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from "@repo/ui";
import { Search, Menu, Bell, Settings, LogOut, User, Moon } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="from-primary to-primary/70 relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br transition-transform group-hover:scale-105">
              <Search className="text-primary-foreground h-4 w-4" />
              <div className="border-background absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 bg-amber-400" />
            </div>
            <span className="hidden text-lg font-semibold tracking-tight sm:inline-block">
              SurfaceX
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Search
              </Button>
            </Link>
            <Link href="/browse">
              <Button variant="ghost" size="sm">
                Browse
              </Button>
            </Link>
            <Link href="/collections">
              <Button variant="ghost" size="sm">
                Collections
              </Button>
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="bg-destructive absolute right-1.5 top-1.5 h-2 w-2 rounded-full" />
          </Button>

          {/* Theme toggle placeholder */}
          <Button variant="ghost" size="icon" aria-label="Toggle theme">
            <Moon className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="User avatar"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Sarah Chen</p>
                  <p className="text-muted-foreground text-xs leading-none">
                    sarah.chen@company.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
