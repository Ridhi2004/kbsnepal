# models.py
from django.db import models

class Representative(models.Model):
    zone = models.CharField(max_length=50, unique=True, verbose_name="भेग")
    zone_number = models.IntegerField(verbose_name="भेग नं.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['zone_number']
        verbose_name = "Representative Zone"
        verbose_name_plural = "Representative Zones"
    
    def __str__(self):
        return self.zone

class Member(models.Model):
    representative_zone = models.ForeignKey(
        Representative, 
        on_delete=models.CASCADE, 
        related_name='members'
    )
    name = models.CharField(max_length=200, verbose_name="नाम")
    address = models.CharField(max_length=200, blank=True, verbose_name="ठेगाना")
    telephone = models.CharField(max_length=20, blank=True, verbose_name="टेलिफोन नं.")
    mobile = models.CharField(max_length=20, verbose_name="मोबाइल नं.")
    image = models.ImageField(
        upload_to='representatives/', 
        blank=True, 
        null=True,
        verbose_name="तस्वीर"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        verbose_name = "Member"
        verbose_name_plural = "Members"
    
    def __str__(self):
        return self.name
