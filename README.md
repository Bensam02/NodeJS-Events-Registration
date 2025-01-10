# Event Management Platform

A robust event management platform built with Node.js, Express, and PostgreSQL.

## Setup

1. Create a PostgreSQL database
2. Copy .env.example to .env and update the values
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`

## API Endpoints

### Users
- POST /api/users - Create user
- GET /api/users/:id - Get user by ID
- GET /api/users - Get all users

### Events
- POST /api/events - Create event
- GET /api/events/:id - Get event by ID
- GET /api/events - Get all events

## Authentication

Protected routes require a JWT token in the Authorization header:
`Authorization: Bearer your_token_here`
# Event Management Platform

A robust event management platform built with Node.js, Express, and PostgreSQL.

## Setup

1. Create a PostgreSQL database
2. Copy .env.example to .env and update the values
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`

## API Endpoints

### Users
- POST /api/users - Create user
- GET /api/users/:id - Get user by ID
- GET /api/users - Get all users

### Events
- POST /api/events - Create event
- GET /api/events/:id - Get event by ID
- GET /api/events - Get all events

## Authentication

Protected routes require a JWT token in the Authorization header:
`Authorization: Bearer your_token_here`