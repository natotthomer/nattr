# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-03 18:30
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_auto_20171002_1918'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visible_name', models.CharField(blank=True, max_length=128, null=True)),
                ('website', models.CharField(blank=True, max_length=1028, null=True)),
                ('description', models.CharField(blank=True, max_length=512, null=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_profile',
                'verbose_name': 'user_profile',
            },
        ),
    ]
