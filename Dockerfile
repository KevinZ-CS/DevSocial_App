# Stage 1: Build the frontend
FROM node:14-alpine AS frontend

WORKDIR /devsocial_app/client

COPY client/package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Build the backend
FROM python:3.8.9-slim-buster AS backend

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y build-essential

WORKDIR /devsocial_app/devsocial_api

COPY devsocial_api/requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

COPY /devsocial_api/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Stage 3: Final image
FROM backend AS final

COPY --from=frontend /client/build /var/www/client

# Set the environment variable for Django production settings
ENV DJANGO_SETTINGS_MODULE=devsocial_api.production

ENTRYPOINT ["docker-entrypoint.sh"]
