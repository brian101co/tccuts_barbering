import os
from django.template.loader import render_to_string
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *
from barber_shop.settings import SENDGRID_API_KEY

def send_confirmation_email(to_emails, date, services, price):
    email_template = render_to_string("email/confirmation-email.html", {
        "date": date, 
        "services": services, 
        "price": price
    })
    message = Mail(
        from_email=From('isaacslatten27@gmail.com'),
        to_emails=To(to_emails),
        subject=Subject('Isaac Slatten (Tccuts): Appointment Confirmation and Details'),
        html_content=HtmlContent(email_template)
    )
    try:
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)
        response = sg.client.mail.send.post(request_body=message.get())

    except Exception as e:
        print(e)

def send_appointment_email(date, service, name, email, phone, price):
    email_template = render_to_string("email/appointment-email.html", {
        "date": date, 
        "services": service, 
        "name": name, 
        "email": email, 
        "phone": phone, 
        "price":price
    })
    message = Mail(
        from_email=From('isaacslatten27@gmail.com'),
        subject=Subject(f'{name} Booked an Appointment!'),
        to_emails=To('isaacslatten27@gmail.com'),
        html_content=HtmlContent(email_template)
    )
    try:
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)
        response = sg.client.mail.send.post(request_body=message.get())

    except Exception as e:
        print(e)