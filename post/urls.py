from django.conf.urls import url

import views

urlpatterns = (
    url(r'^create/$',
        views.create,
        name='create'),
    url(r'^read_user_posts/(?P<user_id>[^/]+)/$',
        views.read_user_posts,
        name='read_user_posts'),
    # url(r'^delete/(?P<id>[^/]+)/$',
    #     views.delete,
    #     name='delete'),
)
