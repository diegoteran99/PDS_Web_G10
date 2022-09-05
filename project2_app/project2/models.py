from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.TextField()
    description = models.TextField()
    difficulty = models.IntegerField()

    def __str__(self):
        return self.description



class Dcl(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)