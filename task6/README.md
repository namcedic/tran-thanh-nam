## Scoreboard module
# Scoreboard API Specification

## Overview

This document outlines the software architecture for a backend module that handles real-time scoreboard updates. 
The module is responsible for processing score updates from authenticated users, maintaining score integrity, 
and facilitating live updates to a frontend scoreboard displaying the top 10 users.

## Functional Requirements

1. **Update Score**

    - An API endpoint should receive score update requests when a user completes an action.
    - The system should verify that the request is authenticated and authorized.
    - The score should be updated in real-time and reflected on the scoreboard.

2. **Retrieve Leaderboard**

    - An API endpoint should provide the top 10 users ranked by score.
    - The leaderboard should be updated dynamically and quickly when scores change.

3. **Real-time Updates**

    - The scoreboard should update automatically as new scores are received.
    - WebSockets should be used for real-time updates.

4. **Security Measures**

    - Authentication should be required for score updates.
    - Prevent unauthorized users from updating scores.
    - Prevent users from submitting arbitrary score values.

## API Endpoints

### 1. Update Score

```
POST /v1/api/score/update
```

**Request:**

Request Headers:
Authorization: Bearer jwt-token

```json
{
  "userId": "123",
  "actionId": "6",
  "score": 100
}
```

**Response:**

```json
{
  "success": true,
  "totalScore": 1500
}
```

Status Codes:

200: Score updated successfully
400: Invalid request format
401: Unauthorized/Invalid token
409: Duplicate action submission
429: Rate limit exceeded
500: Internal Server error

**Validation:**

- Verify `jwt-token` using JWT authentication.
- Validate that the `actionId` corresponds to a valid action.
- Validate that the `score` corresponds to a valid value.
- Validate user have rights to update the score.
- Apply rate-limiting to prevent spam requests.

### 2. Get Leaderboard

```
GET /v1/api/leaderboard
```

**Response:**

```text
{
  "leaderboard": [
    {"userId": "12345", "totalScore": 1500},
    {"userId": "67890", "totalScore": 1200},
    ...
  ]
}
```

Status Codes:

200: Success
500: Internal Server error

**Notes:**

- Returns the top 10 users sorted by score.
- Uses caching to optimize performance.

### 3. WebSocket Connection for Real-time Updates

```
GET /ws/scoreboard
```

- Clients subscribe to real-time score updates.
- Server pushes updates when scores change.

## Technology Stack

- **Backend:** Node.js with NestJS
- **Database:** PostgreSQL with Redis caching
- **Authentication:** JWT-based authentication
- **Real-time:** WebSockets

## Execution Flow

1. User completes an action.
2. The frontend sends an authenticated request to update the score.
3. The backend verifies the request and updates the database.
4. The leaderboard is updated in Redis for fast retrieval.
5. The backend sends real-time updates via WebSockets.
6. The frontend receives the updated scoreboard in real-time.

## Improvement Suggestions
- Use an event-driven architecture to handle score updates
- Implement a message queue (e.g., Kafka, RabbitMQ, BullMQ) for scalability.
- Use GraphQL subscriptions as an alternative to WebSockets.
- Indexing the database for faster leaderboard retrieval.
- Caching layer for frequently scoreboard read.
- Implement comprehensive logging for security audits and debugging
- Consider using database transactions or optimistic concurrency control.

## Testing Requirements

- Unit tests for all core business logic
- Integration tests for API endpoints

## Diagram

![Alt text](../../../Downloads/task6_diagram.jpeg?raw=true "Title")