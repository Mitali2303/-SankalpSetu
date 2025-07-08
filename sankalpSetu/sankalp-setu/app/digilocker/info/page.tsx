"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function DigiLockerInfo() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      setError("Please login first to view your DigiLocker information.")
      setLoading(false)
      return
    }
    const user = JSON.parse(userData)

    // Fetch saved profile
    fetch(`/api/digilocker/save?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfile(data.profile)
        } else {
          setError("No DigiLocker profile found. Please connect your DigiLocker account first.")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load your DigiLocker information.")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg">Loading your information...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {error}
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push("/digilocker")} 
              className="w-full"
            >
              Connect DigiLocker
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto w-full">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">DigiLocker Connected Successfully!</h1>
            <p className="text-muted-foreground">
              Your DigiLocker account has been securely connected to Sankalp Setu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Personal Information</h2>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg">{profile.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <p className="text-lg">{profile.dob}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <p className="text-lg">{profile.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Aadhaar Number</label>
                <p className="text-lg">{profile.aadhaar}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Contact Information</h2>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mobile Number</label>
                <p className="text-lg">{profile.mobile}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email ID</label>
                <p className="text-lg">{profile.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="text-lg">{profile.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-lg">{profile.address}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold mb-2">Educational Information</h2>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Qualification</label>
              <p className="text-lg">{profile.education}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button 
              onClick={() => router.push("/dashboard")} 
              className="flex-1"
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => router.push("/digilocker")} 
              variant="outline"
              className="flex-1"
            >
              Reconnect DigiLocker
            </Button>
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <h3 className="text-sm font-semibold mb-2 text-green-800 dark:text-green-200">✅ What's Next?</h3>
            <p className="text-xs text-green-700 dark:text-green-300">
              Your DigiLocker information is now available for:
              <br />• Automatic form filling for government schemes
              <br />• Document verification
              <br />• Eligibility checking
              <br />• Personalized recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 