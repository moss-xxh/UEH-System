// Core data models for the Charging Station SaaS System
export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR' | 'DRIVER';
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  branding: {
    logoUrl?: string;
    primaryColor?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Station {
  id: string;
  companyId: string;
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

export interface Charger {
  id: string;
  stationId: string;
  model: string;
  status: 'AVAILABLE' | 'CHARGING' | 'FAULTED';
  powerRatingKw: number;
}

export interface ChargingSession {
  id: string;
  chargerId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  energyDeliveredKwh: number;
  totalCost: number;
  paymentStatus: 'PAID' | 'DUE' | 'FAILED';
}