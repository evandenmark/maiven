## Backend

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Documentation

You'll find 3 important folders in the backend: auth, tables > message, and tables > user. 

In message and user, you'll see 4 types of files: controller, entity, module, and service. 

As standard with TypeORM, the entity defines the table in the database, with fields and rules. The 
controller interacts with the frontend directly, coordinating the HTTP requests. The service is the
backend logic that handles interacting with auth0 and directly manipulating the database.

The Auth folder is extra, as it defines the JWT strategy. When information is passed to and from Auth0, 
this section handles what data is handled. 

More documentation is found within the user and message folders. 