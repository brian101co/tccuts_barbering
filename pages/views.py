from django.shortcuts import render
from django.views import View
from shop.models import Service
from .models import Page

class HomePageView(View):
    def get(self, request):
        services = Service.objects.all()
        home = Page.objects.first()
        return render(request, 'pages/index.html', {'services':services, 'page':home})
