import { Button } from "@/components/ui/button"
import { Mic, MessageSquare, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="text-foreground">Sankalp</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Setu</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
                Empowering rural women entrepreneurs with AI-powered business guidance in their native language
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/submit-idea">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Submit Your Idea
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  <Users className="mr-2 h-5 w-5" />
                  Explore Dashboard
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-muted-foreground">Ideas Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">15</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-muted-foreground">Schemes Matched</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                    <Mic className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Voice Input</div>
                    <div className="text-sm text-muted-foreground">Speak in your language</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-full">
                    <MessageSquare className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-medium">AI Analysis</div>
                    <div className="text-sm text-muted-foreground">Get instant feedback</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Scheme Matching</div>
                    <div className="text-sm text-muted-foreground">Find government support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
