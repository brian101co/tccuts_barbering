from django.urls import path
from .views import CustomerView, ReservationView, ScheduleView, EmailView

urlpatterns = [
    path('customers/', CustomerView.as_view()),
    path('schedule/', ScheduleView.as_view()),
    path('email/', EmailView.as_view()),
    path('reservations/', ReservationView.as_view()),
    path('reservations/<int:year>/<int:month>/<int:day>/', ReservationView.as_view()),
]