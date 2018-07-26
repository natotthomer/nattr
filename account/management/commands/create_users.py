import os

from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings

from account.models import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        print 'Creating users...'
        # Create admin users
        nat = User.objects.create_user('nathomer', 'nathaniel.ott.homer@gmail.com', 'password')
        nat.is_superuser = True
        nat.is_staff = True
        nat.is_admin = True
        nat.save()

        dem = User.objects.create_user('demnevanni', 'demnevanni@gmail.com', 'password')
        dem.is_superuser = True
        dem.is_staff = True
        dem.is_admin = True
        dem.save()

        # Create dummy users

        test1 = User.objects.create_user('test1', 'test1@gmail.com', 'password')
        test1.save()
        test2 = User.objects.create_user('test2', 'test2@gmail.com', 'password')
        test2.save()
        test3 = User.objects.create_user('test3', 'test3@gmail.com', 'password')
        test3.save()
        test4 = User.objects.create_user('test4', 'test4@gmail.com', 'password')
        test4.save()

        print 'Done'
