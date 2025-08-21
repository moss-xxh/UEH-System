# Technical Assumptions

## Repository Structure: Monorepo
* We will use a single monorepo to house the code for the web portals, the mobile app, and the backend services.
* **Rationale:** This approach simplifies code sharing (e.g., for data types between frontend and backend), streamlines dependency management, and makes cross-platform changes easier to coordinate.

## Service Architecture: Serverless
* The backend will be built using a serverless architecture, leveraging cloud functions (e.g., AWS Lambda).
* **Rationale:** A serverless approach is cost-effective (pay-per-use), scales automatically to handle fluctuating demand, and reduces infrastructure management overhead, which is ideal for an MVP.

## Testing Requirements: Full Testing Pyramid
* We will implement a comprehensive testing strategy including unit tests, integration tests, and end-to-end (E2E) tests.
* **Rationale:** This ensures code quality, reduces regressions, and provides confidence in the application's stability, which is critical for a system handling payments and real-world hardware.

## Additional Technical Assumptions and Requests
* **Frontend (Web Portals):** React with the Next.js framework. (Works seamlessly with Chakra UI and serverless deployments).
* **Mobile App:** React Native. (Allows for code sharing with the React-based web portals).
* **Backend:** Node.js with TypeScript, using the NestJS framework. (Provides a structured, scalable architecture for building APIs).
* **Database:** PostgreSQL. (A powerful and reliable open-source relational database that handles multi-tenancy well).
* **Deployment:** Vercel for the Next.js frontend and AWS for backend services (Lambda, API Gateway, RDS for PostgreSQL).
* **Charger Integration:** The platform will initially support the OCPP 1.6J protocol for communication with charging hardware.