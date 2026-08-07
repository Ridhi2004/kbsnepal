from django.urls import path,include
from .serializers import *
from .views import *
from rest_framework.routers import DefaultRouter

router=DefaultRouter()

router.register(r'bod',CommitteeMemberViewSet, basename='bod')

urlpatterns = [
    path('', include(router.urls))
]



