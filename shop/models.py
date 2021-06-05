from django.db import models
from wagtail.snippets.models import register_snippet
from wagtail.admin.edit_handlers import (
    FieldPanel, 
    StreamFieldPanel, 
    InlinePanel,
    MultiFieldPanel
)

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    cell = models.CharField(max_length=12)
    email = models.EmailField()

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("first_name"),
                FieldPanel("last_name")
            ],
            heading="Customer's Name"
        ),
        MultiFieldPanel(
            [
                FieldPanel("cell"),
                FieldPanel("email")
            ],
            heading="Contact Information"
        )
    ]

    def __str__(self):
        return self.first_name

class Service(models.Model):
    title = models.CharField(max_length=255)
    price = models.FloatField()

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("title"),
                FieldPanel("price")
            ],
            heading="Service"
        )
    ]

    def __str__(self):
        return self.title

class Reservation(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_res')
    service = models.ManyToManyField(Service, related_name='service_res')

    class Meta:
        ordering = ('-start',)

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("start"),
                FieldPanel("end")
            ],
            heading="Reservation Times"
        ),
        FieldPanel("customer"),
        FieldPanel("service")
    ]

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

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("schedule_start_date"),
                FieldPanel("schedule_end_date")
            ],
            heading="Schedule Dates"
        ),
        MultiFieldPanel(
            [
                FieldPanel("monday_time_block"),
                FieldPanel("monday_start"),
                FieldPanel("monday_end")
            ],
            heading="Monday"
        ),
        MultiFieldPanel(
            [
                FieldPanel("tuesday_time_block"),
                FieldPanel("tuesday_start"),
                FieldPanel("tuesday_end")
            ],
            heading="Tuesday"
        ),
        MultiFieldPanel(
            [
                FieldPanel("wednesday_time_block"),
                FieldPanel("wednesday_start"),
                FieldPanel("wednesday_end")
            ],
            heading="Wednesday"
        ),
        MultiFieldPanel(
            [
                FieldPanel("thursday_time_block"),
                FieldPanel("thursday_start"),
                FieldPanel("thursday_end")
            ],
            heading="Thursday"
        ),
        MultiFieldPanel(
            [
                FieldPanel("friday_time_block"),
                FieldPanel("friday_start"),
                FieldPanel("friday_end")
            ],
            heading="Friday"
        ),
        MultiFieldPanel(
            [
                FieldPanel("saturday_time_block"),
                FieldPanel("saturday_start"),
                FieldPanel("saturday_end")
            ],
            heading="Saturday"
        ),
        MultiFieldPanel(
            [
                FieldPanel("sunday_time_block"),
                FieldPanel("sunday_start"),
                FieldPanel("sunday_end")
            ],
            heading="Sunday"
        ),
    ]

    def __str__(self):
        return f"My Schedule"