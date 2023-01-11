from django.db import models
from django import forms
# Create your models here.
class Students(models.Model):
    name = models.CharField(max_length=20)
    roll_no = models.IntegerField()

class Pictures(models.Model):
    #for giving folder names as per user
    # def nameFile(instance, file_name):
    #     return '/'.join(['images',str(instance.name),file_name])
    image = models.ImageField(upload_to="my_picture/" ,blank=True)


