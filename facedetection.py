import os
import time
import uuid
import cv2

nameOfUser = input("Enter your name: ")

IMAGES_PATH = os.path.join('images_testing', nameOfUser)
temp_path = os.path.join(os.getcwd(), 'images_testing')
os.mkdir(temp_path)
os.mkdir(os.path.join(temp_path, nameOfUser))
number_images = 10


cap = cv2.VideoCapture(0)
for imgnum in range(number_images):
  print("Collecting image {}".format(imgnum))
  ret, frame = cap.read()
  imgname = os.path.join(IMAGES_PATH, f'{str(uuid.uuid1())}.jpg')
  cv2.imwrite(imgname, frame)
  cv2.imshow('frame', frame)
  time.sleep(0.5)

  if cv2.waitKey(1) & 0xFF == ord('q'):
    break
cap.release()
cv2.destroyAllWindows()