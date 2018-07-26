# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.

class Post(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='posts')
    text = models.CharField(max_length=280, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_client(self):
        return {
            'id': self.pk,
            'user': self.user.to_client(),
            'text': self.text if self.text else '',
            'published_at': self.get_published_at()
        }

    def get_published_at(self):
        if self.created_at:
            return {
                'month': self.created_at.strftime('%m'),
                'day': self.created_at.strftime('%d'),
                'year': self.created_at.strftime('%Y'),
                'hour': self.created_at.strftime('%I'),
                'minute': self.created_at.strftime('%M')
            }
        return ''
