from django.urls import path 
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('project', ProjectViewset, basename='project')
urlpatterns = router.urls
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')
urlpatterns = router.urls
router.register('employees', EmployeesViewset, basename='employees')
urlpatterns = router.urls

#urlpatterns = [
 #   path('', home)
#]