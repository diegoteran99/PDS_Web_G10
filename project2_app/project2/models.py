from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True,default="")
    difficulty = models.IntegerField(null=True)
    dcl = models.JSONField(null=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.description

class Diagram(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="diagram")

class Viga(models.Model):
    diagram = models.ForeignKey(Diagram, on_delete=models.CASCADE, blank=True, null=True, related_name="vigas")
    x0 = models.IntegerField()
    y0 = models.IntegerField()
    length = models.IntegerField()
    angle = models.IntegerField(default=0)

class Fuerza(models.Model):
    viga = models.ForeignKey(Viga, on_delete=models.CASCADE, blank=True, null=True, related_name="fuerzas")
    at_start = models.BooleanField()
    angle = models.IntegerField()
    value = models.IntegerField(default=90)

class Momento(models.Model):
    viga = models.ForeignKey(Viga, on_delete=models.CASCADE, blank=True, null=True, related_name="momentos")
    at_start = models.BooleanField()
    value = models.IntegerField()

class Apoyo(models.Model):
    viga = models.ForeignKey(Viga, on_delete=models.CASCADE, blank=True, null=True, related_name="apoyos")
    at_start = models.BooleanField()
    tipo = models.IntegerField()

# class Student(models.Model):
#     pass





# class Dcl(models.Model):
#     task = models.ForeignKey(Task, on_delete=models.CASCADE)