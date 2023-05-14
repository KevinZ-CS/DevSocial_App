# Frontend stage
FROM node:14-alpine as frontend-build
WORKDIR /devsocial_app/client
COPY client/package*.json ./
RUN npm ci --silent
COPY client/ ./
ENV CI=false 
RUN npm run build


# Backend stage
FROM python:3.8.9-slim-buster as backend-build
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y build-essential
WORKDIR /devsocial_app/devsocial_api
COPY devsocial_api/requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
ENV DJANGO_SETTINGS_MODULE=devsocial_api.production
COPY . .
COPY /devsocial_api/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 8000

# Nginx stage
FROM nginx:latest
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /devsocial_app/client/build /var/www/client
COPY --from=backend-build /devsocial_app/devsocial_api/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy other necessary files for backend
COPY --from=backend-build /devsocial_app/devsocial_api/ /var/www/backend

# Expose ports and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
