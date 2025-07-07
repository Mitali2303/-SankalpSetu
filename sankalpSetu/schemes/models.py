from django.db import models

# Create your models here.
class Scheme(models.Model):
    name = models.CharField(max_length=200)
    eligibility = models.TextField()
    description = models.TextField()
    language = models.CharField(max_length=50)

def __str__(self):
        return self.name