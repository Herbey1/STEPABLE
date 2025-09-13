"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  CheckCircle,
  Lock,
  Trophy,
  Target,
  Star,
  Flame,
  Zap,
  BookOpen,
  Code,
  GitBranch,
  TestTube,
} from "lucide-react"
import Link from "next/link"

export default function JourneyPage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null)

  const userStats = {
    level: 3,
    xp: 1250,
    streak: 7,
    totalLessons: 24,
    completedLessons: 16,
  }

  const modules = [
    {
      id: 1,
      title: "Git Basics",
      description: "Master version control fundamentals",
      icon: GitBranch,
      color: "bg-secondary",
      lessons: 6,
      completedLessons: 6,
      status: "completed",
      xp: 300,
      position: { x: 50, y: 10 },
    },
    {
      id: 2,
      title: "Code Review",
      description: "Learn effective code review practices",
      icon: Code,
      color: "bg-primary",
      lessons: 5,
      completedLessons: 3,
      status: "in-progress",
      xp: 150,
      position: { x: 20, y: 25 },
    },
    {
      id: 3,
      title: "Testing Fundamentals",
      description: "Write and maintain quality tests",
      icon: TestTube,
      color: "bg-accent",
      lessons: 7,
      completedLessons: 0,
      status: "locked",
      xp: 0,
      position: { x: 70, y: 40 },
    },
    {
      id: 4,
      title: "API Development",
      description: "Build robust REST APIs",
      icon: Zap,
      color: "bg-destructive",
      lessons: 8,
      completedLessons: 0,
      status: "locked",
      xp: 0,
      position: { x: 30, y: 55 },
    },
    {
      id: 5,
      title: "Database Design",
      description: "Design efficient database schemas",
      icon: BookOpen,
      color: "bg-secondary",
      lessons: 6,
      completedLessons: 0,
      status: "locked",
      xp: 0,
      position: { x: 60, y: 70 },
    },
    {
      id: 6,
      title: "Deployment & DevOps",
      description: "Deploy applications to production",
      icon: Target,
      color: "bg-primary",
      lessons: 9,
      completedLessons: 0,
      status: "locked",
      xp: 0,
      position: { x: 40, y: 85 },
    },
  ]

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", earned: true },
    { id: 2, title: "Git Master", description: "Complete Git Basics module", earned: true },
    { id: 3, title: "Code Reviewer", description: "Complete 3 code review lessons", earned: true },
    { id: 4, title: "Week Warrior", description: "Maintain a 7-day streak", earned: true },
    { id: 5, title: "Test Expert", description: "Complete Testing module", earned: false },
  ]

  return (
    <div className="flex h-screen bg-background">
      <StepableSidebar currentPage="journey" userProgress={67} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepableHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with Stats */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Learning Journey</h1>
                <p className="text-muted-foreground">Continue your path to becoming a better developer</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="font-medium">{userStats.streak} day streak</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="font-medium">{userStats.xp} XP</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg">
                  <Trophy className="h-4 w-4 text-secondary" />
                  <span className="font-medium">Level {userStats.level}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Journey Map */}
              <div className="lg:col-span-3">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Learning Path
                    </CardTitle>
                    <CardDescription>Follow the path to master full-stack development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-[600px] bg-gradient-to-b from-muted/20 to-background rounded-lg overflow-hidden">
                      {/* Path Line */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                        <path
                          d="M 50% 10% Q 20% 25% 70% 40% Q 30% 55% 60% 70% Q 40% 85% 40% 85%"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-border"
                          strokeDasharray="10,5"
                        />
                      </svg>

                      {/* Module Nodes */}
                      {modules.map((module) => (
                        <div
                          key={module.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{
                            left: `${module.position.x}%`,
                            top: `${module.position.y}%`,
                            zIndex: 2,
                          }}
                          onClick={() => setSelectedModule(module.id)}
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                              module.status === "completed"
                                ? "bg-secondary shadow-lg"
                                : module.status === "in-progress"
                                  ? "bg-primary shadow-lg animate-pulse"
                                  : "bg-muted"
                            }`}
                          >
                            {module.status === "completed" && (
                              <CheckCircle className="h-8 w-8 text-secondary-foreground" />
                            )}
                            {module.status === "in-progress" && <Play className="h-8 w-8 text-primary-foreground" />}
                            {module.status === "locked" && <Lock className="h-8 w-8 text-muted-foreground" />}
                          </div>
                          <div className="mt-2 text-center">
                            <div className="text-sm font-medium text-foreground">{module.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {module.completedLessons}/{module.lessons} lessons
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Current Progress */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Lessons Completed</span>
                        <span className="font-medium">
                          {userStats.completedLessons}/{userStats.totalLessons}
                        </span>
                      </div>
                      <Progress value={(userStats.completedLessons / userStats.totalLessons) * 100} className="h-2" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">67%</div>
                      <div className="text-xs text-muted-foreground">Keep going!</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Module Detail */}
                {selectedModule && (
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-base">{modules.find((m) => m.id === selectedModule)?.title}</CardTitle>
                      <CardDescription>{modules.find((m) => m.id === selectedModule)?.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(() => {
                        const module = modules.find((m) => m.id === selectedModule)
                        if (!module) return null

                        return (
                          <>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                {module.completedLessons}/{module.lessons} lessons
                              </span>
                            </div>
                            <Progress value={(module.completedLessons / module.lessons) * 100} className="h-2" />
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">XP Earned</span>
                              <span className="font-medium">{module.xp} XP</span>
                            </div>
                            <Link href={`/journey/module/${module.id}`}>
                              <Button
                                className="w-full gap-2"
                                disabled={module.status === "locked"}
                                variant={module.status === "locked" ? "outline" : "default"}
                              >
                                {module.status === "completed" && (
                                  <>
                                    <Trophy className="h-4 w-4" />
                                    Review
                                  </>
                                )}
                                {module.status === "in-progress" && (
                                  <>
                                    <Play className="h-4 w-4" />
                                    Continue
                                  </>
                                )}
                                {module.status === "locked" && (
                                  <>
                                    <Lock className="h-4 w-4" />
                                    Locked
                                  </>
                                )}
                              </Button>
                            </Link>
                          </>
                        )
                      })()}
                    </CardContent>
                  </Card>
                )}

                {/* Recent Achievements */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.slice(0, 4).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-accent" : "bg-muted"
                          }`}
                        >
                          <Trophy
                            className={`h-4 w-4 ${
                              achievement.earned ? "text-accent-foreground" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
