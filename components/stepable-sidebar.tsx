"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  Bot,
  Play,
  CheckCircle,
  Clock,
} from "lucide-react"

interface SidebarProps {
  currentPage?: string
}

export function StepableSidebar({ currentPage = "dashboard" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: currentPage === "dashboard" },
    { icon: Users, label: "Projects", href: "/projects", active: currentPage === "projects" },
  ]

  return (
    <div
      className={`flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h2 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Navigation
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Main Navigation */}
        <div className="p-2">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    item.active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </div>


      </ScrollArea>


    </div>
  )
}
