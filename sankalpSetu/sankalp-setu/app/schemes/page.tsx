"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Search,
  IndianRupee,
  CheckCircle,
  Clock,
  Brain,
  FileText,
  AlertCircle,
  TrendingUp,
  Phone,
  ExternalLink,
} from "lucide-react"

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedState, setSelectedState] = useState("all")

  const aiMatchedSchemes = [
    {
      id: 1,
      name: "PMEGP (Prime Minister's Employment Generation Programme)",
      description: "Financial assistance for setting up micro enterprises",
      matchScore: 95,
      category: "Manufacturing",
      maxLoan: "25,00,000",
      subsidy: "15-35%",
      eligibility: ["Age: 18+ years", "Educational: 8th pass", "For women entrepreneurs"],
      benefits: [
        "Loan up to ₹25 lakhs for manufacturing",
        "15-35% subsidy (higher for women/SC/ST)",
        "No collateral for loans up to ₹10 lakhs",
        "Training and handholding support",
      ],
      applicationProcess: [
        "Submit online application",
        "Document verification",
        "Bank interview",
        "Loan sanction and disbursement",
      ],
      documents: ["Aadhaar Card", "PAN Card", "Educational Certificates", "Caste Certificate (if applicable)"],
      processingTime: "45-60 days",
      aiInsights: [
        "Perfect match for your tailoring business",
        "High approval rate (78%) for women in your state",
        "Best time to apply: Before festival season",
      ],
      status: "recommended",
    },
    {
      id: 2,
      name: "Mudra Loan - Tarun",
      description: "Collateral-free loans for micro enterprises",
      matchScore: 88,
      category: "Service",
      maxLoan: "10,00,000",
      subsidy: "No subsidy, low interest",
      eligibility: ["Existing business", "Good credit score", "Income proof"],
      benefits: ["Loan up to ₹10 lakhs", "No collateral required", "Competitive interest rates", "Quick processing"],
      applicationProcess: [
        "Visit nearest bank/NBFC",
        "Fill application form",
        "Submit documents",
        "Loan approval and disbursement",
      ],
      documents: ["Business plan", "Income proof", "Bank statements", "Identity proof"],
      processingTime: "15-30 days",
      aiInsights: [
        "Good for business expansion",
        "Faster processing than PMEGP",
        "Consider after establishing customer base",
      ],
      status: "suitable",
    },
    {
      id: 3,
      name: "Stand-Up India",
      description: "Bank loans for SC/ST and women entrepreneurs",
      matchScore: 82,
      category: "Manufacturing/Service",
      maxLoan: "1,00,00,000",
      subsidy: "Interest rate concession",
      eligibility: ["Women/SC/ST", "Age: 18-65 years", "First-time entrepreneur"],
      benefits: [
        "Loan between ₹10 lakhs to ₹1 crore",
        "Lower interest rates",
        "Handholding support for 2 years",
        "Credit guarantee coverage",
      ],
      applicationProcess: ["Online application portal", "Bank branch visit", "Project evaluation", "Loan sanction"],
      documents: ["Project report", "Identity proof", "Address proof", "Educational certificates"],
      processingTime: "60-90 days",
      aiInsights: [
        "Higher loan amount available",
        "Good for larger business plans",
        "Requires detailed project report",
      ],
      status: "consider",
    },
  ]

  const applicationTracker = {
    pmegp: {
      status: "in-progress",
      stage: 2,
      totalStages: 4,
      stages: [
        { name: "Application Submitted", completed: true, date: "15 Dec 2024" },
        { name: "Document Verification", completed: true, date: "18 Dec 2024" },
        { name: "Bank Interview", completed: false, scheduled: "22 Dec 2024" },
        { name: "Loan Sanction", completed: false, date: null },
      ],
      nextAction: "Prepare for bank interview on 22nd December",
      aiTips: [
        "Bring original documents and photocopies",
        "Prepare a 5-minute business pitch",
        "Highlight your tailoring experience and local market knowledge",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Scheme Matching
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover government schemes perfectly matched to your business idea and profile
          </p>
        </div>

        {/* AI Scheme Matcher */}
        <Card className="mb-8 border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">AI Scheme Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your tailoring business idea, location (Rural Maharashtra), and profile, I've found 3 highly
                  suitable schemes with 95% match accuracy for you, Sanjaya.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3">
                    <div className="font-medium text-green-600">Best Match</div>
                    <div>PMEGP - 95% compatibility</div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3">
                    <div className="font-medium text-blue-600">Approval Rate</div>
                    <div>78% for women in your area</div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3">
                    <div className="font-medium text-purple-600">Est. Funding</div>
                    <div>₹2-5 lakhs for your business</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="matched" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="matched">AI Matched</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="all">All Schemes</TabsTrigger>
            <TabsTrigger value="help">Application Help</TabsTrigger>
          </TabsList>

          <TabsContent value="matched" className="space-y-6">
            <div className="grid gap-6">
              {aiMatchedSchemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  className="border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-3 mb-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          {scheme.name}
                          <Badge
                            className={`
                              ${scheme.status === "recommended" ? "bg-green-100 text-green-800 dark:bg-green-900/50" : ""}
                              ${scheme.status === "suitable" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50" : ""}
                              ${scheme.status === "consider" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50" : ""}
                            `}
                          >
                            {scheme.matchScore}% Match
                          </Badge>
                        </CardTitle>
                        <CardDescription>{scheme.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* AI Insights */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        AI Insights for Your Business
                      </h4>
                      <div className="space-y-2">
                        {scheme.aiInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Details */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <IndianRupee className="h-5 w-5 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold">Max Loan</div>
                        <div className="text-sm text-muted-foreground">₹{scheme.maxLoan}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <TrendingUp className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                        <div className="font-semibold">Subsidy</div>
                        <div className="text-sm text-muted-foreground">{scheme.subsidy}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Clock className="h-5 w-5 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Processing</div>
                        <div className="text-sm text-muted-foreground">{scheme.processingTime}</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium mb-3">Key Benefits</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {scheme.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <h4 className="font-medium mb-3">Eligibility Criteria</h4>
                      <div className="flex flex-wrap gap-2">
                        {scheme.eligibility.map((criteria, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {criteria}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">Apply Now</Button>
                      <Button variant="outline">Get AI Help</Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="border-blue-200/50 dark:border-blue-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  PMEGP Application Status
                </CardTitle>
                <CardDescription>Application ID: PMEGP2024/MH/12345</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Application Progress</span>
                    <span>
                      {Math.round((applicationTracker.pmegp.stage / applicationTracker.pmegp.totalStages) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(applicationTracker.pmegp.stage / applicationTracker.pmegp.totalStages) * 100}
                    className="h-3"
                  />
                </div>

                <div className="space-y-4">
                  {applicationTracker.pmegp.stages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          stage.completed
                            ? "bg-green-100 dark:bg-green-900/50"
                            : index === applicationTracker.pmegp.stage
                              ? "bg-blue-100 dark:bg-blue-900/50"
                              : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        {stage.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : index === applicationTracker.pmegp.stage ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{stage.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {stage.completed && stage.date && `Completed on ${stage.date}`}
                          {!stage.completed && stage.scheduled && `Scheduled for ${stage.scheduled}`}
                          {!stage.completed && !stage.scheduled && "Pending"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Action */}
                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    Next Action Required
                  </h4>
                  <p className="text-sm mb-3">{applicationTracker.pmegp.nextAction}</p>

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">AI Preparation Tips:</h5>
                    {applicationTracker.pmegp.aiTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Contact Bank</Button>
                  <Button variant="outline">Get AI Interview Prep</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* All Schemes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "PMEGP", category: "Manufacturing", maxAmount: "25L", match: 95 },
                { name: "Mudra Loan", category: "Service", maxAmount: "10L", match: 88 },
                { name: "Stand-Up India", category: "Mixed", maxAmount: "1Cr", match: 82 },
                { name: "MSME Loan", category: "Manufacturing", maxAmount: "50L", match: 75 },
                { name: "Startup India", category: "Technology", maxAmount: "Variable", match: 65 },
                { name: "Women Entrepreneurship", category: "Service", maxAmount: "15L", match: 90 },
              ].map((scheme, index) => (
                <Card
                  key={index}
                  className="border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-600" />
                        {scheme.name}
                      </span>
                      <Badge
                        className={`${scheme.match >= 90 ? "bg-green-100 text-green-800" : scheme.match >= 80 ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {scheme.match}%
                      </Badge>
                    </CardTitle>
                    <CardDescription>{scheme.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">Max Amount</span>
                      <span className="font-semibold">₹{scheme.maxAmount}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-purple-200/50 dark:border-purple-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Application Assistant
                  </CardTitle>
                  <CardDescription>Get personalized help with your applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg">
                    <h4 className="font-medium mb-2">Document Checklist Generator</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI creates a personalized document checklist based on your chosen scheme
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Generate Checklist
                    </Button>
                  </div>
                  <div className="p-4 bg-pink-50/50 dark:bg-pink-950/20 rounded-lg">
                    <h4 className="font-medium mb-2">Application Form Helper</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Step-by-step guidance for filling complex application forms
                    </p>
                    <Button size="sm" variant="outline">
                      Get Help
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200/50 dark:border-green-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    Support & Contacts
                  </CardTitle>
                  <CardDescription>Get human help when you need it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-medium mb-2">Local PMEGP Office</h4>
                    <p className="text-sm text-muted-foreground mb-2">Maharashtra State Office</p>
                    <p className="text-sm">📞 022-2345-6789</p>
                    <p className="text-sm">📧 pmegp.mh@gov.in</p>
                  </div>
                  <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-medium mb-2">Nearest Bank Branch</h4>
                    <p className="text-sm text-muted-foreground mb-2">State Bank of India - Rural Branch</p>
                    <p className="text-sm">📞 0240-123-4567</p>
                    <p className="text-sm">📍 2.5 km from your location</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>AI-powered answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Q: How long does PMEGP approval take?</h4>
                    <p className="text-sm text-muted-foreground">
                      A: Typically 45-60 days. AI analysis shows 78% of applications in your area get approved within
                      this timeframe.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Q: Can I apply for multiple schemes simultaneously?</h4>
                    <p className="text-sm text-muted-foreground">
                      A: Yes, but ensure you meet eligibility criteria for each. AI recommends focusing on 1-2 schemes
                      for better success rates.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Q: What if my application gets rejected?</h4>
                    <p className="text-sm text-muted-foreground">
                      A: You can reapply after addressing the rejection reasons. AI can help identify and fix common
                      issues.
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Ask AI More Questions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
