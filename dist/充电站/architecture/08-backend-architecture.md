# Backend Architecture

## Service Architecture

  * **Function Organization**
      * The entire NestJS application will be packaged and deployed as a single AWS Lambda function, fronted by an API Gateway. We will organize our code into feature modules to keep the codebase clean and maintainable.
    <!-- end list -->
    ```
    /apps/api/src/
    ├── /auth           // Auth-related module (controller, service, guard)
    ├── /companies      // Company management module
    ├── /stations       // Station management module
    │   ├── /dto
    │   │   └── create-station.dto.ts
    │   ├── stations.controller.ts
    │   ├── stations.repository.ts
    │   └── stations.service.ts
    ├── /users          // User management module
    ├── app.module.ts
    └── main.ts         // Lambda handler entry point
    ```
  * **Controller Method Template**
      * Controller methods will use DTOs (Data Transfer Objects) for request validation and Guards for authentication.
    <!-- end list -->
    ```typescript
    import { Controller, Post, Body, UseGuards } from '@nestjs/common';
    import { AuthGuard } from '@/auth/auth.guard';
    import { CreateStationDto } from './dto/create-station.dto';
    import { StationsService } from './stations.service';

    @Controller('stations')
    export class StationsController {
      constructor(private readonly stationsService: StationsService) {}

      @Post()
      @UseGuards(AuthGuard) // Protect this endpoint
      create(@Body() createStationDto: CreateStationDto) {
        // DTO automatically validates incoming data
        return this.stationsService.create(createStationDto);
      }
    }
    ```

---

## Database Architecture

  * **Schema Design**
      * The database schema is defined in the **"Database Schema"** section of this document. We will use a migration tool like `TypeORM` to manage and apply schema changes programmatically.
  * **Data Access Layer**
      * We will implement the **Repository Pattern** to abstract database logic from our business services. Each feature module will have a repository responsible for all its database interactions.
    <!-- end list -->
    ```typescript
    // In /stations/stations.repository.ts
    import { Injectable } from '@nestjs/common';
    import { DataSource, Repository } from 'typeorm';
    import { Station } from './station.entity'; // TypeORM entity

    @Injectable()
    export class StationRepository extends Repository<Station> {
      constructor(private dataSource: DataSource) {
        super(Station, dataSource.createEntityManager());
      }

      async findById(id: string): Promise<Station | null> {
        return this.findOneBy({ id });
      }
    }
    ```

---

## Authentication and Authorization

  * **Auth Flow**
      * The authentication flow is detailed in the sequence diagram in the **"Core Workflows"** section.
  * **Middleware/Guards**
      * We will use NestJS Guards to protect our API endpoints. The `AuthGuard` will be responsible for validating the JWT Bearer token from the `Authorization` header on every incoming request to a protected route.
    <!-- end list -->
    ```typescript
    // In /auth/auth.guard.ts
    import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt'; // Or a similar library

    @Injectable()
    export class AuthGuard implements CanActivate {
      constructor(private jwtService: JwtService) {}

      canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return false;
        }

        const token = authHeader.split(' ')[1];
        try {
          const payload = this.jwtService.verify(token);
          request.user = payload; // Attach user payload to the request
          return true;
        } catch (error) {
          return false;
        }
      }
    }
    ```