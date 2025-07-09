from django.db import models

class AreaOfWork(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class NGO(models.Model):
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100)
    date_of_establishment = models.DateField()
    ngo_type = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()
    areas_of_work = models.ManyToManyField(AreaOfWork, blank=True)
    registration_certificate = models.FileField(upload_to="ngo_certificates/")
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
