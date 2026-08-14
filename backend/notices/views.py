from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Notice
from .serializers import (
    NoticeSerializer, 
    NoticeListSerializer, 
    NoticeDetailSerializer
)

class NoticeViewSet(viewsets.ModelViewSet):
   
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
  
    
    # def get_serializer_class(self):
    #     if self.action == 'list' and not self.request.query_params.get('detailed'):
    #         return NoticeListSerializer
    #     elif self.action == 'retrieve':
    #         return NoticeDetailSerializer
    #     return NoticeSerializer
    
    # def get_queryset(self):
    #     queryset = super().get_queryset()
        
    #     # Filter by featured
    #     featured = self.request.query_params.get('featured')
    #     if featured and featured.lower() == 'true':
    #         queryset = queryset.filter(is_featured=True)
        
    #     # Search by title or content
    #     search = self.request.query_params.get('search')
    #     if search:
    #         queryset = queryset.filter(
    #             Q(title__icontains=search) |
    #             Q(full_content__icontains=search) |
    #             Q(summary__icontains=search)
    #         )
        
    #     # Filter by date range (Nepali date format)
    #     date_from = self.request.query_params.get('date_from')
    #     date_to = self.request.query_params.get('date_to')
    #     if date_from:
    #         queryset = queryset.filter(date__gte=date_from)
    #     if date_to:
    #         queryset = queryset.filter(date__lte=date_to)
        
    #     # Order by latest by default
    #     order_by = self.request.query_params.get('order_by', '-published_date')
    #     if order_by:
    #         queryset = queryset.order_by(order_by)
        
    #     return queryset
    
    # def retrieve(self, request, *args, **kwargs):
    #     """Override retrieve to increment view count"""
    #     instance = self.get_object()
    #     instance.increment_view_count()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['get'], url_path='latest')
    # def get_latest_notices(self, request):
    #     """
    #     Get latest notices
    #     """
    #     limit = int(request.query_params.get('limit', 10))
    #     queryset = self.get_queryset()[:limit]
    #     serializer = NoticeListSerializer(queryset, many=True)
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['get'], url_path='featured')
    # def get_featured_notices(self, request):
    #     """
    #     Get featured notices
    #     """
    #     queryset = self.get_queryset().filter(is_featured=True)
    #     serializer = NoticeListSerializer(queryset, many=True)
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['get'], url_path='search')
    # def search_notices(self, request):
    #     """
    #     Search notices by keyword
    #     """
    #     query = request.query_params.get('q', '')
    #     if not query:
    #         return Response(
    #             {'error': 'Search query is required'}, 
    #             status=status.HTTP_400_BAD_REQUEST
    #         )
        
    #     queryset = self.get_queryset().filter(
    #         Q(title__icontains=query) |
    #         Q(full_content__icontains=query)
    #     )
    #     serializer = NoticeListSerializer(queryset, many=True)
    #     return Response(serializer.data)
    
    # @action(detail=True, methods=['post'], url_path='view')
    # def increment_view(self, request, pk=None):
    #     """
    #     Increment view count for a notice
    #     """
    #     notice = self.get_object()
    #     notice.increment_view_count()
    #     return Response({'message': 'View count incremented', 'views': notice.view_count})

class NoticeListView(generics.ListAPIView):
    """
    Simple list view for notices (matches frontend exactly)
    """
    queryset = Notice.objects.filter(is_published=True).order_by('-published_date')
    serializer_class = NoticeListSerializer

class NoticeDetailView(generics.RetrieveAPIView):
    """
    Simple detail view for a single notice
    """
    queryset = Notice.objects.filter(is_published=True)
    serializer_class = NoticeDetailSerializer
