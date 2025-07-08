import { NextRequest, NextResponse } from "next/server"

const DIGILOCKER_TOKEN_URL = "https://digilocker.meripehchaan.gov.in/public/oauth2/1/token"
const DIGILOCKER_PROFILE_URL = "https://digilocker.meripehchaan.gov.in/public/oauth2/1/user/profile"
const CLIENT_ID = "sankalp-setu-app" // Replace with your actual DigiLocker client ID
const CLIENT_SECRET = "your-client-secret" // Replace with your actual DigiLocker client secret
const REDIRECT_URI = "http://localhost:3000/digilocker/callback" // Replace with your actual redirect URI

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    
    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 })
    }

    // TODO: Replace with real DigiLocker API call
    // For now, using mock data for development
    
    // Step 1: Exchange code for access token
    // const tokenResponse = await fetch(DIGILOCKER_TOKEN_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams({
    //     grant_type: "authorization_code",
    //     code: code,
    //     client_id: CLIENT_ID,
    //     client_secret: CLIENT_SECRET,
    //     redirect_uri: REDIRECT_URI
    //   })
    // })
    
    // if (!tokenResponse.ok) {
    //   throw new Error("Failed to exchange code for token")
    // }
    
    // const tokenData = await tokenResponse.json()
    // const accessToken = tokenData.access_token
    
    // Step 2: Use access token to fetch user profile
    // const profileResponse = await fetch(DIGILOCKER_PROFILE_URL, {
    //   headers: { "Authorization": `Bearer ${accessToken}` }
    // })
    
    // if (!profileResponse.ok) {
    //   throw new Error("Failed to fetch user profile")
    // }
    
    // const profileData = await profileResponse.json()

    // Mock response for demo - replace with real profile data
    const profile = {
      fullName: "Amit Kumar",
      dob: "1995-01-01",
      gender: "Male",
      aadhaar: "XXXX-XXXX-1234",
      mobile: "9876543210",
      email: "amit@example.com",
      education: "Graduate",
      location: "Delhi / New Delhi / 110001",
      address: "123, Main Street, New Delhi, India"
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("DigiLocker exchange error:", error)
    return NextResponse.json(
      { error: "Failed to connect with DigiLocker. Please try again." },
      { status: 500 }
    )
  }
} 