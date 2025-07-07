#!/usr/bin/env python
"""
Database Operations Examples for SankalpSetu Project

This script demonstrates how to interact with your Django database
to create, read, update, and delete user ideas.

Run this script with: python manage.py shell < database_examples.py
"""

# Import necessary modules
from django.contrib.auth.models import User
from ideas.models import Idea, Feedback
from django.utils import timezone
from datetime import timedelta
from django.db import models

print("=== SankalpSetu Database Operations Examples ===\n")

# 1. CREATE OPERATIONS
print("1. Creating Sample Data...")

# Create a test user (if doesn't exist)
user, created = User.objects.get_or_create(
    username='testuser',
    defaults={
        'email': 'test@example.com',
        'first_name': 'Test',
        'last_name': 'User'
    }
)
if created:
    user.set_password('testpassword123')
    user.save()
    print(f"   ✓ Created user: {user.username}")
else:
    print(f"   ✓ Using existing user: {user.username}")

# Create sample ideas
sample_ideas = [
    "Develop a mobile app for local farmers to sell directly to consumers",
    "Create solar-powered charging stations in rural areas",
    "Build an AI-powered waste management system for smart cities",
    "Design eco-friendly packaging solutions for e-commerce",
    "Implement blockchain-based voting system for transparent elections"
]

created_ideas = []
for idea_text in sample_ideas:
    idea, created = Idea.objects.get_or_create(
        user=user,
        transcript=idea_text,
        defaults={'timestamp': timezone.now()}
    )
    if created:
        created_ideas.append(idea)
        print(f"   ✓ Created idea: {idea_text[:50]}...")

print(f"   Total ideas created: {len(created_ideas)}\n")

# 2. READ OPERATIONS
print("2. Reading Data from Database...")

# Get all ideas
all_ideas = Idea.objects.all()
print(f"   Total ideas in database: {all_ideas.count()}")

# Get ideas for specific user
user_ideas = Idea.objects.filter(user=user)
print(f"   Ideas by {user.username}: {user_ideas.count()}")

# Get recent ideas (last 7 days)
week_ago = timezone.now() - timedelta(days=7)
recent_ideas = Idea.objects.filter(timestamp__gte=week_ago)
print(f"   Recent ideas (last 7 days): {recent_ideas.count()}")

# Search ideas by content
search_term = "mobile app"
matching_ideas = Idea.objects.filter(transcript__icontains=search_term)
print(f"   Ideas containing '{search_term}': {matching_ideas.count()}")

# Get ideas with audio files
ideas_with_audio = Idea.objects.filter(audio_file__isnull=False)
print(f"   Ideas with audio files: {ideas_with_audio.count()}")

print("\n   Sample ideas:")
for i, idea in enumerate(user_ideas[:3], 1):
    print(f"   {i}. {idea.transcript[:60]}..." if len(idea.transcript) > 60 else f"   {i}. {idea.transcript}")
    print(f"      Created: {idea.timestamp.strftime('%Y-%m-%d %H:%M')}")
    print(f"      ID: {idea.id}")

# 3. UPDATE OPERATIONS
print("\n3. Updating Data...")

if created_ideas:
    # Update the first created idea
    idea_to_update = created_ideas[0]
    original_text = idea_to_update.transcript
    idea_to_update.transcript = f"[UPDATED] {original_text}"
    idea_to_update.save()
    print(f"   ✓ Updated idea ID {idea_to_update.id}")
    print(f"     Original: {original_text[:50]}...")
    print(f"     Updated: {idea_to_update.transcript[:50]}...")

# 4. ADVANCED QUERIES
print("\n4. Advanced Database Queries...")

from django.db.models import Count, Avg
from django.db.models.functions import TruncDate

# Count ideas by user
user_counts = Idea.objects.values('user__username').annotate(
    idea_count=models.Count('id')
).order_by('-idea_count')

print("   Ideas count by user:")
for item in user_counts[:5]:  # Top 5 users
    print(f"   - {item['user__username']}: {item['idea_count']} ideas")

# Get ideas ordered by timestamp
latest_ideas = Idea.objects.order_by('-timestamp')[:5]
print(f"\n   Latest 5 ideas:")
for i, idea in enumerate(latest_ideas, 1):
    print(f"   {i}. {idea.transcript[:40]}... (by {idea.user.username})")

# 5. AGGREGATE FUNCTIONS
print("\n5. Database Statistics...")

# Total statistics
total_users = User.objects.count()
total_ideas = Idea.objects.count()
total_feedback = Feedback.objects.count()

print(f"   Total Users: {total_users}")
print(f"   Total Ideas: {total_ideas}")
print(f"   Total Feedback: {total_feedback}")

if total_ideas > 0:
    avg_ideas_per_user = total_ideas / total_users if total_users > 0 else 0
    print(f"   Average ideas per user: {avg_ideas_per_user:.2f}")

# Ideas per day
daily_counts = Idea.objects.annotate(
    date=TruncDate('timestamp')
).values('date').annotate(
    count=Count('id')
).order_by('-date')[:7]

print(f"\n   Ideas submitted per day (last 7 days):")
for item in daily_counts:
    print(f"   - {item['date']}: {item['count']} ideas")

# 6. PRACTICAL FUNCTIONS
print("\n6. Practical Database Functions...")

def get_user_ideas_summary(username):
    """Get summary of ideas for a specific user"""
    try:
        user = User.objects.get(username=username)
        ideas = Idea.objects.filter(user=user)
        
        summary = {
            'user': username,
            'total_ideas': ideas.count(),
            'ideas_with_audio': ideas.filter(audio_file__isnull=False).count(),
            'recent_ideas': ideas.filter(
                timestamp__gte=timezone.now() - timedelta(days=30)
            ).count(),
            'latest_idea': ideas.order_by('-timestamp').first()
        }
        return summary
    except User.DoesNotExist:
        return None

def search_ideas(query, limit=10):
    """Search ideas by transcript content"""
    return Idea.objects.filter(
        transcript__icontains=query
    ).select_related('user').order_by('-timestamp')[:limit]

def get_top_contributors(limit=5):
    """Get users with most ideas submitted"""
    return User.objects.annotate(
        idea_count=Count('idea')
    ).filter(idea_count__gt=0).order_by('-idea_count')[:limit]

# Test these functions
print("\n   Testing practical functions:")

# User summary
summary = get_user_ideas_summary(user.username)
if summary:
    print(f"   Summary for {summary['user']}:")
    print(f"   - Total ideas: {summary['total_ideas']}")
    print(f"   - Recent ideas (30 days): {summary['recent_ideas']}")
    if summary['latest_idea']:
        print(f"   - Latest idea: {summary['latest_idea'].transcript[:40]}...")

# Search function
search_results = search_ideas("app")
print(f"\n   Search results for 'app': {len(search_results)} found")
for result in search_results[:3]:
    print(f"   - {result.transcript[:50]}... (by {result.user.username})")

# Top contributors
top_users = get_top_contributors()
print(f"\n   Top contributors:")
for user_obj in top_users:
    print(f"   - {user_obj.username}: {user_obj.idea_count} ideas")

print("\n=== Database Operations Examples Complete ===")
print("\nTo run this script:")
print("1. python manage.py shell")
print("2. exec(open('database_examples.py').read())")
print("\nOr directly: python manage.py shell < database_examples.py")