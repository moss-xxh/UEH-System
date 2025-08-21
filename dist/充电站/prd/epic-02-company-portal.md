# Epic 2: Company Portal & Station Management

**Epic Goal:** Enable charging company users to log into their portal to manage their charging stations and view basic operational data.

## Story 2.1: Company User Authentication
**As a** charging company user,
**I want** to log in to my company's portal,
**so that** I can manage my charging network.

**Acceptance Criteria:**
1. A unique, tenant-aware login page exists for the SaaS portal.
2. A company user (created by the platform admin) can log in with their credentials.
3. Upon successful login, the user is redirected to their company's dashboard.
4. An unsuccessful login attempt displays a clear error message.
5. The portal's UI is styled with the company's specific branding (logo and primary color).

## Story 2.2: Company Dashboard
**As a** charging company user,
**I want** to see a dashboard with a high-level overview of my network after I log in,
**so that** I can quickly understand its current status.

**Acceptance Criteria:**
1. The dashboard is the default page after a company user logs in.
2. The dashboard displays simple, key metrics: Total number of stations, total number of chargers, and number of active charging sessions.
3. The dashboard contains clear navigation links to other sections of the portal (e.g., "Stations").
4. All data displayed is strictly limited to the company the user belongs to.

## Story 2.3: Charging Station Management
**As a** charging company user,
**I want** to add, view, and update my charging stations,
**so that** I can accurately represent my physical network in the system.

**Acceptance Criteria:**
1. A "Stations" page exists that lists all stations belonging to the user's company.
2. The list displays the station's name, address, and the number of chargers it contains.
3. A form allows a user to add a new station with a name and physical address.
4. A user can select a station from the list to view its details.
5. A user can edit the details (name, address) of an existing station.

## Story 2.4: Charging Pile (桩) Management
**As a** charging company user,
**I want** to add, view, and update the individual charging piles (桩) at a specific station,
**so that** I can manage my hardware assets and their status.

**Acceptance Criteria:**
1. From a station's detail page, a user can see a list of all chargers at that station.
2. The list shows each charger's ID, model, and current status (e.g., Available, Charging, Faulted).
3. A form allows a user to add a new charger to the station, specifying its model and power rating.
4. A user can edit the information of an existing charger.
5. A user can manually change the status of a charger (for MVP purposes, before live data is connected).