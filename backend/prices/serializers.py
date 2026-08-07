from rest_framework import serializers
from .models import MarketPrice

class MarketPriceSerializer(serializers.ModelSerializer):
    """
    Serializer for MarketPrice model
    """
    price_difference = serializers.SerializerMethodField()
    trend = serializers.SerializerMethodField()
    category_display = serializers.SerializerMethodField()
    unit_display = serializers.SerializerMethodField()
    
    class Meta:
        model = MarketPrice
        fields = [
            'id',
            'no',
            'item',
            'old1',
            'old2',
            'current1',
            'current2',
            'category',
            'category_display',
            'unit',
            'unit_display',
            'is_active',
            'price_difference',
            'trend',
            'last_updated',
            'created_at',
        ]
        read_only_fields = ['id', 'last_updated', 'created_at']
    
    def get_price_difference(self, obj):
        return obj.price_difference
    
    def get_trend(self, obj):
        return obj.trend
    
    def get_category_display(self, obj):
        return obj.get_category_display()
    
    def get_unit_display(self, obj):
        return obj.get_unit_display()

class MarketPriceListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for list views
    """
    class Meta:
        model = MarketPrice
        fields = [
            'no',
            'item',
            'old1',
            'old2',
            'current1',
            'current2',
        ]

class MarketPriceBulkCreateSerializer(serializers.Serializer):
    """
    Serializer for bulk creating/updating prices
    """
    prices = MarketPriceSerializer(many=True)
    
    def create(self, validated_data):
        prices_data = validated_data.get('prices', [])
        created_prices = []
        for price_data in prices_data:
            serializer = MarketPriceSerializer(data=price_data)
            if serializer.is_valid():
                price = serializer.save()
                created_prices.append(price)
        return created_prices