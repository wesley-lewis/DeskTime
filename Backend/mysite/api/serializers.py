from rest_framework import serializers
from .models import Students, Pictures
from django import forms


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['id', 'name', 'roll_no']


class PictureSerializer(forms.ModelForm):
    class Meta:
        model = Pictures
        fields = ['image']
