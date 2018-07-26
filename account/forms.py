import re

from django import forms

from account.models import User, UserFollow, UserProfile
from utils.clean_utils import clean_user_by_email

class UserCreationForm(forms.ModelForm):
    username = forms.CharField()
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'username')

    def clean_username(self):
        username = self.cleaned_data.get('username').lower()
        rx = re.compile('\W+')
        cleaned_username = rx.sub('', username).strip()
        if username is not cleaned_username:
            raise forms.ValidationError("Invalid username")
        elif self.instance.id:
            try:
                users = User.objects.filter(username=username)
                for user in users:
                    if user.id == self.instance.id:
                        return cleaned_username
            except User.DoesNotExist:
                return cleaned_username
        elif User.objects.filter(username=username).exists():
            raise forms.ValidationError("That username is not available")
        return cleaned_username

    def clean_email(self):
        email = self.cleaned_data.get('email').lower()
        if self.instance:  # Covers update case
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return email
            if user.id != self.instance.id:
                raise forms.ValidationError("That email address is already registered")
            else:
                return email
        if User.objects.filter(email=email).exists():  # Covers create case
            raise forms.ValidationError("That email address is already registered")
        return email

    def clean_password2(self):
        password_1 = self.cleaned_data.get('password1')
        password_2 = self.cleaned_data.get('password2')
        if password_1 != password_2:
            raise forms.ValidationError("The two passwords do not match.")
        return password_2


class UserProfileForm(forms.ModelForm):
    user = forms.CharField(required=False)
    visible_name = forms.CharField(required=False)
    description = forms.CharField(required=False)
    website = forms.CharField(required=False)
    profile_image = forms.ImageField(required=False)
    banner_image = forms.ImageField(required=False)

    class Meta:
        model = UserProfile
        fields = ('user', 'visible_name', 'description', 'website', 'profile_image', 'banner_image')

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        super(UserProfileForm, self).__init__(*args, **kwargs)

    def clean_website(self):
        return self.cleaned_data.get('website')

    def clean_profile_image(self):
        try:
            files = self.files.getlist('profile_image_file')
            for file in files:
                if file:
                    if file._size > 15*1024*1024:
                        raise forms.ValidationError("Image file is too large ( > 15mb ).")
                else:
                    raise forms.ValidationError("Could not read the uploaded file.")
            return files[0]
        except:
            return None

    def clean_banner_image(self):
        try:
            files = self.files.getlist('banner_image_file')
            for file in files:
                if file:
                    if file._size > 15*1024*1024:
                        raise forms.ValidationError("Image file is too large ( > 15mb ).")
                else:
                    raise forms.ValidationError("Could not read the uploaded file.")
            return files[0]
        except:
            return None

    def clean_description(self):
        return self.cleaned_data.get('description')

    def clean_visible_name(self):
        return self.cleaned_data.get('visible_name')

    def clean_user(self):
        return self.user


class UserFollowForm(forms.ModelForm):
    follower = forms.CharField()
    following = forms.CharField()

    class Meta:
        model = UserFollow
        fields = ('follower', 'following')

    def __init__(self, *args, **kwargs):
        self.follower = kwargs.pop('follower', None)
        self.following = kwargs.pop('following', None)
        super(UserFollowForm, self).__init__(*args, **kwargs)

    def clean_follower(self):
        return self.follower

    def clean_following(self):
        return self.following

    def clean_user(self):
        return self.user
