# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working directory to /app
WORKDIR /devsocial_api

# Copy the requirements file into the container
COPY requirements.txt .

# Install the requirements
RUN pip install --no-cache-dir -r requirements.txt

# Set the environment variable for Django production settings
ENV DJANGO_SETTINGS_MODULE=devsocial_api.settings.production

# Copy the rest of the application code into the container
COPY . .

# Expose the port for the Django backend
EXPOSE 8000

# Copy the docker-entrypoint.sh script into the container
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the entrypoint to the docker-entrypoint.sh script
ENTRYPOINT ["docker-entrypoint.sh"]

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
