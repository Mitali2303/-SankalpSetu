# Sankalp Setu - AI-Powered Women Entrepreneurship Platform

A comprehensive platform for empowering rural women entrepreneurs with **your custom AI recommender model**, scheme matching, and personalized learning.

## 🚀 Quick Localhost Setup

### 1. Clone and Install
\`\`\`bash
git clone <your-repo-url>
cd sankalp-setu
npm install
\`\`\`

### 2. Environment Setup
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local`:
\`\`\`env
# Your Custom Recommender Model
RECOMMENDER_MODEL_URL="http://localhost:5000"

# Database (PostgreSQL recommended for localhost)
DATABASE_URL="postgresql://localhost:5432/sankalp_setu"

# Optional: External APIs (if you choose to use them)
LLM_API_URL=""
SPEECH_API_URL=""

# App Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

### 3. Database Setup (PostgreSQL)
\`\`\`bash
# Install PostgreSQL locally
# Create database
createdb sankalp_setu

# Run the schema
psql sankalp_setu < lib/database-schema.sql
\`\`\`

### 4. Start Development
\`\`\`bash
npm run dev
\`\`\`

Your app will be running at `http://localhost:3000` 🎉

---

## 🔧 Integration Guide

### 1. Database Setup

**Location**: `lib/database-schema.sql`

1. **PostgreSQL Setup** (Recommended):
   \`\`\`bash
   # Install PostgreSQL
   # Create database
   createdb sankalp_setu
   
   # Run the schema
   psql sankalp_setu < lib/database-schema.sql
   \`\`\`

2. **Environment Variables**:
   \`\`\`env
   DATABASE_URL="postgresql://username:password@localhost:5432/sankalp_setu"
   \`\`\`

3. **ORM Integration** (Optional):
   - **Prisma**: Add `schema.prisma` based on the SQL schema
   - **Drizzle**: Create schema files in `lib/db/schema.ts`
   - **TypeORM**: Create entity files in `lib/entities/`

### 2. AI Model Integration

**Location**: `lib/api.ts` - `AIService` class

#### A. Business Idea Analysis
\`\`\`typescript
// Replace this function in AIService class
static async analyzeBusinessIdea(ideaText: string, language: string, userProfile: any) {
  // YOUR AI MODEL INTEGRATION HERE
  const response = await fetch('YOUR_AI_ENDPOINT/analyze', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: ideaText,
      language: language,
      context: userProfile
    })
  })
  
  return await response.json()
}
\`\`\`

#### B. Scheme Matching AI
\`\`\`typescript
// Replace this function in AIService class
static async matchSchemes(businessIdea: string, userProfile: any) {
  // YOUR SCHEME MATCHING AI HERE
  // Could use vector similarity, classification, or rule-based matching
}
\`\`\`

#### C. Voice Processing
\`\`\`typescript
// Replace this function in AIService class
static async processVoiceInput(audioBlob: Blob, language: string) {
  // YOUR SPEECH-TO-TEXT AI HERE
  // Options: OpenAI Whisper, Google Speech-to-Text, Azure Speech
}
\`\`\`

#### D. AI Chat/Tutor
\`\`\`typescript
// Replace this function in AIService class
static async getChatResponse(question: string, context: any) {
  // YOUR CONVERSATIONAL AI HERE
  // Options: OpenAI GPT, Anthropic Claude, Local LLM
}
\`\`\`

### 3. API Routes Structure

**Location**: `app/api/` directory

#### Authentication APIs
- `app/api/auth/login/route.ts` - User login
- `app/api/auth/register/route.ts` - User registration
- `app/api/auth/logout/route.ts` - User logout

#### Business Ideas APIs
- `app/api/ideas/analyze/route.ts` - AI analysis of business ideas
- `app/api/ideas/[id]/route.ts` - Get/Update specific idea
- `app/api/ideas/user/[userId]/route.ts` - Get user's ideas

#### Learning APIs
- `app/api/learning/progress/route.ts` - Update learning progress
- `app/api/learning/modules/route.ts` - Get learning modules
- `app/api/learning/recommendations/route.ts` - AI learning recommendations

#### Schemes APIs
- `app/api/schemes/match/route.ts` - Get matched schemes
- `app/api/schemes/apply/route.ts` - Submit scheme application
- `app/api/schemes/status/route.ts` - Check application status

#### AI APIs
- `app/api/chat/route.ts` - AI tutor chat
- `app/api/voice/transcribe/route.ts` - Voice to text
- `app/api/ai/analyze/route.ts` - General AI analysis

### 4. Frontend Integration

**Location**: `hooks/useApi.ts`

#### Using the API hooks:
\`\`\`typescript
// In your components
import { useBusinessIdeas, useSchemeMatches } from '@/hooks/useApi'

function Dashboard() {
  const { ideas, loading } = useBusinessIdeas(userId)
  const { matches } = useSchemeMatches(userId)
  
  // Your component logic
}
\`\`\`

#### Making API calls:
\`\`\`typescript
// Direct API calls
import { AIService, DatabaseService } from '@/lib/api'

// Analyze business idea
const analysis = await AIService.analyzeBusinessIdea(ideaText, language, userProfile)

// Save to database
const savedIdea = await DatabaseService.saveBusinessIdea(ideaData)
\`\`\`

### 5. Environment Variables

**Location**: `.env.local`

\`\`\`env
# Database
DATABASE_URL="your-database-connection-string"

# AI Models
AI_MODEL_URL="your-ai-model-endpoint"
AI_API_KEY="your-ai-api-key"

# Authentication
JWT_SECRET="your-jwt-secret"
NEXTAUTH_SECRET="your-nextauth-secret"

# External APIs
SPEECH_TO_TEXT_API_KEY="your-speech-api-key"
TRANSLATION_API_KEY="your-translation-api-key"

# App Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

### 6. Backend Services Integration

#### A. Microservices Architecture
\`\`\`
/services
  /ai-service          # AI model serving
  /auth-service        # Authentication
  /notification-service # SMS/Email notifications
  /file-service        # File uploads/storage
\`\`\`

#### B. External Service Integration
\`\`\`typescript
// lib/services/
export class NotificationService {
  static async sendSMS(phone: string, message: string) {
    // Integrate with Twilio, AWS SNS, or local SMS gateway
  }
  
  static async sendEmail(email: string, subject: string, body: string) {
    // Integrate with SendGrid, AWS SES, or SMTP
  }
}

export class FileService {
  static async uploadFile(file: File, category: string) {
    // Integrate with AWS S3, Cloudinary, or local storage
  }
}
\`\`\`

### 7. Deployment Configuration

#### A. Docker Setup
\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

#### B. Production Environment
\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/sankalp_setu
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: sankalp_setu
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    
volumes:
  postgres_data:
\`\`\`

## 🔐 Security Considerations

1. **Authentication**: Implement proper JWT token validation
2. **Rate Limiting**: Add rate limiting to API routes
3. **Input Validation**: Validate all user inputs
4. **SQL Injection**: Use parameterized queries
5. **CORS**: Configure CORS properly for production
6. **HTTPS**: Always use HTTPS in production

## 📱 Mobile App Integration

The codebase is ready for React Native integration:
1. Extract API logic to shared packages
2. Use React Native components instead of web components
3. Implement native voice recording and file upload

## 🧪 Testing

\`\`\`bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
\`\`\`

## 📊 Monitoring & Analytics

Add monitoring for:
1. API response times
2. AI model performance
3. User engagement metrics
4. Error tracking
5. Database performance

## 🚀 Scaling Considerations

1. **Database**: Use read replicas for heavy read operations
2. **Caching**: Implement Redis for session and data caching
3. **CDN**: Use CDN for static assets
4. **Load Balancing**: Use load balancers for multiple instances
5. **AI Models**: Consider model caching and batch processing

## 📞 Support

For integration support:
1. Check the API documentation in `/docs`
2. Review example implementations in `/examples`
3. Contact the development team

---

**Happy Coding! 🚀**
\`\`\`

\`\`\`typescriptreact file="app/globals.css"
[v0-no-op-code-block-prefix]@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 262 83% 58%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 262 83% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .bg-grid-pattern {
    background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0);
    background-size: 20px 20px;
  }
}

/* Ensure proper theme transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* Fix any theme-specific issues */
.dark .bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.dark .bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
