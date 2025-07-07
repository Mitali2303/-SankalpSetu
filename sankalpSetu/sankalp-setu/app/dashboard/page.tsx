"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, Award, BookOpen, Calendar, IndianRupee, Target, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Sanjaya</span>
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
                  <p className="text-2xl font-bold text-purple-600">3</p>
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
                  <p className="text-2xl font-bold text-pink-600">8.2/10</p>
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
                  <p className="text-2xl font-bold text-purple-600">12</p>
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
                  <p className="text-2xl font-bold text-pink-600">65%</p>
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

          <TabsContent value="ideas" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-200/50 dark:border-green-800/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-green-600" />
                      Tailoring Business
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50">Score: 8.5/10</Badge>
                  </div>
                  <CardDescription>Women's tailoring and alteration services in rural area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Business Plan Progress</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Est. Monthly Revenue</p>
                      <p className="font-semibold flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        15,000
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Investment Needed</p>
                      <p className="font-semibold flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        25,000
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    View Full Business Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-yellow-200/50 dark:border-yellow-800/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Organic Farming
                    </CardTitle>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50">Score: 7.8/10</Badge>
                  </div>
                  <CardDescription>Organic vegetable farming and direct sales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Seasonal Revenue</p>
                      <p className="font-semibold flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        20,000
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Land Required</p>
                      <p className="font-semibold">2 Acres</p>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    Complete Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-blue-200/50 dark:border-blue-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    PMEGP Scheme
                  </CardTitle>
                  <CardDescription>Prime Minister's Employment Generation Programme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50">
                      95% Match for Tailoring Business
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Loan up to ₹25 lakhs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>15-35% subsidy available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>For women entrepreneurs</span>
                    </div>
                  </div>

                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200/50 dark:border-purple-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Mudra Loan
                  </CardTitle>
                  <CardDescription>Micro Units Development & Refinance Agency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50">
                      88% Match for Organic Farming
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Loan up to ₹10 lakhs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>No collateral required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Quick processing</span>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-green-200/50 dark:border-green-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Business Basics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Completed: Understanding market research, customer identification
                  </p>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50">Completed</Badge>
                </CardContent>
              </Card>

              <Card className="border-yellow-200/50 dark:border-yellow-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-yellow-600" />
                    Financial Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={65} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    In Progress: Budgeting, profit calculation, expense tracking
                  </p>
                  <Button size="sm" className="w-full">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-200/50 dark:border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gray-600" />
                    Digital Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={0} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Not Started: Social media, online presence, customer engagement
                  </p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Start Module
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
