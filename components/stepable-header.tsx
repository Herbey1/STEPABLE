"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, LogOut, Settings } from "lucide-react"

interface HeaderProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function StepableHeader({
  user = {
    name: "Alex Developer",
    email: "alex@company.com",
  },
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-sm text-muted-foreground">Continue your learning journey</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Search</span>
        </Button>

        {/* Notifications */}
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-destructive">3</Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/logout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
