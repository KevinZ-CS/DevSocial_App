FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && \
    apt-get install -y dialog apt-utils

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Remove default nginx configuration and copy custom configuration
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
