from django.db import models
from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField  

class Notice(models.Model):
    """
    Model to store official notices/announcements
    """
    title = models.CharField(max_length=500, help_text="Notice title")
    date = models.CharField(max_length=50, help_text="Date in Nepali format (e.g., २०८१ असार १५)")
    full_content = RichTextField(
        help_text="Full content of the notice with HTML formatting"
    )
    
    # Optional fields for better management
    slug = models.SlugField(max_length=500, unique=True, blank=True, help_text="URL-friendly identifier")
    summary = models.TextField(max_length=500, blank=True, help_text="Short summary of the notice")
    is_published = models.BooleanField(default=True, help_text="Whether this notice is published")
    is_featured = models.BooleanField(default=False, help_text="Whether this is a featured notice")
    
    # Metadata
    view_count = models.PositiveIntegerField(default=0, help_text="Number of views")
    published_date = models.DateTimeField(default=timezone.now, help_text="When the notice was published")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date', '-id']
        verbose_name = 'Notice'
        verbose_name_plural = 'Notices'
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['is_published']),
            models.Index(fields=['is_featured']),
            models.Index(fields=['slug']),
        ]
    
    def __str__(self):
        return self.title[:100]  # Truncate for display
    
    def save(self, *args, **kwargs):
        # Auto-generate slug from title if not provided
        if not self.slug:
            from django.utils.text import slugify
            import re
            # Remove Nepali Unicode and special characters for slug
            base_slug = re.sub(r'[^\w\s-]', '', self.title)
            base_slug = re.sub(r'[-\s]+', '-', base_slug)
            self.slug = slugify(base_slug)[:490]  # Limit length for uniqueness
            
            # Ensure uniqueness
            if Notice.objects.filter(slug=self.slug).exists():
                import uuid
                self.slug = f"{self.slug}-{uuid.uuid4().hex[:8]}"
        
        # Auto-generate summary if not provided
        if not self.summary and self.full_content:
            # Strip HTML tags and get first 150 characters
            from django.utils.html import strip_tags
            plain_text = strip_tags(self.full_content)
            self.summary = plain_text[:150] + ('...' if len(plain_text) > 150 else '')
        
        super().save(*args, **kwargs)
    
    def increment_view_count(self):
        """Increment view count by 1"""
        self.view_count += 1
        self.save(update_fields=['view_count'])

