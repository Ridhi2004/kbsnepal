from django.contrib import admin
from django.utils.html import format_html
from .models import MarketPrice

@admin.register(MarketPrice)
class MarketPriceAdmin(admin.ModelAdmin):
    list_display = ['no', 'item', 'current1', 'current2', 'old1', 'old2', 'trend_display',  'is_active']
    list_filter = ['category', 'unit', 'is_active', 'last_updated']
    search_fields = ['item', 'no']
    readonly_fields = ['last_updated', 'created_at', 'price_difference_display']
    list_per_page = 50
    ordering = ['no']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('no', 'item', 'unit', 'is_active')
        }),
        ('Price Information', {
            'fields': ('old1', 'old2', 'current1', 'current2'),
            'description': 'Prices in NPR (Nepalese Rupees)'
        }),
        ('Metadata', {
            'fields': ('last_updated', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def trend_display(self, obj):
        trend = obj.trend
        colors = {
            'up': 'green',
            'down': 'red',
            'same': 'gray'
        }
        arrows = {
            'up': '▲',
            'down': '▼',
            'same': '●'
        }
        return format_html(
            '<span style="color: {}; font-weight: bold;">{} {}</span>',
            colors.get(trend, 'gray'),
            arrows.get(trend, '●'),
            trend.upper()
        )
    trend_display.short_description = 'Trend'
    
    def price_difference_display(self, obj):
        diff = obj.price_difference
        if diff is not None:
            color = 'green' if diff > 0 else 'red' if diff < 0 else 'gray'
            return format_html('<span style="color: {}; font-weight: bold;">{} NPR</span>', color, diff)
        return 'N/A'
    price_difference_display.short_description = 'Price Difference'
    
    actions = ['mark_active', 'mark_inactive']
    
    def mark_active(self, request, queryset):
        queryset.update(is_active=True)
    mark_active.short_description = 'Mark selected as active'
    
    def mark_inactive(self, request, queryset):
        queryset.update(is_active=False)
    mark_inactive.short_description = 'Mark selected as inactive'
