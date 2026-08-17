# from django.conf import settings
# from django.core.mail import EmailMessage
# from django.core.mail import send_mail
# from rest_framework.views import APIView
# from rest_framework.viewsets import ModelViewSet
# from rest_framework.response import Response
# from rest_framework import status
# from .models import ContactInfo
# from .serializers import *
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# # ==================== CONTACT INFORMATION VIEWS ====================
# class SiteViewSet(ModelViewSet):
#     queryset=ContactInfo.objects.all()
#     serializer_class=SiteInfoSerializer



# # ==================== CONTACT MESSAGE VIEW ====================

# class ContactMessageAPIView(APIView):
    
#     def post(self, request):
#         serializer = ContactMessageSerializer(data=request.data)
        
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#         data = serializer.validated_data
        
#         # ===========================
#         # Admin Email Body
#         # ===========================
#         admin_body = f"""
# नयाँ सम्पर्क सन्देश

# ----------------------------------------

# 👤 नाम:
# {data['name']}

# 📧 इमेल:
# {data['email']}

# 📝 सन्देश:
# {data['message']}

# ----------------------------------------

# यो सन्देश स्वचालित रूपमा पठाइएको हो।
# """
        
#         try:
#             # ===================================
#             # Email to Admin
#             # ===================================
#             admin_email = EmailMessage(
#                 subject=f"नयाँ सम्पर्क सन्देश - {data['name']}",
#                 body=admin_body,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 to=[settings.ADMIN_EMAIL],
#                 reply_to=[data["email"]],
#             )
#             admin_email.send(fail_silently=False)
            
#             # ===================================
#             # Auto-reply Email to User
#             # ===================================
#             user_body = f"""
# धन्यवाद {data['name']}!

# ----------------------------------------

# हामीलाई सम्पर्क गर्नुभएकोमा धन्यवाद।
# हामीले तपाईंको सन्देश प्राप्त गरेका छौं र हाम्रो टोलीले चाँडै नै जवाफ दिनेछ।

# तपाईंको सन्देश:
# "{data['message']}"

# ----------------------------------------

# सम्पर्क विवरण:

# 📱 फोन: 01-2345678
# 📧 इमेल: info@kbsnepal.org
# 📍 ठेगाना: टेकु, पचली, काठमाडौं, नेपाल

# ----------------------------------------

# हामी तपाईंको सेवामा सधैं तत्पर छौं।

# धन्यवाद,
# नेपाल खुद्रा व्यापार संघ

# Email: {settings.DEFAULT_FROM_EMAIL}
# """
            
#             user_email = EmailMessage(
#                 subject="धन्यवाद! तपाईंको सन्देश प्राप्त भयो",
#                 body=user_body,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 to=[data["email"]],
#             )
#             user_email.send(fail_silently=False)
            
#             return Response(
#                 {
#                     "success": True,
#                     "message": "सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै सम्पर्क गर्नेछौं।",
#                 },
#                 status=status.HTTP_200_OK,
#             )
            
#         except Exception as e:
#             return Response(
#                 {
#                     "success": False,
#                     "message": "सन्देश पठाउन असफल भयो। कृपया पछि प्रयास गर्नुहोस्।",
#                     "error": str(e),
#                 },
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )




# @method_decorator(csrf_exempt, name='dispatch')
# class SuggestionAPIView(APIView):

#     def post(self, request):
#         print("Request data:", request.data)  # For debugging
        
#         serializer = SuggestionSerializer(data=request.data)

#         if serializer.is_valid():
#             data = serializer.validated_data

#             email_subject = f"नयाँ सुझाव: {data['subject']}"

#             email_message = f"""
# तपाईंको वेबसाइटमा नयाँ सुझाव प्राप्त भएको छ।

# नाम: {data['name']}
# इमेल: {data['email']}
# फोन नम्बर: {data.get('phone') or 'उपलब्ध छैन'}

# विषय:
# {data['subject']}

# सुझाव:
# {data['message']}

# --------------------------------
# यो सन्देश वेबसाइटको सुझाव फारमबाट पठाइएको हो।
# """

#             try:
#                 send_mail(
#                     subject=email_subject,
#                     message=email_message,
#                     from_email=settings.DEFAULT_FROM_EMAIL,
#                     recipient_list=[settings.SUGGESTION_RECEIVER_EMAIL],
#                     fail_silently=False,
#                 )

#                 return Response(
#                     {
#                         "success": True,
#                         "message": "तपाईंको सुझाव सफलतापूर्वक पठाइएको छ।"
#                     },
#                     status=status.HTTP_200_OK
#                 )

#             except Exception as e:
#                 print("Email error:", str(e))  # For debugging
#                 return Response(
#                     {
#                         "success": False,
#                         "message": "तपाईंको सुझाव पठाउन सकिएन। कृपया पछि फेरि प्रयास गर्नुहोस्।",
#                         "error": str(e)
#                     },
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                 )

#         print("Serializer errors:", serializer.errors)  # For debugging
#         return Response(
#             {
#                 "success": False,
#                 "message": "कृपया फारममा देखाइएका त्रुटिहरू सच्याउनुहोस्।",
#                 "errors": serializer.errors
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import SuggestionSerializer, ContactMessageSerializer
import logging

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class SuggestionAPIView(APIView):
    """
    API View to handle suggestion submissions
    """
    
    def post(self, request):
        # Log the request for debugging
        logger.info(f"Received suggestion request: {request.data}")
        
        # Validate data
        serializer = SuggestionSerializer(data=request.data)
        
        if not serializer.is_valid():
            logger.warning(f"Validation errors: {serializer.errors}")
            return Response(
                {
                    "success": False,
                    "message": "कृपया फारममा देखाइएका त्रुटिहरू सच्याउनुहोस्।",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = serializer.validated_data
        
        # Prepare email
        email_subject = f"नयाँ सुझाव: {data['subject']}"
        
        email_message = f"""
तपाईंको वेबसाइटमा नयाँ सुझाव प्राप्त भएको छ।

----------------------------------------

👤 नाम: {data['name']}
📧 इमेल: {data['email']}
📱 फोन: {data.get('phone') or 'उपलब्ध छैन'}

📝 विषय:
{data['subject']}

💡 सुझाव:
{data['message']}

----------------------------------------

यो सन्देश वेबसाइटको सुझाव फारमबाट स्वचालित रूपमा पठाइएको हो।
"""
        
        try:
            # Send email
            send_mail(
                subject=email_subject,
                message=email_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.SUGGESTION_RECEIVER_EMAIL],
                fail_silently=False,
            )
            
            logger.info(f"Suggestion from {data['email']} sent successfully")
            
            return Response(
                {
                    "success": True,
                    "message": "तपाईंको सुझाव सफलतापूर्वक पठाइएको छ। धन्यवाद!"
                },
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"Failed to send suggestion email: {str(e)}")
            return Response(
                {
                    "success": False,
                    "message": "तपाईंको सुझाव पठाउन सकिएन। कृपया पछि फेरि प्रयास गर्नुहोस्।",
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@method_decorator(csrf_exempt, name='dispatch')
class ContactMessageAPIView(APIView):
    """
    API View to handle contact message submissions
    """
    
    def post(self, request):
        logger.info(f"Received contact message: {request.data}")
        
        serializer = ContactMessageSerializer(data=request.data)
        
        if not serializer.is_valid():
            logger.warning(f"Validation errors: {serializer.errors}")
            return Response(
                {
                    "success": False,
                    "message": "कृपया फारममा देखाइएका त्रुटिहरू सच्याउनुहोस्।",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = serializer.validated_data
        
        # Prepare admin email body
        admin_body = f"""
नयाँ सम्पर्क सन्देश

----------------------------------------

👤 नाम: {data['name']}
📧 इमेल: {data['email']}

📝 सन्देश:
{data['message']}

----------------------------------------

यो सन्देश स्वचालित रूपमा पठाइएको हो।
"""
        
        try:
            # Use SUGGESTION_RECEIVER_EMAIL instead of ADMIN_EMAIL
            receiver_email = getattr(settings, 'SUGGESTION_RECEIVER_EMAIL', 'contact@localhost.com')
            
            # Send email to admin
            send_mail(
                subject=f"नयाँ सम्पर्क सन्देश - {data['name']}",
                message=admin_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[receiver_email],
                fail_silently=False,
            )
            
            # Send auto-reply to user
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
"""
            
            send_mail(
                subject="धन्यवाद! तपाईंको सन्देश प्राप्त भयो",
                message=user_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[data["email"]],
                fail_silently=False,
            )
            
            logger.info(f"Contact message from {data['email']} sent successfully")
            
            return Response(
                {
                    "success": True,
                    "message": "सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै सम्पर्क गर्नेछौं।"
                },
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            return Response(
                {
                    "success": False,
                    "message": "सन्देश पठाउन असफल भयो। कृपया पछि प्रयास गर्नुहोस्।",
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )