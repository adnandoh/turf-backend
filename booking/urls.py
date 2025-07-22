from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Cricket routers
cricket_router = DefaultRouter()
cricket_router.register(r'slots', views.CricketSlotViewSet, basename='cricket-slots')
cricket_router.register(r'bookings', views.CricketBookingViewSet, basename='cricket-bookings')
cricket_router.register(r'blocks', views.CricketBlockViewSet, basename='cricket-blocks')

# Pickleball routers
pickleball_router = DefaultRouter()
pickleball_router.register(r'slots', views.PickleballSlotViewSet, basename='pickleball-slots')
pickleball_router.register(r'bookings', views.PickleballBookingViewSet, basename='pickleball-bookings')
pickleball_router.register(r'blocks', views.PickleballBlockViewSet, basename='pickleball-blocks')

urlpatterns = [
    path('api/cricket/', include(cricket_router.urls)),
    path('api/pickleball/', include(pickleball_router.urls)),
    path('api/admin/dashboard/', views.admin_dashboard, name='admin-dashboard'),
] 