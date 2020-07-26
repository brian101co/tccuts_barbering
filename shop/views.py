import datetime
from django.shortcuts import render
from .models import Customer, Reservation, Schedule
from .serializers import CustomerSerializer, ReservationSerializer, ScheduleSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .utils import services_as_p
from shop.email import send_confirmation_email, appointment_email


class EmailView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        services = services_as_p(request.data['service'])
        send_confirmation_email(request.data['start'], request.data['email'], request.data['date'], services)
        appointment_email(request.data['start'], request.data['date'], services, request.data['name'], request.data['email'], request.data['phone'])
        return Response()

class ScheduleView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        shedule = Schedule.objects.all()
        serializer = ScheduleSerializer(shedule, many=True)
        return Response(data=serializer.data, status=200)

class CustomerView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(data=serializer.data, status=200)
    
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ReservationView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, year, month, day, *args, **kwargs):
        reservations = Reservation.objects.filter(start__date=datetime.date(year, month, day)).all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(data=serializer.data, status=200)

    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        return Response(data=serializer.errors, status=400)
