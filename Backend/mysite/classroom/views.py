from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.base import ContentFile

from datetime import timedelta
import cv2 
import numpy as np
import os

def createRoom(request):
  
  return HttpResponse("Create room")

def trainTheModel(request):
  return ""

def format_timedelta(td):
    result = str(td)
    try:
        result, ms = result.split('.')
    except ValueError:
        return (result + ".00").replace(":", "-")
    ms = int(ms)
    ms = round(ms / 1e4)
    return f"{result}.{ms:02}".replace(":", "-")

def get_saving_frames_duration(cap, saving_fps):
    s = []

    clip_duration = cap.get(cv2.CAP_PROP_FRAME_COUNT) / cap.get(cv2.CAP_PROP_FPS)

    for i in np.arange(0, clip_duration, 1 / saving_fps):
        s.append(i)
    return s

@csrf_exempt
def registerVideo(request):
  if request.method == "GET":
      return render(request, 'video.html', {})
  elif request.method =="POST":
    
    # store the file received from client to actual_file
    actual_file = request.FILES['video']
    if actual_file.content_type == 'video/mp4': 
        with open('wesley.mp4', 'wb') as f:
            f.write(actual_file.read())
    # Currently 'wesley' is the temporary file name
    filename = 'wesley'
    
    print(type(filename))
    # Usually videos are taken in 30 FPS or 24 FPS 
    SAVING_FRAMES_PER_SECOND = 30
    
    # video_file to be accessed from the server directory
    video_file = "wesley.mp4"
    # filename += "-opencv"

    # Create a directory that will contain all the frames taken from the video
    if not os.path.isdir(filename):
        os.mkdir(filename)
    cap = cv2.VideoCapture(video_file)
    fps = cap.get(cv2.CAP_PROP_FPS)

    saving_frames_per_second = min(fps, SAVING_FRAMES_PER_SECOND)
    saving_frames_duration = get_saving_frames_duration(cap, saving_frames_per_second)

    count = 0
    # Storing the snapshots into a image in the .jpg format 
    while True:
        is_read, frame = cap.read()
        if not is_read:
            break
        frame_duration = count / fps
        try:
            closest_duration = saving_frames_duration[0]
        except IndexError:
            break
        if frame_duration >= closest_duration:
            
            frame_duration_formatted = format_timedelta(timedelta(seconds=frame_duration))

            cv2.imwrite(os.path.join(filename, f"frame{frame_duration_formatted}.jpg"), frame)

            try:
                saving_frames_duration.pop(0)
            except IndexError:
                pass
        count += 1
    return HttpResponse("All good")
