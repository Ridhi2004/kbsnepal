from rest_framework import serializers
from .models import Notice
from django.utils.html import strip_tags

class NoticeSerializer(serializers.ModelSerializer):
    """
    Full serializer for Notice model
    """
    preview_content = serializers.SerializerMethodField()
    word_count = serializers.SerializerMethodField()
    read_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Notice
        fields = [
            'id',
            'title',
            'date',
            'full_content',
            'slug',
            'summary',
            'is_published',
            'is_featured',
            'view_count',
            'published_date',
            'created_at',
            'updated_at',
            'preview_content',
            'word_count',
            'read_time',
        ]
        read_only_fields = ['id', 'view_count', 'created_at', 'updated_at']
    
    def get_preview_content(self, obj):
        """Get preview of content (first 200 characters)"""
        if obj.full_content:
            plain_text = strip_tags(obj.full_content)
            return plain_text[:200] + ('...' if len(plain_text) > 200 else '')
        return ''
    
    def get_word_count(self, obj):
        """Count words in content"""
        if obj.full_content:
            plain_text = strip_tags(obj.full_content)
            return len(plain_text.split())
        return 0
    
    def get_read_time(self, obj):
        """Calculate estimated read time in minutes"""
        words = self.get_word_count(obj)
        if words == 0:
            return 0
        # Average reading speed: 200 words per minute
        minutes = words / 200
        return max(1, round(minutes))

class NoticeListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for list views (matches frontend data structure)
    """
    class Meta:
        model = Notice
        fields = [
            'id',
            'title',
            'date',
        ]

class NoticeDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for single notice view
    """
    class Meta:
        model = Notice
        fields = [
            'id',
            'title',
            'date',
            'full_content',
            'slug',
            'summary',
            'view_count',
            'published_date',
        ]