"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"
import { differenceInYears, format, subYears } from "date-fns"

const DIGILOCKER_AUTH_URL = "https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize"
const CLIENT_ID = "sankalp-setu-app" // Replace with your actual DigiLocker client ID
const REDIRECT_URI = "http://localhost:3000/digilocker/custom-form" // This page will handle the callback
const STATE = "xyz"

export default function DigiLockerCustomForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get("next") ;
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    aadhaar: "",
    mobile: "",
    email: "",
    education: "",
    location: "",
    address: ""
  })
  const [user, setUser] = useState<any>(null);

  const educationOptions = [
    { value: "10th", label: "10th Pass" },
    { value: "12th", label: "12th Pass" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Post Graduate" },
    { value: "other", label: "Other" },
  ]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<any>({})
  const [isReadOnly, setIsReadOnly] = useState(false)

  // Handle DigiLocker callback
  useEffect(() => {
    // Check Google user from localStorage (simulate auth)
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    }
    const code = searchParams.get("code")
    if (code) {
      setLoading(true)
      setError("")
      fetch("/api/digilocker/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error)
          } else if (data.profile) {
            setForm({ ...form, ...data.profile })
            setSuccess("DigiLocker data fetched and auto-filled!")
          }
          setLoading(false)
        })
        .catch(() => {
          setError("Failed to fetch DigiLocker data. Please try again.")
          setLoading(false)
        })
    }
    // Auth check
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        // Don't redirect, just show sign-in
        setUser(null);
        return;
      }
      const user = JSON.parse(userData);
      const userKey = user.email ? `digilocker_profile_${user.email}` : null;
      if (userKey) {
        const profileData = localStorage.getItem(userKey);
        if (profileData) {
          setForm(JSON.parse(profileData));
          setIsReadOnly(true);
        } else {
          setIsReadOnly(false);
        }
      }
    }
    // eslint-disable-next-line
  }, [searchParams])

  function handleLogin() {
    try {
      const url = `${DIGILOCKER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}`
      window.location.href = url
    } catch (err) {
      setError("Failed to redirect to DigiLocker. Please try again.")
    }
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field if valid
    let err = { ...fieldErrors };
    if (name === "dob") {
      if (value && differenceInYears(new Date(), new Date(value)) >= 15) delete err.dob;
    } else if (name === "aadhaar") {
      if (/^[0-9]{12}$/.test(value)) delete err.aadhaar;
    } else if (name === "mobile") {
      if (/^[0-9]{10}$/.test(value)) delete err.mobile;
    } else if (name === "email") {
      if (/^\S+@\S+\.\S+$/.test(value)) delete err.email;
    } else if (name === "location") {
      if (value && !/[0-9]+,[ ]*[0-9]+/.test(value)) delete err.location;
    } else {
      if (value.trim()) delete err[name];
    }
    setFieldErrors(err);
  }

  function validateForm() {
    const errors: any = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.dob) errors.dob = "Date of birth is required";
    if (!form.gender) errors.gender = "Gender is required";
    if (!form.aadhaar || !/^[0-9]{12}$/.test(form.aadhaar)) errors.aadhaar = "Aadhaar must be 12 digits";
    if (!form.mobile || !/^[0-9]{10}$/.test(form.mobile)) errors.mobile = "Mobile number must be 10 digits";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Valid email is required";
    if (!form.education) errors.education = "Education is required";
    if (!form.location) errors.location = "Location is required. Please use the location button.";
    if (!form.address.trim()) errors.address = "Address is required";
    return errors;
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    setSuccess("")
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSubmitting(false);
      return;
    }
    // Save profile for current user only
    let userKey = null;
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        userKey = user.email ? `digilocker_profile_${user.email}` : null;
      }
    }
    fetch("/api/digilocker/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "demo-user", profile: form }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setSuccess("Profile saved successfully!")
          if (userKey) {
            localStorage.setItem(userKey, JSON.stringify(form));
          }
          setIsReadOnly(true);
          setTimeout(() => router.push("/"), 1200); // Redirect to home after 1.2s
        }
        setSubmitting(false)
      })
      .catch(() => {
        setError("Failed to save your information. Please try again.")
        setSubmitting(false)
      })
  }

  // Masking helpers
  function maskAadhaar(aadhaar: string) {
    if (!aadhaar) return "";
    return "XXXX-XXXX-" + aadhaar.slice(-4);
  }
  function maskPhone(phone: string) {
    if (!phone) return "";
    return "XXXXXX" + phone.slice(-4);
  }
  function maskEmail(email: string) {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    return user[0] + "****@" + domain;
  }

  return (
    <>
      {/* Remove Google Auth Button and sign-in message */}
      {/* Only show the form and profile functionality */}
      {(!isReadOnly) && (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
          <div className="container mx-auto px-4 max-w-xl">
            <Card className="border-purple-200/50 dark:border-purple-800/50">
              <CardContent className="p-8 space-y-8">
                <h1 className="text-3xl font-bold text-center">Custom DigiLocker Form</h1>
                {success && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-center font-semibold">
                    {success}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" disabled={isReadOnly} readOnly={isReadOnly} />
                      {fieldErrors.fullName && <div className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth</label>
                      <Input
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        max={format(subYears(new Date(), 15), "yyyy-MM-dd")}
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                      />
                      {fieldErrors.dob && <div className="text-red-500 text-xs mt-1">{fieldErrors.dob}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <Select value={form.gender} onValueChange={val => setForm({ ...form, gender: val })} disabled={isReadOnly}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldErrors.gender && <div className="text-red-500 text-xs mt-1">{fieldErrors.gender}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
                      <Input name="aadhaar" type="number" value={isReadOnly ? maskAadhaar(form.aadhaar) : form.aadhaar} onChange={handleChange} placeholder="Enter your Aadhaar number" disabled={isReadOnly} readOnly={isReadOnly} maxLength={12} pattern="[0-9]{12}" />
                      {fieldErrors.aadhaar && <div className="text-red-500 text-xs mt-1">{fieldErrors.aadhaar}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mobile Number</label>
                      <Input name="mobile" type="number" value={isReadOnly ? maskPhone(form.mobile) : form.mobile} onChange={handleChange} disabled={isReadOnly} readOnly={isReadOnly} maxLength={10} pattern="[0-9]{10}" />
                      {fieldErrors.mobile && <div className="text-red-500 text-xs mt-1">{fieldErrors.mobile}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email ID</label>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} disabled={isReadOnly} readOnly={isReadOnly} pattern="^\S+@\S+\.\S+$" />
                      {fieldErrors.email && <div className="text-red-500 text-xs mt-1">{fieldErrors.email}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Educational Qualification</label>
                      <Select value={form.education}  onValueChange={val => setForm({ ...form, education: val })} disabled={isReadOnly}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldErrors.education && <div className="text-red-500 text-xs mt-1">{fieldErrors.education}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <div className="flex gap-2 items-center">
                        <Input
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="Enter your location or use the icon"
                          disabled={isReadOnly}
                          readOnly={isReadOnly}
                        />
                        <span
                          className="cursor-pointer p-2 rounded bg-background border border-purple-200/50 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition"
                          title="Get current location"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                async (position) => {
                                  const { latitude, longitude } = position.coords;
                                  try {
                                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                                    const data = await res.json();
                                    setForm({ ...form, location: data.display_name || "" });
                                    let err = { ...fieldErrors };
                                    if (data.display_name) delete err.location;
                                    setFieldErrors(err);
                                  } catch {
                                    setError("Unable to get address from location");
                                  }
                                },
                                (error) => {
                                  setError("Unable to get location");
                                }
                              );
                            }
                          }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <MapPin className="h-5 w-5 text-purple-600" />
                        </span>
                      </div>
                      {fieldErrors.location && <div className="text-red-500 text-xs mt-1">{fieldErrors.location}</div>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <Input name="address" value={form.address} onChange={handleChange} disabled={isReadOnly} readOnly={isReadOnly} />
                      {fieldErrors.address && <div className="text-red-500 text-xs mt-1">{fieldErrors.address}</div>}
                    </div>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="font-medium">{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert variant="default">
                      <Loader2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="font-medium">{success}</AlertDescription>
                    </Alert>
                  )}
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <Button type="submit" className="flex-1" disabled={submitting || isReadOnly}>
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Save Profile
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="text-sm text-muted-foreground w-full text-left focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition group py-2 px-1 mt-1"
                    role="button"
                    tabIndex={0}
                    aria-label="Connect DigiLocker via Privacy First"
                  >
                    <span className="font-semibold text-purple-600 group-hover:underline">Privacy First:</span> Your data stays secure within the app with no third-party sharing.
                  </button>
                </form>
                {loading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                    <span className="ml-2">Fetching DigiLocker data...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
      {/* If signed in and read-only, show profile card */}
      {isReadOnly && (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="border rounded-xl border-purple-200/50 dark:border-purple-800/50 bg-background p-8 text-center space-y-8 shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Your DigiLocker Profile</h1>
              <div className="text-left space-y-2 text-base">
                <div><b>Full Name:</b> {form.fullName}</div>
                <div><b>Date of Birth:</b> {form.dob}</div>
                <div><b>Gender:</b> {form.gender}</div>
                <div><b>Aadhaar Number:</b> {maskAadhaar(form.aadhaar)}</div>
                <div><b>Mobile Number:</b> {maskPhone(form.mobile)}</div>
                <div><b>Email ID:</b> {maskEmail(form.email)}</div>
                <div><b>Educational Qualification:</b> {form.education}</div>
                <div><b>Location:</b> {form.location}</div>
                <div><b>Address:</b> {form.address}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">You can only submit your DigiLocker profile once. For changes, contact support.</div>
              <button
                className="mt-6 px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-primary-foreground transition"
                onClick={() => router.push("/")}
              >
                Back
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
} 