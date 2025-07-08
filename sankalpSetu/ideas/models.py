from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Idea(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transcript = models.TextField()
    audio_file = models.FileField(upload_to='voices/')
    timestamp = models.DateTimeField(auto_now_add=True)

class Feedback(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    score = models.IntegerField()
    tips = models.JSONField()  # or TextField if no JSONField

from django.db import models
from django.contrib.auth.models import User

class DigiLockerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    dob = models.CharField(max_length=20)
    gender = models.CharField(max_length=20)
    aadhaar = models.CharField(max_length=20, blank=True, null=True)
    mobile = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

queryset = Idea.objects.all()  # type: ignore[attr-defined]
queryset = Feedback.objects.all()  # type: ignore[attr-defined] 