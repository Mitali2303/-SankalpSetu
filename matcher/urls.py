from django.urls import path
from .views import ngo_matcher_view

urlpatterns = [
    path('', ngo_matcher_view, name='matcher'),  # So /matcher/ maps correctly
]
