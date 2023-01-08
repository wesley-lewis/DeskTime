from django.contrib import admin
from .models import Students , Pictures
# Register your models here.
admin.site.register(Students)
admin.site.register(Pictures)

class AdminProfile(admin.ModelAdmin):
    list_display = ['image','name']
