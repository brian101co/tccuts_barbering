from wagtail.contrib.modeladmin.options import (
    ModelAdmin, 
    modeladmin_register,
    ModelAdminGroup
)
from .models import Reservation, Customer, Schedule, Service

class ScheduleAdmin(ModelAdmin):
    model = Schedule
    menu_label = "My Schedule"
    menu_icon = "list-ul"
    menu_order = 500   

class ServiceAdmin(ModelAdmin):
    model = Service
    menu_label = "Services"
    menu_icon = "list-ul"
    menu_order = 400  

class CustomerAdmin(ModelAdmin):
    model = Customer
    menu_label = "Customers"
    menu_icon = "group"
    menu_order = 300

class ReservationAdmin(ModelAdmin):
    model = Reservation
    menu_label = "Reservations"
    menu_icon = "form"
    menu_order = 200

class ShopGroup(ModelAdminGroup):
    menu_label = "Shop"
    menu_icon = "folder-inverse"
    menu_order = 300
    items = (ReservationAdmin, CustomerAdmin, ServiceAdmin, ScheduleAdmin)

modeladmin_register(ShopGroup)