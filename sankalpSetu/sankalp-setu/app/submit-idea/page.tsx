"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Send, Languages, Lightbulb, Brain, FileText } from "lucide-react"

export default function SubmitIdeaPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [idea, setIdea] = useState("")
  const [language, setLanguage] = useState("english")
  const [analysisStep, setAnalysisStep] = useState(0)

  const handleSubmit = () => {
    if (idea.trim()) {
      setAnalysisStep(1)
      // Simulate AI analysis progress
      setTimeout(() => setAnalysisStep(2), 1500)
      setTimeout(() => setAnalysisStep(3), 3000)
    }
  }

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Submit Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Business Idea
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Share your idea in your native language and get AI-powered feedback
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-purple-200/50 dark:border-purple-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                Your Business Idea
              </CardTitle>
              <CardDescription>Describe your business idea in detail. You can type or use voice input.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          {lang.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Describe Your Idea</label>
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Voice Input
                      </>
                    )}
                  </Button>
                </div>

                {isRecording && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                      Recording in {languages.find((l) => l.value === language)?.label}...
                    </div>
                  </div>
                )}

                <Textarea
                  placeholder="मैं अपने गांव में महिलाओं के लिए सिलाई का काम शुरू करना चाहती हूं... (I want to start a tailoring business for women in my village...)"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!idea.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Analyze My Idea
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {analysisStep > 0 && (
              <Card className="border-purple-200/50 dark:border-purple-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-pink-600" />
                    AI Analysis Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing your idea...</span>
                      <span>{Math.min(analysisStep * 33, 100)}%</span>
                    </div>
                    <Progress value={Math.min(analysisStep * 33, 100)} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div
                      className={`flex items-center gap-2 ${analysisStep >= 1 ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${analysisStep >= 1 ? "bg-green-600" : "bg-gray-300"}`} />
                      Language processing and translation
                    </div>
                    <div
                      className={`flex items-center gap-2 ${analysisStep >= 2 ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${analysisStep >= 2 ? "bg-green-600" : "bg-gray-300"}`} />
                      Feasibility scoring and analysis
                    </div>
                    <div
                      className={`flex items-center gap-2 ${analysisStep >= 3 ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${analysisStep >= 3 ? "bg-green-600" : "bg-gray-300"}`} />
                      Generating recommendations
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisStep >= 3 && (
              <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Analysis Complete!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Feasibility Score</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                        8.5/10
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-green-700 dark:text-green-400">Key Strengths:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Strong local market demand</li>
                        <li>• Low initial investment required</li>
                        <li>• Scalable business model</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-orange-700 dark:text-orange-400">Suggestions:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Consider group formation for bulk orders</li>
                        <li>• Explore online marketing channels</li>
                        <li>• Plan for seasonal demand variations</li>
                      </ul>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    View Detailed Report & Schemes
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-lg">Tips for Better Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>• Include details about your target customers</div>
                <div>• Mention your skills and experience</div>
                <div>• Describe your local market conditions</div>
                <div>• Share your investment capacity</div>
                <div>• Mention any existing resources you have</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
