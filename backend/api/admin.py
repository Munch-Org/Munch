from django.contrib import admin
from .models import Campus, Venue, Item, Review, Rating


@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'city', 'state', 'created_at')
    search_fields = ('name', 'code', 'city')
    list_filter = ('created_at', 'state')
    ordering = ('name',)
    
    fieldsets = (
        ('Campus Information', {
            'fields': ('name', 'code')
        }),
        ('Location', {
            'fields': ('city', 'state')
        }),
        ('Details', {
            'fields': ('description',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'campus', 'address', 'phone', 'created_at')
    search_fields = ('name', 'address', 'campus__name')
    list_filter = ('campus', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('campus', 'name', 'description', 'address')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude'),
            'classes': ('collapse',)
        }),
        ('Contact', {
            'fields': ('phone', 'website'),
            'classes': ('collapse',)
        }),
        ('Hours', {
            'fields': ('opening_time', 'closing_time'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'venue', 'price', 'category', 'is_available', 'created_at')
    search_fields = ('name', 'venue__name', 'category')
    list_filter = ('is_available', 'category', 'created_at', 'venue__campus')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Item Details', {
            'fields': ('venue', 'name', 'description', 'category')
        }),
        ('Pricing & Availability', {
            'fields': ('price', 'is_available')
        }),
        ('Media', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'item', 'rating', 'title', 'created_at')
    search_fields = ('user__username', 'item__name', 'title', 'content')
    list_filter = ('rating', 'created_at', 'item__venue__campus')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Review Information', {
            'fields': ('item', 'user')
        }),
        ('Rating & Content', {
            'fields': ('rating', 'title', 'content')
        }),
        ('Media', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Engagement', {
            'fields': ('helpful_count',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'average_rating', 'total_reviews', 'updated_at')
    list_filter = ('updated_at',)
    ordering = ('-updated_at',)
    readonly_fields = ('average_rating', 'total_reviews', 'updated_at')
    
    fieldsets = (
        ('Rating Data', {
            'fields': ('item', 'venue', 'average_rating', 'total_reviews')
        }),
        ('Metadata', {
            'fields': ('updated_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_name(self, obj):
        if obj.item:
            return f"{obj.item.name} (Item)"
        return f"{obj.venue.name} (Venue)" if obj.venue else "Unknown"
    get_name.short_description = "Name"
