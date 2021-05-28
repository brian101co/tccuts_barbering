from django.urls import path
from .views import ReservationView, ScheduleView

urlpatterns = [
    path('schedule/', ScheduleView.as_view()),
    path('reservations/', ReservationView.as_view()),
]