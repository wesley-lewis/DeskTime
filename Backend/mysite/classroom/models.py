from django.db import models


class User(models.Model):
  user_id = models.AutoField(primary_key=True)
  email = models.EmailField(max_length=30)
  name = models.CharField(max_length=30)
  
  def __str__(self):
    return "User: " + str(self.user_id) + " " + self.email + " " + self.name

class Classroom(models.Model):
  classroom_id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=30)
  owner = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.name

class Participants(models.Model):
  p_id = models.AutoField(primary_key=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  classroom= models.ForeignKey(Classroom, on_delete=models.CASCADE)

  def __str__(self):
    return self.userID.name

