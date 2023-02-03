from django import forms

class UploadUserImages(forms.Form):
  # title = forms.CharField(max_length=30)
  name = forms.CharField(max_length=30)
  file = forms.ImageField()