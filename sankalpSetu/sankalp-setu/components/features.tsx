"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Brain, Globe, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Features() {
  const router = useRouter();

  const features = [
    {
      icon: Users,
      title: "ask for help",
      description: "Connect with trusted NGOs for support, collaboration, or contribution.",
      color: "text-purple-600",
      href: "/ask-for-help",
    },
    {
      icon: Users,
      title: "Register Your NGO",
      description: "Register your NGO to join our trusted network and help more people.",
      color: "text-purple-600",
      href: "/ngo/register",
    },
    {
      icon: Brain,
      title: "AI-Mentor",
      description: "Submit your idea, get AI insights, and generate a business plan-all in one place.",
      color: "text-pink-600",
      href: "/ai-mentor",
    },
    {
      icon: Globe,
      title: "Government Scheme Matching",
      description: "Discover relevant schemes like PMEGP and Mudra loans with simple explanations",
      color: "text-pink-600",
      href: "/schemes",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data stays secure within the app with no third-party sharing",
      color: "text-purple-600",
      onClick: () => {
        router.push("/digilocker");
      },
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "Access free learning modules for entrepreneurship and financial literacy",
      color: "text-pink-600",
      href: "/learning",
    },
  ]

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
          {features.map((feature, index) => {
            const card = (
              <Card
                key={index}
                className="border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={feature.onClick}
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
            );
            if (feature.href) {
              return (
                <Link href={feature.href} key={index} passHref legacyBehavior>
                  <a style={{ textDecoration: "none" }}>{card}</a>
                </Link>
              );
            }
            return card;
          })}
        </div>
      </div>
    </section>
  )
}
