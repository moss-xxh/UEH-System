# Charging Station SaaS System - PRD Documentation

This directory contains the sharded Product Requirements Document (PRD) for the Charging Station SaaS System. The document has been broken down into manageable sections for easier navigation and reference.

## Document Structure

### Core Documentation
- **[01-overview.md](./01-overview.md)** - Project goals, background context, and requirements (functional & non-functional)
- **[02-ux-design.md](./02-ux-design.md)** - User interface design goals, interaction paradigms, and platform specifications
- **[03-technical-architecture.md](./03-technical-architecture.md)** - Technical assumptions, architecture decisions, and technology stack

### Epic Documentation
- **[epic-01-foundation.md](./epic-01-foundation.md)** - Foundation & Core SaaS Setup
  - Project initialization
  - CI/CD pipeline
  - Platform admin authentication
  - Tenant account management

- **[epic-02-company-portal.md](./epic-02-company-portal.md)** - Company Portal & Station Management
  - Company user authentication
  - Company dashboard
  - Charging station management
  - Charging pile (桩) management

- **[epic-03-mobile-app.md](./epic-03-mobile-app.md)** - End-User Mobile App & Core Charging Loop
  - User registration & login
  - Find stations on map
  - View station details
  - Initiate & stop charging via QR code

- **[epic-04-payments.md](./epic-04-payments.md)** - Payments & History
  - End-user payment method management
  - Post-charging payment processing
  - End-user charging history & receipts
  - Company portal charging history

## Reading Order

For a complete understanding of the project:
1. Start with the overview to understand goals and requirements
2. Review the UX design principles
3. Understand the technical architecture decisions
4. Read through each epic in sequence (Epic 1 → 4)

## Key Highlights

### Three-Tier Platform
1. **Platform Admin Portal** - Manages tenants (charging companies)
2. **Company Portal** - White-labeled portal for charging companies to manage their network
3. **Mobile App** - White-labeled app for end-users (EV drivers)

### Technical Stack
- **Frontend**: React/Next.js with Chakra UI
- **Mobile**: React Native
- **Backend**: Node.js/TypeScript with NestJS (Serverless)
- **Database**: PostgreSQL
- **Infrastructure**: AWS Lambda, Vercel
- **Architecture**: Monorepo structure

### MVP Goals
- Multi-tenant SaaS architecture
- 99.9% platform uptime
- Support for OCPP 1.6J protocol
- Onboard 10 charging companies in year one

## Status

**Overall Readiness:** High  
**Key Risks:** Low  
**Final Decision:** READY FOR ARCHITECT

The PRD has been thoroughly reviewed and is ready for architectural design and implementation planning.