"use client"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
// import { Impact } from "@/components/impact"
import { CTA } from "@/components/cta"
import { useState, useEffect } from "react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      {typeof window !== "undefined" && window.innerWidth >= 768 && <HowItWorks />}
      {/* <Impact /> */}
      <CTA />
    </main>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}
