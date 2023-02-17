from django.shortcuts import render
from django.http import HttpResponse
from .forms import UploadUserImages
from .utils import save_user_images, predict_the_attendance
# Create your views here.
def train(request):

  return HttpResponse("Training the model")

def receive_photos(request):
  if request.method == "POST":
    form = UploadUserImages(request.POST, request.FILES)
    if form.is_valid():
      save_user_images(request.FILES['file'], form.name)

def predict_attendance(request):
  predictions = predict_the_attendance()
  return HttpResponse(predictions)
    

        