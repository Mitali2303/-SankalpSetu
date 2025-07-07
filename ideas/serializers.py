from rest_framework import serializers
from .models import Idea, Feedback

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ['id', 'transcript', 'audio_file', 'timestamp']
        read_only_fields = ['id', 'timestamp', 'user']
    
    def validate_transcript(self, value):
        """Validate the idea transcript input"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Idea must be at least 10 characters long.")
        if len(value.strip()) > 5000:
            raise serializers.ValidationError("Idea cannot exceed 5000 characters.")
        return value.strip()
    
    def validate_audio_file(self, value):
        """Validate the audio file input"""
        if value and value.size > 10 * 1024 * 1024:  # 10MB limit
            raise serializers.ValidationError("Audio file too large (max 10MB).")
        return value

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['id']
    
    def validate_score(self, value):
        """Validate feedback score is within acceptable range"""
        if value < 1 or value > 10:
            raise serializers.ValidationError("Score must be between 1 and 10.")
        return value
