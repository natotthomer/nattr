from django import forms

from account.models import User

def clean_user_by_email(form, keyname='user'):
    email = form.cleaned_data.get(keyname)
    if not email or email == 'null':
        return None
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        raise forms.ValidationError('Unknown %s' % keyname)
    return user
