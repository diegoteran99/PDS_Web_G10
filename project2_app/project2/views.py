from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View

from project2.models import Task, Diagram, Fuerza, Momento, Apoyo

# Create your views here.
class EditView(View):
    def get(self,request, task_id):
        task = Task.objects.get(id=task_id)
        diagram = task.diagram.get()
        context = {
            'task':task,
            'diagram':diagram,
            'vigas': diagram.vigas.all(),
            'fuerzas': Fuerza.objects.filter(viga__diagram=diagram).all(),
            'momentos': Momento.objects.filter(viga__diagram=diagram).all(),
            'apoyos': Apoyo.objects.filter(viga__diagram=diagram).all(),
        }
        print(context)
        return render(request, 'edit_task.html', context)

    def post(self, request, task_id):
        task = Task.objects.get(id=task_id)
        new_description = request.POST.get('description')
        task.description = new_description
        task.save()
        return HttpResponse()


def all_tasks(request):
    # llamar a la db y obtener todas las tareas...
    tasks_list = Task.objects.all()
    context = {'tasks_list':tasks_list}
    return render(request, 'all_tasks.html', context)

def newTask(request):
    new_task = Task()
    new_task.save()
    new_diagram = Diagram(task = new_task)
    new_diagram.save()
    return redirect('edit_task', task_id=new_task.id)
    
    
