from django.db import models

# Create your models here.
class CommitteeMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to='bod/',blank=True,null=True)

    def __str__(self):
        return self.name