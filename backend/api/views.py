from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *

# Create your views here.

class UserView(generics.ListCreateAPIView):
    """
    View to List and create users.

    HTTP Methods:
    - GET: List all users
    - POST: Create a new user

    Permissions:
    - AllowAny: Any user (authenticated or not) can access this view.
    """
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer