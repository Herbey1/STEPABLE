"use client"

import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen, Users, Clock, CheckCircle, ArrowRight, Target } from "lucide-react"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function DashboardPage() {
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
                <p className="text-muted-foreground">Track your progress and continue learning</p>
              </div>
              <Button className="gap-2">
                <Play className="h-4 w-4" />
                Continue Learning
              </Button>
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
