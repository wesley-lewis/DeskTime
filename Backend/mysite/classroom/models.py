from django.db import models


class User(models.Model):
  user_id = models.AutoField(primary_key=True)
  email = models.EmailField(max_length=30)
  name = models.CharField(max_length=30)
  
class Classroom(models.Model):
  classroom_id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=30)
  owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Participants(models.Model):
  p_id = models.AutoField(primary_key=True)
  userID = models.ForeignKey(User, on_delete=models.CASCADE)
  roomID = models.ForeignKey(Classroom, on_delete=models.CASCADE)

