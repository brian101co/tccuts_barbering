from .models import Customer, Reservation, Schedule, Service
from rest_framework import serializers

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['title',]

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'cell', 'email', 'recieve_updates']

class ReservationSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(many=True)
    customer = CustomerSerializer()

    class Meta:
        model = Reservation
        fields = ['start', 'end', 'customer', 'service']

    def create(self, validated_data):
        customer_data = validated_data.pop('customer')
        service_data = validated_data.pop('service')
        customer = Customer.objects.create(**customer_data)
        reservation = Reservation.objects.create(customer=customer, **validated_data)
        for key in service_data:
            service = Service.objects.get(title=key['title'])
            reservation.service.add(service)   
        return reservation

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'