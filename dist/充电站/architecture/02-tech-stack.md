# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | `~5.4` | Primary language for all frontend code | Provides type safety and scalability, improving code quality. |
| **Frontend Framework** | Next.js | `~14.2` | Framework for web portals | Enables server-side rendering & static generation for performance. |
| **UI Component Library** | Chakra UI | `~2.8` | UI components for web portals | User requirement; excellent for accessibility and rapid development. |
| **State Management** | Zustand | `~4.5` | Manages global state in React | Simple, lightweight, and unopinionated; sufficient for MVP needs. |
| **Backend Language** | TypeScript | `~5.4` | Primary language for all backend code | Consistency with frontend stack; type safety for APIs. |
| **Backend Framework**| NestJS | `~10.3` | Framework for backend API | Provides a modular, scalable architecture for building APIs. |
| **API Style** | REST API | `3.0` | Defines how frontend and backend communicate | Well-understood, industry-standard, and easy to consume. |
| **Database** | PostgreSQL | `16` | Primary data store | Powerful, reliable, and excellent for relational data and multi-tenancy. |
| **File Storage** | AWS S3 | N/A | Stores user-uploaded files (e.g., logos) | Industry standard for scalable, durable, and cost-effective object storage. |
| **Authentication** | AWS Cognito | N/A | Manages user pools, login, and sessions | Secure, managed service that integrates well with our AWS backend. |
| **Frontend Testing** | Jest & RTL | `~29.7` | Unit/Integration tests for components | Industry standard for testing React applications. |
| **Backend Testing** | Jest & Supertest | `~29.7` | Unit/Integration tests for API endpoints | Jest provides consistency; Supertest simplifies HTTP testing. |
| **E2E Testing** | Cypress | `~13.7` | End-to-end testing of user flows | Powerful tool for testing the application from the user's perspective. |
| **Build Tool** | Turborepo | `~1.13` | Manages the monorepo build process | High-performance build system optimized for JavaScript/TypeScript monorepos. |
| **Infrastructure (IaC)**| AWS CDK | `~2.138` | Defines cloud infrastructure as code | Allows us to define infrastructure in TypeScript, ensuring consistency. |
| **CI/CD** | GitHub Actions | N/A | Automates build, test, and deployment | Seamless integration with our source code repository. |
| **Monitoring** | AWS CloudWatch | N/A | Monitors application health and performance | Native AWS service that integrates deeply with Lambda and RDS. |