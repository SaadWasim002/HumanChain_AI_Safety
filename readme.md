# HumanChain AI Safety Incident Log API

## Overview

This project is a backend API service to log and manage hypothetical AI safety incidents. It is built using **Node.js** with the **Express** framework and uses **MongoDB** as the database. The service adheres to REST principles and provides endpoints to create, retrieve, and delete incidents.

## Features

- Log new AI safety incidents.
- Retrieve all logged incidents or a specific incident by ID.
- Delete incidents by ID.
- Basic validation and error handling.
- Database seeding with sample data.

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=<port-number> # Default: 3000
   ```

4. Seed the database (optional):
   Run the following command to populate the database with sample data:
   ```bash
   npm run seed
   ```
   **Warning:** This will delete all existing data in the database.

## Running the Project

1. Start the server:
   ```bash
   npm start
   ```

2. The API will be available at `http://localhost:<PORT>`.

## API Endpoints

### 1. Retrieve All Incidents
- **Endpoint:** `GET /incidents`
- **Response:**
  ```json
  [
    {
      "id": "1",
      "title": "Example Incident",
      "description": "Detailed description here.",
      "severity": "High",
      "reported_at": "2025-04-02T18:00:00Z"
    }
  ]
  ```

### 2. Log a New Incident
- **Endpoint:** `POST /incidents`
- **Request Body:**
  ```json
  {
    "title": "New Incident Title",
    "description": "Detailed description here.",
    "severity": "Medium"
  }
  ```
- **Response:**
  ```json
  {
    "id": "2",
    "title": "New Incident Title",
    "description": "Detailed description here.",
    "severity": "Medium",
    "reported_at": "2025-04-02T18:00:00Z"
  }
  ```

### 3. Retrieve a Specific Incident
- **Endpoint:** `GET /incidents/{id}`
- **Response:**
  ```json
  {
    "id": "1",
    "title": "Example Incident",
    "description": "Detailed description here.",
    "severity": "High",
    "reported_at": "2025-04-02T18:00:00Z"
  }
  ```

### 4. Delete an Incident
- **Endpoint:** `DELETE /incidents/{id}`
- **Response:**
  - `204 No Content` if successful.
  - `404 Not Found` if the incident does not exist.

## Database Schema

The `incidents` collection in MongoDB has the following structure:
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "severity": "string", // Allowed values: "Low", "Medium", "High"
  "reported_at": "ISODate"
}
```

## Design Decisions

- **Framework:** Chose Express for its simplicity and flexibility.
- **Database:** MongoDB was selected for its ease of use and JSON-like document structure.
- **Validation:** Basic validation ensures required fields are provided and severity is one of the allowed values.

## Challenges

- Ensuring proper error handling for database operations.
- Designing a clean and intuitive API structure.

## Testing the API

You can test the API using tools like [Postman](https://www.postman.com/) or `curl`. Example `curl` commands:

1. **Retrieve all incidents:**
   ```bash
   curl -X GET http://localhost:<PORT>/incidents
   ```

2. **Log a new incident:**
   ```bash
   curl -X POST http://localhost:<PORT>/incidents \
   -H "Content-Type: application/json" \
   -d '{"title": "New Incident", "description": "Details here", "severity": "High"}'
   ```

3. **Retrieve a specific incident:**
   ```bash
   curl -X GET http://localhost:<PORT>/incidents/<id>
   ```

4. **Delete an incident:**
   ```bash
   curl -X DELETE http://localhost:<PORT>/incidents/<id>
   ```

## License

This project is for educational purposes and is not licensed for production use.
    