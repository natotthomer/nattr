from django.conf.urls import url
from django.contrib.auth.views import logout

import views

urlpatterns = (
    url(r'^sign_in/$',
        views.sign_in,
        name='sign_in'),
    url(r'^sign_up/$',
        views.sign_up,
        name='sign_up'),
    url(r'^logout/$',
        logout,
        name='logout'),
    url(r'^read/(?P<username>[^/]+)/$',
        views.read,
        name='read'),
    url(r'^main_feed/(?P<username>[^/]+)/$',
        views.main_feed,
        name='main_feed'),
    url(r'^follow/(?P<id>[^/]+)/$',
        views.follow,
        name='follow'),
    url(r'^unfollow/(?P<id>[^/]+)/$',
        views.unfollow,
        name='unfollow'),
    url(r'^edit_profile/(?P<user_id>[^/]+)/$',
        views.edit_profile,
        name='edit_profile'),
)
