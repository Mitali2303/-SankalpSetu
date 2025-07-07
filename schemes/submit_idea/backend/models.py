
from django.db import models

class Idea(models.Model):
    language = models.CharField(max_length=50)
    idea = models.TextField()

    def __str__(self):
        return self.language
class BusinessIdea(models.Model):
    language = models.CharField(max_length=50)
    idea_text = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.language} - {self.idea_text[:30]}"