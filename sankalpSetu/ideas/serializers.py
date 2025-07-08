from rest_framework import serializers
from .models import Idea, Feedback,DigiLockerProfile


class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class DigiLockerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigiLockerProfile
        fields = '__all__' 