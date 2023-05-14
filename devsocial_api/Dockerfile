# Use an official Python runtime as a parent image
FROM python:3.8.9-slim-buster

ENV PYTHONUNBUFFERED 1

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential

# Set the working directory to /devsocial_api
WORKDIR /devsocial_api

# Copy the requirements file into the container
COPY requirements.txt .

# Install the requirements
RUN pip3 install --no-cache-dir -r requirements.txt

# Set the environment variable for Django production settings
ENV DJANGO_SETTINGS_MODULE=devsocial_api.production

# Copy the rest of the application code into the container
COPY . .

# Copy the docker-entrypoint.sh script into the container
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh


# Set the entrypoint to the docker-entrypoint.sh script
ENTRYPOINT ["docker-entrypoint.sh"]
