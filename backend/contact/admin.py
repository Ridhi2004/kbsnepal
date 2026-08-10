from django.contrib import admin

# from .models import ContactMessage

# @admin.register(ContactMessage)
# class ContactMessageAdmin(admin.ModelAdmin):
#     list_display = ['name', 'email', 'created_at', 'is_read']
#     list_filter = ['is_read', 'created_at']
#     search_fields = ['name', 'email', 'message']
#     readonly_fields = ['created_at']
#     ordering = ['-created_at']
    
#     actions = ['mark_as_read', 'mark_as_unread']
    
#     def mark_as_read(self, request, queryset):
#         queryset.update(is_read=True)
#     mark_as_read.short_description = "पढिएको चिन्ह लगाउनुहोस्"
    
#     def mark_as_unread(self, request, queryset):
#         queryset.update(is_read=False)
#     mark_as_unread.short_description = "नपढिएको चिन्ह लगाउनुहोस्"

