import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService, AIService } from "@/lib/api"

// PUT /api/learning/progress
export async function PUT(request: NextRequest) {
  try {
    const { userId, moduleId, progress } = await request.json()

    // Update progress in database
    await DatabaseService.updateLearningProgress(userId, moduleId, progress)

    // If module completed, generate next recommendations
    if (progress === 100) {
      const userProfile = await DatabaseService.getUserById(userId)
      const userIdeas = await DatabaseService.getUserIdeas(userId)

      // Get AI recommendations for next modules
      const recommendations = await AIService.generateLearningPath(
        userIdeas[0]?.description || "",
        [], // current skills - get from user profile
        [], // goals - get from user profile
      )

      return NextResponse.json({
        success: true,
        recommendations,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Progress update error:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}
