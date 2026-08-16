# serializers.py
from rest_framework import serializers
from .models import Representative, Member

class MemberSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Member
        fields = ['id', 'name', 'address', 'telephone', 'mobile', 'image', 'image_url']
        read_only_fields = ['id']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class RepresentativeSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, read_only=True)
    
    class Meta:
        model = Representative
        fields = ['id', 'zone_number', 'members']
        read_only_fields = ['id']

class RepresentativeCreateSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True)
    
    class Meta:
        model = Representative
        fields = [ 'zone_number', 'members']
    
    def create(self, validated_data):
        members_data = validated_data.pop('members')
        representative = Representative.objects.create(**validated_data)
        
        for member_data in members_data:
            Member.objects.create(representative_zone=representative, **member_data)
        
        return representative
    
    def update(self, instance, validated_data):
        members_data = validated_data.pop('members', None)
        
        instance.zone = validated_data.get( instance.zone)
        instance.zone_number = validated_data.get('zone_number', instance.zone_number)
        instance.save()
        
        if members_data is not None:
            instance.members.all().delete()
            for member_data in members_data:
                Member.objects.create(representative_zone=instance, **member_data)
        
        return instance