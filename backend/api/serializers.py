from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Campus, Venue, Item, Review, Rating


class UserSerializer(serializers.ModelSerializer):
    """
    Using Django's built-in User model for authentication.

    - Automatically Hashes and Salts Passwords
    - Simplifies User Management
    """

    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CampusSerializer(serializers.ModelSerializer):
    """Campus/location grouping for venues"""
    venue_count = serializers.SerializerMethodField()

    class Meta:
        model = Campus
        fields = ["id", "name", "code", "city", "state", "description", "venue_count", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]

    def get_venue_count(self, obj):
        return obj.venues.count()


class RatingSerializer(serializers.ModelSerializer):
    """Aggregated ratings for items and venues"""

    class Meta:
        model = Rating
        fields = ["id", "average_rating", "total_reviews", "updated_at"]
        read_only_fields = ["average_rating", "total_reviews", "updated_at"]


class ReviewSerializer(serializers.ModelSerializer):
    """Reviews with user information"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ["id", "user", "rating", "title", "content", "image", "helpful_count", "created_at", "updated_at"]
        read_only_fields = ["user", "helpful_count", "created_at", "updated_at"]


class ItemSerializer(serializers.ModelSerializer):
    """Individual menu items with reviews"""
    reviews = ReviewSerializer(many=True, read_only=True)
    rating = RatingSerializer(read_only=True)
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ["id", "venue", "name", "description", "price", "image", "category", 
                  "is_available", "reviews", "rating", "review_count", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]

    def get_review_count(self, obj):
        return obj.reviews.count()


class VenueSerializer(serializers.ModelSerializer):
    """Venues with nested items, campus info, and aggregated rating"""
    items = ItemSerializer(many=True, read_only=True)
    rating = RatingSerializer(read_only=True)
    campus_detail = CampusSerializer(source='campus', read_only=True)
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Venue
        fields = ["id", "campus", "campus_detail", "name", "description", "address", "latitude", "longitude", 
                  "phone", "website", "opening_time", "closing_time", "items", 
                  "rating", "item_count", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]

    def get_item_count(self, obj):
        return obj.items.count()
