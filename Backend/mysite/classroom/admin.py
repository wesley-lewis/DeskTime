from django.contrib import admin
from .models import User, Classroom, Participants

admin.site.register(User)
admin.site.register(Classroom)
admin.site.register(Participants)

class AdminProfile(admin.ModelAdmin):
  list_display = ['user', 'classroom', 'participants']