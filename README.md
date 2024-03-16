# Every-Mean API

This API allows you to manage note groups and users. Users can create note groups, add or remove notes from them, and delete note groups. Each note group is associated with a user.

## Installation

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables (see below).
4. Run `npm start` to start the server.

## Configuration

Make sure to set the following environment variables:

- `PORT`: The port on which the server will listen for requests (default: 3000).
- `DATABASE_URL`: The URI of the MongoDB database.
- `SECRET_KEY`: The secret used to sign JWT tokens.

## Endpoints

### Users

- `POST /api/auth/sign-in`: Create a new user. Requires a `username` and a `password`.
- `POST /api/auth/login`: Log in a user. Requires a `username` and a `password`. Returns a JWT token for subsequent requests.

### Note Groups

- `POST /api/groups/create`: Create a new note group.
- `GET /api/group/:id`: Get a specific note group by its ID.
- `DELETE /api/group/delete/:id`: Delete a note group by its ID.
- `PUT /api/group/edit/:id`: Edit an existing note group by its ID.
- `PUT /api/group/add-mark/:id`: Add a mark to a note group by its ID.
- `DELETE /api/group/mark/delete/:id`: Delete a mark from a note group by ID's group.

### Authentication

Endpoints requiring authentication use JSON Web Tokens (JWT). Include the JWT token in the `Authorization` header of the request in the form `Bearer <token>`.
