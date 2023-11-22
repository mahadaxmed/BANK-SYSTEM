# BANK-SYSTEM

## Users

### Get All Users

- **Endpoint:** `GET /`
- **Description:** Retrieve a list of all users.
- **Response:**
  - `200 OK`: Returns an array of user objects.
  - `404 Not Found`: If no users are found.

### Get User by ID

- **Endpoint:** `GET /:id`
- **Description:** Retrieve a specific user by their ID.
- **Parameters:**
  - `id` (Path Parameter): The unique identifier for the user.
- **Response:**
  - `200 OK`: Returns the user object.
  - `404 Not Found`: If the user with the specified ID is not found.

### Create User

- **Endpoint:** `POST /`
- **Description:** Create a new user.
- **Request Body:**
  - `name` (String): User's name.
  - `userType` (String): Type of user.
  - `email` (String): User's email address.
  - `password` (String): User's password.
- **Response:**
  - `200 OK`: Returns the created user object.
  - `404 Not Found`: If the user creation fails.

### Delete User by ID

- **Endpoint:** `DELETE /:id`
- **Description:** Delete a user by their ID.
- **Parameters:**
  - `id` (Path Parameter): The unique identifier for the user.
- **Response:**
  - `200 OK`: Returns the deleted user object.
  - `404 Not Found`: If the user with the specified ID is not found.

### Deposit Amount to User Account

- **Endpoint:** `PUT /deposit/:id`
- **Description:** Deposit an amount to a user's account.
- **Parameters:**
  - `id` (Path Parameter): The unique identifier for the user.
- **Request Body:**
  - `balance` (Number): The amount to be deposited.
- **Response:**
  - `200 OK`: Returns the updated user object with the new balance.
  - `404 Not Found`: If the user with the specified ID is not found.

### Error Handling

- **Error Response:**
  - `500 Internal Server Error`: If an unexpected error occurs, returns an error message.
