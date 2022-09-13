from django.contrib import admin

# Register your models here.
from .models import Apoyo, Diagram, Fuerza, Momento, Task, Viga

admin.site.register(Task)
admin.site.register(Diagram)
admin.site.register(Viga)
admin.site.register(Momento)
admin.site.register(Fuerza)
admin.site.register(Apoyo)
