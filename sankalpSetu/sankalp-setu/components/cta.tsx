const FIRST_CTA= "Ready to Transform Your"
const SECOND_CTA= "Business Idea?"
const THIRD_CTA= "Join thousands of women entrepreneurs who are building successful businesses with AI-powered guidance"
const FOURTH_CTA="Submit Your Idea"
const FIFTH_CTA= "Explore Platform"
const SIXTH_CTA= "Available in different Indian languages • Privacy-first approach • No technical skills required"
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
                  {FIRST_CTA}{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {SECOND_CTA}
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  {THIRD_CTA}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/submit-idea">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Lightbulb className="mr-2 h-5 w-5" />
                    {FOURTH_CTA}
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
                    {FIFTH_CTA}
                  </Button>
                </Link>
              </div>

              <div className="pt-8 border-t border-purple-200/50 dark:border-purple-800/50">
                <p className="text-sm text-muted-foreground">
                  {SIXTH_CTA}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
