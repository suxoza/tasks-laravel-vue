# Project Title

A brief description of what this project does and who it's for

# Task Management App

This is a simple task management application with the following features:

- User Registration
- User Login
- Task CRUD Operations
  - Create Task
  - Update Task
  - Set Task Status
  - Soft Delete Task
- Get List of Tasks
- Get Single Task
- Each User has Access to Their Own Tasks

## Technologies Used

- Backend:

  - Laravel (PHP)
  - MySQL
  - JWT Authentication
  - PHPUnit for Backend Testing

- Frontend:
  - Vue 3 (Composition API)
  - Cypress for Frontend Testing

## Backend Setup

1. Clone the repository.
2. Navigate to the `tasks-backend` directory:
3. Install PHP dependencies:

`composer install`

4. Copy the `.env.example` file to `.env` and configure your database settings.

   `cp .env.example .env`

5. Generate an application key:

`php artisan jwt:generate`

6. Run database migrations:

`php artisan migrate`

7. Start the Laravel development server:

### Backend Testing

To run PHPUnit tests for the backend, use the following command:

`php artisan test`

## Frontend Setup

1. Navigate to the `tasks-frontend` directory:
2. Install dependencies:

`yarn ` or `npm install`

3. run application
   `yarn dev`

### Frontend Testing

`npx cypress open`
