# Charging Station SaaS System

A multi-tenant SaaS platform for electric vehicle charging network operators.

## 🏗️ Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build) and [pnpm workspaces](https://pnpm.io/workspaces).

```
charging-station-saas/
├── apps/
│   ├── web/          # Next.js web portals for admins and companies
│   ├── api/          # NestJS backend API
│   └── mobile/       # React Native app for drivers
├── packages/
│   ├── shared-types/ # Shared TypeScript interfaces
│   ├── ui/           # Shared React components
│   ├── eslint-config/# Shared ESLint configuration
│   └── tsconfig/     # Shared TypeScript configurations
└── docs/             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>=20.11.0`
- **pnpm**: `>=8.0.0`
- **Docker**: For local database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd charging-station-saas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start local database**
   ```bash
   docker-compose up -d
   ```

### Development Commands

```bash
# Start all applications in development mode
pnpm dev

# Start only the web application
pnpm dev --filter=web

# Start only the API
pnpm dev --filter=api

# Build all applications
pnpm build

# Run tests across all packages
pnpm test

# Lint all packages
pnpm lint

# Format code
pnpm format

# Clean all build artifacts and node_modules
pnpm clean
```

## 📦 Applications

### Web Portal (`apps/web`)
- **Framework**: Next.js 14.2
- **UI Library**: Chakra UI 2.8
- **State Management**: Zustand 4.5
- **Port**: 3000 (development)

### API (`apps/api`)
- **Framework**: NestJS 10.3
- **Database**: PostgreSQL 16
- **Authentication**: JWT with Passport
- **Port**: 3001 (development)

### Mobile App (`apps/mobile`)
- **Framework**: React Native 0.73
- **Status**: Placeholder for future development

## 🔧 Development Tools

### Code Quality
- **ESLint**: Code linting with custom configuration
- **Prettier**: Code formatting
- **TypeScript**: Type safety across all packages
- **Husky**: Git hooks for pre-commit checks

### Testing
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Supertest**: API endpoint testing

### Build System
- **Turborepo**: Monorepo task orchestration
- **pnpm**: Fast, efficient package management

## 🗄️ Database

The project uses PostgreSQL with the following setup:
- **Local Development**: Docker container via `docker-compose.yml`
- **Connection**: `postgresql://user:password@localhost:5432/charging_db`
- **Migrations**: Managed via TypeORM

### Database Commands
```bash
# Start database
docker-compose up -d postgres

# Stop database
docker-compose down

# View logs
docker-compose logs postgres
```

## 🏛️ Architecture

This system implements a multi-tenant SaaS architecture with three main user types:

1. **Platform Administrators**: Manage tenant companies
2. **Company Operators**: Manage charging stations and view analytics
3. **EV Drivers**: Find stations and manage charging sessions

### Technology Stack
- **Frontend**: Next.js, Chakra UI, Zustand
- **Backend**: NestJS, PostgreSQL, TypeORM
- **Mobile**: React Native
- **Infrastructure**: AWS Lambda, Vercel
- **Monorepo**: Turborepo, pnpm workspaces

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Backend API
DATABASE_URL="postgresql://user:password@localhost:5432/charging_db"
JWT_SECRET="your-super-secret-jwt-key"
STRIPE_SECRET_KEY="sk_test_..."
AWS_REGION="us-east-1"

# Frontend Web App
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 📋 Scripts

### Root Level
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Clean build artifacts

### Package-Specific
```bash
# Run scripts for specific packages
pnpm --filter=web dev
pnpm --filter=api test
pnpm --filter=shared-types build
```

## 🚢 Deployment

### Staging
- **Frontend**: Auto-deployed to Vercel on `staging` branch
- **Backend**: Deployed to AWS Lambda via GitHub Actions

### Production
- **Frontend**: Auto-deployed to Vercel on `main` branch  
- **Backend**: Deployed to AWS Lambda via GitHub Actions

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm lint` and `pnpm test`
4. Create a pull request

### Code Standards
- Use TypeScript for all new code
- Follow existing ESLint configuration
- Write tests for new features
- Update documentation as needed

## 📚 Documentation

- [PRD Documentation](./prd/README.md) - Product Requirements
- [Architecture Documentation](./architecture/README.md) - Technical Architecture
- [API Documentation](./docs/api.md) - API Reference (Coming Soon)

## 🆘 Troubleshooting

### Common Issues

1. **pnpm install fails**
   ```bash
   # Clear pnpm cache
   pnpm store prune
   pnpm install
   ```

2. **Database connection issues**
   ```bash
   # Restart database container
   docker-compose down
   docker-compose up -d postgres
   ```

3. **TypeScript errors**
   ```bash
   # Rebuild shared packages
   pnpm --filter=shared-types build
   pnpm --filter=ui build
   ```

### Getting Help
- Check existing issues in the repository
- Review the architecture documentation
- Contact the development team

## 📄 License

This project is licensed under UNLICENSED - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Charging Station SaaS Team