import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Brain, FileText, Globe, Shield, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Voice & Text Input",
    description: "Submit your business ideas through voice or text in your native language",
    color: "text-purple-600",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Get intelligent feedback and feasibility scoring for your business ideas",
    color: "text-pink-600",
  },
  {
    icon: FileText,
    title: "Business Plan Generator",
    description: "Receive structured business plans with targets, profits, and risk analysis",
    color: "text-purple-600",
  },
  {
    icon: Globe,
    title: "Government Scheme Matching",
    description: "Discover relevant schemes like PMEGP and Mudra loans with simple explanations",
    color: "text-pink-600",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays secure within the app with no third-party sharing",
    color: "text-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description: "Access free learning modules for entrepreneurship and financial literacy",
    color: "text-pink-600",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-purple-50/10 dark:to-purple-950/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Comprehensive Support for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Women Entrepreneurs
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your business ideas into successful ventures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className={`p-3 w-fit rounded-full bg-purple-100 dark:bg-purple-900/50 mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
