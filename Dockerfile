FROM ubuntu:latest

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Remove default nginx configuration and copy custom configuration
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
