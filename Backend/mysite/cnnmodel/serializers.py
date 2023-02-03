from rest_framework import serializers

from django import forms

class PhotoSerializer(forms.ModelForm):
  class Meta: 
    
    fields = ['id', 'name', 'roll_no']
