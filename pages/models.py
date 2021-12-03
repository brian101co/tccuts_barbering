from django.db import models
from shop.models import Service

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import (
    FieldPanel, 
    StreamFieldPanel, 
    InlinePanel,
    MultiFieldPanel
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.images.blocks import ImageChooserBlock
from streams.blocks import CarouselImageBlock
from wagtail.core import blocks
from wagtail.snippets.models import register_snippet
from modelcluster.fields import ParentalKey

from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key

@register_snippet
class Gallery(models.Model):
    image = models.ForeignKey(
        'wagtailimages.Image',
        blank=False,
        null=True,
        related_name='+',
        on_delete=models.SET_NULL,
        help_text="Image for the Gallery Section."
    )
    description = models.CharField(max_length=255)

    panels = [
        ImageChooserPanel("image"),
        FieldPanel("description")
    ]

    def __str__(self):
        return self.description

@register_snippet
class Testimonial(models.Model):
    image = models.ForeignKey(
        'wagtailimages.Image',
        blank=True,
        null=True,
        related_name='+',
        on_delete=models.SET_NULL,
        help_text="Image for the Gallery Section."
    )
    testimonial_text = models.TextField()
    name = models.CharField(max_length=255)

    panels = [
        ImageChooserPanel("image"),
        FieldPanel("testimonial_text"),
        FieldPanel("name")
    ]

    def __str__(self):
        return self.name


class TestimonialPlacement(Orderable, models.Model):
    page = ParentalKey('pages.HomePage', on_delete=models.CASCADE, related_name='testimonial_placements')
    testimonial = models.ForeignKey('pages.Testimonial', on_delete=models.CASCADE, related_name='+')

    panels = [
        SnippetChooserPanel("testimonial")
    ]

    def __str__(self):
        return f"{self.page.title} {self.testimonial.name}"

class HomePage(Page):
    templates = "pages/home_page.html"
    hero_carousel = StreamField([
        ("image", CarouselImageBlock())
    ])
    about = StreamField([
        ("paragraph", blocks.RichTextBlock(features=['bold', 'italic', 'link', 'ol', 'ul']))
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('hero_carousel'),
        StreamFieldPanel('about'),
        MultiFieldPanel(
            [
                InlinePanel("testimonial_placements")
            ],
            heading="Testimonials"
        )
        
    ]

    def get_context(self, request):
        context = super().get_context(request)
        context['services'] = Service.objects.all()
        context['gallery_images'] = Gallery.objects.all()[:8]
        return context

    def save(self, **kwargs):
        key = make_template_fragment_key("home_page")
        cache.delete(key)
        return super().save(**kwargs)
    