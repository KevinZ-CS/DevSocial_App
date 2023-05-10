#!/bin/bash

# Source the environment variables
set -a
. ./.env
set +a

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Django development server
python manage.py runserver 0.0.0.0:8000

