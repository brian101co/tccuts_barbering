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
            send_confirmation_email(serializer.data["customer"]["email"], request.data["date"], serializer.data["service"], request.data["price"])
            send_appointment_email(request.data["date"], serializer.data["service"], serializer.data["customer"]["first_name"], serializer.data["customer"]["email"], serializer.data["customer"]["cell"], request.data["price"])
            return Response(data=serializer.data, status=201)
        return Response(data=serializer.errors, status=400)
