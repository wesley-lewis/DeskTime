# Generated by Django 4.1.4 on 2023-01-11 13:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participants',
            old_name='roomID',
            new_name='classroom_id',
        ),
        migrations.RenameField(
            model_name='participants',
            old_name='userID',
            new_name='user_id',
        ),
    ]