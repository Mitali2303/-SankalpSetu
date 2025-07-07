
# models.py
from django.db import models

class Idea(models.Model):
    language = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.language}: {self.text[:30]}..."