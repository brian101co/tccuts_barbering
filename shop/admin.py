from django.contrib import admin
from .models import Reservation, Customer, Schedule, Service

admin.site.register(Reservation)
admin.site.register(Customer)
admin.site.register(Schedule)
admin.site.register(Service)
