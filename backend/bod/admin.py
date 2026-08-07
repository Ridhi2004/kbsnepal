from django.contrib import admin
from .models import CommitteeMember

# Register your models here.

@admin.register(CommitteeMember)
class CommitteeMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'phone')
    search_fields = ('name', 'role')