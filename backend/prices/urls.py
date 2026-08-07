from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'prices', views.MarketPriceViewSet, basename='marketprice')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/prices/simple/', views.MarketPriceListView.as_view(), name='price-list-simple'),
]