"use client"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Play, CheckCircle, Lock, Clock, Target, BookOpen, Code } from "lucide-react"
import Link from "next/link"

export default function ModulePage({ params }: { params: { id: string } }) {
  const moduleId = Number.parseInt(params.id)

  // Mock module data
  const module = {
    id: moduleId,
    title: "Code Review",
    description: "Learn effective code review practices and improve code quality",
    icon: Code,
    totalLessons: 5,
    completedLessons: 3,
    estimatedTime: "2 hours",
    difficulty: "Intermediate",
  }

  const lessons = [
    {
      id: 1,
      title: "Introduction to Code Reviews",
      description: "Understanding the importance and benefits of code reviews",
      type: "theory",
      duration: "10 min",
      status: "completed",
    },
    {
      id: 2,
      title: "Code Review Checklist",
      description: "Essential items to check during code reviews",
      type: "theory",
      duration: "15 min",
      status: "completed",
    },
    {
      id: 3,
      title: "Giving Constructive Feedback",
      description: "How to provide helpful and respectful feedback",
      type: "interactive",
      duration: "20 min",
      status: "completed",
    },
    {
      id: 4,
      title: "PR Review Simulation",
      description: "Practice reviewing a real pull request",
      type: "exercise",
      duration: "25 min",
      status: "current",
    },
    {
      id: 5,
      title: "Advanced Review Techniques",
      description: "Advanced strategies for complex code reviews",
      type: "theory",
      duration: "15 min",
      status: "locked",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-secondary" />
      case "current":
        return <Play className="h-5 w-5 text-primary" />
      case "locked":
        return <Lock className="h-5 w-5 text-muted-foreground" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "theory":
        return <BookOpen className="h-4 w-4" />
      case "interactive":
        return <Target className="h-4 w-4" />
      case "exercise":
        return <Code className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "theory":
        return <Badge variant="secondary">Theory</Badge>
      case "interactive":
        return <Badge variant="default">Interactive</Badge>
      case "exercise":
        return <Badge variant="destructive">Exercise</Badge>
      default:
        return <Badge variant="outline">Lesson</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <StepableSidebar currentPage="journey" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepableHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Link href="/journey">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Journey
                </Button>
              </Link>
            </div>

            {/* Module Header */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <module.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{module.title}</CardTitle>
                        <CardDescription className="text-base">{module.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{module.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{module.difficulty}</span>
                      </div>

                    </div>
                  </div>
                  <Badge variant="default" className="text-sm">
                    {module.completedLessons}/{module.totalLessons} completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Module Progress</span>
                    <span className="font-medium">
                      {Math.round((module.completedLessons / module.totalLessons) * 100)}%
                    </span>
                  </div>
                  <Progress value={(module.completedLessons / module.totalLessons) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Lessons List */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lessons
                </CardTitle>
                <CardDescription>Complete lessons in order to unlock the next ones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id}>
                    <div
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        lesson.status === "current"
                          ? "border-primary bg-primary/5"
                          : lesson.status === "completed"
                            ? "border-secondary bg-secondary/5"
                            : "border-border hover:bg-muted/50"
                      } ${lesson.status === "locked" ? "opacity-60" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">{getStatusIcon(lesson.status)}</div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                              {getTypeBadge(lesson.type)}
                            </div>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                {getTypeIcon(lesson.type)}
                                <span className="capitalize">{lesson.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.status === "completed" && (
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              Review
                            </Button>
                          )}
                          {lesson.status === "current" && (
                            <Link href={`/journey/lesson/${lesson.id}`}>
                              <Button size="sm" className="gap-2">
                                <Play className="h-3 w-3" />
                                Start
                              </Button>
                            </Link>
                          )}
                          {lesson.status === "locked" && (
                            <Button variant="ghost" size="sm" disabled className="gap-2">
                              <Lock className="h-3 w-3" />
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < lessons.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Module Completion */}
            {module.completedLessons === module.totalLessons && (
              <Card className="border-secondary bg-secondary/5">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Module Completed!</h3>
                    <p className="text-muted-foreground">
                      Congratulations! You have completed this module and can proceed to the next one.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button className="gap-2">
                      <Target className="h-4 w-4" />
                      Next Module
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      Practice More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
