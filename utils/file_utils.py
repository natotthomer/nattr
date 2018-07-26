import os
from django.conf import settings

def get_image_file_path(instance, filename):
    return os.path.join('photos', str(instance.id), filename)
