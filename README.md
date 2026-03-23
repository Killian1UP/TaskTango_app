# TaskTango 📝

## Overview

TaskTango is a backend Task Management API that allows users to
register, authenticate, and manage their personal tasks securely. The
application enables users to create, read, update, and delete tasks
while ensuring that each user can only access and modify their own
tasks.

The API is designed with a focus on secure authentication, clean
architecture, and RESTful API practices. TaskTango supports task
categorization, deadlines, and priority levels to help users stay
organized and productive.

------------------------------------------------------------------------

## Features

### 1. User Authentication

TaskTango provides a secure user authentication system.

Users can: - Register an account - Login to receive authentication
access - Verify their account via OTP - Access protected routes using
authentication middleware

Authentication ensures that only authorized users can interact with the
task management endpoints.

------------------------------------------------------------------------

### 2. Task Management (CRUD Operations)

Users can fully manage their tasks through RESTful endpoints:

  -----------------------------------------------------------------------
  Operation             Endpoint              Description
  --------------------- --------------------- ---------------------------
  Create Task           POST /tasks           Create a new task

  Get Tasks             GET /tasks            Retrieve all tasks
                                              belonging to the logged-in
                                              user

  Get Task by ID        GET /tasks/:id        Retrieve a specific task

  Update Task           PUT /tasks/:id        Modify an existing task

  Delete Task           DELETE /tasks/:id     Remove a task
  -----------------------------------------------------------------------

Each task includes: - Title - Description - Category - Deadline -
Priority - Completion status

------------------------------------------------------------------------

### 3. Task Categorization

Users can assign categories to tasks (e.g., work, study, personal). This
helps organize tasks and makes them easier to manage.

Example:

``` json
{
  "title": "Finish backend project",
  "category": "work"
}
```

------------------------------------------------------------------------

### 4. Deadlines

Tasks can include deadlines so users know when work should be completed.

Example:

``` json
{
  "title": "Submit assignment",
  "deadline": "2026-03-30"
}
```

------------------------------------------------------------------------

### 5. User-Specific Task Management

Every task is linked to the user who created it.

This ensures: - Users can only see their own tasks - Users cannot modify
or delete tasks belonging to other users

This is implemented using a user reference in the task schema and
authorization checks inside the controllers.

------------------------------------------------------------------------

## Project Architecture

The application follows a modular structure to separate responsibilities
across the project.

    TaskTango
    │
    ├── controllers
    │   ├── taskController.js
    │   ├── userController.js
    │   └── otpController.js
    │
    ├── middleware
    │   └── authMiddleware.js
    │
    ├── mongoDb
    │   └── dbConnection.js
    │
    ├── routers
    │   ├── taskRouter.js
    │   ├── userRouter.js
    │   └── otpRouter.js
    │
    ├── schemas
    │   ├── taskSchema.js
    │   └── userSchema.js
    │
    ├── server.js
    └── .env

### Key Components

**Schemas** - Define the structure of data stored in MongoDB using
Mongoose.

**Controllers** - Handle application logic such as creating tasks or
registering users.

**Routers** - Define API endpoints and map them to controller functions.

**Middleware** - Handles authentication and protects restricted routes.

**Database Connection** - The `dbConnection.js` file manages the
connection between the application and MongoDB.

------------------------------------------------------------------------

## Technologies Used

### Backend

-   Node.js
-   Express.js

### Database

-   MongoDB
-   Mongoose

### Authentication

-   JSON Web Tokens (JWT)
-   OTP verification system

### Development Tools

-   Nodemon (automatic server restart during development)
-   Postman (API testing)

### Environment Management

-   dotenv for storing sensitive environment variables

------------------------------------------------------------------------

## How the Application Works

1.  A user registers an account.
2.  The user verifies their account using an OTP.
3.  The user logs in and receives authentication access.
4.  Authenticated users can create and manage tasks.
5.  Each task is stored in MongoDB and linked to the user who created
    it.
6.  The authentication middleware ensures that users can only access
    their own tasks.

------------------------------------------------------------------------

## Example Task Object

``` json
{
  "_id": "taskId",
  "user": "userId",
  "title": "Complete backend API",
  "description": "Finish building the task controllers",
  "category": "study",
  "deadline": "2026-03-30T00:00:00.000Z",
  "priority": "high",
  "isCompleted": false,
  "createdAt": "2026-03-20T10:00:00.000Z",
  "updatedAt": "2026-03-20T10:00:00.000Z"
}
```

------------------------------------------------------------------------

## Installation & Setup

### 1. Clone the repository

    git clone https://github.com/yourusername/tasktango.git

### 2. Navigate into the project

    cd tasktango

### 3. Install dependencies

    npm install

### 4. Configure environment variables

Create a `.env` file:

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000

### 5. Start the server

    npm run dev

------------------------------------------------------------------------

## Future Improvements

Possible enhancements for the application include:

-   Task filtering and search
-   Deadline reminders
-   Task completion statistics
-   Sorting tasks by priority or deadline
-   Frontend interface for user interaction

------------------------------------------------------------------------

## Author

Ikaelelo Motlhako

Backend Developer (Python, Django, Node.js, MongoDB)

