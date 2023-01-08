from django.shortcuts import render, HttpResponse
from rest_framework.parsers import JSONParser

from .models import Students, Pictures
from .serializers import StudentSerializer, PictureSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

@csrf_exempt
# Create your views here.
def studentDetails(request):
    if request.method == "GET":
        students = Students.objects.all()
        serializer = StudentSerializer(students, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)


@csrf_exempt

def pictureDetails(request):

    if request.method == "POST":
        serializer = PictureSerializer(data=request.POST, files=request.FILES)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return HttpResponse("image uploaded")
        else:
            print(serializer.errors)
            return HttpResponse(serializer.errors)
    else:
        pass
    #     return HttpResponse("Hello world")
        # if serializer.is_valid():
        #     serializer.save()
        #     return HttpResponse("image uploaded")
        # else:
        #     print(serializer.errors)
        #     return HttpResponse("Hello world")
        # serializer = PictureSerializer(request.POST,request.FILES)
        #
        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse(serializer.data, status=201)
        # else:
        #     return JsonResponse(serializer.errors, status=400)
