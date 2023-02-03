from django.urls import path

from . import views

urlpatterns = [
  path('train', views.train, name='cnn-train'),
  path('predict', views.predict_attendance, name='cnn-predict'),
]