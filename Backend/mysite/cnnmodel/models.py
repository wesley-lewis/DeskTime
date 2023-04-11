from django.db import models

# Create your models here.
class Attendance(models.Model):
  # data = models.DateField()
  # amey = models.BooleanField()
  # sandesh = models.BooleanField()
  # nathan = models.BooleanField()
  # shoydon = models.BooleanField()
  # vedant = models.BooleanField()
  # manasvi = models.BooleanField()
  # srijita = models.BooleanField()
  name = models.CharField(max_length=20)
  student_id = models.CharField(max_length=15)
  date = models.DateTimeField()
  class_id = models.CharField()
  

