from queue import PriorityQueue
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View 
from .forms import UserRegisterForm
from .forms import TaskForm
from django.contrib.auth.forms import  UserCreationForm
from project2.models import Task, Diagram, Fuerza, Momento, Apoyo
from django.contrib.auth.models import  User
from django.contrib import messages

# Create your views here.
class EditView(View):
    def get(self,request, task_id):
        task = Task.objects.get(id=task_id)
        diagram = task.diagram.get()
        context = {
            'task':task,
            'dcl':task.dcl,
            'diagram':diagram,
            'vigas': diagram.vigas.all(),
            'fuerzas': Fuerza.objects.filter(viga__diagram=diagram).all(),
            'momentos': Momento.objects.filter(viga__diagram=diagram).all(),
            'apoyos': Apoyo.objects.filter(viga__diagram=diagram).all(),
        }
        #print(context)
        return render(request, 'edit_task.html', context)

    def post(self, request, task_id):
        print(request.POST.get('ident'))
        task = Task.objects.get(id=task_id)
        
        if request.POST.get('ident') == 'description':
            new_description = request.POST.get('description')
            task.description = new_description
            task.save()
        elif request.POST.get('ident') == 'json':
            dcl_update = request.POST.get('json_')
            task.dcl = dcl_update
            task.save()
            
        return render(request, 'edit_task.html')


def all_tasks(request):
    # llamar a la db y obtener todas las tareas...
    tasks_list = Task.objects.all()
    context = {'tasks_list':tasks_list}
    return render(request, 'all_tasks.html', context)

def users(request):
    users_list = User.objects.all()
    context = {'users_list':users_list}
    return render(request, 'users.html', context)

def inicio(request):
    return render(request, 'inicio.html')



def newTask(request):
    new_task = Task()
    new_task.save()
    new_diagram = Diagram(task = new_task)
    new_diagram.save()
    return redirect('edit_task', task_id=new_task.id)
    
    
def task_view(request): 
  
    if request.method == 'POST': 
        form = TaskForm(request.POST, request.FILES) 
  
        if form.is_valid(): 
            form.save() 
            return redirect('success') 
    else: 
        form = TaskForm() 
    return render(request, 'edit_task.html', {'form' : form}) 

def register(request):
    if request.method == 'POST': 
        form = UserCreationForm(request.POST) 

        if form.is_valid(): 
            form.save()
            return redirect('login')
    else: 
        form = UserRegisterForm()
    context = {'form' : form}  
    return render(request,'register.html', context)

def delete(request, id_task):
    task = Task.objects.get(pk=id_task)
    task.delete()
    tasks = Task.objects.all()
    return render(request, 'all_tasks.html', {"tasks_list":tasks, "mensaje": "OK"})



  