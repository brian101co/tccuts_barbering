# Generated by Django 3.2.3 on 2021-06-04 00:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0005_auto_20210603_2349'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='testimonials',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='pages.testimonial'),
        ),
    ]