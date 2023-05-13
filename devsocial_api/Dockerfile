# Use an official Python runtime as a parent image
FROM python:3.8.9-slim-buster

ENV PYTHONUNBUFFERED 1

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential

# Set the working directory to /app
WORKDIR /devsocial_api

# Copy the requirements file into the container
COPY requirements.txt .

# Install the requirements
RUN pip3 install --no-cache-dir -r requirements.txt


# Copy the rest of the application code into the container
COPY . .


