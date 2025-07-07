"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Volume2, Languages, AudioWaveformIcon as Waveform, Settings, Code } from "lucide-react"

export default function SpeechIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Speech{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Integration Hub
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Configure speech-to-text and text-to-speech services for voice-enabled features
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Speech-to-Text */}
          <Card className="border-purple-200/50 dark:border-purple-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-purple-600" />
                Speech-to-Text (STT)
              </CardTitle>
              <CardDescription>
                Convert voice input to text for business idea submission and interaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Badge variant="outline" className="w-full justify-center py-2">
                  Ready for Integration
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Supported Services:</span>
                    <span className="text-muted-foreground">Google, Azure, AWS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Languages:</span>
                    <span className="text-muted-foreground">15+ Indian Languages</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audio Formats:</span>
                    <span className="text-muted-foreground">WAV, MP3, WebM</span>
                  </div>
                </div>

                <div className="bg-purple-50/50 dark:bg-purple-950/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Use Cases:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Business idea voice submission</li>
                    <li>• Voice questions to AI tutor</li>
                    <li>• Audio feedback and reviews</li>
                    <li>• Accessibility features</li>
                  </ul>
                </div>

                <div className="bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Integration Points:</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Submit Idea page - voice input</li>
                    <li>• Learning modules - voice Q&A</li>
                    <li>• Dashboard - voice commands</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure STT
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  API Docs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Text-to-Speech */}
          <Card className="border-pink-200/50 dark:border-pink-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-pink-600" />
                Text-to-Speech (TTS)
              </CardTitle>
              <CardDescription>Convert text to natural speech for audio feedback and accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Badge variant="outline" className="w-full justify-center py-2">
                  Ready for Integration
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Voice Quality:</span>
                    <span className="text-muted-foreground">Neural, Natural</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Languages:</span>
                    <span className="text-muted-foreground">Hindi, English +13</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voice Types:</span>
                    <span className="text-muted-foreground">Male, Female</span>
                  </div>
                </div>

                <div className="bg-pink-50/50 dark:bg-pink-950/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Use Cases:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• AI tutor voice responses</li>
                    <li>• Learning content narration</li>
                    <li>• Scheme information audio</li>
                    <li>• Accessibility support</li>
                  </ul>
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-3">
                  <h5 className="font-medium text-sm mb-1">Integration Points:</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Learning modules - audio lessons</li>
                    <li>• AI chat - voice responses</li>
                    <li>• Schemes page - audio descriptions</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure TTS
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  API Docs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Voice Processing */}
          <Card className="border-blue-200/50 dark:border-blue-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waveform className="h-5 w-5 text-blue-600" />
                Voice Processing
              </CardTitle>
              <CardDescription>Advanced voice processing features and audio enhancement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Badge variant="outline" className="w-full justify-center py-2">
                  Advanced Features
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Noise Reduction:</span>
                    <span className="text-muted-foreground">AI-powered</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voice Enhancement:</span>
                    <span className="text-muted-foreground">Real-time</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accent Support:</span>
                    <span className="text-muted-foreground">Regional accents</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Processing Features:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Background noise filtering</li>
                    <li>• Voice activity detection</li>
                    <li>• Audio quality enhancement</li>
                    <li>• Regional accent recognition</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Language Support */}
          <Card className="border-green-200/50 dark:border-green-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-green-600" />
                Multi-Language Support
              </CardTitle>
              <CardDescription>Comprehensive language support for Indian regional languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Badge variant="outline" className="w-full justify-center py-2">
                  15+ Languages
                </Badge>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    "Hindi",
                    "English",
                    "Bengali",
                    "Tamil",
                    "Telugu",
                    "Marathi",
                    "Gujarati",
                    "Kannada",
                    "Malayalam",
                    "Punjabi",
                    "Odia",
                    "Assamese",
                  ].map((lang) => (
                    <div key={lang} className="p-2 bg-muted/50 rounded text-center">
                      {lang}
                    </div>
                  ))}
                </div>

                <div className="bg-green-50/50 dark:bg-green-950/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Language Features:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Automatic language detection</li>
                    <li>• Code-switching support</li>
                    <li>• Regional dialect recognition</li>
                    <li>• Cultural context awareness</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Language Config
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  Test Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Status */}
        <Card className="mt-8 border-purple-200/50 dark:border-purple-800/50">
          <CardHeader>
            <CardTitle>Speech Integration Status</CardTitle>
            <CardDescription>Current status and recommended next steps for speech features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">Pending</div>
                <div className="text-sm text-muted-foreground">API Keys Setup</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Ready</div>
                <div className="text-sm text-muted-foreground">Frontend Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Available</div>
                <div className="text-sm text-muted-foreground">Language Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">Configured</div>
                <div className="text-sm text-muted-foreground">Integration Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
