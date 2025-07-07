"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  Brain,
  Search,
  Filter,
  TrendingUp,
  Users,
  Target,
  Award,
  MessageSquare,
} from "lucide-react"

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const learningPaths = [
    {
      id: 1,
      title: "Business Fundamentals for Rural Entrepreneurs",
      description: "AI-curated path based on your tailoring business idea",
      progress: 65,
      modules: 8,
      duration: "4 weeks",
      difficulty: "Beginner",
      aiPersonalized: true,
      category: "business",
      color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600",
    },
    {
      id: 2,
      title: "Financial Planning & Management",
      description: "Learn budgeting, profit calculation, and expense tracking",
      progress: 30,
      modules: 6,
      duration: "3 weeks",
      difficulty: "Intermediate",
      aiPersonalized: true,
      category: "finance",
      color: "bg-pink-100 dark:bg-pink-900/50 text-pink-600",
    },
    {
      id: 3,
      title: "Digital Marketing for Local Businesses",
      description: "Reach customers through social media and online presence",
      progress: 0,
      modules: 5,
      duration: "2 weeks",
      difficulty: "Beginner",
      aiPersonalized: false,
      category: "marketing",
      color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600",
    },
  ]

  const currentModule = {
    title: "Understanding Your Target Market",
    description: "AI Analysis: Based on your tailoring business, we've identified key customer segments in rural areas",
    progress: 75,
    timeLeft: "8 minutes",
    aiInsights: [
      "Your target customers are primarily women aged 25-45",
      "Peak demand during festival seasons (40% increase)",
      "Average spending capacity: ₹500-2000 per month",
    ],
  }

  const aiTutor = {
    question: "I'm confused about pricing my tailoring services. How do I calculate fair prices?",
    response:
      "Great question, Sanjaya! Based on your location and business idea, here's a personalized pricing strategy...",
    suggestions: [
      "Research local competitor prices",
      "Calculate material + labor costs",
      "Add 30-40% profit margin",
      "Consider seasonal pricing",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Learning Hub
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Personalized learning paths designed by AI based on your business ideas and goals
          </p>
        </div>

        {/* AI Learning Assistant */}
        <Card className="mb-8 border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">AI Learning Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask me anything about your business or learning modules. I'll provide personalized guidance based on
                  your tailoring business idea.
                </p>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium mb-2">{aiTutor.question}</p>
                      <p className="text-sm text-muted-foreground mb-3">{aiTutor.response}</p>
                      <div className="space-y-1">
                        {aiTutor.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="paths" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="current">Current Module</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="paths" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search learning modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter by Category
              </Button>
            </div>

            {/* Learning Paths */}
            <div className="grid lg:grid-cols-2 gap-6">
              {learningPaths.map((path) => (
                <Card
                  key={path.id}
                  className="border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-full ${path.color}`}>
                            <BookOpen className="h-4 w-4" />
                          </div>
                          {path.title}
                        </CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </div>
                      {path.aiPersonalized && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          AI Personalized
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{path.modules}</div>
                        <div className="text-muted-foreground">Modules</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{path.duration}</div>
                        <div className="text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{path.difficulty}</div>
                        <div className="text-muted-foreground">Level</div>
                      </div>
                    </div>

                    <Button className="w-full" variant={path.progress > 0 ? "default" : "outline"}>
                      {path.progress > 0 ? "Continue Learning" : "Start Path"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Recommended Modules */}
            <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  AI Recommendations for You
                </CardTitle>
                <CardDescription>Based on your tailoring business idea and current progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg">
                    <h4 className="font-medium mb-2">Next Suggested Module</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      "Seasonal Business Planning" - Perfect for managing festival season demand spikes
                    </p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Start Module
                    </Button>
                  </div>
                  <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg">
                    <h4 className="font-medium mb-2">Skill Gap Identified</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      "Customer Relationship Management" - Improve customer retention by 30%
                    </p>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="current" className="space-y-6">
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-purple-600" />
                      {currentModule.title}
                    </CardTitle>
                    <CardDescription>{currentModule.description}</CardDescription>
                  </div>
                  <Badge className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {currentModule.timeLeft}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Module Progress</span>
                    <span>{currentModule.progress}%</span>
                  </div>
                  <Progress value={currentModule.progress} className="h-3" />
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    AI Insights for Your Business
                  </h4>
                  <div className="space-y-2">
                    {currentModule.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">Continue Module</Button>
                  <Button variant="outline">Take Notes</Button>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Quiz */}
            <Card className="border-blue-200/50 dark:border-blue-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Quick Knowledge Check
                </CardTitle>
                <CardDescription>AI-generated questions based on your learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-medium mb-3">
                    Question: What's the most important factor when pricing tailoring services in rural markets?
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Material costs only",
                      "Local competition and customer spending capacity",
                      "Urban market prices",
                      "Government guidelines",
                    ].map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-3 bg-transparent"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-yellow-200/50 dark:border-yellow-800/50 bg-yellow-50/50 dark:bg-yellow-950/20">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">First Business Plan</h3>
                  <p className="text-sm text-muted-foreground mb-4">Completed your first AI-generated business plan</p>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50">Earned 2 days ago</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Learning Streak</h3>
                  <p className="text-sm text-muted-foreground mb-4">7 days of continuous learning</p>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50">Active</Badge>
                </CardContent>
              </Card>

              <Card className="border-purple-200/50 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-950/20">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Community Helper</h3>
                  <p className="text-sm text-muted-foreground mb-4">Helped 5 other entrepreneurs</p>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50">Earned 1 week ago</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle>Learning Progress Overview</CardTitle>
                <CardDescription>Your journey so far</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-muted-foreground">Modules Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">28</div>
                    <div className="text-sm text-muted-foreground">Hours Learned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-muted-foreground">Certificates Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">85%</div>
                    <div className="text-sm text-muted-foreground">Quiz Average</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-purple-200/50 dark:border-purple-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Study Groups
                  </CardTitle>
                  <CardDescription>Join other women entrepreneurs learning similar skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg">
                    <h4 className="font-medium mb-2">Tailoring Business Group</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      15 members • Currently learning: Financial Planning
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Join Group
                    </Button>
                  </div>
                  <div className="p-4 bg-pink-50/50 dark:bg-pink-950/20 rounded-lg">
                    <h4 className="font-medium mb-2">Rural Entrepreneurs Network</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      32 members • Mixed business types • Very active
                    </p>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200/50 dark:border-green-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Recent Discussions
                  </CardTitle>
                  <CardDescription>Community questions and answers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm font-medium mb-1">"How to handle seasonal demand fluctuations?"</p>
                    <p className="text-xs text-muted-foreground">Asked by Meera • 3 answers • 2 hours ago</p>
                  </div>
                  <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm font-medium mb-1">"Best practices for customer retention"</p>
                    <p className="text-xs text-muted-foreground">Asked by Sunita • 7 answers • 1 day ago</p>
                  </div>
                  <Button size="sm" className="w-full bg-transparent" variant="outline">
                    View All Discussions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
