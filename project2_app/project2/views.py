from django.shortcuts import render
from django.http import HttpResponse

from project2.models import Task

# Create your views here.
def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'dcl.html')

def all_tasks(request):
    # llamar a la db y obtener todas las tareas...
    tasks_list = Task.objects.all()
    context = {'tasks_list':tasks_list}
    return render(request, 'all_tasks.html', context)