from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("register/", views.CreateUserView.as_view(), name="register"),
    path("users/", views.UserView.as_view(), name="user-list-create"),
]
