# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from account.models import User, UserProfile


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation',
                                widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', )

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class MyUserAdmin(UserAdmin):
    add_form = UserCreationForm

    list_display = ('email', 'username', 'date_joined', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = ()

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}),
    )
    search_fields = ('email',)
    ordering = ('-date_joined',)

class MyUserProfileAdmin(admin.ModelAdmin):
    list_display = ('pk', 'user',)


admin.site.register(User, MyUserAdmin)
admin.site.register(UserProfile, MyUserProfileAdmin)
