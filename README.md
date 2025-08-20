# rent-a-tool
An e-commerce web application for neighbors to rent tools and other equipment to each other.

## Setup
The app uses MySQL, Node.js, React.js, and TypeScript.

### MySQL
Install MySQL Community Edition here:
https://dev.mysql.com/downloads/

Set the server port number to 3306.

FOR LOCAL TESTING ONLY, create a root password "rat25" and
a DB Admin user account with user name "admin" and
password "rat25".

Create a new schema rent_a_tool.

These users and passwords should only be used
temporarily for development purposes.

## Run

### Backend
In one terminal, run 'tsc --watch' from the backend directory.
This will cause any changes to the TypeScript files in the src
directory to be compiled into JavaScript files in the dist
directory, automatically.

In another terminal, run 'npm run dev' from the backend directory.
This will cause the server to pick up any changes to the
JavaScript and restart automatically.

### Frontend
In a terminal, run 'npm start' from the frontend directory.

## Debug

### Backend
Using VS Code, select the 'Debug Backend' option from the Run and Debug menu.

### Frontend
TODO - use alert statements for now
