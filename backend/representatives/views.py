from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from .models import Representative, Member
from .serializers import (
    RepresentativeSerializer, 
    RepresentativeCreateSerializer,
    MemberSerializer
)

class RepresentativeViewSet(viewsets.ModelViewSet):
    queryset = Representative.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return RepresentativeCreateSerializer
        return RepresentativeSerializer
    
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        representative = self.get_object()
        members = representative.members.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        representative = self.get_object()
        serializer = MemberSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(representative_zone=representative)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]