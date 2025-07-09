from django.shortcuts import render,redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

def home(request):
   return  render(request, "home.html")

@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    """User registration endpoint"""
    data = request.data
    required_fields = ["username", "password", "first_name", "last_name"]
    
    # Validate required fields
    for field in required_fields:
        if field not in data or not data[field]:
            return Response({"error": f"{field} is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if user already exists
    if User.objects.filter(username=data["username"]).exists():
        return Response({"error": "User with this username already exists."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Validate password
        validate_password(data["password"])
        
        # Create user
        user = User.objects.create_user(
            username=data["username"],
            password=data["password"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data.get("email", "")  # Optional email
        )
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "success": True,
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email
            },
            "tokens": {
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }
        }, status=status.HTTP_201_CREATED)
        
    except ValidationError as ve:
        return Response({"error": ve.messages}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    """Custom login endpoint that returns user data with JWT tokens"""
    data = request.data
    
    if not data.get("username") or not data.get("password"):
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    print("LOGIN TRY:", data["username"], data["password"])
    user = authenticate(username=data["username"], password=data["password"])
    print("USER:", user)
    
    if user is None:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    
    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    
    return Response({
        "success": True,
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        },
        "tokens": {
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }
    }, status=status.HTTP_200_OK)
 
 
 