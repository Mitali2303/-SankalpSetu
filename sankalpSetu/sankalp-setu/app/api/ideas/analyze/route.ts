import { type NextRequest, NextResponse } from "next/server"
import { RecommenderService, DatabaseService } from "@/lib/api"

// POST /api/ideas/analyze
export async function POST(request: NextRequest) {
  try {
    const { ideaText, language, userId, category, location } = await request.json()

    // Get user profile for better prediction
    const userProfile = await DatabaseService.getUserById(userId)

    // Prepare data for your custom recommender model
    const ideaData = {
      description: ideaText,
      category: category || "general",
      location: location || userProfile.state,
      userProfile,
    }

    // Get prediction from your custom recommender model
    const prediction = await RecommenderService.predictIdeaSuccess(ideaData)

    // Save the business idea with prediction results
    const savedIdea = await DatabaseService.saveBusinessIdeaWithPrediction({
      userId,
      title: extractTitleFromIdea(ideaText),
      description: ideaText,
      language,
      category,
      location,
      predictionResult: prediction,
    })

    return NextResponse.json({
      success: true,
      ideaId: savedIdea.id,
      prediction: {
        score: prediction.feasibility_score,
        successProbability: prediction.success_probability,
        riskLevel: prediction.risk_level,
        confidence: prediction.confidence,
        strengths: prediction.key_factors.filter((f: string) => f.includes("positive") || f.includes("strength")),
        suggestions: prediction.recommendations,
        marketInsights: prediction.market_insights,
        similarCases: prediction.similar_cases,
      },
    })
  } catch (error) {
    console.error("Idea analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze idea" }, { status: 500 })
  }
}

function extractTitleFromIdea(ideaText: string): string {
  // Simple title extraction - you can enhance this
  return ideaText.substring(0, 50) + "..."
}
