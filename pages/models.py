from django.db import models

class Page(models.Model):
    title = models.CharField(max_length=50)
    about = models.TextField()

    def __str__(self):
        return self.title

class Gallery(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="gallery")
    image = models.ImageField(upload_to='gallery')
    description = models.CharField(max_length=100)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Carousel(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="carousel")
    image = models.ImageField(upload_to='carousel')
    description = models.CharField(max_length=100)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title