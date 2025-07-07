"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card className="border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Ready to Transform Your{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Business Idea?
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of women entrepreneurs who are building successful businesses with AI-powered guidance
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/submit-idea">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Submit Your Idea
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-200 dark:border-purple-800 bg-transparent"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Explore Platform
                  </Button>
                </Link>
              </div>

              <div className="pt-8 border-t border-purple-200/50 dark:border-purple-800/50">
                <p className="text-sm text-muted-foreground">
                  Available in diffrent Indian languages • Privacy-first approach • No technical skills required
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
