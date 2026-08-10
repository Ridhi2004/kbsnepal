"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
      # Swagger  UI
    path('swager/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
      # Redoc UI
    path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # website url
    path('api/',include('bod.urls')),
    path('api/',include('representatives.urls')),
    path('api/',include('prices.urls')),
    path('api/',include('notices.urls')),
    path('api/',include('information.urls')),
    path('api/',include('contact.urls'))
     
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
