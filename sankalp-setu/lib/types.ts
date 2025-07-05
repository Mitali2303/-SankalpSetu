// TypeScript Types for Database and API Integration

export interface User {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  preferredLanguage: string
  state: string
  createdAt: Date
  updatedAt: Date
}

export interface BusinessIdea {
  id: string
  userId: string
  title: string
  description: string
  language: string
  category: string
  analysisScore?: number
  strengths?: string[]
  suggestions?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Scheme {
  id: string
  name: string
  description: string
  category: string
  maxLoanAmount: number
  subsidyPercentage: string
  eligibilityCriteria: string[]
  requiredDocuments: string[]
  processingTime: string
  targetAudience: string[]
}

export interface SchemeMatch {
  schemeId: string
  businessIdeaId: string
  matchScore: number
  eligibilityStatus: "eligible" | "partially_eligible" | "not_eligible"
  recommendedAmount: number
  aiInsights: string[]
}

export interface LearningModule {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedDuration: string
  content: any // JSON content
  prerequisites?: string[]
}

export interface UserProgress {
  id: string
  userId: string
  moduleId: string
  progress: number // 0-100
  completedAt?: Date
  timeSpent: number // in minutes
}

export interface SchemeApplication {
  id: string
  userId: string
  schemeId: string
  businessIdeaId: string
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  applicationData: any // JSON data
  submittedAt?: Date
  updatedAt: Date
}

export interface AIAnalysisResult {
  score: number
  strengths: string[]
  suggestions: string[]
  feasibilityAnalysis: string
  marketInsights: string[]
  riskFactors: string[]
}

export interface ChatMessage {
  id: string
  userId: string
  message: string
  response: string
  context: any
  createdAt: Date
}
