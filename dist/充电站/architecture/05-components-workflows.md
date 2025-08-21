# Components & Core Workflows

## Component List

  * **Web Frontend (Portals)**

      * **Responsibility:** Provides the UI for Platform Admins and Company Operators. Handles user input, renders data from the API, and manages client-side state.
      * **Key Interfaces:** Consumes the REST API.
      * **Dependencies:** Backend API.
      * **Technology Stack:** Next.js, Chakra UI, Zustand.

  * **Mobile App**

      * **Responsibility:** Provides the UI for EV Drivers. Manages the entire charging flow from station discovery to payment.
      * **Key Interfaces:** Consumes the REST API; interacts with device hardware (GPS, Camera).
      * **Dependencies:** Backend API.
      * **Technology Stack:** React Native.

  * **Backend API (Core Services)**

      * **Responsibility:** Handles all business logic, data validation, and orchestration. Exposes the secure REST API for all clients.
      * **Key Interfaces:** Provides the REST API. Consumes the Database and Authentication Service.
      * **Dependencies:** Database, Authentication Service, External APIs (Stripe).
      * **Technology Stack:** NestJS on AWS Lambda.

  * **Authentication Service**

      * **Responsibility:** Manages user identities, sign-up, login, and the issuance of JWTs.
      * **Key Interfaces:** Provides authentication endpoints (e.g., `/login`, `/register`).
      * **Dependencies:** Database (for user records).
      * **Technology Stack:** AWS Cognito.

  * **Database**

      * **Responsibility:** Persists all application data, including users, companies, stations, chargers, and sessions.
      * **Key Interfaces:** SQL interface consumed by the Backend API's data access layer.
      * **Dependencies:** None.
      * **Technology Stack:** PostgreSQL on AWS RDS.

---

## Component Diagrams

This diagram illustrates the primary interactions between the major components.

```mermaid
graph TD
    subgraph Clients
        WebApp[Web Frontend]
        MobileApp[Mobile App]
    end

    subgraph Backend
        Auth[Authentication Service]
        API[Backend API]
        DB[(Database)]
    end
    
    WebApp --> API
    MobileApp --> API
    WebApp --> Auth
    MobileApp --> Auth
    API --> DB
    Auth --> DB
```

---

## External APIs

### Stripe API

  * **Purpose:** To securely process payments from EV drivers after charging sessions and to handle the financial records.

  * **Documentation:** Official Stripe API documentation at `https://stripe.com/docs/api`

  * **Base URL(s):** `https://api.stripe.com`

  * **Authentication:** All requests must be authenticated from our secure backend using a secret API key provided in an `Authorization: Bearer <YOUR_SECRET_KEY>` header.

  * **Rate Limits:** The application must gracefully handle potential rate-limiting errors (`429 Too Many Requests`).

  * **Integration Notes:**

      * The frontend clients will use a **publishable key** to tokenize card information directly with Stripe, ensuring sensitive card details never touch our servers.
      * Our backend will receive this token to create customers and charge them.
      * We will need to configure webhooks to receive asynchronous events from Stripe, such as charge failures or disputes.

  * **Key Endpoints Used:**

      * `POST /v1/customers`: To create a Stripe Customer object for each EV driver when they add their first payment method.
      * `POST /v1/payment_methods`: To create and attach a new payment method to a Customer.
      * `POST /v1/payment_intents`: To create, confirm, and process a payment after a charging session is completed.

---

## Core Workflows

### User Registration & Login Flow

This diagram shows the sequence for a new EV driver registering and authenticating with the system.

```mermaid
sequenceDiagram
    participant User
    participant Frontend Client
    participant Auth Service (Cognito)
    participant Backend API
    participant Database

    User->>Frontend Client: Enters registration details
    Frontend Client->>Auth Service (Cognito): Submits registration request
    Auth Service (Cognito)->>Database: Creates user record
    Database-->>Auth Service (Cognito): Confirms creation
    Auth Service (Cognito)-->>Frontend Client: Returns JWT (Token)
    Frontend Client->>Frontend Client: Stores token securely
    
    loop Subsequent Authenticated Requests
        Frontend Client->>Backend API: API Request with JWT
        Backend API->>Backend API: Validate JWT
        Backend API-->>Frontend Client: Secure Response
    end
```

---

### Charging Session Lifecycle Flow

This diagram illustrates the end-to-end process of a driver starting and stopping a charging session.

```mermaid
sequenceDiagram
    participant Driver
    participant Mobile App
    participant Backend API
    participant Stripe API
    participant Database
    participant Charger Hardware

    Driver->>Mobile App: Scans QR Code on Charger
    Mobile App->>Backend API: POST /sessions/start {chargerId}
    Backend API->>Database: Validate charger is 'AVAILABLE'
    Database-->>Backend API: Charger is available
    Backend API->>Charger Hardware: Send 'Unlock' command (via OCPP)
    Charger Hardware-->>Backend API: Acknowledge unlock
    Backend API->>Database: Create ChargingSession record (status: 'CHARGING')
    Database-->>Backend API: Confirm record created
    Backend API-->>Mobile App: Success, session started
    Mobile App->>Driver: Display 'Active Session' screen
    
    Note right of Driver: ...Time passes, charging occurs...

    Driver->>Mobile App: Taps 'Stop Charging'
    Mobile App->>Backend API: POST /sessions/stop {sessionId}
    Backend API->>Charger Hardware: Send 'Lock' command (via OCPP)
    Backend API->>Database: Update Session (endTime, energyKwh)
    Backend API->>Backend API: Calculate totalCost
    Backend API->>Stripe API: Create PaymentIntent(amount, customer)
    Stripe API-->>Backend API: Payment Success
    Backend API->>Database: Update Session (paymentStatus: 'PAID')
    Database-->>Backend API: Confirm update
    Backend API-->>Mobile App: Success, returns session summary
    Mobile App->>Driver: Display receipt
```