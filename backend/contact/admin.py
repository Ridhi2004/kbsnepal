
from django.contrib import admin

from .models import ContactInfo


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = [
        'email',
        'phone',
        'is_active',
        'created_at',
        'updated_at',
    ]

    list_filter = [
        'is_active',
        'created_at',
    ]

    search_fields = [
        'email',
        'phone',
        'address',
    ]

    readonly_fields = [
        'created_at',
        'updated_at',
    ]

    ordering = ['-updated_at']
