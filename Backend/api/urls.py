
from django.urls import path
from Home.views import Question_DetailAPIView, Question_ListCreateAPIView, AdminLoginAPIView, ChapterListView

urlpatterns = [
    path('questions/', Question_ListCreateAPIView.as_view(), name='question-list'),
    path('questions/<int:pk>/', Question_DetailAPIView.as_view(), name='question-detail'),
    
    path('chapters/', ChapterListView.as_view(), name='chapter-list'),
    
    path('admin-login/', AdminLoginAPIView.as_view(), name='admin-login'),
]