from django.db import models

# Create your models here.
class TestAttendance(models.Model):
  data = models.DateField()
  amey = models.BooleanField()
  sandesh = models.BooleanField()
  nathan = models.BooleanField()
  shoydon = models.BooleanField()
  vedant = models.BooleanField()
  manasvi = models.BooleanField()
  srijita = models.BooleanField()

