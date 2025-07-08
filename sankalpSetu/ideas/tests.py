from django.test import TestCase
from django.contrib import admin
from .models import Idea, Feedback, DigiLockerProfile

# Create your tests here.

admin.site.register(Idea)
admin.site.register(Feedback)
admin.site.register(DigiLockerProfile)
