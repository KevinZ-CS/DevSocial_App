#!/bin/bash

# Source the environment variables
# set -a
# . ./.env
# set +a

python manage.py makemigrations
# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Django development server
# python manage.py runserver 0.0.0.0:8000

gunicorn backend.wsgi:application --bind 0.0.0.0:8000