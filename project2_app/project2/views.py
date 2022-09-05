from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'dcl.html')

def all_tasks(request):
    # llamar a la db y obtener todas las tareas...
    return render(request, 'all_tasks.html')