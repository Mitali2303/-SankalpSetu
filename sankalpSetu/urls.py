 
from django.contrib import admin
from django.urls import path, include
from  sankalpSetu import views

from rest_framework.routers import DefaultRouter
from ideas.views import IdeaViewSet, FeedbackViewSet
from schemes.views import SchemeViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status

router = DefaultRouter()
router.register('ideas', IdeaViewSet)
router.register('feedback', FeedbackViewSet)
router.register('schemes', SchemeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]
