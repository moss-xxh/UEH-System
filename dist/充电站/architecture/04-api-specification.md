# API Specification

## REST API Specification (OpenAPI 3.0)

```yaml
openapi: 3.0.0
info:
  title: Charging Station SaaS API
  version: 1.0.0
  description: API for managing charging stations, companies, and user sessions.
servers:
  - url: /api/v1
    description: API Server

paths:
  /auth/login:
    post:
      summary: User Login
      description: Authenticates a user and returns a JWT.
  /auth/register:
    post:
      summary: EV Driver Registration
      description: Creates a new EV driver user account.

  /admin/companies:
    get:
      summary: List all companies (Admin only)
      description: Retrieves a list of all tenant companies.
    post:
      summary: Create a new company (Admin only)
      description: Adds a new tenant company to the system.

  /stations:
    get:
      summary: Get stations for the current company
      description: Retrieves a list of stations for the authenticated company operator.
    post:
      summary: Create a new station
      description: Adds a new station for the authenticated company operator.

  /stations/{stationId}/chargers:
    post:
      summary: Add a charger to a station
      description: Adds a new charger to a specific station.
  
  /sessions/start:
    post:
      summary: Start a charging session (Driver only)
      description: Initiates a new charging session by a driver.
  /sessions/stop:
    post:
      summary: Stop a charging session (Driver only)
      description: Stops an active charging session.

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        role:
          type: string
          enum: [ADMIN, OPERATOR, DRIVER]
    Station:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        address:
          type: object
          properties:
            street:
              type: string
            city:
              type: string
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - bearerAuth: []
```