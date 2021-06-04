from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock

class HeaderBlock(blocks.StructBlock):
    class Meta:
        template = "streams/heading_block.html"
    title = blocks.CharBlock()
    header_level = blocks.ChoiceBlock(
        choices=[
            ('h2', 'h2'),
            ('h3', 'h3'),
            ('h4', 'h4'),
            ('h5', 'h5'),
        ]
    )

class CarouselImageBlock(blocks.StructBlock):
    class Meta:
        template = "streams/carousel_image_block.html"
    image = ImageChooserBlock()
