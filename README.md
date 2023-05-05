## Project Status
Project is actively being worked on. Issues and Pull Requests are welcomed.

## DevSocial

Devsocial is a networking web application designed for web developers. 
The platform provides users with the ability to create an account and 
securely log in to showcase their portfolio projects, share feedback, 
and interact with other users through the comment section of each post. 
Both users and posts have full CRUD functionality, providing a seamless experience for all.

The frontend of this application is built using ReactJS, which incorporates 
the sleek styling of Material-UI. To ensure efficient global state management, 
Redux Toolkit has been integrated into the application. The backend API is built 
using Django REST framework and is powered by PostgreSQL as the primary database.

# Built With

![ReactJS](https://img.shields.io/badge/ReactJS-17.0.2-blue)


## Installation
To get started with the Devsocial project, first fork and clone this repository to your local machine. Once you have the code, you'll need to install the necessary dependencies for both the frontend and backend.

## Frontend Installation
To install the frontend dependencies, navigate to the client directory within the project and run the following command:
```
npm install 
```
This will install all the required packages and libraries needed to run the frontend.

## Backend Installation

## 1. Database Setup
Devsocial uses PostgreSQL as the primary database. If you don't already have PostgreSQL installed, 
download and install it first. After installing PostgreSQL, create a new database by running the following command:
```
create database database_name
```

## 2. Migrations
Devsocial uses Django's built-in migration system to create and manage database tables. Before running the server, you'll need to apply the existing migrations by running the following command:
```
python manage.py migrate
```
This will create all the necessary tables in the database.

## 3. Installing Dependencies
To install the backend dependencies, navigate to the devsocial_api directory within the project and run the following command:
```
pip install -r requirements.txt
```
This will install all the required Python packages and libraries needed to run the backend.

## 4. Configuration File
Make sure to update the DATABASES section in devsocial_api/settings.py to include your PostgreSQL credentials, if necessary:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'devsocial_db',
        'USER': '<your_postgres_username>',
        'PASSWORD': '<your_postgres_password>',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Running the Servers
Once you have the dependencies installed, you can start both the frontend and backend servers. 
To start the backend server, navigate to the devsocial_api directory and run the following command:
```
python manage.py runserver
```
This will start the backend server and allow you to interact with the API.

To start the frontend server, navigate to the client directory and run the following command:
```
npm start 
```
This will start the frontend server and allow you to view the project in your browser.

That's it! With both the frontend and backend servers running, you can now begin to explore the Devsocial project and all its features.

## Usage
The features of this application include:

1. User Management: The platform provides full CRUD functionality to manage user accounts. This means users can easily create, view, update, and delete their accounts.

2. Post Management: Devsocial allows users to create, view, update, and delete their posts. This means users can showcase their portfolio projects, get feedback from other users, and keep their profiles up-to-date.

3. Social Interactions: Devsocial provides social interaction capabilities such as liking and commenting on other users' posts. This enables users to engage with each other, share feedback, and build a community.

4. Database Management: Devsocial uses PostgreSQL as the primary database. Migrations are provided to easily set up and configure the database.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT License

Copyright (c) 2023 Kevin Zheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
