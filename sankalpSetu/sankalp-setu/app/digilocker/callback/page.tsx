"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function DigiLockerCallback() {
  const router = useRouter()
  const params = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [user, setUser] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [saveError, setSaveError] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      setError("Please login first to access DigiLocker integration.")
      setLoading(false)
      return
    }
    setUser(JSON.parse(userData))

    // Get code from URL and fetch DigiLocker data
    const code = params.get("code")
    if (code) {
      fetch("/api/digilocker/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to exchange code for token")
          }
          return res.json()
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
          setProfile(data.profile)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch DigiLocker data. Please try again.")
          setLoading(false)
        })
    } else {
      // Check for error parameters from DigiLocker
      const errorParam = params.get("error")
      const errorDesc = params.get("error_description")
      if (errorParam) {
        setError(errorDesc || errorParam || "DigiLocker authorization failed. Please try again.")
        setLoading(false)
      } else {
        setError("No authorization code found. Please try logging in with DigiLocker again.")
        setLoading(false)
      }
    }
  }, [params, router])

  function handlePasswordCheck(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) {
      setPasswordError("Password is required")
      return
    }
    
    setPasswordError("")
    fetch("/api/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, password }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to verify password")
        }
        return res.json()
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        if (data.valid) {
          setShowPassword(false)
          setPasswordError("")
        } else {
          setPasswordError("Incorrect password. Please try again.")
        }
      })
      .catch((err) => {
        setPasswordError(err.message || "Failed to verify password. Please try again.")
      })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSaveError("")
    
    fetch("/api/digilocker/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, profile }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to save DigiLocker data")
        }
        return res.json()
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        router.push("/digilocker/info")
      })
      .catch((err) => {
        setSaveError(err.message || "Failed to save your DigiLocker information. Please try again.")
        setSubmitting(false)
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg">Connecting to DigiLocker...</p>
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
            <h2 className="text-xl font-bold mb-4 text-center">DigiLocker Connection</h2>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {error}
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              <Button 
                onClick={() => router.push("/digilocker")} 
                className="w-full"
              >
                Try Again
              </Button>
              <Button 
                onClick={() => router.push("/dashboard")} 
                variant="outline"
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-4 text-center">Verify Your Password</h2>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Please enter your password to securely access your DigiLocker data.
            </p>
            <form onSubmit={handlePasswordCheck} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500 focus:border-red-500" : ""}
                />
                {passwordError && (
                  <div className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {passwordError}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <Button type="submit" className="w-full">
                  Verify Password
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => router.push("/digilocker")}
                  className="w-full"
                >
                  Back to DigiLocker
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg mx-auto w-full">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-4 text-center">Your DigiLocker Details</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Review and edit your information before saving.
          </p>
          
          {saveError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {saveError}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input 
                value={profile?.fullName || ""} 
                onChange={e => setProfile({ ...profile, fullName: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input 
                value={profile?.dob || ""} 
                onChange={e => setProfile({ ...profile, dob: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <Input 
                value={profile?.gender || ""} 
                onChange={e => setProfile({ ...profile, gender: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Aadhaar Number</label>
              <Input 
                value={profile?.aadhaar || ""} 
                onChange={e => setProfile({ ...profile, aadhaar: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mobile Number</label>
              <Input 
                value={profile?.mobile || ""} 
                onChange={e => setProfile({ ...profile, mobile: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email ID</label>
              <Input 
                value={profile?.email || ""} 
                onChange={e => setProfile({ ...profile, email: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Educational Qualification</label>
              <Input 
                value={profile?.education || ""} 
                onChange={e => setProfile({ ...profile, education: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State / City / Pincode</label>
              <Input 
                value={profile?.location || ""} 
                onChange={e => setProfile({ ...profile, location: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input 
                value={profile?.address || ""} 
                onChange={e => setProfile({ ...profile, address: e.target.value })} 
              />
            </div>
            <div className="space-y-3 mt-6">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save DigiLocker Information"
                )}
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => router.push("/digilocker")}
                className="w-full"
              >
                Back to DigiLocker
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 