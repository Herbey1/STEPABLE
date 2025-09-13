"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  X,
  Star,
  Clock,
  Target,
  Code,
  BookOpen,
  Lightbulb,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function LessonPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [userCode, setUserCode] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const lessonId = Number.parseInt(params.id)

  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: "PR Review Simulation",
    description: "Practice reviewing a real pull request",
    type: "exercise",
    xp: 50,
    estimatedTime: "25 min",
  }

  const steps = [
    {
      id: 1,
      type: "theory",
      title: "Understanding the PR",
      content: {
        text: "You're about to review a pull request that adds a new user authentication feature. Before diving into the code, let's understand what to look for in a good code review.",
        points: [
          "Code functionality and correctness",
          "Code style and consistency",
          "Performance implications",
          "Security considerations",
          "Test coverage",
        ],
      },
    },
    {
      id: 2,
      type: "quiz",
      title: "Code Review Priorities",
      question: "What should be your first priority when reviewing a pull request?",
      options: [
        "Check if the code follows naming conventions",
        "Verify that the code solves the intended problem",
        "Look for performance optimizations",
        "Count the number of lines changed",
      ],
      correctAnswer: 1,
      explanation:
        "The primary goal is to ensure the code actually solves the problem it's supposed to solve. Style and performance come after functionality.",
    },
    {
      id: 3,
      type: "code-review",
      title: "Review This Code",
      code: `function authenticateUser(username, password) {
  if (username == "admin" && password == "123456") {
    return true;
  }
  return false;
}`,
      question: "What issues can you identify in this authentication function?",
      expectedIssues: [
        "Hardcoded credentials",
        "Weak password",
        "Using == instead of ===",
        "No password hashing",
        "Security vulnerability",
      ],
    },
    {
      id: 4,
      type: "feedback",
      title: "Writing Review Comments",
      scenario:
        "The developer has used var instead of const/let in their JavaScript code. How would you provide constructive feedback?",
      goodExample:
        "Consider using `const` or `let` instead of `var` for better scoping and to prevent accidental reassignments. This follows modern JavaScript best practices.",
      badExample: "Don't use var, it's bad practice.",
    },
  ]

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer("")
      setUserCode("")
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowFeedback(false)
    }
  }

  const handleSubmitAnswer = () => {
    if (currentStepData.type === "quiz") {
      const correct = Number.parseInt(selectedAnswer) === currentStepData.correctAnswer
      setIsCorrect(correct)
      setShowFeedback(true)
    } else if (currentStepData.type === "code-review") {
      setShowFeedback(true)
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case "theory":
        return (
          <div className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed">{currentStepData.content.text}</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Points to Remember:</h4>
              <ul className="space-y-2">
                {currentStepData.content.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{currentStepData.question}</h3>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {currentStepData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {!showFeedback && (
              <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Submit Answer
              </Button>
            )}

            {showFeedback && (
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {isCorrect ? (
                    <div className="space-y-2">
                      <div className="font-medium text-secondary">Correct! Well done.</div>
                      <div>{currentStepData.explanation}</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="font-medium">Not quite right.</div>
                      <div>{currentStepData.explanation}</div>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      case "code-review":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{currentStepData.question}</h3>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code to Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{currentStepData.code}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-comments">Your Review Comments:</Label>
              <Textarea
                id="review-comments"
                placeholder="List the issues you found and suggest improvements..."
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={6}
              />
            </div>

            {!showFeedback && (
              <Button onClick={handleSubmitAnswer} disabled={!userCode.trim()} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Submit Review
              </Button>
            )}

            {showFeedback && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="font-medium">Expected Issues to Identify:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {currentStepData.expectedIssues.map((issue, index) => (
                        <li key={index} className="text-sm">
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      case "feedback":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Providing Constructive Feedback</h3>
              <p className="text-muted-foreground mb-4">{currentStepData.scenario}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-secondary bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-base text-secondary flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Good Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{currentStepData.goodExample}</p>
                </CardContent>
              </Card>

              <Card className="border-destructive bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-base text-destructive flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Poor Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{currentStepData.badExample}</p>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>Remember:</strong> Always be specific, constructive, and respectful in your feedback. Focus on
                the code, not the person.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/journey/module/2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Module
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
                  <p className="text-muted-foreground">{lesson.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>{lesson.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lesson Progress</span>
                    <span className="font-medium">
                      {currentStep + 1}/{steps.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Step Content */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentStepData.type === "theory" && <BookOpen className="h-5 w-5" />}
                      {currentStepData.type === "quiz" && <Target className="h-5 w-5" />}
                      {currentStepData.type === "code-review" && <Code className="h-5 w-5" />}
                      {currentStepData.type === "feedback" && <Lightbulb className="h-5 w-5" />}
                      {currentStepData.title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline">
                    Step {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {currentStep === steps.length - 1 ? (
                  <Button className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Complete Lesson
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStepData.type === "quiz" || currentStepData.type === "code-review") && !showFeedback
                    }
                    className="gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
