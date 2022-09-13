from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('', views.all_tasks, name='tasks'),
    path('tasks/<task_id>/', csrf_exempt( views.EditView.as_view()), name='edit_task'),
    path('task/new', views.newTask, name='new_task' )
]