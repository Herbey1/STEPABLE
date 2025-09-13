"use client"

import { useState, useRef, useEffect } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Send,
  User,
  Sparkles,
  BookOpen,
  Code,
  GitBranch,
  TestTube,
  Lightbulb,
  MessageSquare,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  codeBlock?: {
    language: string
    code: string
  }
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your Stepable AI Assistant. I'm here to help you with your onboarding journey, answer questions about development practices, and provide guidance on your learning path. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Explain Git branching strategies",
        "Help me review this code",
        "What's next in my learning path?",
        "Best practices for React components",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    {
      icon: BookOpen,
      title: "Explain Concept",
      description: "Get detailed explanations of development concepts",
      prompt: "Can you explain the concept of",
    },
    {
      icon: Code,
      title: "Code Review",
      description: "Get feedback on your code snippets",
      prompt: "Please review this code:",
    },
    {
      icon: GitBranch,
      title: "Git Help",
      description: "Learn Git commands and workflows",
      prompt: "Help me with Git:",
    },
    {
      icon: TestTube,
      title: "Testing Guidance",
      description: "Learn about testing strategies and best practices",
      prompt: "How do I test",
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      description: "Get recommendations for coding best practices",
      prompt: "What are the best practices for",
    },
  ]

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateMockResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content),
      }

      // Add code block for code-related queries
      if (content.toLowerCase().includes("code") || content.toLowerCase().includes("example")) {
        assistantMessage.codeBlock = {
          language: "javascript",
          code: `// Example React component
function UserProfile({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateUser(user.id, userData);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <button onClick={handleUpdate} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
}`,
        }
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateMockResponse = (query: string) => {
    const responses = [
      "Great question! Let me break this down for you. This concept is fundamental to modern development practices and here's how it works...",
      "I'd be happy to help you with that! Based on your current learning progress, here's what I recommend...",
      "That's an excellent topic to explore. Let me provide you with a comprehensive explanation and some practical examples...",
      "I can see you're working on improving your skills in this area. Here's a detailed guide to help you understand...",
      "This is a common challenge that many developers face. Let me share some best practices and solutions...",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateSuggestions = (query: string) => {
    const suggestions = [
      "Can you provide more examples?",
      "What are common mistakes to avoid?",
      "How does this relate to my current project?",
      "Are there any tools that can help?",
      "What should I learn next?",
    ]
    return suggestions.slice(0, 3)
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt + " ")
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex h-screen bg-background">
      <StepableSidebar currentPage="assistant" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepableHeader />
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Your personal development mentor</p>
                </div>
                <div className="ml-auto">
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Online
                  </Badge>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                    {message.type === "assistant" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.codeBlock && (
                          <div className="mt-3 bg-background/10 rounded-lg p-3 relative">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {message.codeBlock.language}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(message.codeBlock!.code)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <pre className="text-xs overflow-x-auto">
                              <code>{message.codeBlock.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.type === "assistant" && (
                          <div className="flex items-center gap-1 ml-2">
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 bg-transparent"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.type === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about development, your learning path, or get code help..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border p-4 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-3 bg-transparent"
                    onClick={() => handleQuickAction(action.prompt)}
                  >
                    <action.icon className="h-4 w-4 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Recent Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                    React component patterns
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                    Git workflow strategies
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                    Testing best practices
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                    API design principles
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Ask specific questions for better answers</p>
                  <p>• Share code snippets for detailed reviews</p>
                  <p>• Mention your current project context</p>
                  <p>• Use suggestions to explore related topics</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
