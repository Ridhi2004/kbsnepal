from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
# router.register(r'contact', SiteViewSet, basename='contact')

urlpatterns = [
    # Make sure the URL pattern is correct
    path('suggestions/', SuggestionAPIView.as_view(), name='suggestion-create'),
    path('message/', ContactMessageAPIView.as_view(), name='message'),
    path('', include(router.urls)),
]