# Story CS-001: Project Initialization

**Epic:** Foundation & Core SaaS Setup  
**Priority:** Highest  
**Story Points:** 5  
**Status:** Ready for Development  
**Developer Handoff:** ✅ Complete

---

## User Story
**As a** developer,  
**I want** to set up the monorepo with separate packages for the web app, backend API, and shared code,  
**so that** we have a clean, organized foundation for building the full-stack application.

---

## Acceptance Criteria

### ✅ AC1: Monorepo Initialization
- [ ] Initialize monorepo using **pnpm workspaces** (NOT npm workspaces)
- [ ] Root `package.json` contains workspaces configuration pointing to `apps/*` and `packages/*`
- [ ] Turborepo is configured with `turbo.json` in project root
- [ ] Project name follows convention: `charging-station-saas`

### ✅ AC2: Package Structure Creation
- [ ] Create `apps/web` package with Next.js ~14.2 setup
- [ ] Create `apps/api` package with NestJS ~10.3 setup  
- [ ] Create `apps/mobile` package with React Native setup (placeholder for now)
- [ ] Create `packages/shared-types` package for TypeScript interfaces
- [ ] Create `packages/ui` package for shared React components
- [ ] Each package has its own `package.json` with correct dependencies

### ✅ AC3: Development Tooling Configuration
- [ ] Root-level ESLint configuration (`packages/eslint-config-custom`)
- [ ] Root-level TypeScript configuration (`packages/tsconfig`) 
- [ ] Prettier configuration at root level
- [ ] All packages inherit tooling configuration from root
- [ ] VSCode workspace settings configured (`.vscode/settings.json`)

### ✅ AC4: Environment Setup
- [ ] `.env.example` file created with all required variables per Architecture doc
- [ ] `docker-compose.yml` file for local PostgreSQL database
- [ ] Root `README.md` with complete local development setup instructions
- [ ] Development commands work: `pnpm dev`, `pnpm test`, `pnpm build`

### ✅ AC5: Git Repository Setup  
- [ ] `.gitignore` configured for Node.js, Next.js, and environment files
- [ ] Initial commit contains complete project structure
- [ ] Repository follows naming convention from Architecture
- [ ] All sensitive files properly ignored

---

## Technical Implementation Notes

### 📋 Required Dependencies (Developer Reference)
**Root package.json dependencies:**
```json
{
  "devDependencies": {
    "turbo": "^1.13.0",
    "@changesets/cli": "^2.26.0",
    "eslint": "^8.57.0",
    "prettier": "^3.0.0",
    "typescript": "^5.4.0"
  }
}
```

**apps/web specific:**
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "@chakra-ui/react": "^2.8.0",
    "zustand": "^4.5.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**apps/api specific:**
```json
{
  "dependencies": {
    "@nestjs/core": "^10.3.0",
    "@nestjs/common": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "typescript": "^5.4.0",
    "reflect-metadata": "^0.1.13"
  }
}
```

### 🎯 Architecture Compliance Checklist
- [ ] Follows exact directory structure from `/architecture/09-project-structure-deployment.md`
- [ ] pnpm version ~8.x as specified
- [ ] Node.js version ~20.11.0 compatibility
- [ ] Turborepo configuration matches Architecture requirements

### 📁 Expected Final Structure
```
/charging-station-saas/
├── .github/
│   └── workflows/
├── .vscode/
│   └── settings.json
├── apps/
│   ├── api/
│   │   ├── src/
│   │   └── package.json
│   ├── mobile/
│   │   ├── src/
│   │   └── package.json
│   └── web/
│       ├── src/
│       └── package.json
├── packages/
│   ├── shared-types/
│   │   └── src/
│   ├── ui/
│   │   └── src/
│   ├── eslint-config-custom/
│   └── tsconfig/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
├── tsconfig.json
└── turbo.json
```

### ⚠️ Critical Implementation Rules
1. **MUST** use pnpm workspaces, not npm workspaces
2. **MUST** follow exact folder structure from Architecture document
3. **MUST** include all packages listed in Architecture even if placeholder
4. **NEVER** commit environment files or secrets
5. **MUST** ensure all tooling inherits from root configuration

---

## Environment Variables Template (.env.example)
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

---

## Definition of Done
- [ ] All Acceptance Criteria verified ✅
- [ ] `pnpm install` runs without errors
- [ ] `pnpm dev` starts all applications
- [ ] `pnpm test` passes (even if minimal tests)
- [ ] Project structure matches Architecture specification exactly
- [ ] README instructions tested by another developer
- [ ] Initial commit pushed to repository
- [ ] Story reviewed by Scrum Master ✅

---

## Reference Documents
- **Architecture:** `/architecture/09-project-structure-deployment.md` (Project Structure)
- **Architecture:** `/architecture/02-tech-stack.md` (Technology versions)
- **PRD:** `/prd/epic-01-foundation.md` (Original story definition)

---

**Developer Notes:** This story establishes the technical foundation. Focus on getting the monorepo structure perfect - everything else builds on this. No shortcuts on tooling setup! Follow the Architecture docs exactly.

---

**Created by:** Bob (Scrum Master)  
**Date:** 2025-08-19  
**Next Story:** CS-002 (CI/CD Pipeline Setup)