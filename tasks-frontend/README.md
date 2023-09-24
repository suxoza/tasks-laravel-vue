# Project Title

# video instructions

1. Registration/Login
2. Task-Crud

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

```bash
composer install
```

4. Copy the `.env.example` file to `.env` and configure your database settings.

```bash
cp .env.example .env
```

5. Run database migrations:

```bash
php artisan migrate
```

6. Generate an application key:

```bash
php artisan jwt:generate
```

7. Start the Laravel development server:

### Backend Testing

To run PHPUnit tests for the backend, use the following command:

```bash
php artisan test
```

## Frontend Setup

1. Navigate to the `tasks-frontend` directory:
2. Install dependencies:

`yarn ` or `npm install`

3. run application

```bash
yarn dev
```

### Frontend Testing

```bash
npx cypress open
```

# Alternatively, Run All Services in Docker Containers

To run all services within Docker containers, execute the following command:

```bash
docker-compose up --build
```
