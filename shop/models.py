from django.db import models

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    cell = models.CharField(max_length=12)
    email = models.EmailField()

    def __str__(self):
        return self.first_name

class Service(models.Model):
    title = models.CharField(max_length=255)
    price = models.FloatField()

    def __str__(self):
        return self.title

class Reservation(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_res')
    service = models.ManyToManyField(Service, related_name='service_res')

    class Meta:
        ordering = ('-start',)

    def __str__(self):
        return f"Reservation by { self.customer }"

class Schedule(models.Model):
    TIMESLOT_CHOICES = (
        ('1', '1 hr'),
        ('1.5', '1.5 hrs'),
        ('2', '2 hrs'),
    )

    schedule_start_date = models.DateField()
    schedule_end_date = models.DateField()

    monday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    monday_start = models.TimeField(blank=True, null=True)
    monday_end = models.TimeField(blank=True, null=True)

    tuesday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    tuesday_start = models.TimeField(blank=True, null=True)
    tuesday_end = models.TimeField(blank=True, null=True)
    
    wednesday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    wednesday_start = models.TimeField(blank=True, null=True)
    wednesday_end = models.TimeField(blank=True, null=True)
    
    thursday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    thursday_start = models.TimeField(blank=True, null=True)
    thursday_end = models.TimeField(blank=True, null=True)

    friday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    friday_start = models.TimeField(blank=True, null=True)
    friday_end = models.TimeField(blank=True, null=True)

    saturday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    saturday_start = models.TimeField(blank=True, null=True)
    saturday_end = models.TimeField(blank=True, null=True)

    sunday_time_block = models.CharField(choices=TIMESLOT_CHOICES, max_length=5, blank=True, null=True)
    sunday_start = models.TimeField(blank=True, null=True)
    sunday_end = models.TimeField(blank=True, null=True)

    def __str__(self):
        return f"My Schedule"