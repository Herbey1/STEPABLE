"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  BookOpen,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Bot,
  Play,
  CheckCircle,
  Clock,
} from "lucide-react"

interface SidebarProps {
  currentPage?: string
  userProgress?: number
}

export function StepableSidebar({ currentPage = "dashboard", userProgress = 65 }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: currentPage === "dashboard" },
    { icon: BookOpen, label: "Library", href: "/library", active: currentPage === "library" },
    { icon: Users, label: "Projects", href: "/projects", active: currentPage === "projects" },
    { icon: Bot, label: "AI Assistant", href: "/assistant", active: currentPage === "assistant" },
  ]

  const currentModules = [
    { name: "Git Basics", progress: 100, status: "completed" },
    { name: "Code Review", progress: 75, status: "in-progress" },
    { name: "Testing", progress: 0, status: "locked" },
    { name: "Deployment", progress: 0, status: "locked" },
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-sidebar-foreground">Stepable</span>
          </div>
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
        {/* Progress Overview */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground">Overall Progress</span>
                <span className="text-sidebar-primary font-medium">{userProgress}%</span>
              </div>
              <Progress value={userProgress} className="h-2" />
            </div>
          </div>
        )}

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

        {/* Current Modules */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Current Modules</h3>
            <div className="space-y-2">
              {currentModules.map((module) => (
                <div key={module.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-sidebar-accent">
                  <div className="flex-shrink-0">
                    {module.status === "completed" && <CheckCircle className="h-4 w-4 text-secondary" />}
                    {module.status === "in-progress" && <Play className="h-4 w-4 text-primary" />}
                    {module.status === "locked" && <Clock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-sidebar-foreground truncate">{module.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={module.progress} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">{module.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="space-y-1">
          <Link href="/help">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <HelpCircle className="h-4 w-4" />
              {!isCollapsed && <span>Help</span>}
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span>Settings</span>}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
