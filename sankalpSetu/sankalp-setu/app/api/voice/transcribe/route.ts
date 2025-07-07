import { type NextRequest, NextResponse } from "next/server"
import { AIService } from "@/lib/api"

// POST /api/voice/transcribe
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File
    const language = formData.get("language") as string

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convert File to Blob for AI processing
    const audioBlob = new Blob([await audioFile.arrayBuffer()], {
      type: audioFile.type,
    })

    // Process voice input with AI
    const transcription = await AIService.processVoiceInput(audioBlob, language)

    return NextResponse.json({
      success: true,
      transcription: transcription.transcription,
    })
  } catch (error) {
    console.error("Voice transcription error:", error)
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
  }
}
