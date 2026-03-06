# Events API - Module 5 Backend Assignment
# Helmet, CORS, Swagger and Pages

## Author
- Chris Feasby

## Student ID
- 0335505

# Information
- A fully-typed, test-driven, Firestore-backend REST API built with:
- Node.js
- Express
- TypeScript
- Joi validation
- Jest
- This project implements CRUD operations for event management, including validation, service abstraction, repository patterns, and automated testing
- Includes Helmet, CORS, Swagger, and GitHub Pages


### Project Overview

- This API provides a complete event-management backend designed for creating, retrieving, updating, and deleting event records. It is build using Node.js, Express, TypeScript, and Firestore DB, with a strong focus on security, validation, and documentation. The API includes robust request validation using Joi, secure HTTP headers via Helmet, environment-based CORS configuration, and fully documented endpoints using OpenAPI/Swagger.

- The goal of this project is to demonstrate industry-standard backend practices, including modular architecture, validation middleware, automated documentation generation, and public deployment of API docs. This API is intended for developers who need a clean, well-structured backend service for managing event data or who want to learn best practices for building secure, documented REST APIs.

### Installation Instructions

## Prerequistes

- Node.js v20+
- npm v9+
- A Firebase project with Firestore enabled
- A Firebase service account key (JSON)
- Git

1. Clone the repository:

git clone https://github.com/rrc-w2025-cfeasby/Back-End-Assignment-5.git
cd Back-End-Assignment-5

2. Install dependencies:

npm install

3. Environment variables:
- Create .env file in the project root based on .env.example:

NODE_ENV=development
PORT=3000

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=./Config/serviceAccount.json private key

SWAGGER_SERVER_URL=http://localhost:3000/api/v1
ALLOWED_ORIGINS=https://rrc-w2025-cfeasby.github.io,https://rrc-w2025-cfeasby.github.io/Back-End-Assignment-5

4. Start the development server

npm run start

- API is available at:
http://localhost:3000/api/v1

- API Rquests Create an Event:

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference",
    "date": "2026-06-01T10:00:00Z",
    "capacity": 100,
    "category": "conference"
  }'
```

{
  "message": "Event created successfully",
  "data": {
    "id": "auto-generated-firestore-id",
    "name": "Tech Conference",
    "date": "2026-06-01T10:00:00Z",
    "capacity": 100,
    "registrationCount": 0,
    "status": "active",
    "category": "conference"
  }
}

- GET All Events:

```bash
curl -X GET http://localhost:3000/api/v1/events
```

{
  "message": "Events retrieved",
  "data": [...]
}

- Update an Event:

```bash
curl -X PUT http://localhost:3000/api/v1/events/<event-id> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Conference",
    "capacity": 150
  }'
```

{
  "message": "Event updated",
  "data": {
    "id": "<event-id>",
    "name": "Updated Conference",
    "capacity": 150
  }
}

5. Link to Full Public Documentation:

https://rrc-w2025-cfeasby.github.io/Back-End-Assignment-5/

6. Local Documentation Access:

http://localhost:3000/api-docs
