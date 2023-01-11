from django.urls import path
from .views import *

urlpatterns = [
  path('createroom/', createRoom, name='createroom'),
  
]