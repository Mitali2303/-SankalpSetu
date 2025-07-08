import { NextRequest, NextResponse } from "next/server"

// In-memory store for demo - replace with database in production
let savedProfiles: any[] = []

export async function POST(req: NextRequest) {
  try {
    const { userId, profile } = await req.json()
    
    if (!userId || !profile) {
      return NextResponse.json(
        { error: "User ID and profile data are required" },
        { status: 400 }
      )
    }

    // TODO: Replace with real DB save logic
    // Example: await db.digilockerProfile.upsert({ userId, profile })
    savedProfiles = savedProfiles.filter((p) => p.userId !== userId)
    savedProfiles.push({ userId, profile, createdAt: new Date().toISOString() })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DigiLocker save error:", error)
    return NextResponse.json(
      { error: "Failed to save DigiLocker information" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    // TODO: Replace with real DB query
    // Example: const profile = await db.digilockerProfile.findUnique({ where: { userId } })
    const found = savedProfiles.find((p) => p.userId === userId)
    
    return NextResponse.json({ profile: found?.profile || null })
  } catch (error) {
    console.error("DigiLocker get error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve DigiLocker information" },
      { status: 500 }
    )
  }
} 