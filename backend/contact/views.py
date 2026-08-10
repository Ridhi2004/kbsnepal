from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import ContactInfo
from .serializers import ContactInfoSerializer, ContactMessageSerializer

# ==================== CONTACT INFORMATION VIEWS ====================
class SiteViewSet(ModelViewSet):
    queryset=ContactInfo.objects.all()
    serializer_class=ContactInfoSerializer

 

# ==================== CONTACT MESSAGE VIEW ====================

class ContactMessageCreateView(APIView):
    
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        
        # ===========================
        # Admin Email Body
        # ===========================
        admin_body = f"""
नयाँ सम्पर्क सन्देश

----------------------------------------

👤 नाम:
{data['name']}

📧 इमेल:
{data['email']}

📝 सन्देश:
{data['message']}

----------------------------------------

यो सन्देश स्वचालित रूपमा पठाइएको हो।
"""
        
        try:
            # ===================================
            # Email to Admin
            # ===================================
            admin_email = EmailMessage(
                subject=f"नयाँ सम्पर्क सन्देश - {data['name']}",
                body=admin_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.ADMIN_EMAIL],
                reply_to=[data["email"]],
            )
            admin_email.send(fail_silently=False)
            
            # ===================================
            # Auto-reply Email to User
            # ===================================
            user_body = f"""
धन्यवाद {data['name']}!

----------------------------------------

हामीलाई सम्पर्क गर्नुभएकोमा धन्यवाद।
हामीले तपाईंको सन्देश प्राप्त गरेका छौं र हाम्रो टोलीले चाँडै नै जवाफ दिनेछ।

तपाईंको सन्देश:
"{data['message']}"

----------------------------------------

सम्पर्क विवरण:

📱 फोन: 01-2345678
📧 इमेल: info@kbsnepal.org
📍 ठेगाना: टेकु, पचली, काठमाडौं, नेपाल

----------------------------------------

हामी तपाईंको सेवामा सधैं तत्पर छौं।

धन्यवाद,
नेपाल खुद्रा व्यापार संघ

Email: {settings.DEFAULT_FROM_EMAIL}
"""
            
            user_email = EmailMessage(
                subject="धन्यवाद! तपाईंको सन्देश प्राप्त भयो",
                body=user_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[data["email"]],
            )
            user_email.send(fail_silently=False)
            
            return Response(
                {
                    "success": True,
                    "message": "सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै सम्पर्क गर्नेछौं।",
                },
                status=status.HTTP_200_OK,
            )
            
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "सन्देश पठाउन असफल भयो। कृपया पछि प्रयास गर्नुहोस्।",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )