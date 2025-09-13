"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Users,
  Settings,
  Crown,
  Calendar,
  GitBranch,
  Target,
  MoreHorizontal,
  Play,
  CheckCircle,
  Clock,
  UserPlus,
  Share,
} from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock project data - in real app, this would be fetched based on params.id
  const project = {
    id: 1,
    name: "E-commerce Platform",
    description: "Full-stack e-commerce application with React and Node.js",
    role: "Owner",
    members: 8,
    progress: 45,
    status: "active",
    createdAt: "2024-01-15",
    githubRepo: "company/ecommerce-platform",
    modules: 12,
    completedModules: 5,
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
  }

  const modules = [
    {
      id: 1,
      name: "Project Setup",
      description: "Initialize the project and set up development environment",
      lessons: 4,
      completedLessons: 4,
      status: "completed",
      estimatedTime: "2 hours",
    },
    {
      id: 2,
      name: "Frontend Basics",
      description: "Learn React fundamentals and component structure",
      lessons: 6,
      completedLessons: 6,
      status: "completed",
      estimatedTime: "4 hours",
    },
    {
      id: 3,
      name: "State Management",
      description: "Implement Redux for application state management",
      lessons: 5,
      completedLessons: 3,
      status: "in-progress",
      estimatedTime: "3 hours",
    },
    {
      id: 4,
      name: "API Integration",
      description: "Connect frontend with backend APIs",
      lessons: 4,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "3 hours",
    },
    {
      id: 5,
      name: "Authentication",
      description: "Implement user authentication and authorization",
      lessons: 5,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "4 hours",
    },
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Alex Developer",
      email: "alex@company.com",
      role: "Owner",
      avatar: "/placeholder.svg",
      progress: 65,
      joinedAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Member",
      avatar: "/placeholder.svg",
      progress: 45,
      joinedAt: "2024-01-20",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@company.com",
      role: "Member",
      avatar: "/placeholder.svg",
      progress: 78,
      joinedAt: "2024-01-18",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@company.com",
      role: "Member",
      avatar: "/placeholder.svg",
      progress: 32,
      joinedAt: "2024-01-25",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <StepableSidebar currentPage="projects" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepableHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>

            {/* Project Info */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl">{project.name}</CardTitle>
                      {project.role === "Owner" && <Crown className="h-5 w-5 text-accent" />}
                      <Badge
                        variant={
                          project.status === "active"
                            ? "default"
                            : project.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                      {project.githubRepo && (
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4" />
                          <span>{project.githubRepo}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Share className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <UserPlus className="h-4 w-4" />
                      Invite
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Project Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <GitBranch className="mr-2 h-4 w-4" />
                          GitHub Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {project.completedModules}/{project.modules} modules completed
                    </span>
                    <span>Keep going!</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Current Module */}
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Current Module
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">State Management</h3>
                              <p className="text-sm text-muted-foreground">
                                Implement Redux for application state management
                              </p>
                            </div>
                            <Button className="gap-2">
                              <Play className="h-4 w-4" />
                              Continue
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Module Progress</span>
                              <span className="font-medium">3/5 lessons</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">Mike Chen</span> completed "Redux Basics" lesson
                              </p>
                              <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>EW</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">Emma Wilson</span> joined the project
                              </p>
                              <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">Sarah Johnson</span> completed "Frontend Basics" module
                              </p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stats */}
                  <div className="space-y-6">
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base">Project Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Modules</span>
                          <span className="font-medium">{project.modules}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Completed</span>
                          <span className="font-medium text-secondary">{project.completedModules}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">In Progress</span>
                          <span className="font-medium text-primary">1</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Remaining</span>
                          <span className="font-medium">{project.modules - project.completedModules - 1}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-base">Team Progress</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {teamMembers.slice(0, 3).map((member) => (
                          <div key={member.id} className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium truncate">{member.name}</p>
                                <span className="text-xs text-muted-foreground">{member.progress}%</span>
                              </div>
                              <Progress value={member.progress} className="h-1 mt-1" />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                          View All Members
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="modules" className="space-y-4">
                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <Card key={module.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {module.status === "completed" && (
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                                  <CheckCircle className="h-5 w-5 text-secondary-foreground" />
                                </div>
                              )}
                              {module.status === "in-progress" && (
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                  <Play className="h-5 w-5 text-primary-foreground" />
                                </div>
                              )}
                              {module.status === "locked" && (
                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                  <Clock className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground">{module.name}</h3>
                              <p className="text-sm text-muted-foreground">{module.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>
                                  {module.completedLessons}/{module.lessons} lessons
                                </span>
                                <span>{module.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {module.status === "completed" && <Badge variant="secondary">Completed</Badge>}
                            {module.status === "in-progress" && <Badge variant="default">In Progress</Badge>}
                            {module.status === "locked" && <Badge variant="outline">Locked</Badge>}
                            <Button
                              variant={module.status === "locked" ? "ghost" : "outline"}
                              size="sm"
                              disabled={module.status === "locked"}
                              className="bg-transparent"
                            >
                              {module.status === "completed"
                                ? "Review"
                                : module.status === "in-progress"
                                  ? "Continue"
                                  : "Start"}
                            </Button>
                          </div>
                        </div>
                        {module.status !== "locked" && (
                          <div className="mt-4">
                            <Progress value={(module.completedLessons / module.lessons) * 100} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold truncate">{member.name}</h3>
                                {member.role === "Owner" && <Crown className="h-4 w-4 text-accent" />}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                              <Badge variant={member.role === "Owner" ? "default" : "secondary"} className="mt-1">
                                {member.role}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{member.progress}%</span>
                            </div>
                            <Progress value={member.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Joined {new Date(member.joinedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Project Settings</CardTitle>
                    <CardDescription>Manage your project configuration and permissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">General Settings</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="justify-start bg-transparent">
                          Edit Project Details
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          Manage Team Members
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          GitHub Integration
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium text-destructive">Danger Zone</h4>
                      <Button variant="destructive" className="justify-start">
                        Delete Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
