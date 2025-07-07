
from django.db import models

class NGO(models.Model):
    NGO_TYPES = [
        ('Trust', 'Trust'),
        ('Society', 'Society'),
        ('Section 8 Company', 'Section 8 Company'),
    ]

    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    establishment_date = models.DateField(null=True, blank=True)
    ngo_type = models.CharField(max_length=50, choices=NGO_TYPES)
    contact_person = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.TextField()
    areas_of_work = models.TextField()  # Store as comma-separated string
    certificate = models.FileField(upload_to='certificates/')
    password = models.CharField(max_length=255)  # Store hashed password

    def __str__(self):
        return self.name