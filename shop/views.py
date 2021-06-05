import datetime
import json
from django.shortcuts import render
from .models import Reservation, Schedule
from .serializers import ReservationSerializer, ScheduleSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .utils import getOpenings
from shop.email import send_confirmation_email, send_appointment_email
from shop.sms import send_sms_confirmation

class ScheduleView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        shedule = Schedule.objects.first()
        serializer = ScheduleSerializer(shedule)
        return Response(data=serializer.data, status=200)

class ReservationView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        if request.GET.get("date"):
            date = datetime.date.fromisoformat(request.GET.get("date"))
            qs = Reservation.objects.filter(start__date=date).all()
            openings = getOpenings(date, qs)
            return Response(data=json.dumps(openings), status=200)
        return Response(data=json.dumps([{"message": "Please specify a date query parameter. Ex: ?date='YYYY-MM-DD'"}]), status=200)

    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            date = request.data["date"]
            phone_num = serializer.data["customer"]["cell"]
            f_name = serializer.data["customer"]["first_name"]
            send_confirmation_email(serializer.data["customer"]["email"], date, serializer.data["service"], request.data["price"])
            send_appointment_email(date, serializer.data["service"], f_name, serializer.data["customer"]["email"], phone_num, request.data["price"])
            message = send_sms_confirmation(
                f"Your appointment has been booked for {date}. Thank you, {f_name}!",
                phone_num
            )
            return Response(data=serializer.data, status=201)
        return Response(data=serializer.errors, status=400)
