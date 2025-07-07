import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mic, Brain, FileText, Award } from "lucide-react"

const steps = [
  {
    icon: Mic,
    title: "Submit Your Idea",
    description: "Record or type your business idea in your native language",
    color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Get instant feedback, scoring, and improvement suggestions",
    color: "bg-pink-100 dark:bg-pink-900/50 text-pink-600",
  },
  {
    icon: FileText,
    title: "Business Plan",
    description: "Receive a structured plan with targets and profit projections",
    color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600",
  },
  {
    icon: Award,
    title: "Scheme Matching",
    description: "Discover relevant government schemes and funding opportunities",
    color: "bg-pink-100 dark:bg-pink-900/50 text-pink-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">It Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to transform your business ideas into reality
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`p-4 w-fit mx-auto rounded-full ${step.color} mb-4`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-purple-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
