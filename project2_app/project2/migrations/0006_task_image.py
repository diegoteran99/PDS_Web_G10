# Generated by Django 4.1 on 2022-09-15 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("project2", "0005_alter_apoyo_viga_alter_fuerza_value_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
    ]
