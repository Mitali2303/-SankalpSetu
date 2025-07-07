
from django.contrib import admin
from django.urls import path
from ideas import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', name='register_ngo'),
    path('ngo/', include('ngo_regestration.urls')),
]

# Add this for serving media files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)