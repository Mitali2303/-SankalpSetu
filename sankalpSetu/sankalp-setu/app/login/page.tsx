"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Phone, Mail, MapPin, Languages, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState("phone")
  const [tab, setTab] = useState("login")

  // Login state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    remember: false
  })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginMessage, setLoginMessage] = useState<string | null>(null)

  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    language: "hindi",
    state: "",
    agreeTerms: false,
    updates: true,
  })
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupMessage, setSignupMessage] = useState<string | null>(null)
  const [signupError, setSignupError] = useState<string | null>(null)

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "odia", label: "ଓଡ଼ିଆ (Odia)" },
  ]

  const states = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)
    setLoginMessage(null)

    if (!loginData.username || !loginData.password) {
      setLoginError("Please fill in all fields")
      setLoginLoading(false)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }
      setLoginMessage("Login successful! Redirecting...")
      setLoginError(null)
      setTimeout(() => router.push("/dashboard"), 1000)
    } catch (error: any) {
      setLoginError(error.message || "Login failed. Please try again.")
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setSignupLoading(true)
    setSignupMessage(null)
    setSignupError(null)

    // Basic validation
    if (!signupData.firstName || !signupData.lastName || !signupData.phone || !signupData.password) {
      setSignupError("Please fill all required fields.")
      setSignupLoading(false)
      return
    }
    if (!signupData.agreeTerms) {
      setSignupError("You must agree to the Terms of Service.")
      setSignupLoading(false)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signupData.phone,
          password: signupData.password,
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          email: signupData.email || "",
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }
      setSignupMessage("Account created successfully! You can now log in.")
      setSignupError(null)
      setSignupData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        language: "hindi",
        state: "",
        agreeTerms: false,
        updates: true,
      })
      // Optionally redirect to login
      // router.push("/login")
    } catch (error: any) {
      setSignupError(error.message || "Registration failed. Please try again.")
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-foreground">Sankalp</span>{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Setu</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Entrepreneurial Journey
            </span>
          </h1>
          <p className="text-muted-foreground">
            Join thousands of women entrepreneurs transforming their ideas into successful businesses
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Sign in to continue your entrepreneurial journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Login Method</Label>
                      <Select value={loginMethod} onValueChange={setLoginMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone Number
                            </div>
                          </SelectItem>
                          <SelectItem value="email">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Address
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-input">{loginMethod === "phone" ? "Phone Number" : "Email Address"}</Label>
                      <Input
                        id="login-input"
                        type={loginMethod === "phone" ? "tel" : "email"}
                        placeholder={loginMethod === "phone" ? "+91 98765 43210" : "your@email.com"}
                        value={loginData.username}
                        onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" checked={loginData.remember} onCheckedChange={val => setLoginData({ ...loginData, remember: !!val })} />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-sm" type="button">
                        Forgot password?
                      </Button>
                    </div>
                  </div>

                  {loginError && <div className="text-red-600 text-sm mb-2">{loginError}</div>}
                  {loginMessage && <div className="text-green-600 text-sm mb-2">{loginMessage}</div>}

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" disabled={loginLoading}>
                    {loginLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Button variant="link" className="p-0 h-auto" type="button" onClick={() => setTab("signup")}>Sign up here</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>Start your entrepreneurial journey with AI-powered guidance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSignup}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Sanjaya" value={signupData.firstName} onChange={e => setSignupData({ ...signupData, firstName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Sharma" value={signupData.lastName} onChange={e => setSignupData({ ...signupData, lastName: e.target.value })} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" value={signupData.phone} onChange={e => setSignupData({ ...signupData, phone: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <Input id="email" type="email" placeholder="sanjaya@example.com" value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Language</Label>
                      <Select value={signupData.language} onValueChange={val => setSignupData({ ...signupData, language: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              <div className="flex items-center gap-2">
                                <Languages className="h-4 w-4" />
                                {lang.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select value={signupData.state} onValueChange={val => setSignupData({ ...signupData, state: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}> {/* value is slug */}
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {state}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Create Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" checked={signupData.agreeTerms} onCheckedChange={val => setSignupData({ ...signupData, agreeTerms: !!val })} />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Button variant="link" className="p-0 h-auto text-sm" type="button">
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button variant="link" className="p-0 h-auto text-sm" type="button">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="updates" checked={signupData.updates} onCheckedChange={val => setSignupData({ ...signupData, updates: !!val })} />
                      <Label htmlFor="updates" className="text-sm">
                        Send me updates about new features and learning opportunities
                      </Label>
                    </div>
                  </div>

                  {signupError && <div className="text-red-600 text-sm mb-2">{signupError}</div>}
                  {signupMessage && <div className="text-green-600 text-sm mb-2">{signupMessage}</div>}

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" disabled={signupLoading}>
                    {signupLoading ? "Creating..." : "Create Account"}
                  </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto" type="button" onClick={() => setTab("login")}>Sign in here</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border border-purple-200/50 dark:border-purple-800/50">
            <h3 className="font-semibold mb-2">🌟 What you'll get:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>• AI-powered business analysis</div>
              <div>• Personalized learning modules</div>
              <div>• Government scheme matching</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
