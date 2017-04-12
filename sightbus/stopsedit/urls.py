from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nearby$', views.nearby ),
    url(r'^update$', views.update),
    url(r'^progress$', views.progress),
]

