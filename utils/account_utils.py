from account.models import UserProfile

def setup_new_user(user):
    user.backend = 'django.contrib.auth.backends.ModelBackend'
    user.save()
