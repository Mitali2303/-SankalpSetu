 
from django.contrib import admin
from django.urls import path, include
from  sankalpSetu import views

from rest_framework.routers import DefaultRouter
from ideas.views import IdeaViewSet, FeedbackViewSet
from schemes.views import SchemeViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

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
    path('api/register/', views.register_user, name='register'),
    path('api/register', views.register_user, name='register_no_slash'),
    path('api/login/', views.login_user, name='login'),
    path('api/login', views.login_user, name='login_no_slash'),
]
