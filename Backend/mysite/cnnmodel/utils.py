

import matplotlib.pyplot as plt
import numpy as np
import os
import PIL
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.python.keras.layers import Dense, Flatten
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
from keras.preprocessing.image import ImageDataGenerator
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
  resnet_model = tf.keras.models.load_model('/home/wesleylewis/Desktop/PBL/model/trans_learn1')
  path = pathlib.Path("/home/wesleylewis/Desktop/PBL/images_data/final_prediction")
  for file in path.iterdir():
    if file.is_file():
      img = keras.preprocessing.image.load_img(file, target_size=(640,480))
      x = keras.preprocessing.image.img_to_array(img)
      x = np.expand_dims(x, axis=0)
      x = tf.keras.applications.vgg16.preprocess_input(x)
      preds = resnet_model.predict(x)
      t = list(preds)
      name_index = t.index(max(t))

      response.append(names_of_people[name_index])
      print(preds)
  
  return response