# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install required packages for Debconf
RUN apk add --no-cache \
    dialog \
    libterm-readline-gnu

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Set the backend URL for production
ENV REACT_APP_BACKEND_URL='https://<devsocial-api>.onrender.com/api/'

# In the frontend Dockerfile, the REACT_APP_BACKEND_URL environment variable is set to the URL of the production backend. This URL would need to be specified by you and would depend on where you are hosting your production backend.
# For example, if you are hosting your backend on Heroku, the URL might look something like https://your-app-name.herokuapp.com/.

# Build the app for production
RUN npm run build

# Set the command to start the app
CMD ["npm", "start"]
