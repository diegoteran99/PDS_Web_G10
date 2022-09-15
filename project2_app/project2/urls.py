from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.all_tasks, name='tasks'),
    path('tasks/<task_id>/', csrf_exempt( views.EditView.as_view()), name='edit_task'),
    path('task/new', views.newTask, name='new_task' )
]
if settings.DEBUG: 
        urlpatterns += static(settings.MEDIA_URL, 
                              document_root=settings.MEDIA_ROOT) 