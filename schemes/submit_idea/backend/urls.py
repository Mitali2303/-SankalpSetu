
from django.urls import path
from .views import submit_idea

urlpatterns = [
    path('submit/', submit_idea, name='submit_idea'),
]
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ideas.urls')),
]