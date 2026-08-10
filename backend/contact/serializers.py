from rest_framework import serializers
from .models import ContactInfo



class ContactInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ContactInfo
        fields ='__all__'
       

class ContactMessageSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)
    message = serializers.CharField(required=True)