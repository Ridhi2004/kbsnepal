from django.db import models
class ContactInfo(models.Model):
    """Model for storing contact information"""
    
    # Address
    address = models.CharField(max_length=500, verbose_name="ठेगाना")
    address_nepali = models.CharField(max_length=500, blank=True, verbose_name="ठेगाना (नेपाली)")
    
    # Phone
    phone = models.CharField(max_length=20, verbose_name="फोन नम्बर")
    phone_display = models.CharField(max_length=50, blank=True, verbose_name="फोन (प्रदर्शनको लागि)")
    
    # Email
    email = models.EmailField(verbose_name="इमेल")
    
    # Social Media URLs
    facebook_url = models.URLField(blank=True, null=True, verbose_name="Facebook URL")
    # twitter_url = models.URLField(blank=True, null=True, verbose_name="Twitter/X URL")
    # instagram_url = models.URLField(blank=True, null=True, verbose_name="Instagram URL")
    # youtube_url = models.URLField(blank=True, null=True, verbose_name="YouTube URL")
    # linkedin_url = models.URLField(blank=True, null=True, verbose_name="LinkedIn URL")
    # tiktok_url = models.URLField(blank=True, null=True, verbose_name="TikTok URL")
    
    # Additional fields
    google_maps_embed_url = models.URLField(
        blank=True, 
        null=True, 
        verbose_name="Google Maps Embed URL",
        help_text="Google Maps को embed URL"
    )
    
    # Meta fields
    is_active = models.BooleanField(default=True, verbose_name="सक्रिय")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="अद्यावधिक मिति")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="सिर्जना मिति")
    
    def __str__(self):
        return f"सम्पर्क विवरण - {self.updated_at.strftime('%Y-%m-%d')}"
    
    

