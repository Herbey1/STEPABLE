"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Library,
  FileText,
  Plus,
  Edit,
  Download,
  Search,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const projectId = parseInt(params.id)

  // Mock users data for search functionality
  const mockUsers = [
    { id: 1, name: "John Doe", username: "johndoe", avatar: "/avatars/john.jpg" },
    { id: 2, name: "Jane Smith", username: "janesmith", avatar: "/avatars/jane.jpg" },
    { id: 3, name: "Mike Johnson", username: "mikej", avatar: "/avatars/mike.jpg" },
    { id: 4, name: "Sarah Wilson", username: "sarahw", avatar: "/avatars/sarah.jpg" },
    { id: 5, name: "Alex Chen", username: "alexchen", avatar: "/avatars/alex.jpg" },
  ]

  // Handle user search functionality
  const handleUserSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toString().includes(query)
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 500)
  }

  // Handle user invitation
  const handleInviteUser = (user: any) => {
    // In a real app, this would send an invitation
    console.log(`Inviting user: ${user.name} (${user.username})`)
    // Show success message or handle invitation logic
    setIsInviteDialogOpen(false)
    setSearchQuery("")
    setSearchResults([])
  }

  // Check if this is a newly created project (ID >= 1000 indicates placeholder project)
  const isNewProject = projectId >= 1000

  // Mock project data - in real app, this would be fetched based on params.id
  const project = isNewProject ? {
    id: projectId,
    name: "New Onboarding Project",
    description: "A comprehensive onboarding project to help new team members get up to speed with our development practices and codebase. This project includes modern web development workflows, code review processes, and team collaboration best practices.",
    role: "Owner",
    members: 1,
    progress: 0,
    status: "active",
    createdAt: new Date().toISOString().split('T')[0],
    githubRepo: "company/new-onboarding-project",
    modules: 8,
    completedModules: 0,
    tags: ["React", "TypeScript", "Node.js", "Onboarding"],
  } : {
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

  const modules = isNewProject ? [
    {
      id: 1,
      name: "Project Setup & Environment",
      description: "Initialize the project, set up development environment, and configure essential tools",
      lessons: 5,
      completedLessons: 0,
      status: "available",
      estimatedTime: "2.5 hours",
    },
    {
      id: 2,
      name: "Code Standards & Guidelines",
      description: "Learn our coding standards, linting rules, and best practices",
      lessons: 4,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "2 hours",
    },
    {
      id: 3,
      name: "Git Workflow & Collaboration",
      description: "Master our Git workflow, branching strategy, and pull request process",
      lessons: 6,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "3 hours",
    },
    {
      id: 4,
      name: "Component Architecture",
      description: "Understand our component structure and reusable UI patterns",
      lessons: 5,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "3.5 hours",
    },
    {
      id: 5,
      name: "State Management Patterns",
      description: "Learn our state management approach and data flow patterns",
      lessons: 4,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "3 hours",
    },
    {
      id: 6,
      name: "API Integration & Testing",
      description: "Connect with backend services and implement comprehensive testing",
      lessons: 6,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "4 hours",
    },
    {
      id: 7,
      name: "Code Review Process",
      description: "Learn to conduct effective code reviews and provide constructive feedback",
      lessons: 3,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "2 hours",
    },
    {
      id: 8,
      name: "Deployment & Monitoring",
      description: "Deploy applications and set up monitoring and error tracking",
      lessons: 4,
      completedLessons: 0,
      status: "locked",
      estimatedTime: "3 hours",
    },
  ] : [
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

  const teamMembers = isNewProject ? [
    {
      id: 1,
      name: "You (Project Owner)",
      email: "you@company.com",
      role: "Owner",
      avatar: "/placeholder.svg",
      progress: 0,
      joinedAt: new Date().toISOString().split('T')[0],
    },
  ] : [
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
    <div className="min-h-screen bg-background flex flex-col">
      <UnifiedHeader isAuthenticated={true} />
      <div className="flex flex-1">
        <StepableSidebar currentPage="projects" />
        <div className="flex-1 flex flex-col overflow-hidden">
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
                    <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <UserPlus className="h-4 w-4" />
                          Invite
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Invite User to Project</DialogTitle>
                          <DialogDescription>
                            Search for users by their ID or username to invite them to this project.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-search">Search Users</Label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="user-search"
                                placeholder="Enter user ID or username"
                                value={searchQuery}
                                onChange={(e) => {
                                  setSearchQuery(e.target.value)
                                  handleUserSearch(e.target.value)
                                }}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          {searchResults.length > 0 && (
                            <div className="space-y-2">
                              <Label>Search Results</Label>
                              <div className="max-h-48 overflow-y-auto space-y-2">
                                {searchResults.map((user) => (
                                  <div key={user.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                                      </div>
                                    </div>
                                    <Button size="sm" onClick={() => handleInviteUser(user)}>
                                      <Mail className="h-4 w-4 mr-1" />
                                      Invite
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {searchQuery && searchResults.length === 0 && !isSearching && (
                            <div className="text-center py-4 text-muted-foreground">
                              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No users found matching "{searchQuery}"</p>
                            </div>
                          )}
                          
                          {isSearching && (
                            <div className="text-center py-4 text-muted-foreground">
                              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                              <p className="text-sm">Searching users...</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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
                <TabsTrigger value="library">Library</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="max-w-4xl">
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
                          <Link href={`/projects/${params.id}/modules/3`}>
                            <Button className="gap-2">
                              <Play className="h-4 w-4" />
                              Continue
                            </Button>
                          </Link>
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
                            {module.status === "locked" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled
                                className="bg-transparent"
                              >
                                Start
                              </Button>
                            ) : (
                              <Link href={`/projects/${params.id}/modules/${module.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent"
                                >
                                  {module.status === "completed"
                                    ? "Review"
                                    : module.status === "in-progress"
                                      ? "Continue"
                                      : "Start"}
                                </Button>
                              </Link>
                            )}
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

              <TabsContent value="library" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Project Library</h2>
                    <p className="text-muted-foreground">Manage documentation, templates, and resources for this project</p>
                  </div>
                </div>
                
                {/* Google Drive Integration */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <path d="M12.01 2C6.5 2 2.01 6.49 2.01 12s4.49 10 9.99 10c5.51 0 10-4.49 10-10S17.52 2 12.01 2zM18 14h-5v5h-2v-5H6v-2h5V7h2v5h5v2z" fill="#4285F4"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Connect Google Drive</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Link your Google Drive account to access and manage project files directly from your drive
                        </p>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Connect Google Drive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Connected Files Preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                    </svg>
                    Google Drive Files
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-border border-dashed">
                      <CardContent className="p-6 text-center">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto">
                            <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">No files connected</h4>
                            <p className="text-sm text-muted-foreground">
                              Connect your Google Drive to see your files here
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Setup Guide</h3>
                              <p className="text-sm text-muted-foreground">Project setup instructions</p>
                            </div>
                          </div>
                          {project.role === "Owner" && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Updated 2 days ago</span>
                          <span>•</span>
                          <span>by Alex Developer</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">PR Template</h3>
                              <p className="text-sm text-muted-foreground">Pull request template</p>
                            </div>
                          </div>
                          {project.role === "Owner" && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Updated 1 week ago</span>
                          <span>•</span>
                          <span>by Sarah Johnson</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <FileText className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Code Standards</h3>
                              <p className="text-sm text-muted-foreground">Coding guidelines and best practices</p>
                            </div>
                          </div>
                          {project.role === "Owner" && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Updated 3 days ago</span>
                          <span>•</span>
                          <span>by Mike Chen</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {project.role !== "Owner" && (
                  <div className="text-center py-8">
                    <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Only project owners can manage the library</p>
                  </div>
                )}
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
      <UnifiedFooter isAuthenticated={true} />
      <AiChatWidget />
    </div>
  )
}
