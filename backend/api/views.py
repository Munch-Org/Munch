from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import *


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


class CampusViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for campuses (read-only for public).
    
    - GET /api/campuses/ - List all campuses
    - GET /api/campuses/<id>/ - Campus details with venues
    """
    queryset = Campus.objects.all()
    serializer_class = CampusSerializer
    permission_classes = [AllowAny]
    
    @action(detail=True, methods=['get'])
    def venues(self, request, pk=None):
        """Get venues for a specific campus"""
        campus = self.get_object()
        venues = campus.venues.all()
        serializer = VenueSerializer(venues, many=True)
        return Response(serializer.data)


class VenueViewSet(viewsets.ModelViewSet):
    """
    API endpoint for venues.
    
    - GET /api/venues/ - List all venues (public, filterable by campus)
    - GET /api/venues/?campus=<campus_id> - Filter by campus
    - POST /api/venues/ - Create venue (admin only)
    - GET /api/venues/<id>/ - Venue details with items (public)
    - PUT/PATCH /api/venues/<id>/ - Update venue (admin only)
    - DELETE /api/venues/<id>/ - Delete venue (admin only)
    """
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['campus']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint for items.
    
    - GET /api/items/ - List all items (public)
    - POST /api/items/ - Create item (admin only)
    - GET /api/items/<id>/ - Item details with reviews (public)
    - PUT/PATCH /api/items/<id>/ - Update item (admin only)
    - DELETE /api/items/<id>/ - Delete item (admin only)
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'description', 'category']
    ordering_fields = ['name', 'price', 'created_at']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        """Get reviews for a specific item"""
        item = self.get_object()
        reviews = item.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint for reviews.
    
    - GET /api/reviews/ - List all reviews (public)
    - POST /api/reviews/ - Create review (authenticated)
    - GET /api/reviews/<id>/ - Review details (public)
    - PUT/PATCH /api/reviews/<id>/ - Update review (owner only)
    - DELETE /api/reviews/<id>/ - Delete review (owner only)
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['item', 'rating']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        """Set the user when creating a review"""
        serializer.save(user=self.request.user)
    
    def perform_update(self, serializer):
        """Ensure only the review owner can update"""
        if serializer.instance.user != self.request.user:
            return Response(
                {"detail": "You can only update your own reviews."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()
    
    def perform_destroy(self, instance):
        """Ensure only the review owner can delete"""
        if instance.user != self.request.user:
            return Response(
                {"detail": "You can only delete your own reviews."},
                status=status.HTTP_403_FORBIDDEN
            )
        instance.delete()


class RatingViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for ratings (read-only).
    
    - GET /api/ratings/ - List all ratings
    - GET /api/ratings/<id>/ - Rating details
    """
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [AllowAny]
