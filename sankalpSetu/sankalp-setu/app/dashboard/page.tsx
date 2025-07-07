"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, Award, BookOpen, Calendar, IndianRupee, Target, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useBusinessIdeas, useSchemeMatches, useLearningProgress } from "@/hooks/useApi"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsed = JSON.parse(userData)
        setUser(parsed)
        setUserId(parsed.id || parsed.user_id || parsed._id || "")
      }
    }
  }, [])

  const { ideas, loading: ideasLoading } = useBusinessIdeas(userId)
  const { matches, loading: matchesLoading } = useSchemeMatches(userId)
  const { progress, loading: progressLoading } = useLearningProgress(userId)

  // Calculate stats
  const ideasCount = ideas?.length || 0
  const schemesCount = matches?.length || 0
  // Avg score (if idea.score exists)
  const avgScore = ideasCount > 0 ? (ideas.reduce((sum: any, i: any) => sum + (i.score || 0), 0) / ideasCount).toFixed(1) : "-"
  // Learning progress (if progress is an object with module progress values)
  const progressVals = Object.values(progress || {}) as number[]
  const learningProgress = progressVals.length > 0 ? Math.round((progressVals.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0) / (progressVals.length * 100)) * 100) : 0

  // Helper: Render ideas dynamically
  function renderIdeas() {
    if (ideasLoading) return <div>Loading...</div>;
    if (!ideas || ideas.length === 0) return <div>No ideas submitted yet.</div>;
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {ideas.map((idea: any, idx: number) => (
          <Card key={idea.id || idx} className="border-green-200/50 dark:border-green-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  {idea.title || idea.name || `Idea #${idx + 1}`}
                </CardTitle>
                {idea.score && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50">Score: {idea.score}/10</Badge>
                )}
              </div>
              <CardDescription>{idea.description || idea.summary || "No description."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Example: Progress, Revenue, Investment, etc. */}
              {idea.progress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Business Plan Progress</span>
                    <span>{idea.progress}%</span>
                  </div>
                  <Progress value={idea.progress} className="h-2" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {idea.revenue && (
                  <div>
                    <p className="text-muted-foreground">Est. Monthly Revenue</p>
                    <p className="font-semibold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {idea.revenue}
                    </p>
                  </div>
                )}
                {idea.investment && (
                  <div>
                    <p className="text-muted-foreground">Investment Needed</p>
                    <p className="font-semibold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {idea.investment}
                    </p>
                  </div>
                )}
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                View Full Business Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Helper: Render schemes dynamically
  function renderSchemes() {
    if (matchesLoading) return <div>Loading...</div>;
    if (!matches || matches.length === 0) return <div>No schemes matched yet.</div>;
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {matches.map((scheme: any, idx: number) => (
          <Card key={scheme.id || idx} className="border-blue-200/50 dark:border-blue-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                {scheme.schemeName || scheme.name || `Scheme #${idx + 1}`}
              </CardTitle>
              <CardDescription>{scheme.description || scheme.summary || "No description."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheme.matchScore && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50">
                  {scheme.matchScore}% Match
                </Badge>
              )}
              {/* Add more scheme details as needed */}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Helper: Render learning progress dynamically
  function renderLearning() {
    if (progressLoading) return <div>Loading...</div>;
    const modules = Object.entries(progress || {});
    if (modules.length === 0) return <div>No learning modules yet.</div>;
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {modules.map(([moduleId, value]: [string, any], idx: number) => (
          <Card key={moduleId} className="border-pink-200/50 dark:border-pink-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-pink-600" />
                Module {moduleId}
              </CardTitle>
              <CardDescription>Progress: {value}%</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={value} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {user?.first_name || user?.username || "Entrepreneur"}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your entrepreneurial journey and discover new opportunities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200/50 dark:border-purple-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ideas Submitted</p>
                  <p className="text-2xl font-bold text-purple-600">{ideasLoading ? "..." : ideasCount}</p>
                </div>
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-pink-200/50 dark:border-pink-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-2xl font-bold text-pink-600">{ideasLoading ? "..." : avgScore !== "-" ? `${avgScore}/10` : "-"}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200/50 dark:border-purple-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Schemes Found</p>
                  <p className="text-2xl font-bold text-purple-600">{matchesLoading ? "..." : schemesCount}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-pink-200/50 dark:border-pink-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Progress</p>
                  <p className="text-2xl font-bold text-pink-600">{progressLoading ? "..." : `${learningProgress}%`}</p>
                </div>
                <BookOpen className="h-8 w-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ideas">My Ideas</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-6">{renderIdeas()}</TabsContent>

          <TabsContent value="schemes" className="space-y-6">{renderSchemes()}</TabsContent>

          <TabsContent value="learning" className="space-y-6">{renderLearning()}</TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Your Entrepreneurial Journey
                </CardTitle>
                <CardDescription>Track your progress towards becoming a successful entrepreneur</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-2xl font-bold text-purple-600">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-green-600">Completed Milestones</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>First business idea submitted</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Completed business basics course</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Found matching government schemes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Created detailed business plan</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-orange-600">Next Steps</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span>Complete financial planning module</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span>Apply for PMEGP scheme</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span>Start digital marketing course</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span>Connect with local women entrepreneurs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
