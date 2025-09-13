import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, BookOpen, Target, Zap, Github, Bot } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">Stepable</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="mb-4">
            Transform Your Team Onboarding
          </Badge>
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            Make Developer Onboarding
            <span className="text-primary"> Step by Step</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Convert complex team practices into clear, executable steps. Create interactive onboarding journeys that get
            new developers productive faster.
          </p>
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Github className="h-4 w-4" />
              Connect GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything you need for effective onboarding</h2>
            <p className="text-muted-foreground text-lg">
              From documentation to interactive exercises, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Interactive Journeys</CardTitle>
                <CardDescription>
                  Duolingo-style learning paths with modules, lessons, and progress tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-secondary mb-2" />
                <CardTitle>Document Library</CardTitle>
                <CardDescription>Centralized guides, templates, and best practices for your team</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Organize teams with role-based access and progress monitoring</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Bot className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Get instant help and generate onboarding content automatically</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Github className="h-8 w-8 text-foreground mb-2" />
                <CardTitle>GitHub Integration</CardTitle>
                <CardDescription>Connect repositories and create realistic development exercises</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Zap className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Practical Exercises</CardTitle>
                <CardDescription>PR simulations, code reviews, and hands-on development tasks</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to transform your onboarding?</h2>
          <p className="text-muted-foreground text-lg">
            Join teams who've reduced onboarding time by 60% with Stepable
          </p>
          <Button size="lg" className="gap-2">
            Get Started Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">S</span>
            </div>
            <span className="font-medium text-foreground">Stepable</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Stepable. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
