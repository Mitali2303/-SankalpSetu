import { type NextRequest, NextResponse } from "next/server"
import { AIService, DatabaseService } from "@/lib/api"

// POST /api/chat
export async function POST(request: NextRequest) {
  try {
    const { message, userId, context } = await request.json()

    // Get user context for better AI responses
    const userProfile = await DatabaseService.getUserById(userId)
    const userIdeas = await DatabaseService.getUserIdeas(userId)

    const fullContext = {
      ...context,
      userProfile,
      userIdeas,
    }

    // Get AI response
    const aiResponse = await AIService.getChatResponse(message, fullContext)

    // Save chat message to database
    await DatabaseService.saveChatMessage({
      userId,
      message,
      response: aiResponse.response,
      context: fullContext,
    })

    return NextResponse.json({
      success: true,
      response: aiResponse.response,
      suggestions: aiResponse.suggestions,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
