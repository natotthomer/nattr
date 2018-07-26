# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from rest_framework.decorators import api_view

from account.models import User
from post.forms import PostForm

@api_view(['POST'])
def create(request):
    form = PostForm(request.POST, user=request.user)
    if form.is_valid():
        post = form.save()
        return JsonResponse(post.to_client())
    else:
        return JsonResponse(form.errors, status=400)

@api_view(['GET'])
def read_user_posts(request, user_id):
    user = User.objects.get(pk=user_id)
    posts = [post.to_client() for post in user.posts.all()]
    return JsonResponse({'posts': posts})

@api_view(['POST'])
def delete(request, id):
    pass
