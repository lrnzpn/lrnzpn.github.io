from django.urls import path, include
from django.conf.urls import url

from rest_framework import renderers
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns

from api.views import *

router = SimpleRouter()
router.register(r'experience', ExperienceViewSet)
router.register(r'projects', ProjectViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
