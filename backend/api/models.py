from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Campus(models.Model):
    """Campus/location grouping for venues"""
    name = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=50, unique=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Campuses"


class Venue(models.Model):
    """Restaurant/food venue model"""
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name='venues', null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=500)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.campus.code}"

    class Meta:
        ordering = ['-created_at']


class Item(models.Model):
    """Individual menu items linked to venues"""
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='items/', null=True, blank=True)
    category = models.CharField(max_length=100, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.venue.name}"

    class Meta:
        ordering = ['-created_at']


class Review(models.Model):
    """User reviews for items"""
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to='reviews/', null=True, blank=True)
    helpful_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.item.name} ({self.rating}★)"

    class Meta:
        ordering = ['-created_at']
        unique_together = ('item', 'user')  # One review per user per item


class Rating(models.Model):
    """Aggregated ratings for items and venues"""
    # For items
    item = models.OneToOneField(
        Item, on_delete=models.CASCADE, related_name='rating', null=True, blank=True
    )
    # For venues
    venue = models.OneToOneField(
        Venue, on_delete=models.CASCADE, related_name='rating', null=True, blank=True
    )
    average_rating = models.FloatField(default=0)
    total_reviews = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.item:
            return f"Rating for {self.item.name}: {self.average_rating}★"
        return f"Rating for {self.venue.name}: {self.average_rating}★"

    class Meta:
        verbose_name_plural = "Ratings"
