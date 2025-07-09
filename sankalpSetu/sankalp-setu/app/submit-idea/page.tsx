"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaMicrophone, FaGlobe, FaRocket } from "react-icons/fa";

// Add support for speech recognition
const isSpeechRecognitionSupported = typeof window !== "undefined" && (
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
);

const LANGUAGES = [
  { value: "en", label: "English", native: "English" },
  { value: "hi", label: "Hindi", native: "हिन्दी" },
  { value: "bn", label: "Bengali", native: "বাংলা" },
  { value: "ta", label: "Tamil", native: "தமிழ்" },
  { value: "te", label: "Telugu", native: "తెలుగు" },
  { value: "mr", label: "Marathi", native: "मराठी" },
  { value: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { value: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { value: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { value: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
];

const voiceInputNotSupportedText = "Voice input is not supported in this browser.";
const voiceInputActiveText = "Listening... Speak now.";
const voiceInputIdleText = "Voice Input";

const headingText = " Your Business Idea";
const headingDesc = "Describe your business idea in detail. You can type or use voice input.";
const selectLangLabel = "Select Language";
const describeIdeaLabel = "Describe Your Idea";
const ideaPlaceholder = "Type your idea here...";
const analyzeBtnText = "Analyze My Idea";
const tipsHeading = "Tips for Better Analysis";
const tipsList = [
  "Include details about your target customers",
  "Mention your skills and experience",
  "Describe your local market conditions",
  "Share your investment capacity",
  "Mention any existing resources you have",
];

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "en",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleVoiceInput() {
    setVoiceError("");
    if (!isSpeechRecognitionSupported) {
      setVoiceError(voiceInputNotSupportedText);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = form.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setForm((prev) => ({ ...prev, description: prev.description ? prev.description + " " + transcript : transcript }));
      setIsListening(false);
    };
    recognition.onerror = (event: any) => {
      setVoiceError(event.error || "Voice input error");
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    if (!form.description.trim()) {
      setError("Idea description is required.");
      setLoading(false);
      return;
    }
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      const res = await fetch("http://127.0.0.1:8000/api/ideas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          transcript: form.description,
          audio_file: null,
          language: form.language,
          title: form.title,
        }),
      });
      if (res.ok) {
        setSuccess("Idea submitted successfully!");
        setForm({ title: "", description: "", language: "en" });
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit idea.");
      }
    } catch {
      setError("Failed to submit idea. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-8">
      <div className="container mx-auto px-2 md:px-0">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Left Card: Idea Form */}
          <div className="flex-1">
            <Card className="border-purple-200/50 dark:border-purple-800/50 h-full">
              <CardContent className="p-8 space-y-8 h-full flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">{headingText}</h1>
                  <p className="text-sm text-muted-foreground mb-4">{headingDesc}</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">{selectLangLabel}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <FaGlobe />
                        </span>
                        <select
                          name="language"
                          value={form.language}
                          onChange={handleChange}
                          className="w-full rounded px-9 py-2 bg-background border"
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                              {lang.label} ({lang.native})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{describeIdeaLabel}</label>
                      <Textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder={ideaPlaceholder}
                        rows={5}
                        required
                      />
                    </div>
                    <div className="flex gap-4 mt-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleVoiceInput}
                        className={`flex items-center gap-2 ${isListening ? "animate-pulse" : ""}`}
                        disabled={isListening}
                      >
                        <FaMicrophone /> {isListening ? voiceInputActiveText : voiceInputIdleText}
                      </Button>
                      <Button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white" disabled={loading}>
                        <FaRocket /> {loading ? "Analyzing..." : analyzeBtnText}
                      </Button>
                    </div>
                    {voiceError && <div className="text-red-500 text-xs mt-2">{voiceError}</div>}
                  </form>
                  {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-center font-semibold mt-4">{success}</div>}
                  {error && <div className="bg-red-100 text-red-800 px-4 py-2 rounded text-center font-semibold mt-4">{error}</div>}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right Card: Tips */}
          <div className="flex-1 max-w-md">
            <Card className="border-purple-200/50 dark:border-purple-800/50 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-purple-300">{tipsHeading}</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-purple-100">
                  {tipsList.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
