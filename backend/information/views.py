from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import *
from .serializers import *

class InfoItemViewSet(ModelViewSet):
    """
    ViewSet for InfoItem model with additional actions
    """
    queryset = InfoItem.objects.all()
    serializer_class = InfoItemSerializer

    
    # def get_serializer_class(self):
    #     if self.action == 'list' and not self.request.query_params.get('detailed'):
    #         return InfoItemListSerializer
    #     elif self.action == 'retrieve':
    #         return InfoItemDetailSerializer
    #     return InfoItemSerializer
    
    # def get_serializer_context(self):
    #     """Add request to serializer context for full image URLs"""
    #     context = super().get_serializer_context()
    #     context.update({'request': self.request})
    #     return context
    
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
    #             Q(short_text__icontains=search)
    #         )
        
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
    # def get_latest_items(self, request):
    #     """
    #     Get latest information items
    #     """
    #     limit = int(request.query_params.get('limit', 10))
    #     queryset = self.get_queryset()[:limit]
    #     serializer = InfoItemListSerializer(
    #         queryset, 
    #         many=True, 
    #         context={'request': request}
    #     )
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['get'], url_path='featured')
    # def get_featured_items(self, request):
    #     """
    #     Get featured information items
    #     """
    #     queryset = self.get_queryset().filter(is_featured=True)
    #     serializer = InfoItemListSerializer(
    #         queryset, 
    #         many=True, 
    #         context={'request': request}
    #     )
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['get'], url_path='search')
    # def search_items(self, request):
    #     """
    #     Search information items by keyword
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
    #     serializer = InfoItemListSerializer(
    #         queryset, 
    #         many=True, 
    #         context={'request': request}
    #     )
    #     return Response(serializer.data)
    
    # @action(detail=True, methods=['post'], url_path='view')
    # def increment_view(self, request, pk=None):
    #     """
    #     Increment view count for an info item
    #     """
    #     item = self.get_object()
    #     item.increment_view_count()
    #     return Response({
    #         'message': 'View count incremented', 
    #         'views': item.view_count
    #     })

# class InfoItemListView(generics.ListAPIView):
#     """
#     Simple list view for information items (matches frontend exactly)
#     """
#     queryset = InfoItem.objects.filter(is_published=True).order_by('-published_date')
#     serializer_class = InfoItemListSerializer
    
#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context.update({'request': self.request})
#         return context

# class InfoItemDetailView(generics.RetrieveAPIView):
#     """
#     Simple detail view for a single information item
#     """
#     queryset = InfoItem.objects.filter(is_published=True)
#     serializer_class = InfoItemDetailSerializer
    
#     def retrieve(self, request, *args, **kwargs):
#         """Override retrieve to increment view count"""
#         instance = self.get_object()
#         instance.increment_view_count()
#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)

class ProgramViewSet(ModelViewSet):
    queryset=Program.objects.all()
    serializer_class=ProgramSerializers