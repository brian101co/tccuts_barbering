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
