# maiven

# Maiven User Management System

This project is a user management system built with **NestJS** for the backend, **PostgreSQL** as the database, and **React** with **Vite** for the frontend. It uses **Auth0** for authentication.

## Features

- User registration and login via auth0
- view and delete users via the User page
- view messages of any user (sent or received)
- send a message via a post request

## Technologies Used

- **Backend**: NestJS
- **Database**: PostgreSQL
- **Frontend**: React, Vite
- **Authentication**: Auth0

## Database
There are 2 database tables: user and message. 

User contains basic information - email, name, and auth0id. 

Message contains the fields timestamp, senderId, receiverId, and content. 

NOTE: because I used auth0 for authenication, I had the option to not create a local postgres user table (auth0 handles basic user management), but I decided to because it made api requests easier and (if this was real life) we would probably have other user fields, which would require us to have a postgres user table in addition to auth0's management. However, this means I had to keep the user table synced with auth0. 

## Installation

To set up the project locally, follow these steps:

### Backend

1. Clone the repository:
   ```
   bash
   git clone https://github.com/yourusername/repo-name.git
   cd repo-name/backend
   ```

2. Set up your env
```
DATABASE_URL=your_database_url
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

3. run a db migration
   ```
   npm run migration:run
   ```

4. Run the backend server
   ```
   npm run start:dev
   ```

   it should run on localhost:3000

## Frontend

1. in the frontend directory, run

```npm run dev```

mine ran locally on localhost:5173