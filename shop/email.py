import os
from django.template.loader import render_to_string
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from barber_shop.settings import SENDGRID_API_KEY

def send_confirmation_email(to_emails, date, services, price):
    email_template = render_to_string("email/confirmation-email.html", {
        "date": date, 
        "services": services, 
        "price": price
    })
    message = Mail(
        from_email='isaacslatten27@gmail.com',
        to_emails=to_emails,
        subject='Isaac Slatten (Tccuts): Appointment Confirmation and Details',
        html_content=email_template
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)

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
        from_email='isaacslatten27@gmail.com',
        to_emails='isaacslatten27@gmail.com',
        subject=f'{name} Booked an Appointment!',
        html_content=email_template
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)

    except Exception as e:
        print(e)