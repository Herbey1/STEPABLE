"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Users, Settings, Crown, Calendar, GitBranch, Target, MoreHorizontal, Upload, FileText } from "lucide-react"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const myProjects = [
    {
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
    },
    {
      id: 2,
      name: "Mobile App Redesign",
      description: "UI/UX redesign for our mobile application",
      role: "Owner",
      members: 5,
      progress: 78,
      status: "active",
      createdAt: "2024-02-01",
      githubRepo: "company/mobile-app",
      modules: 8,
      completedModules: 6,
    },
    {
      id: 3,
      name: "API Documentation",
      description: "Comprehensive API documentation and examples",
      role: "Member",
      members: 3,
      progress: 90,
      status: "completed",
      createdAt: "2024-01-10",
      githubRepo: "company/api-docs",
      modules: 6,
      completedModules: 6,
    },
  ]

  const filteredMyProjects = myProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <UnifiedHeader isAuthenticated={true} />
      <div className="flex flex-1">
        <StepableSidebar currentPage="projects" />
        <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                <p className="text-muted-foreground">Manage your onboarding projects and join new ones</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
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
                      <Input id="project-name" placeholder="Enter project name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea id="project-description" placeholder="Describe your project" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github-repo">GitHub Repository (Optional)</Label>
                      <Input id="github-repo" placeholder="organization/repository" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-type">Project Type</Label>
                      <Select>
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
                        <div className="grid grid-cols-2 gap-2">
                          <Button type="button" variant="outline" className="h-20 flex-col gap-2">
                            <FileText className="h-6 w-6" />
                            <span className="text-xs">Start Empty</span>
                          </Button>
                          <Button type="button" variant="outline" className="h-20 flex-col gap-2">
                            <Upload className="h-6 w-6" />
                            <span className="text-xs">Import Library</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>Create Project</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Projects Tabs */}
            <div className="space-y-8">
              {/* Own Projects Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-semibold">My Projects</h2>
                  <Badge variant="secondary" className="ml-2">
                    {myProjects.filter(p => p.role === "Owner").length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredMyProjects.filter(project => project.role === "Owner").map((project) => (
                    <Card key={project.id} className="border-border border-2 border-accent/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                              {project.name}
                              <Crown className="h-4 w-4 text-accent" />
                            </CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
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

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {project.completedModules}/{project.modules} modules completed
                            </span>
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
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 gap-2">
                            <Target className="h-4 w-4" />
                            Continue
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Member Projects Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Projects I'm Member Of</h2>
                  <Badge variant="outline" className="ml-2">
                    {myProjects.filter(p => p.role === "Member").length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {filteredMyProjects.filter(project => project.role === "Member").map((project) => (
                     <Card key={project.id} className="border-border border-l-4 border-l-muted-foreground/30">
                       <CardHeader>
                         <div className="flex items-start justify-between">
                           <div className="space-y-1">
                             <CardTitle className="flex items-center gap-2">
                               {project.name}
                               <Badge variant="outline" className="text-xs">
                                 Member
                               </Badge>
                             </CardTitle>
                             <CardDescription>{project.description}</CardDescription>
                           </div>
                           <Button variant="ghost" size="sm">
                             <MoreHorizontal className="h-4 w-4" />
                           </Button>
                         </div>
                       </CardHeader>
                       <CardContent className="space-y-4">
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <div className="flex items-center gap-1">
                             <Users className="h-4 w-4" />
                             <span>{project.members} members</span>
                           </div>
                           <div className="flex items-center gap-1">
                             <Calendar className="h-4 w-4" />
                             <span>Joined {new Date(project.createdAt).toLocaleDateString()}</span>
                           </div>
                           {project.githubRepo && (
                             <div className="flex items-center gap-1">
                               <GitBranch className="h-4 w-4" />
                               <span>{project.githubRepo}</span>
                             </div>
                           )}
                         </div>

                         <div className="space-y-2">
                           <div className="flex items-center justify-between text-sm">
                             <span className="text-muted-foreground">My Progress</span>
                             <span className="font-medium">{project.progress}%</span>
                           </div>
                           <Progress value={project.progress} className="h-2" />
                           <div className="flex items-center justify-between text-xs text-muted-foreground">
                             <span>
                               {project.completedModules}/{project.modules} modules completed
                             </span>
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
                         </div>

                         <div className="flex gap-2">
                           <Button className="flex-1 gap-2" variant="secondary">
                             <Target className="h-4 w-4" />
                             Continue Learning
                           </Button>
                         </div>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </main>
        </div>
      </div>
      <UnifiedFooter isAuthenticated={true} />
    </div>
  )
}
