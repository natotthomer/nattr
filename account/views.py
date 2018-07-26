# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import authenticate, login
from django.db import IntegrityError
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view

from account.models import User, UserFollow
from account.forms import UserCreationForm, UserFollowForm, UserProfileForm
from utils.account_utils import setup_new_user

def read(request, username):
    try:
        user = User.objects.get(username=username)
        user = user.to_user()
    except User.DoesNotExist:
        return JsonResponse({'error': 'Account not found'}, status=400)
    return JsonResponse(user)

@require_POST
def sign_in(request):
    email = request.POST['email']
    password = request.POST['password']

    user = authenticate(username=email.lower(), password=password)

    if user is not None and user.is_active:
        login(request, user)
        return JsonResponse(user.to_user())
    else:
        return JsonResponse(
            {'login': 'Invalid email/password combination'},
            status=400)

@csrf_exempt
@require_POST
def sign_up(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        user = User.objects.create_user(
            username=form.cleaned_data.get('username'),
            email=form.cleaned_data.get('email'),
            password=form.cleaned_data.get('password2')
        )
        setup_new_user(user)
        login(request, user)
        return JsonResponse(user.to_user())
    else:
        return JsonResponse(form.errors, status=400)

# @api_view(['POST'])
def follow(request, id):
    following = User.objects.get(pk=id)
    try:
        form = UserFollow.objects.create(follower=request.user, following=following)
    except IntegrityError:
        return JsonResponse({'error': 'You\'re already following that user'}, status=400)
    return JsonResponse({'user_followed': following.to_user()})

@api_view(['POST'])
def unfollow(request, id):
    try:
        follow = UserFollow.objects.get(follower=request.user, following__pk=id)
        follow.delete()
        return JsonResponse({
            'user': request.user.pk,
            'unfollowed': int(id)
        })
    except:
        return JsonResponse({'errors': 'Could not unfollow'}, status=400)


@api_view(['POST'])
def edit_profile(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        form = UserProfileForm(request.POST, request.FILES, instance=user.profile, user=request.user)
        valid = form.is_valid()
        if valid:
            profile = form.save()
            return JsonResponse(profile.to_user())
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    except User.DoesNotExist:
        return JsonResponse({'errors': 'cannot find user with that id'}, status=400)

def main_feed(request, username):
    try:
        user = User.objects.get(id=request.user.id)
        following = [account.following for account in user.follows.all().select_related('following')]
        posts = [account.posts.all() for account in following]
    except User.DoesNotExist:
        users = User.objects.all()
        posts = [account.posts.all() for account in users]
    try:
        parsed_posts = [post.to_client() for post in posts[0]]
    except IndexError:
        return JsonResponse({'feed': []})
    return JsonResponse({'feed': parsed_posts})
