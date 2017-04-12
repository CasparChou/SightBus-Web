from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^nearby/$', views.nearby),
    url(r'^search/$', views.search),
    url(r'^nearest/$', views.nearest),
    url(r'^estimate/$', views.estimate),
    url(r'^weather/$', views.weather),
]

