from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'notices', views.NoticeViewSet, basename='notice')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/notices/simple/', views.NoticeListView.as_view(), name='notice-list-simple'),
    path('api/notices/<int:pk>/detail/', views.NoticeDetailView.as_view(), name='notice-detail-simple'),
]