from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *

# Create your views here.


class CreateUserView(generics.CreateAPIView):

    """
    View to create a new user.

    HTTP Methods:
    - POST: Create a new user

    Permissions:
    - AllowAny: Any user (authenticated or not) can access this view.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserView(generics.ListAPIView):
    """
    View to list all users.

    HTTP Methods:
    - GET: List all users

    Permissions:
    - AllowAny: Any user (authenticated or not) can access this view.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
