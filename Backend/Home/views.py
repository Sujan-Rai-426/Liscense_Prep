from rest_framework import generics
from Home.models import Chapter, Question
from Home.serializers import Chapter_Serializer, Question_Serializer
from Home.permissions import IsAdminUserOrReadOnly
from rest_framework.permissions import AllowAny 

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# views for creating and listing questions
class Question_ListCreateAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = Question_Serializer
    permission_classes = [AllowAny]  # Any one with admin page can post questions

# model views for retrieving questions
class Question_DetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = Question_Serializer
    permission_classes = [AllowAny]  # any one can view the questions

# View for logging in as admin
class AdminLoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None and user.is_superuser:
            # Create the JWT token with the user as the subject
            refresh = RefreshToken.for_user(user)
            
            # Add a custom claim indicating if the user is an admin
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            # Attach the 'is_admin' claim manually
            refresh.access_token["is_admin"] = True  # Custom claim indicating admin status
            
            # Return the tokens
            return Response({
                "access_token": access_token,
                "refresh_token": refresh_token,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials or user is not admin."}, status=status.HTTP_401_UNAUTHORIZED)


# Chapter ViewSet
class ChapterListView(APIView):
    def get(self, request):
        chapters = Chapter.objects.all()
        serializer = Chapter_Serializer(chapters, many=True)
        return Response(serializer.data)
