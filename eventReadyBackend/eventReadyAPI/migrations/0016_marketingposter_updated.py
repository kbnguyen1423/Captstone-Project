# Generated by Django 4.2.10 on 2024-02-29 23:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("eventReadyAPI", "0015_merge_0014_goals_0014_merge_20240225_1727"),
    ]

    operations = [
        migrations.AddField(
            model_name="marketingposter",
            name="updated",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
