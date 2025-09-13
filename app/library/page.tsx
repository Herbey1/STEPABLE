"use client"

import { useState } from "react"
import { StepableSidebar } from "@/components/stepable-sidebar"
import { StepableHeader } from "@/components/stepable-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  Search,
  BookOpen,
  FileText,
  Code,
  Video,
  LinkIcon,
  Plus,
  Star,
  Clock,
  User,
  Download,
  Share,
  Eye,
} from "lucide-react"

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "devops", label: "DevOps" },
    { value: "testing", label: "Testing" },
    { value: "design", label: "Design" },
    { value: "general", label: "General" },
  ]

  const documentTypes = [
    { value: "all", label: "All Types" },
    { value: "guide", label: "Guides" },
    { value: "template", label: "Templates" },
    { value: "checklist", label: "Checklists" },
    { value: "video", label: "Videos" },
    { value: "link", label: "External Links" },
  ]

  const documents = [
    {
      id: 1,
      title: "React Component Best Practices",
      description: "Comprehensive guide for writing maintainable React components",
      type: "guide",
      category: "frontend",
      author: "Sarah Johnson",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      views: 245,
      rating: 4.8,
      tags: ["React", "Components", "Best Practices"],
      featured: true,
    },
    {
      id: 2,
      title: "API Design Checklist",
      description: "Essential checklist for designing RESTful APIs",
      type: "checklist",
      category: "backend",
      author: "Mike Chen",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      views: 189,
      rating: 4.6,
      tags: ["API", "REST", "Backend"],
      featured: false,
    },
    {
      id: 3,
      title: "Git Workflow Template",
      description: "Standard Git workflow template for team collaboration",
      type: "template",
      category: "general",
      author: "Alex Developer",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-22",
      views: 312,
      rating: 4.9,
      tags: ["Git", "Workflow", "Collaboration"],
      featured: true,
    },
    {
      id: 4,
      title: "Docker Deployment Guide",
      description: "Step-by-step guide for deploying applications with Docker",
      type: "guide",
      category: "devops",
      author: "Emma Wilson",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-25",
      views: 156,
      rating: 4.7,
      tags: ["Docker", "Deployment", "DevOps"],
      featured: false,
    },
    {
      id: 5,
      title: "Testing Strategies Video Series",
      description: "Comprehensive video series on testing methodologies",
      type: "video",
      category: "testing",
      author: "David Kim",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
      views: 423,
      rating: 4.8,
      tags: ["Testing", "Unit Tests", "Integration"],
      featured: true,
    },
    {
      id: 6,
      title: "TypeScript Official Documentation",
      description: "Official TypeScript documentation and tutorials",
      type: "link",
      category: "frontend",
      author: "System",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      views: 89,
      rating: 4.5,
      tags: ["TypeScript", "Documentation"],
      featured: false,
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    const matchesType = selectedType === "all" || doc.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const featuredDocuments = documents.filter((doc) => doc.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "template":
        return <FileText className="h-4 w-4" />
      case "checklist":
        return <Code className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "link":
        return <LinkIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      guide: "default",
      template: "secondary",
      checklist: "destructive",
      video: "outline",
      link: "outline",
    } as const
    return <Badge variant={variants[type as keyof typeof variants] || "outline"}>{type}</Badge>
  }

  return (
    <div className="flex h-screen bg-background">
      <StepableSidebar currentPage="library" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StepableHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
                <p className="text-muted-foreground">Access guides, templates, and resources for your team</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Document</DialogTitle>
                    <DialogDescription>Create a new document or add an external resource.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="doc-title">Title</Label>
                      <Input id="doc-title" placeholder="Document title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doc-description">Description</Label>
                      <Textarea id="doc-description" placeholder="Brief description" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doc-type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="template">Template</SelectItem>
                          <SelectItem value="checklist">Checklist</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="link">External Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doc-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>Create Document</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents, tags, or content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="border-border hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              {getTypeIcon(doc.type)}
                              {doc.title}
                            </CardTitle>
                            <CardDescription className="text-sm">{doc.description}</CardDescription>
                          </div>
                          {doc.featured && <Star className="h-4 w-4 text-accent" />}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          {getTypeBadge(doc.type)}
                          <Badge variant="outline" className="capitalize">
                            {doc.category}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{doc.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{doc.views} views</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Updated {new Date(doc.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{doc.rating}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Share className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredDocuments.map((doc) => (
                    <Card key={doc.id} className="border-border hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              {getTypeIcon(doc.type)}
                              {doc.title}
                            </CardTitle>
                            <CardDescription className="text-sm">{doc.description}</CardDescription>
                          </div>
                          <Star className="h-4 w-4 text-accent" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          {getTypeBadge(doc.type)}
                          <Badge variant="outline" className="capitalize">
                            {doc.category}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{doc.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{doc.views} views</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Share className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documents
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 6)
                    .map((doc) => (
                      <Card key={doc.id} className="border-border hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-base flex items-center gap-2">
                                {getTypeIcon(doc.type)}
                                {doc.title}
                              </CardTitle>
                              <CardDescription className="text-sm">{doc.description}</CardDescription>
                            </div>
                            {doc.featured && <Star className="h-4 w-4 text-accent" />}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-2">
                            {getTypeBadge(doc.type)}
                            <Badge variant="outline" className="capitalize">
                              {doc.category}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{doc.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{doc.views} views</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Share className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
