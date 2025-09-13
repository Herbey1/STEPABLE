import { CheckCircle } from "lucide-react"

interface TheoryLessonProps {
  title: string
  content: {
    text: string
    points: string[]
  }
}

export function TheoryLesson({ title, content }: TheoryLessonProps) {
  return (
    <div className="space-y-6">
      <div className="prose prose-sm max-w-none">
        <p className="text-foreground leading-relaxed">{content.text}</p>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Key Points to Remember:</h4>
        <ul className="space-y-2">
          {content.points.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
