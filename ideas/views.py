from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Idea, Feedback  # Make sure these models are defined
from .serializers import IdeaSerializer, FeedbackSerializer
# Create your views here.
class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.consent_given:
            raise PermissionDenied("Consent not given.")
        serializer.save(user=self.request.user)

class FeedbackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]
