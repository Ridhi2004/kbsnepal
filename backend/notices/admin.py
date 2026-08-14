from django.contrib import admin
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import Notice

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['title_preview', 'date', 'is_published', 'is_featured', 'view_count', 'published_date']
    list_filter = ['is_published', 'is_featured', 'published_date']
    search_fields = ['title', 'full_content', 'date']
    readonly_fields = ['view_count', 'created_at', 'updated_at', 'content_preview']
    list_per_page = 20
    ordering = ['-published_date']
    
    fieldsets = (
        ('Notice Information', {
            'fields': ('title', 'date', 'full_content', 'summary')
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
    
    def content_preview(self, obj):
        """Preview content in admin"""
        return mark_safe(obj.full_content[:200] + ('...' if len(obj.full_content) > 200 else ''))
    content_preview.short_description = 'Content Preview'
    
    actions = ['publish', 'unpublish', 'make_featured', 'remove_featured']
    
    def publish(self, request, queryset):
        queryset.update(is_published=True)
    publish.short_description = 'Publish selected notices'
    
    def unpublish(self, request, queryset):
        queryset.update(is_published=False)
    unpublish.short_description = 'Unpublish selected notices'
    
    def make_featured(self, request, queryset):
        queryset.update(is_featured=True)
    make_featured.short_description = 'Make selected notices featured'
    
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
    remove_featured.short_description = 'Remove featured status'

