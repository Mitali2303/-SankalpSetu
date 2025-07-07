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