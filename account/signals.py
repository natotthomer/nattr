from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify

from account.models import User, UserProfile


@receiver(post_save, sender=User)
def user_post_save(sender, instance, **kwargs):
    try:
        profile = instance.profile
    except UserProfile.DoesNotExist:
        profile, created = UserProfile.objects.get_or_create(user=instance)

# post_save.connect(user_post_save, sender=User)
