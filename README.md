# Project Title

# Video instructions

1. [Instalation](https://www.loom.com/share/a7ccab7f573f4eaf95a7e4bd51767460?sid=9cdc5db4-da6c-4c74-8066-65f563d99461)
2. [Registration/Login](https://www.loom.com/share/f446aecb95b743a5bf50625733664fbf?sid=df25f4df-894e-46e2-8f43-35a7021b1052)
3. [Task-Crud](https://www.loom.com/share/e0a818192e7943b29e909dcf668a954d?sid=742f72f9-e7ae-42ff-a9c9-fab0433b7687)
4. [infinite-pagination](https://www.loom.com/share/764500d59f514b75ac6b45f9919180d7?sid=0286f935-14ae-45d2-8413-4daadb6824e0)
5. [testing backen](https://www.loom.com/share/e83428ac325a4053aa9bfe96d7c55f46?sid=3fb06141-8c87-4929-bce4-06f310c38734)
6. [testing frontend](https://www.loom.com/share/a0294bb9f5614513a9f62100948207e6?sid=a734bdbc-4778-451b-ae3d-9446c7e09a7d)

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

# Docker Install

```bash
docker-compose up --build
```
