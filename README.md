# levelUp
https://levelup-lknw.onrender.com

## Introduction

levelUp is a retro-aracade-style task management web-application designed to help individuals and teams organized on projects and tasks they need to complete. On levelUp, users can create multiple lists to keep track of different kinds of tasks. When viewing each lists, users can add new tasks to the list, edit existing tasks, mark tasks as complete or delete them. Tasks can be filtered by whether or not it's complete, allowing users to keep track of tasks they have already done and have yet to do. Its current functionality includes the following features:

* Signing up a new user and logging in as an existing user or demo user
* Creating, Reading, Updating and Deleting a personal list for the user
* Creating, Reading, Updating and Deleting teams the user owns
* Sending and responding to requests to join a team
* Adding and removing team members from a team
* Creating, Reading, Updating and Deleting team lists for teams the user is a part of
* Creating, Reading, Updating and Deleting tasks associated to lists the user has access too

----------------------------------------------------------------------------------------------------

## Authorization/Access

levelUp is designed to keep track of tasks and projects for teams and individuals, therefore, it is designed so that a user must create an account to properly use the web-app. Anyone can log in as a demo to try out the web-app on their own. A future feature includes storing lists on the users local storage so that sign up isn't required. levelUp currentl has the following user limitations:

### Non-logged-in users

A non-logged-in user CAN:

* Sign up
* Log in

A non-logged-in user CANNOT:

* Access any of the apps functionality

### Logged-in users

When a user first signs up, there will always be a new list created for them. Should all of their lists be deleted, they will be prompted to create a new list or team instead of having a blank page.

A logged in user CAN:

* Create, Update, Delete any list they own
* Create, Update, Delete any task to any list they have access to
* Create, Update, Delete any team they own
* Send requests for members to join teams and Delete members from teams if the user owns the team
* Leave any team they are part of if they are not the owner

----------------------------------------------------------------------------------------------------------------------

## Technologies used:

This project was built on a PFRN stack using the following technologies:

### Backend:
      * Python
      * Flask
      * SQLAlchemy
### Frontend:
      * Node.js/Javascript
      * React
      * Redux

------------------------------------------------------------------------------------------------------

## Launching locally instructions:
Running the backend server:
* From the root directory, run "pipenv install -r requirements.txt" to install dependencies
* Run "pipenv shell" to run the virtual environment
* Run "flask db upgrade" to create a local database
* Run "flask seed all" to populate the database with seed data
* Run "flask run" to boot up the backend server

Running the frontend server:
* From the root directory, cd into the react-app directory/folder
* Run "npm install" to install dependencies
* Run "npm start" to boot up the frontend server and open a browser tab to the landing page

--------------------------------------------------------------------------------------------------------------
# Images:

### Landing Page:
![landing-page](https://github.com/jontabiendo/levelup-project/assets/120198327/a8cb632e-7d42-4058-8572-02d6f12ea804)

### Log-In Page:
![log-in](https://github.com/jontabiendo/levelup-project/assets/120198327/79f8a17c-e2f8-4e01-a73d-f6914ce83b86)

### Sign-Up Page:
![sign-up](https://github.com/jontabiendo/levelup-project/assets/120198327/7c81cd39-006a-4d31-9b23-50cf3e8653dc)

### Main Page:
![levelup-screenshot](https://github.com/jontabiendo/levelup-project/assets/120198327/3586b4f0-8146-4905-ac82-18a289b86635)

### 404 Error Page:
![404](https://github.com/jontabiendo/levelup-project/assets/120198327/13de03d8-4a48-4697-a0d1-8fb365f8116d)

