# Chat

This project was created by Joel Knechtli(s5127178) for Web Programming

## Setting up the server

Enter the server folder `cd server`
Run `npm i`

## Setting up the client

Enter the server folder `cd client`
Run `npm i`

## Running the server

Enter the server folder `cd server`
Run `node server.js`. The server will be on `http://localhost:3000/`.

## Running the client

Enter the client folder `cd client`
Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Documentation: 

## Git:

I only use my git repo to keep track of backups and the version. I have not had to branch out or roll back my version.

## Server:

Descriptions of API calls are in the files above the function.

The server does not have global variables, when an API is called it will open the file it needs, reads and writes accordingly, then closes and saves the file.

### API:

prot |call| params|return | purpose
----| ----| ----|----| ---- 
get | api/groups| |all groups| used to list the groups
get | api/user/:id| user Id| a specified user| used to get the information of a user
get | api/users| | all users | used to get list of users
post | api/user| User Object|  | updates an existing user, or creates a new user
post | api/groups| list of all groups |  | updates all existing groups to the given groups
post | api/groups/users| list of all User Objects|  | updates all users groups as per the given list
post | api/auth| username and password| valid user, or invalid 'username & password' | checks if user can login
delete | api/user/:id/delete| username |  | deletes user with given id
