from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tasks', views.all_tasks, name='tasks'),
]