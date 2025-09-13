"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  Video,
  FileText,
  Code,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function ModulePage({ params }: { params: { id: string; moduleId: string } }) {
  const [currentLesson, setCurrentLesson] = useState(1)
  const projectId = params.id
  const moduleId = parseInt(params.moduleId)

  // Mock module data - in real app, this would be fetched based on params
  const module = {
    id: moduleId,
    name: "Project Setup & Environment",
    description: "Initialize the project, set up development environment, and configure essential tools",
    totalLessons: 5,
    completedLessons: 0,
    estimatedTime: "2.5 hours",
    difficulty: "Beginner",
    lessons: [
      {
        id: 1,
        title: "Setting up your development environment",
        description: "Install Node.js, npm, and configure your IDE for optimal development",
        type: "reading",
        duration: "15 min",
        status: "available",
        content: {
          text: `# 🚀 Setting up your development environment

## Prerequisites
Before we begin, make sure you have the following:

- **Computer requirements**: Windows 10+, macOS 10.14+, or Linux
- **Internet connection** for downloading tools
- **Administrator access** to install software

## Step 1: Install Node.js

**Node.js** is the JavaScript runtime that powers our development environment.

1. Visit **nodejs.org**
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the setup wizard
4. Verify installation by opening terminal and typing: \`node --version\`

## Step 2: Configure your IDE

**Visual Studio Code** is our recommended editor:

1. Download from **code.visualstudio.com**
2. Install the following **essential extensions**:
   - **ES7+ React/Redux/React-Native snippets**
   - **Prettier - Code formatter**
   - **ESLint**
   - **Auto Rename Tag**

## Step 3: Verify your setup

Open your terminal and run these commands:
\`\`\`
node --version
npm --version
\`\`\`

You should see version numbers for both tools. **Congratulations!** 🎉 Your development environment is ready.`,
          quiz: {
            question: "What is the recommended Node.js version to install?",
            options: [
              "The latest experimental version",
              "The LTS (Long Term Support) version",
              "Any version from the last 5 years",
              "The oldest stable version"
            ],
            correct: 1,
            explanation: "The LTS version is recommended because it's stable, well-tested, and receives long-term support from the Node.js team."
          }
        }
      },
      {
        id: 2,
        title: "Project initialization and structure",
        description: "Create the project structure and understand the folder organization",
        type: "reading",
        duration: "20 min",
        status: "locked",
        content: {
          text: `# 📁 Project Structure & Organization

## Understanding our project layout

Our project follows a **standard React/Next.js structure**:

\`\`\`
project-root/
├── 📂 app/           # Next.js app directory
├── 📂 components/    # Reusable UI components
├── 📂 lib/          # Utility functions
├── 📂 public/       # Static assets
├── 📄 package.json  # Dependencies and scripts
└── 📄 README.md     # Project documentation
\`\`\`

## Key principles

**1. Component organization**
- Each component gets its own file
- Use **PascalCase** for component names
- Group related components in folders

**2. File naming conventions**
- Components: \`UserProfile.tsx\`
- Utilities: \`formatDate.ts\`
- Styles: \`globals.css\`

**3. Import structure**
- External libraries first
- Internal components second
- Relative imports last

## Creating your first component

\`\`\`typescript
// components/Welcome.tsx
export function Welcome() {
  return (
    <div className="welcome">
      <h1>Welcome to our project! 👋</h1>
    </div>
  )
}
\`\`\``,
          quiz: {
            question: "What naming convention should we use for React components?",
            options: [
              "camelCase (userProfile)",
              "PascalCase (UserProfile)",
              "snake_case (user_profile)",
              "kebab-case (user-profile)"
            ],
            correct: 1,
            explanation: "PascalCase is the standard convention for React components, making them easily distinguishable from regular functions and variables."
          }
        }
      },
      {
        id: 3,
        title: "Package management with npm",
        description: "Learn how to manage dependencies and scripts in package.json",
        type: "reading",
        duration: "10 min",
        status: "locked",
        content: {
          text: `# 📦 Package Management with npm

## Understanding package.json

The **package.json** file is the heart of any Node.js project. It contains:

- **Project metadata** (name, version, description)
- **Dependencies** (libraries your project needs)
- **Scripts** (commands you can run)
- **Configuration** for various tools

## Essential npm commands

**Installing packages:**
\`\`\`bash
npm install package-name     # Add to dependencies
npm install -D package-name  # Add to devDependencies
\`\`\`

**Running scripts:**
\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run tests
\`\`\`

## Our project scripts

- **\`npm run dev\`** - Starts the development server with hot reload
- **\`npm run build\`** - Creates optimized production build
- **\`npm run lint\`** - Checks code quality and style
- **\`npm run test\`** - Runs the test suite

## Best practices

✅ **Always use exact versions** for critical dependencies
✅ **Keep devDependencies separate** from runtime dependencies
✅ **Run \`npm audit\`** regularly to check for security issues
✅ **Use \`npm ci\`** in production for faster, reliable installs`,
          quiz: {
            question: "What's the difference between dependencies and devDependencies?",
            options: [
              "There's no difference, they're the same thing",
              "Dependencies are for production, devDependencies are for development only",
              "devDependencies are faster to install",
              "Dependencies are optional, devDependencies are required"
            ],
            correct: 1,
            explanation: "Dependencies are needed in production (like React), while devDependencies are only needed during development (like testing tools or build tools)."
          }
        }
      },
      {
        id: 4,
        title: "Git setup and initial commit",
        description: "Initialize Git repository and make your first commit",
        type: "reading",
        duration: "25 min",
        status: "locked",
        content: {
          text: `# 🔧 Git Setup & Your First Commit

## Why Git matters

**Git** is our version control system. It helps us:
- **Track changes** in our code over time
- **Collaborate** with team members safely
- **Revert** to previous versions if needed
- **Branch** to work on features independently

## Initial setup

**1. Configure your identity:**
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

**2. Initialize repository:**
\`\`\`bash
git init
git add .
git commit -m "Initial commit: project setup"
\`\`\`

## Our commit message format

We follow a **consistent format** for commit messages:

\`\`\`
type(scope): description

Examples:
feat(auth): add user login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
\`\`\`

**Types we use:**
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no logic changes)
- **refactor**: Code restructuring
- **test**: Adding or updating tests

## Branch naming convention

- **feature/**: \`feature/user-authentication\`
- **bugfix/**: \`bugfix/login-error-handling\`
- **hotfix/**: \`hotfix/critical-security-patch\`

**Remember:** Always create a new branch for each feature or fix!`,
          quiz: {
            question: "Which commit message follows our project's format correctly?",
            options: [
              "Added new button",
              "feat(ui): add submit button to contact form",
              "FIXED BUG IN LOGIN",
              "Updated some files"
            ],
            correct: 1,
            explanation: "Our format is 'type(scope): description' - this example shows a new feature (feat) in the UI scope with a clear description."
          }
        }
      },
      {
        id: 5,
        title: "Environment variables and configuration",
        description: "Set up environment variables and configuration files",
        type: "reading",
        duration: "15 min",
        status: "locked",
        content: {
          text: `# ⚙️ Environment Variables & Configuration

## What are environment variables?

**Environment variables** store configuration that changes between environments:
- **API URLs** (development vs production)
- **Database connections**
- **API keys and secrets**
- **Feature flags**

## Our .env file structure

**Create a \`.env.local\` file in your project root:**

\`\`\`bash
# Database
DATABASE_URL="postgresql://localhost:5432/myapp"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"
API_SECRET_KEY="your-secret-key-here"

# Third-party services
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
\`\`\`

## Important rules

🔒 **NEVER commit secrets** to version control
🔒 **Use \`NEXT_PUBLIC_\`** prefix for client-side variables
🔒 **Keep sensitive data** in server-side variables only

## Using environment variables

**In your code:**
\`\`\`typescript
// Client-side (browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Server-side only
const secretKey = process.env.API_SECRET_KEY
\`\`\`

## Environment files hierarchy

1. **\`.env.local\`** - Local development (ignored by git)
2. **\`.env.development\`** - Development defaults
3. **\`.env.production\`** - Production defaults
4. **\`.env\`** - Global defaults

**Pro tip:** Always provide fallback values for non-critical variables!`,
          quiz: {
            question: "Which environment variable can be safely used in client-side code?",
            options: [
              "API_SECRET_KEY",
              "DATABASE_PASSWORD",
              "NEXT_PUBLIC_API_URL",
              "STRIPE_SECRET_KEY"
            ],
            correct: 2,
            explanation: "Only variables with the NEXT_PUBLIC_ prefix are available in client-side code. Secret keys should never be exposed to the browser."
          }
        }
      },
    ]
  }

  const currentLessonData = module.lessons.find(lesson => lesson.id === currentLesson)

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "reading":
        return <BookOpen className="h-4 w-4" />
      case "interactive":
        return <Code className="h-4 w-4" />
      case "hands-on":
        return <Target className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleStartLesson = () => {
    // In a real app, this would start the lesson and track progress
    console.log(`Starting lesson ${currentLesson}`)
  }

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
              <Link href={`/projects/${projectId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Project
                </Button>
              </Link>
            </div>

            {/* Module Info */}
            <Card className="border-border">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">{module.name}</CardTitle>
                    <Badge variant="outline">{module.difficulty}</Badge>
                  </div>
                  <CardDescription className="text-base">{module.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{module.totalLessons} lessons</span>
                    <span>•</span>
                    <span>{module.estimatedTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Module Progress</span>
                    <span className="font-medium">
                      {module.completedLessons}/{module.totalLessons} lessons
                    </span>
                  </div>
                  <Progress value={(module.completedLessons / module.totalLessons) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lesson List */}
              <div className="lg:col-span-1">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Lessons</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentLesson === lesson.id
                            ? "bg-primary/10 border-primary"
                            : "border-border hover:bg-muted/50"
                        } ${
                          lesson.status === "locked" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => lesson.status !== "locked" && setCurrentLesson(lesson.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {lesson.status === "completed" && (
                              <CheckCircle className="h-4 w-4 text-secondary" />
                            )}
                            {lesson.status === "available" && getLessonIcon(lesson.type)}
                            {lesson.status === "locked" && (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight">{lesson.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {lesson.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Lesson Content */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getLessonIcon(currentLessonData?.type || "reading")}
                          {currentLessonData?.title}
                        </CardTitle>
                        <CardDescription>{currentLessonData?.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{currentLessonData?.type}</Badge>
                        <span className="text-sm text-muted-foreground">{currentLessonData?.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Lesson Content Area */}
                    <div className="space-y-6">
                      {/* Text Content */}
                      {currentLessonData?.content?.text && (
                        <div className="prose max-w-none">
                          <div 
                            className="text-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: currentLessonData.content.text
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
                                .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>')
                                .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                                .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$2</h2>')
                                .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
                                .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                                .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                                .replace(/\n\n/g, '</p><p class="mb-4">')
                                .replace(/^(.*)$/gm, '<p class="mb-4">$1</p>')
                            }}
                          />
                        </div>
                      )}

                      {/* Quiz Section */}
                      {currentLessonData?.content?.quiz && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-blue-900 mb-4">
                            📝 Quiz: Test your knowledge
                          </h3>
                          <div className="mb-4">
                            <p className="text-blue-800 font-medium mb-3">
                              {currentLessonData.content.quiz.question}
                            </p>
                            <div className="space-y-2">
                              {currentLessonData.content.quiz.options.map((option, index) => (
                                <label key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border hover:bg-blue-25 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name={`quiz-${currentLessonData.id}`} 
                                    value={index}
                                    className="mt-1 text-blue-600"
                                  />
                                  <span className="text-gray-800">
                                    <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm text-green-800">
                              <strong>💡 Explanation:</strong> {currentLessonData.content.quiz.explanation}
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              Correct answer: <strong>{String.fromCharCode(65 + currentLessonData.content.quiz.correct)}</strong>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Lesson Navigation */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        disabled={currentLesson === 1}
                        onClick={() => setCurrentLesson(currentLesson - 1)}
                      >
                        Previous Lesson
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        Lesson {currentLesson} of {module.totalLessons}
                      </div>
                      <Button
                        variant="outline"
                        disabled={currentLesson === module.totalLessons}
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                      >
                        Next Lesson
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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