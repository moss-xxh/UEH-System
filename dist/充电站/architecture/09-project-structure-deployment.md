# Project Structure & Deployment

## Unified Project Structure

```
/charging-station-saas/
├── .github/
│   └── workflows/          # CI/CD pipeline configurations
├── apps/                   # Deployable applications
│   ├── api/                # NestJS Backend API
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── companies/
│   │   │   ├── stations/
│   │   │   └── ... (other feature modules)
│   │   └── package.json
│   ├── mobile/             # React Native Mobile App for Drivers
│   │   ├── src/
│   │   └── package.json
│   └── web/                # Next.js Web App for Portals
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── lib/
│       │   ├── services/
│       │   └── stores/
│       └── package.json
├── packages/               # Shared code & configuration
│   ├── shared-types/       # Shared TypeScript interfaces (User, Station, etc.)
│   │   └── src/
│   ├── ui/                 # Shared React components (used by Web & Mobile)
│   │   └── src/
│   ├── eslint-config-custom/ # Shared ESLint configuration
│   └── tsconfig/           # Shared TypeScript configuration
├── .gitignore
├── package.json            # Root package.json with workspaces
├── tsconfig.json           # Root TypeScript configuration
└── turbo.json              # Turborepo configuration
```

---

## Development Workflow

### Local Development Setup

  * **Prerequisites**

      * **Node.js:** `~20.11.0`
      * **pnpm:** `~8.x` (Used for managing monorepo dependencies)
      * **Docker:** For running a local PostgreSQL instance.

  * **Initial Setup**

    ```bash
    # 1. Clone the repository
    git clone <repository_url>
    cd charging-station-saas

    # 2. Install dependencies
    pnpm install

    # 3. Set up environment variables
    cp .env.example .env

    # 4. Start local database
    docker-compose up -d
    ```

  * **Development Commands**

    ```bash
    # Start all applications (web, api, mobile) in development mode
    pnpm dev

    # Start only the web application
    pnpm dev --filter=web

    # Start only the API
    pnpm dev --filter=api

    # Run all tests
    pnpm test
    ```

---

### Environment Configuration

  * **Required Environment Variables (`.env` file)**
    ```bash
    # Backend API (.env in apps/api)
    DATABASE_URL="postgresql://user:password@localhost:5432/charging_db"
    JWT_SECRET="your-super-secret-jwt-key"
    STRIPE_SECRET_KEY="sk_test_..."
    AWS_REGION="us-east-1"

    # Frontend Web App (.env.local in apps/web)
    NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
    ```

---

## Deployment Architecture

### Deployment Strategy

  * **Frontend Deployment:**

      * **Platform:** Vercel.
      * **Build Command:** `pnpm build --filter=web`.
      * **Process:** The `apps/web` Next.js application will be automatically deployed to Vercel upon a push to a designated branch (e.g., `main` or `staging`). Vercel will handle the build, deployment, CDN distribution, and hosting of serverless functions.

  * **Backend Deployment:**

      * **Platform:** AWS Lambda.
      * **Build Command:** `pnpm build --filter=api`.
      * **Process:** The `apps/api` NestJS application will be packaged into a deployment bundle and deployed to AWS Lambda via the AWS CDK. The API Gateway will be configured to route incoming requests to this Lambda function.

---

### CI/CD Pipeline

  * A CI/CD pipeline will be configured using GitHub Actions to automate the entire process.

<!-- end list -->

```yaml
# In .github/workflows/deploy.yaml
name: Deploy Staging & Production

on:
  push:
    branches:
      - staging
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install

      - name: Lint & Test
        run: pnpm test

      - name: Build Applications
        run: pnpm build

      - name: Deploy Frontend to Vercel
        # Vercel CLI Action will handle deployment based on branch
        run: echo "Deploying to Vercel..."

      - name: Deploy Backend to AWS
        # AWS CDK Action will deploy the backend stack
        run: echo "Deploying to AWS via CDK..."
```

---

### Environments

| Environment | Frontend URL | Backend URL | Purpose |
| :--- | :--- | :--- | :--- |
| **Development** | `http://localhost:3000` | `http://localhost:3001` | Local development and testing on developer machines. |
| **Staging** | `[branch-name].vercel.app` | `staging.api.yourdomain.com` | Pre-production environment for E2E testing and QA. |
| **Production** | `app.yourdomain.com` | `api.yourdomain.com` | Live environment for real users. |