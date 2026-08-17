from rest_framework import serializers
from .models import ContactInfo



class SiteInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ContactInfo
        fields ='__all__'
       
from rest_framework import serializers

class SuggestionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200, required=True)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    subject = serializers.CharField(max_length=255, required=True)
    message = serializers.CharField(required=True)


class ContactMessageSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)
    message = serializers.CharField(required=True)