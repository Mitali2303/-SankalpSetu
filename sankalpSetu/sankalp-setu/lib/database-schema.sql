-- Database Schema for PostgreSQL/MySQL
-- Copy this to your database setup

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    preferred_language VARCHAR(20) DEFAULT 'hindi',
    state VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Business Ideas table
CREATE TABLE business_ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    language VARCHAR(20) DEFAULT 'hindi',
    category VARCHAR(50),
    analysis_score DECIMAL(3,1),
    strengths JSONB,
    suggestions JSONB,
    ai_analysis JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schemes table
CREATE TABLE schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    max_loan_amount BIGINT,
    subsidy_percentage VARCHAR(20),
    eligibility_criteria JSONB,
    required_documents JSONB,
    processing_time VARCHAR(50),
    target_audience JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scheme Matches table
CREATE TABLE scheme_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID REFERENCES schemes(id),
    business_idea_id UUID REFERENCES business_ideas(id),
    user_id UUID REFERENCES users(id),
    match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
    eligibility_status VARCHAR(20) CHECK (eligibility_status IN ('eligible', 'partially_eligible', 'not_eligible')),
    recommended_amount BIGINT,
    ai_insights JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Modules table
CREATE TABLE learning_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    estimated_duration VARCHAR(50),
    content JSONB NOT NULL,
    prerequisites JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id UUID REFERENCES learning_modules(id),
    progress INTEGER CHECK (progress >= 0 AND progress <= 100),
    completed_at TIMESTAMP,
    time_spent INTEGER DEFAULT 0, -- in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, module_id)
);

-- Scheme Applications table
CREATE TABLE scheme_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scheme_id UUID REFERENCES schemes(id),
    business_idea_id UUID REFERENCES business_ideas(id),
    status VARCHAR(20) CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected')),
    application_data JSONB NOT NULL,
    submitted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages table (for AI tutor)
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    context JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_business_ideas_user_id ON business_ideas(user_id);
CREATE INDEX idx_scheme_matches_user_id ON scheme_matches(user_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_scheme_applications_user_id ON scheme_applications(user_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
