# SankalpSetu - Quick Setup Guide

## Project Overview
SankalpSetu is a Django REST API project for submitting and managing ideas with audio transcription support.

## Quick Start

### 1. Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Database Setup
```bash
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser  # Create admin user
```

### 3. Run the Server
```bash
python3 manage.py runserver
```

The API will be available at: `http://127.0.0.1:8000/`

## API Endpoints

### Ideas API
- `POST /api/ideas/` - Submit new idea
- `GET /api/ideas/` - Get user's ideas
- `GET /api/ideas/{id}/` - Get specific idea
- `PUT /api/ideas/{id}/` - Update idea
- `DELETE /api/ideas/{id}/` - Delete idea

### Authentication
- `POST /api/token/` - Get JWT token
- `POST /api/token/refresh/` - Refresh JWT token

### Admin
- `/admin/` - Django admin interface

## Testing the API

### Get JWT Token
```bash
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

### Submit an Idea
```bash
curl -X POST http://127.0.0.1:8000/api/ideas/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"transcript": "My innovative idea for solving traffic problems"}'
```

### Get Ideas
```bash
curl -X GET http://127.0.0.1:8000/api/ideas/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Key Features

✅ **User Authentication** - JWT-based authentication  
✅ **Idea Submission** - Text and audio file support  
✅ **Input Validation** - Proper validation and error handling  
✅ **Database Operations** - Full CRUD operations  
✅ **RESTful API** - Clean API design  
✅ **Admin Interface** - Django admin for management  

## File Structure
```
sankalpSetu/
├── ideas/              # Ideas app (models, views, serializers)
├── schemes/            # Schemes app
├── templates/          # HTML templates
├── static/             # Static files
├── sankalpSetu/        # Main project settings
├── manage.py           # Django management script
└── db.sqlite3          # SQLite database
```

## Database Models

### Idea Model
- `user` - ForeignKey to User
- `transcript` - TextField (idea description)
- `audio_file` - FileField (optional audio)
- `timestamp` - DateTimeField (auto-generated)

### Feedback Model
- `idea` - ForeignKey to Idea
- `score` - IntegerField (1-10)
- `tips` - JSONField (feedback data)

## Next Steps

1. **Frontend Development** - Build a React/Vue.js frontend
2. **Enhanced Features** - Add categories, search, voting
3. **Deployment** - Deploy to cloud platforms
4. **Testing** - Add comprehensive test suite
5. **Documentation** - API documentation with Swagger

## Troubleshooting

**Database Issues:**
```bash
python3 manage.py makemigrations --empty ideas
python3 manage.py migrate
```

**Permission Issues:**
- Ensure user has `consent_given` attribute
- Check JWT token is valid
- Verify user authentication

**File Upload Issues:**
- Check `MEDIA_ROOT` and `MEDIA_URL` settings
- Ensure upload directory permissions
- Verify file size limits

For detailed documentation, see `USER_INPUT_DATABASE_GUIDE.md`.