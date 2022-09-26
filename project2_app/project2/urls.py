from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('all_tasks', views.all_tasks, name='tasks'),
    path('tasks/<task_id>/', csrf_exempt( views.EditView.as_view()), name='edit_task'),
    path('task/new', views.newTask, name='new_task' ),
    path('register/', views.register, name='register'),
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='logout.html'), name='logout'),
]
if settings.DEBUG: 
        urlpatterns += static(settings.MEDIA_URL, 
                              document_root=settings.MEDIA_ROOT) 