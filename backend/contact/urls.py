from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
   

router = DefaultRouter()
router.register(r'messages', SiteViewSet, basename='contact')

urlpatterns = [
    
    # path('api/contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    # path('api/contact/list/', ContactMessageListView.as_view(), name='contact-list'),
    # path('api/contact/<int:pk>/', ContactMessageDetailView.as_view(), name='contact-detail'),

    path('', include(router.urls)),
    
  
]

