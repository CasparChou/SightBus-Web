from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search/$', views.search),
    url(r'^estimate/$', views.estimate),
    url(r'^stops/$', views.stops),
    url(r'^plan/$', views.routeplanner),
    url(r'^avgtime/$', views.avgtime),
]

