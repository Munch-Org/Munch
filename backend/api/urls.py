from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'campuses', views.CampusViewSet, basename='campus')
router.register(r'venues', views.VenueViewSet, basename='venue')
router.register(r'items', views.ItemViewSet, basename='item')
router.register(r'reviews', views.ReviewViewSet, basename='review')
router.register(r'ratings', views.RatingViewSet, basename='rating')

urlpatterns = [
    # Authentication endpoints
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("register/", views.CreateUserView.as_view(), name="register"),
    path("users/", views.UserView.as_view(), name="user-list"),
    
    # API Routes
    path('', include(router.urls)),
]
