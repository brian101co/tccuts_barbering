import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from stylist.settings import SENDGRID_API_KEY

def send_confirmation_email(start, to_emails, date, service):
    style = '''
            <style>
                main {
                    font-family: 'Arial';
                }

                h1 {

                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .subtitle {
                    text-align: center;
                    font-size: 1.75rem;
                    margin-bottom: 1.5rem;
                }

                h2 {
                    text-align: center;
                }

                p {
                    text-align: center;
                }
            </style>
            '''
    message = Mail(
        from_email='isaacslatten27@gmail.com',
        to_emails=to_emails,
        subject='Isaac Slatten: Appointment Confirmation and Details',
        html_content=f'''
        <body>
            {style}
            <div class="main" >
                <h1>Thank You!</h1>
                <div class="subtitle" >Your appointment has been successfully scheduled.</div>
                <hr>
                <h2>Appointment Details</h2>
                <p>Date: { date }</p>
                <p>Appointment Start Time: { start }</p>
                { service }
            </div>
            </body>
        ''')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)

    except Exception as e:
        print(e)

def appointment_email(start, date, service, name, email, phone):
    style = '''
            <style>
                main {
                    font-family: 'Arial';
                }

                h1 {

                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .subtitle {
                    text-align: center;
                    font-size: 1.75rem;
                    margin-bottom: 1.5rem;
                }

                h2 {
                    text-align: center;
                }

                p {
                    text-align: center;
                }
            </style>
            '''
    message = Mail(
        from_email='isaacslatten27@gmail.com',
        to_emails='isaacslatten27@gmail.com',
        subject='New Appointment Booked!',
        html_content=f'''
        <body>
            {style}
            <div class="main" >
                <h2>Appointment Details</h2>
                <p>Date: { date }</p>
                <p>Appointment Start Time: { start }</p>
                { service }
                <h2>Customer Contact Information</h2>
                <p>First Name: { name }</p>
                <p>Email: { email }</p>
                <p>Phone: { phone }</p>
            </div>
            </body>
        ''')
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)

    except Exception as e:
        print(e)