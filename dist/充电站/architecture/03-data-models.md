# Data Models

## User

  * **Purpose:** Represents any individual who can authenticate with the system, including EV Drivers, Company Operators, and Platform Admins.
  * **Relationships:** An Operator User belongs to one Company. An EV Driver User has many Charging Sessions.

**TypeScript Interface**

```typescript
interface User {
  id: string; // e.g., UUID
  email: string;
  role: 'ADMIN' | 'OPERATOR' | 'DRIVER';
  companyId?: string; // Foreign key to Company, only for OPERATOR role
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Company (Tenant)

  * **Purpose:** Represents a single tenant in our multi-tenant SaaS platform.
  * **Relationships:** Has many Operator Users. Has many Stations.

**TypeScript Interface**

```typescript
interface Company {
  id: string; // e.g., UUID
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  branding: {
    logoUrl?: string;
    primaryColor?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Station

  * **Purpose:** Represents a physical location with one or more charging piles.
  * **Relationships:** Belongs to one Company. Has many Chargers.

**TypeScript Interface**

```typescript
interface Station {
  id: string; // e.g., UUID
  companyId: string; // Foreign key to Company
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  gpsCoordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Charger

  * **Purpose:** Represents an individual charging pile (桩) at a Station.
  * **Relationships:** Belongs to one Station. Has many Charging Sessions.

**TypeScript Interface**

```typescript
interface Charger {
  id: string; // e.g., UUID
  stationId: string; // Foreign key to Station
  model: string;
  status: 'AVAILABLE' | 'CHARGING' | 'FAULTED';
  powerRatingKw: number;
}
```

---

## ChargingSession

  * **Purpose:** Represents a single, completed or in-progress charging event.
  * **Relationships:** Belongs to one Charger. Belongs to one User (the driver).

**TypeScript Interface**

```typescript
interface ChargingSession {
  id: string; // e.g., UUID
  chargerId: string; // Foreign key to Charger
  userId: string; // Foreign key to User
  startTime: Date;
  endTime?: Date;
  energyDeliveredKwh: number;
  totalCost: number;
  paymentStatus: 'PAID' | 'DUE' | 'FAILED';
}
```