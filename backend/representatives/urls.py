# app/urls.py
from django.urls import path, include
from .views import RepresentativeViewSet, MemberViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'representatives', RepresentativeViewSet, basename='representative')
router.register(r'members', MemberViewSet, basename='member')

urlpatterns = [
    path('', include(router.urls)),
]