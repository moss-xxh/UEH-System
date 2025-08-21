# Epic 1: Foundation & Core SaaS Setup

**Epic Goal:** Establish the core technical infrastructure and deliver the foundational capability for platform administrators to manage tenant (charging company) accounts.

## Story 1.1: Project Initialization
**As a** developer,
**I want** to set up the monorepo with separate packages for the web app, backend API, and shared code,
**so that** we have a clean, organized foundation for building the full-stack application.

**Acceptance Criteria:**
1. A monorepo is initialized using npm workspaces.
2. Three initial packages are created: `apps/web`, `apps/api`, and `packages/shared-types`.
3. Basic tooling (ESLint, Prettier, TypeScript) is configured at the root level and inherited by the packages.
4. A README.md file is created with instructions for setting up the local development environment.
5. The initial project structure is committed to a Git repository.

## Story 1.2: Foundational CI/CD Pipeline
**As a** DevOps engineer,
**I want** to create a basic CI/CD pipeline that automatically deploys the web and API applications,
**so that** we can ensure continuous integration and have a working deployment from day one.

**Acceptance Criteria:**
1. A CI/CD pipeline is configured using GitHub Actions (or similar).
2. The pipeline triggers on every push to the `main` branch.
3. The pipeline successfully builds both the `web` and `api` applications.
4. A "hello world" version of the Next.js web app is successfully deployed to Vercel.
5. A "hello world" version of the NestJS API is successfully deployed to AWS Lambda.

## Story 1.3: Platform Admin Authentication
**As a** platform administrator,
**I want** to log in to the admin portal securely,
**so that** I can access the tenant management features.

**Acceptance Criteria:**
1. A login page exists for the admin portal.
2. The administrator can log in using a pre-defined username and password.
3. Upon successful login, the administrator is redirected to the main dashboard.
4. An unsuccessful login attempt displays a clear error message.
5. The user's session is securely managed (e.g., using JWTs).

## Story 1.4: Tenant Account Management
**As a** platform administrator,
**I want** a dashboard to create, view, update, and deactivate tenant (charging company) accounts,
**so that** I can manage the customers using the SaaS platform.

**Acceptance Criteria:**
1. When logged in, an administrator can see a page listing all tenant companies.
2. The list displays key information such as company name, status (active/inactive), and creation date.
3. The administrator can use a form to create a new tenant account.
4. The administrator can edit an existing tenant's information.
5. The administrator can change a tenant's status between "active" and "inactive".