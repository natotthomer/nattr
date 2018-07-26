#!/usr/bin/env bash
if [ "$VIRTUAL_ENV" == "" ]; then
  source ../pyenvs/nattrenv/bin/activate
fi


dropdb -h localhost -U nathanielotthomer -w nattr
createdb -h localhost -U nathanielotthomer -w nattr
if [ "$1" == "make" ]; then
  ./manage.py makemigrations
fi
./manage.py migrate
./manage.py create_users
./manage.py runserver 8000
