from twilio.rest import Client
from barber_shop.settings import ACCOUNT_SID, AUTH_TOKEN, TWILIO_PHONE_NUM

client = Client(ACCOUNT_SID, AUTH_TOKEN)

def send_sms_confirmation(text, to_phone_num):
    message = client.messages.create(
        body=text,
        from_=TWILIO_PHONE_NUM,
        to=to_phone_num
    )
    return message

def send_sms_reminder(to_phone_num, appointment_date):
    message = client.messages.create(
        body=f'Reminder: Your appointment with Isaac Slatten (Tccuts) is on {appointment_date}. \n\n You may opt out of all messages by replying "STOP" to this message.',
        from_=TWILIO_PHONE_NUM,
        to=to_phone_num
    )
    return message
