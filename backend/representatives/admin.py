from django.contrib import admin
from django.contrib import admin
from .models import Representative, Member



class MemberInline(admin.TabularInline):
    model = Member
    extra = 1
    fields = ['name', 'address', 'telephone', 'mobile', 'image']


@admin.register(Representative)
class RepresentativeAdmin(admin.ModelAdmin):
    list_display = ['zone_number', 'created_at', 'updated_at']
    list_filter = ['zone_number']
    search_fields = ['zone_number', 'members__name']
    ordering = ['zone_number']
    inlines = [MemberInline]


# @admin.register(Member)
# class MemberAdmin(admin.ModelAdmin):
#     list_display = [
#         'name',
#         'representative',
#         'address',
#         'telephone',
#         'mobile',
#         'created_at'
#     ]
#     list_filter = ['representative']
#     search_fields = [
#         'name',
#         'address',
#         'telephone',
#         'mobile'
#     ]
#     ordering = ['name']