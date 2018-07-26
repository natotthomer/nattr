# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin

from utils.file_utils import get_image_file_path
# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_short_name(self):
        return self.username

    def to_user(self):
        return {
            'id': self.pk,
            'username': self.username,
            'email': self.email,
            'followers': [account.follower.pk for account in self.followed_by.all().select_related('follower')],
            'following': [account.following.pk for account in self.follows.all().select_related('following')],
            'profile': self.profile.to_user(),
            'posts': [post.to_client() for post in self.posts.all()]
        }

    def to_client(self):
        return {
            'id': self.pk,
            'username': self.username,
            'email': self.email,
            'followers_count': self.followed_by.all().select_related('follower').count(),
            'following_count': self.follows.all().select_related('following').count(),
            'profile': self.profile.to_user(),
            'posts': self.posts.all().count()
        }

    # def following(self):
    #     user_follows = self.follows.all().select_related('following')
    #     users = [account.following for account in user_follows]
    #     return [user.to_user() for user in following]


class UserProfile(models.Model):
    visible_name = models.CharField(max_length=128, blank=True, null=True)
    website = models.CharField(max_length=1028, blank=True, null=True)
    description = models.CharField(max_length=512, blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', blank=True, null=True)
    profile_image = models.ImageField(upload_to=get_image_file_path, blank=True, null=True)
    banner_image = models.ImageField(upload_to=get_image_file_path, blank=True, null=True)

    class Meta:
        db_table = 'user_profile'
        verbose_name = 'user_profile'

    def to_user(self):
        return {
            'visible_name': self.visible_name if self.visible_name else '',
            'website': self.website if self.website else '',
            'description': self.description if self.description else '',
            'user_id': self.user.pk,
            'profile_image': self.get_profile_image_url(),
            'banner_image': self.get_banner_image_url(),
        }

    def get_profile_image_url(self):
        if self.profile_image:
            return self.profile_image.url
        else:
            return False

    def get_banner_image_url(self):
        if self.banner_image:
            return self.banner_image.url
        else:
            return False


class UserFollow(models.Model):
    follower = models.ForeignKey('User', models.CASCADE, related_name='follows')
    following = models.ForeignKey('User', models.CASCADE, related_name='followed_by')

    class Meta:
        unique_together = ('follower', 'following')

    def to_user(self):
        return {
            'id': self.pk,
            'follower': self.follower.pk,
            'following': self.following.pk
        }
