

import matplotlib.pyplot as plt
import numpy as np
import os
import PIL
import tensorflow as tf
from tensorflow import keras
import pathlib

def train():

  train_path = 'images_data/train/'
  valid_path = 'images_data/validation/'
  test_path = 'images_data/predict'


def save_user_images(f, name):
  os.chdir("../../../images_data/")
  os.mkdir("new_train")
  
  with open("../../../images_data/new_train/"+name+"/image.jpg") as des:
    for chunk in f.chunks():
      des.write(chunk)

def predict_the_attendance():
  names_of_people = ['amey', 'sandesh', 'nathan', 'shoydon', 'vedant', 'manasvi', 'srijita'] # Todo: need to get from the database
  response = []
  resnet_model = tf.keras.models.load_model('C://Users//vailantan fernandes//PycharmProjects//Face_detection//DeskTime//Model//trans_learn1//')
  path = pathlib.Path("C://Users//vailantan fernandes//PycharmProjects//Face_detection//DeskTime//Backend//mysite//api//output//")
  for file in path.iterdir():
    if file.is_file():
      img = keras.preprocessing.image.load_img(file, target_size=(640,480))
      x = keras.preprocessing.image.img_to_array(img)
      x = np.expand_dims(x, axis=0)
      x = tf.keras.applications.vgg16.preprocess_input(x)
      preds = resnet_model.predict(x)
      new_preds = []
      # print([preds])
      name_index = -1
      for i in preds:
        i = list(i)
        new_preds.append(i)
        name_index = i.index(max(i))

      response.append(names_of_people[name_index])
      print(new_preds)
      print(preds)
      # print("Name index: " + str(name_index))

  return response