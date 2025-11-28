from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    """
    Using Django's built-in User model for authentication.
     
    - Automatically Hashes and Salts Passwords
    - Simplifies User Management
    """
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}