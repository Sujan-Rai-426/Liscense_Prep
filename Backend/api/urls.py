
from django.urls import path
from Home.views import Question_DetailAPIView, Question_ListCreateAPIView
from Home.views import AdminLoginAPIView
urlpatterns = [
    path('questions/', Question_ListCreateAPIView.as_view(), name='question-list'),
    path('questions/<int:pk>/', Question_DetailAPIView.as_view(), name='question-detail'),
    
    path('admin-login/', AdminLoginAPIView.as_view(), name='admin-login'),
]