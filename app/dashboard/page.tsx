"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, Users, ArrowRight, Clock, CheckCircle, BookOpen, Trophy, TrendingUp, Upload, FileText } from "lucide-react"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function DashboardPage() {
  const router = useRouter()
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [githubRepo, setGithubRepo] = useState("")
  const [projectType, setProjectType] = useState("")

  const resetForm = () => {
    setProjectName("")
    setProjectDescription("")
    setGithubRepo("")
    setProjectType("")
  }

  const createPlaceholderProject = async () => {
    setIsCreatingProject(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate a unique project ID
    const projectId = Math.floor(Math.random() * 10000) + 1000
    
    // Create placeholder project with form data
    const placeholderProject = {
      id: projectId,
      name: projectName || "New Onboarding Project",
      description: projectDescription || "A comprehensive onboarding project to help new team members get up to speed with our development practices and codebase.",
      role: "Owner",
      members: 1,
      progress: 0,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0],
      githubRepo: githubRepo || "company/new-onboarding-project",
      modules: 8,
      completedModules: 0,
      tags: projectType ? [projectType, "TypeScript", "Onboarding"] : ["React", "TypeScript", "Node.js", "Onboarding"],
      nextLesson: "Project Setup and Environment Configuration"
    }
    
    // In a real app, this would be saved to a database
    // For now, we'll just navigate to the project detail page
    setIsCreatingProject(false)
    resetForm()
    router.push(`/projects/${projectId}`)
  }

  const recentActivity = [
    {
      id: 1,
      type: "lesson_completed",
      title: "Completed Git Basics - Branching",
      time: "2 hours ago",

    },

    {
      id: 3,
      type: "project_joined",
      title: "Joined 'E-commerce Platform' project",
      time: "2 days ago",

    },
  ]

  const currentProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      role: "Member",
      progress: 45,
      members: 8,
      nextLesson: "API Integration",
    },
    {
      id: 2,
      name: "Mobile App Redesign",
      role: "Owner",
      progress: 78,
      members: 5,
      nextLesson: "UI Testing",
    },
  ]

  const upcomingLessons = [
    {
      id: 1,
      title: "Code Review Best Practices",
      module: "Code Review",
      duration: "15 min",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Writing Unit Tests",
      module: "Testing",
      duration: "20 min",
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Docker Fundamentals",
      module: "DevOps",
      duration: "25 min",
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <StepableSidebar currentPage="dashboard" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepableHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Manage your projects and track your progress</p>
              </div>
            </div>

            {/* Project Management Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Create New Project
                  </CardTitle>
                  <CardDescription>
                    Start a new learning project and invite team members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        Create Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>Set up a new onboarding project for your team.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                           <Label htmlFor="project-name">Project Name</Label>
                           <Input 
                             id="project-name" 
                             placeholder="Enter project name" 
                             value={projectName}
                             onChange={(e) => setProjectName(e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="project-description">Description</Label>
                           <Textarea 
                             id="project-description" 
                             placeholder="Describe your project" 
                             value={projectDescription}
                             onChange={(e) => setProjectDescription(e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="github-repo">GitHub Repository (Optional)</Label>
                           <Input 
                             id="github-repo" 
                             placeholder="organization/repository" 
                             value={githubRepo}
                             onChange={(e) => setGithubRepo(e.target.value)}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="project-type">Project Type</Label>
                           <Select value={projectType} onValueChange={setProjectType}>
                             <SelectTrigger>
                               <SelectValue placeholder="Select project type" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="frontend">Frontend</SelectItem>
                               <SelectItem value="backend">Backend</SelectItem>
                               <SelectItem value="fullstack">Full Stack</SelectItem>
                               <SelectItem value="mobile">Mobile</SelectItem>
                               <SelectItem value="devops">DevOps</SelectItem>
                               <SelectItem value="design">Design</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                        <div className="space-y-2">
                          <Label>Project Library</Label>
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              Set up the initial library for this project with documentation, templates, and resources.
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                              <Button type="button" variant="outline" className="h-20 flex-col gap-2">
                                <Upload className="h-6 w-6" />
                                <span className="text-xs">Import Library</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => {
                          setIsCreateDialogOpen(false)
                          resetForm()
                        }}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsCreateDialogOpen(false)
                            createPlaceholderProject()
                          }}
                          disabled={isCreatingProject}
                        >
                          {isCreatingProject ? "Creating Project..." : "Create Project"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Join Project
                  </CardTitle>
                  <CardDescription>
                    Enter a project code to join an existing project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Enter project code" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button className="w-full gap-2" variant="outline">
                    <ArrowRight className="h-4 w-4" />
                    Join Project
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
                  <Target className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">65%</div>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <p className="text-xs text-muted-foreground">+3 this week</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Users className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">2</div>
                  <p className="text-xs text-muted-foreground">1 as owner</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
                  <Clock className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">12h</div>
                  <p className="text-xs text-muted-foreground">+3h this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Projects */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Current Projects
                    </CardTitle>
                    <CardDescription>Your active onboarding projects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentProjects.map((project) => (
                      <div key={project.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{project.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={project.role === "Owner" ? "default" : "secondary"}>{project.role}</Badge>
                              <span className="text-sm text-muted-foreground">{project.members} members</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            Continue
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                          <p className="text-sm text-muted-foreground">Next: {project.nextLesson}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Users className="h-4 w-4" />
                      View All Projects
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === "lesson_completed" && <CheckCircle className="h-4 w-4 text-secondary" />}

                        {activity.type === "project_joined" && <Users className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>

                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Lessons */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recommended Lessons
                </CardTitle>
                <CardDescription>Continue your learning journey with these lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.module}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                lesson.difficulty === "Beginner"
                                  ? "secondary"
                                  : lesson.difficulty === "Intermediate"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {lesson.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Start
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <AiChatWidget />
    </div>
  )
}
