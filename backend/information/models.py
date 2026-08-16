from django.db import models

from django.utils import timezone
from django.core.validators import FileExtensionValidator

class InfoItem(models.Model):
    """
    Model to store information/announcement items with images
    """
    title = models.CharField(max_length=500, help_text="Information title")
    short_text = models.CharField(
        max_length=300, 
        blank=True,
        help_text="Short description shown in card view"
    )
    full_content = models.TextField(
        help_text="Full content with HTML formatting"
    )
    image = models.ImageField(
        upload_to='info_images/',
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'gif', 'webp'])],
        help_text="Upload an image for this information item"
    )
    
    # Optional fields for better management
    slug = models.SlugField(
        max_length=500, 
        unique=True, 
        blank=True, 
        help_text="URL-friendly identifier"
    )
    is_published = models.BooleanField(
        default=True, 
        help_text="Whether this item is published"
    )
    is_featured = models.BooleanField(
        default=False, 
        help_text="Whether this is a featured item"
    )
    
    # Metadata
    view_count = models.PositiveIntegerField(
        default=0, 
        help_text="Number of views"
    )
    published_date = models.DateTimeField(
        default=timezone.now, 
        help_text="When the item was published"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date', '-id']
        verbose_name = 'Information Item'
        verbose_name_plural = 'Information Items'
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['is_published']),
            models.Index(fields=['is_featured']),
            models.Index(fields=['slug']),
        ]
    
    def __str__(self):
        return self.title[:100]
    
    def save(self, *args, **kwargs):
        # Auto-generate slug from title if not provided
        if not self.slug:
            from django.utils.text import slugify
            import re
            base_slug = re.sub(r'[^\w\s-]', '', self.title)
            base_slug = re.sub(r'[-\s]+', '-', base_slug)
            self.slug = slugify(base_slug)[:490]
            
            # Ensure uniqueness
            if InfoItem.objects.filter(slug=self.slug).exists():
                import uuid
                self.slug = f"{self.slug}-{uuid.uuid4().hex[:8]}"
        
        # Auto-generate short_text if not provided
        if not self.short_text and self.full_content:
            from django.utils.html import strip_tags
            plain_text = strip_tags(self.full_content)
            self.short_text = plain_text[:150] + ('...' if len(plain_text) > 150 else '')
        
        super().save(*args, **kwargs)
    
    def increment_view_count(self):
        """Increment view count by 1"""
        self.view_count += 1
        self.save(update_fields=['view_count'])
    
    @property
    def image_url(self):
        """Get the full URL of the image"""
        if self.image:
            return self.image.url
        return None

class Program(models.Model):
    image=models.ImageField(upload_to="program_images/")
    title=models.CharField(max_length=300,blank=True,null=True)
    description=models.TextField()

    def __str__(self):
        return self.title




