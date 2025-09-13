"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code, CheckCircle, Lightbulb } from "lucide-react"

interface ExerciseLessonProps {
  title: string
  question: string
  code: string
  expectedIssues: string[]
  onSubmit: (answer: string) => void
}

export function ExerciseLesson({ title, question, code, expectedIssues, onSubmit }: ExerciseLessonProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSubmit = () => {
    setShowFeedback(true)
    onSubmit(userAnswer)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{question}</h3>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code to Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{code}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-comments">Your Review Comments:</Label>
        <Textarea
          id="review-comments"
          placeholder="List the issues you found and suggest improvements..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          rows={6}
        />
      </div>

      {!showFeedback && (
        <Button onClick={handleSubmit} disabled={!userAnswer.trim()} className="gap-2">
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
                {expectedIssues.map((issue, index) => (
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
}
