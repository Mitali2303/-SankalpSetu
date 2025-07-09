import requests
# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Idea, Feedback  ,DigiLockerProfile 
from .serializers import IdeaSerializer, FeedbackSerializer, DigiLockerProfileSerializer
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()  # type: ignore[attr-defined]
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.consent_given:
            raise PermissionDenied("Consent not given.")
        serializer.save(user=self.request.user)

class FeedbackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feedback.objects.all()  # type: ignore[attr-defined]
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]


from rest_framework.response import Response
from .models import DigiLockerProfile

@api_view(['POST'])
@permission_classes([AllowAny])
def digilocker_exchange(request):
    code = request.data.get('code')
    token_url = "https://digilocker.meripehchaan.gov.in/public/oauth2/1/token"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": settings.DIGILOCKER_CLIENT_ID,
        "client_secret": settings.DIGILOCKER_CLIENT_SECRET,
        "redirect_uri": settings.DIGILOCKER_REDIRECT_URI,
    }
    token_res = requests.post(token_url, data=data)
    if token_res.status_code != 200:
        return Response({"error": "Token exchange failed"}, status=400)
    access_token = token_res.json().get("access_token")
    profile_url = "https://digilocker.meripehchaan.gov.in/public/oauth2/1/user/profile"
    profile_res = requests.get(profile_url, headers={"Authorization": f"Bearer {access_token}"})
    if profile_res.status_code != 200:
        return Response({"error": "Profile fetch failed"}, status=400)
    profile = profile_res.json()
    return Response({"profile": profile})

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_password(request):
    user_id = request.data.get('userId')
    password = request.data.get('password')
    User = get_user_model()
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"valid": False})
    valid = user.check_password(password)
    return Response({"valid": valid})

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def digilocker_save(request):
    if request.method == 'POST':
        profile_data = request.data.get('profile')
        user = request.user
        obj, created = DigiLockerProfile.objects.update_or_create(  # type: ignore[attr-defined]
            user=user,
            defaults={
                "full_name": profile_data.get("fullName", ""),
                "dob": profile_data.get("dob", ""),
                "gender": profile_data.get("gender", ""),
                "aadhaar": profile_data.get("aadhaar", ""),
                "mobile": profile_data.get("mobile", ""),
                "email": profile_data.get("email", ""),
                "education": profile_data.get("education", ""),
                "location": profile_data.get("location", ""),
                "address": profile_data.get("address", ""),
            }
        )
        return Response({"success": True})
    else:
        try:
            obj = DigiLockerProfile.objects.get(user=request.user)  # type: ignore[attr-defined]
            serializer = DigiLockerProfileSerializer(obj)
            return Response({"profile": serializer.data})
        except DigiLockerProfile.DoesNotExist:  # type: ignore[attr-defined]
            return Response({"profile": None}) 

class UserCreateView(APIView):
    def post(self, request):
        data = request.data
        if User.objects.filter(username=data['phone']).exists() or User.objects.filter(email=data['email']).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(
            username=data['phone'],
            email=data['email'],
            password=data['password'],
            first_name=data['firstName'],
            last_name=data['lastName']
        )
        return Response({'success': True, 'user': user.id}, status=status.HTTP_201_CREATED) 