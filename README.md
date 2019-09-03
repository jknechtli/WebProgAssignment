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
get | api/user| user Id| a specified user| used to get the information of a user
get | api/users| | all users | used to get list of users
