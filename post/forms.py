import re

from django import forms

from post.models import Post

class PostForm(forms.ModelForm):
    user = forms.CharField(required=False)
    text = forms.CharField(required=False)

    class Meta:
        model = Post
        fields = ('user', 'text',)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(PostForm, self).__init__(*args, **kwargs)

    def clean_text(self):
        return self.cleaned_data.get('text')

    def clean_user(self):
        return self.user
