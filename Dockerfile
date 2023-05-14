# Backend build stage
FROM python:3.8.9-slim-buster as backend-build
WORKDIR /app/devsocial_api
COPY devsocial_api/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY devsocial_api/ ./

# Frontend build stage
FROM node:14.17.0-alpine as frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --silent
COPY client/ ./
RUN npm run build

# Nginx stage
FROM nginx:latest as nginx-build
COPY devsocial_api/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/client/build /var/www/client

# Main container stage
FROM python:3.8.9-slim-buster
WORKDIR /app
COPY --from=backend-build /app/devsocial_api /app/devsocial_api
COPY --from=nginx-build /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/client/build /var/www/client
# Set the necessary environment variables, expose ports, and other configurations
# ...

# Start the backend server and Nginx
CMD ["gunicorn", "devsocial_api.wsgi:application", "--bind", "0.0.0.0:8000"]
