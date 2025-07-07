# User Input to Database Guide - SankalpSetu Backend

## Current Project Overview

Your Django project "SankalpSetu" already has a good foundation for handling user input and database operations. Here's what you currently have:

### Current Database Model (`ideas/models.py`)
```python
class Idea(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transcript = models.TextField()           # User's idea as text
    audio_file = models.FileField(upload_to='voices/')  # User's audio input
    timestamp = models.DateTimeField(auto_now_add=True)

class Feedback(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    score = models.IntegerField()            # User feedback score
    tips = models.JSONField()                # User feedback tips
```

### Current API Endpoints
- `POST /api/ideas/` - Submit new ideas
- `GET /api/ideas/` - Retrieve all ideas 
- `GET /api/feedback/` - Get feedback data

## How User Input Currently Flows to Database

### 1. API Request Flow
```
User Frontend → Django REST API → Database
```

### 2. Current Implementation (`ideas/views.py`)
```python
class IdeaViewSet(viewsets.ModelViewSet):
    def perform_create(self, serializer):
        # Automatically assigns current user to the idea
        serializer.save(user=self.request.user)
```

## Improvements and Best Practices

### 1. Fix Database Configuration

**Current Issue**: Your SQLite configuration has unnecessary fields.

**Fix in `sankalpSetu/settings.py`**:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        # Remove these lines for SQLite:
        # 'USER': 'your_username',
        # 'PASSWORD': 'your_password', 
        # 'HOST': 'localhost',
        # 'PORT': '5432',
    }
}
```

### 2. Enhanced User Input Validation

**Current Issue**: Limited validation on user input.

**Enhanced Serializer (`ideas/serializers.py`)**:
```python
from rest_framework import serializers
from .models import Idea, Feedback

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ['id', 'transcript', 'audio_file', 'timestamp']
        read_only_fields = ['id', 'timestamp', 'user']
    
    def validate_transcript(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Idea must be at least 10 characters long.")
        return value.strip()
    
    def validate_audio_file(self, value):
        if value and value.size > 10 * 1024 * 1024:  # 10MB limit
            raise serializers.ValidationError("Audio file too large (max 10MB).")
        return value
```

### 3. Improved View with Better Error Handling

**Enhanced Views (`ideas/views.py`)**:
```python
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.db import transaction

from .models import Idea, Feedback
from .serializers import IdeaSerializer, FeedbackSerializer

class IdeaViewSet(viewsets.ModelViewSet):
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own ideas
        return Idea.objects.filter(user=self.request.user)
    
    @transaction.atomic
    def perform_create(self, serializer):
        # Check if user has given consent
        if not hasattr(self.request.user, 'consent_given') or not self.request.user.consent_given:
            raise PermissionDenied("Consent required to submit ideas.")
        
        # Save with current user
        idea = serializer.save(user=self.request.user)
        
        # Log the creation
        print(f"New idea created by user {self.request.user.username}: {idea.id}")
        
        return idea
    
    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Failed to save idea. Please try again.'},
                status=status.HTTP_400_BAD_REQUEST
            )
```

### 4. Database Query Examples

**Common Database Operations**:

```python
# Get all ideas for a user
user_ideas = Idea.objects.filter(user=request.user)

# Get ideas with audio files only
ideas_with_audio = Idea.objects.filter(audio_file__isnull=False)

# Get recent ideas (last 7 days)
from django.utils import timezone
from datetime import timedelta
recent_ideas = Idea.objects.filter(
    timestamp__gte=timezone.now() - timedelta(days=7)
)

# Search ideas by transcript content
search_term = "innovation"
matching_ideas = Idea.objects.filter(
    transcript__icontains=search_term
)

# Get ideas with their feedback
ideas_with_feedback = Idea.objects.prefetch_related('feedback_set')

# Count total ideas by user
user_idea_count = Idea.objects.filter(user=request.user).count()
```

### 5. Frontend Integration Examples

**JavaScript AJAX Example**:
```javascript
// Submit idea via API
async function submitIdea(transcript, audioFile) {
    const formData = new FormData();
    formData.append('transcript', transcript);
    if (audioFile) {
        formData.append('audio_file', audioFile);
    }
    
    try {
        const response = await fetch('/api/ideas/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });
        
        if (response.ok) {
            const idea = await response.json();
            console.log('Idea saved:', idea);
            return idea;
        } else {
            throw new Error('Failed to submit idea');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Get user's ideas
async function getUserIdeas() {
    try {
        const response = await fetch('/api/ideas/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching ideas:', error);
    }
}
```

### 6. Enhanced HTML Form

**Improved Frontend (`templates/submit_idea.html`)**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit Your Idea - SankalpSetu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2 class="text-center mb-4">Submit Your Idea</h2>
                
                <form id="ideaForm" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="transcript" class="form-label">Your Idea (Text)</label>
                        <textarea 
                            class="form-control" 
                            id="transcript" 
                            name="transcript" 
                            rows="4" 
                            placeholder="Describe your idea here..."
                            required
                            minlength="10">
                        </textarea>
                        <div class="form-text">Minimum 10 characters required.</div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="audio_file" class="form-label">Audio Recording (Optional)</label>
                        <input 
                            class="form-control" 
                            type="file" 
                            id="audio_file" 
                            name="audio_file"
                            accept="audio/*">
                        <div class="form-text">Maximum file size: 10MB</div>
                    </div>
                    
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Submit Idea</button>
                    </div>
                </form>
                
                <div id="message" class="mt-3"></div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('ideaForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const messageDiv = document.getElementById('message');
            
            try {
                const response = await fetch('/api/ideas/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData
                });
                
                if (response.ok) {
                    const result = await response.json();
                    messageDiv.innerHTML = '<div class="alert alert-success">Idea submitted successfully!</div>';
                    this.reset();
                } else {
                    const error = await response.json();
                    messageDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.error || 'Failed to submit idea'}</div>`;
                }
            } catch (error) {
                messageDiv.innerHTML = '<div class="alert alert-danger">Network error. Please try again.</div>';
            }
        });
    </script>
</body>
</html>
```

## Next Steps

### 1. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 2. Create Superuser
```bash
python manage.py createsuperuser
```

### 3. Test API Endpoints
```bash
# Start development server
python manage.py runserver

# Test in browser or with curl:
curl -X GET http://127.0.0.1:8000/api/ideas/
```

### 4. Add More Features
- **Search functionality**: Add text search across ideas
- **Categories**: Add idea categories/tags
- **Voting system**: Let users vote on ideas
- **Comments**: Allow users to comment on ideas
- **Analytics**: Track idea submission trends

## Security Considerations

1. **Input Validation**: Always validate user input
2. **File Upload Security**: Limit file types and sizes
3. **Authentication**: Ensure all API endpoints require authentication
4. **CORS**: Configure CORS settings for production
5. **Rate Limiting**: Add rate limiting to prevent spam

## Database Optimization

1. **Indexing**: Add database indexes for frequently queried fields
2. **Pagination**: Implement pagination for large datasets
3. **Caching**: Use Django's caching framework for better performance
4. **Database Connection Pooling**: For production environments

Your current implementation is already on the right track! The main improvements needed are database configuration fixes, better error handling, and enhanced frontend integration.