from django.contrib import admin
from django.contrib import admin
from .models import Representative, Member

class MemberInline(admin.TabularInline):
    model = Member
    extra = 1
    fields = ['name', 'address', 'telephone', 'mobile', 'image']

@admin.register(Representative)
class RepresentativeAdmin(admin.ModelAdmin):
    list_display = [ 'zone_number']
    list_filter = ['zone_number']
    search_fields = ['zone', 'members__name']
    inlines = [MemberInline]
    ordering = ['zone_number']


