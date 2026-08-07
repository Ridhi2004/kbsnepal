from django.contrib import admin

from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django import forms
from .models import InfoItem

class InfoItemAdminForm(forms.ModelForm):
    class Meta:
        model = InfoItem
        fields = '__all__'
        widgets = {
            'full_content': forms.Textarea(attrs={'rows': 10, 'cols': 80}),
        }

@admin.register(InfoItem)
class InfoItemAdmin(admin.ModelAdmin):
    form = InfoItemAdminForm
    list_display = [
        'id', 
        'title_preview', 
        'image_preview', 
        'is_published', 
        'is_featured', 
        'view_count', 
        'published_date'
    ]
    list_filter = ['is_published', 'is_featured', 'published_date']
    search_fields = ['title', 'full_content', 'short_text']
    readonly_fields = ['view_count', 'created_at', 'updated_at', 'image_preview_large']
    prepopulated_fields = {'slug': ('title',)}
    list_per_page = 20
    ordering = ['-published_date']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'short_text', 'full_content')
        }),
        ('Image', {
            'fields': ('image', 'image_preview_large'),
            'description': 'Upload an image (JPG, PNG, GIF, WEBP)'
        }),
        ('Publication Status', {
            'fields': ('is_published', 'is_featured', 'published_date')
        }),
        ('Metadata', {
            'fields': ('view_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def title_preview(self, obj):
        """Display truncated title in admin list"""
        return obj.title[:50] + ('...' if len(obj.title) > 50 else '')
    title_preview.short_description = 'Title'
    
    def image_preview(self, obj):
        """Display image thumbnail in admin list"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return '-'
    image_preview.short_description = 'Image'
    
    def image_preview_large(self, obj):
        """Display larger image preview in admin detail"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px; border-radius: 8px;" />',
                obj.image.url
            )
        return 'No image uploaded'
    image_preview_large.short_description = 'Image Preview'
    
    actions = ['publish', 'unpublish', 'make_featured', 'remove_featured']
    
    def publish(self, request, queryset):
        queryset.update(is_published=True)
    publish.short_description = 'Publish selected items'
    
    def unpublish(self, request, queryset):
        queryset.update(is_published=False)
    unpublish.short_description = 'Unpublish selected items'
    
    def make_featured(self, request, queryset):
        queryset.update(is_featured=True)
    make_featured.short_description = 'Make selected items featured'
    
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
    remove_featured.short_description = 'Remove featured status'

