from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import MarketPrice
from .serializers import MarketPriceSerializer, MarketPriceListSerializer, MarketPriceBulkCreateSerializer

class MarketPriceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for MarketPrice model with additional actions
    """
    queryset = MarketPrice.objects.filter(is_active=True)
    serializer_class = MarketPriceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list' and not self.request.query_params.get('detailed'):
            return MarketPriceListSerializer
        return MarketPriceSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # Search by item name
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(item__icontains=search)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(current1__gte=min_price)
        if max_price:
            queryset = queryset.filter(current1__lte=max_price)
        
        return queryset
    
    @action(detail=False, methods=['get'], url_path='trending')
    def get_trending(self, request):
        """
        Get items with price trends
        """
        queryset = self.get_queryset()
        trending_up = queryset.filter(current1__gt=models.F('current2'))
        trending_down = queryset.filter(current1__lt=models.F('current2'))
        
        data = {
            'trending_up': self.get_serializer(trending_up, many=True).data,
            'trending_down': self.get_serializer(trending_down, many=True).data,
        }
        return Response(data)
    
    @action(detail=False, methods=['post'], url_path='bulk-create')
    def bulk_create_prices(self, request):
        """
        Bulk create or update prices
        """
        serializer = MarketPriceBulkCreateSerializer(data=request.data)
        if serializer.is_valid():
            prices = serializer.save()
            return Response(
                MarketPriceSerializer(prices, many=True).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['patch'], url_path='update-prices')
    def update_prices(self, request, pk=None):
        """
        Update only price fields for a specific item
        """
        price = get_object_or_404(MarketPrice, pk=pk)
        serializer = MarketPriceSerializer(price, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], url_path='latest-updates')
    def get_latest_updates(self, request):
        """
        Get recently updated prices
        """
        limit = int(request.query_params.get('limit', 10))
        queryset = self.get_queryset().order_by('-last_updated')[:limit]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class MarketPriceListView(generics.ListAPIView):
    """
    Simplified list view for market prices
    """
    queryset = MarketPrice.objects.filter(is_active=True).order_by('no')
    serializer_class = MarketPriceListSerializer
