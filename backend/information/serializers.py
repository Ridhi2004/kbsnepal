from rest_framework import serializers
from .models import InfoItem
from django.utils.html import strip_tags

class InfoItemSerializer(serializers.ModelSerializer):
    """
    Full serializer for InfoItem model
    """
    image_url = serializers.SerializerMethodField()
    preview_content = serializers.SerializerMethodField()
    word_count = serializers.SerializerMethodField()
    
    class Meta:
        model = InfoItem
        fields = [
            'id',
            'title',
            'short_text',
            'full_content',
            'image',
            'image_url',
            'slug',
            'is_published',
            'is_featured',
            'view_count',
            'published_date',
            'created_at',
            'updated_at',
            'preview_content',
            'word_count',
        ]
        read_only_fields = ['id', 'view_count', 'created_at', 'updated_at']
    
    def get_image_url(self, obj):
        """Get the full URL of the image"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
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

class InfoItemListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for list views (matches frontend data structure)
    """
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = InfoItem
        fields = [
            'id',
            'title',
            'short_text',
            'image',
            'image_url',
        ]
    
    def get_image_url(self, obj):
        """Get the full URL of the image"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class InfoItemDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for single info item view
    """
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = InfoItem
        fields = [
            'id',
            'title',
            'short_text',
            'full_content',
            'image',
            'image_url',
            'slug',
            'view_count',
            'published_date',
        ]
    
    def get_image_url(self, obj):
        """Get the full URL of the image"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None