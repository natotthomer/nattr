from __future__ import unicode_literals

import json

from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def root(request):
    user = request.user if request.user.is_authenticated() else None

    payload = {}

    if user:
        user = user.to_user()

        payload = {
            'session': {
                'currentUser': user,
            },
            'browse': {
                'feed': [],
                'users': {
                    'list': [],
                    'current': {}
                }
            }
        }

    return render(request, 'partials/root.html', {'payload': json.dumps(payload)})
