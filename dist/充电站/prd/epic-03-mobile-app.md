# Epic 3: End-User Mobile App & Core Charging Loop

**Epic Goal:** Launch the end-user mobile app, allowing drivers to find stations, register, and complete a full charging session.

## Story 3.1: User Registration & Login
**As an** EV driver,
**I want** to register for an account and log in to the mobile app,
**so that** I can find chargers and manage my charging sessions.

**Acceptance Criteria:**
1. The mobile app provides a clear form for new user registration (e.g., name, email, password).
2. The mobile app provides a login screen for existing users.
3. A new user can successfully register and is automatically logged in.
4. A registered user can successfully log in.
5. The user's login session is securely stored and managed on the device.

## Story 3.2: Find Stations on Map
**As an** EV driver,
**I want** to see nearby charging stations on a map,
**so that** I can easily find a place to charge my vehicle.

**Acceptance Criteria:**
1. The app's home screen displays a map centered on the user's current geographical location.
2. Pins on the map represent all public charging stations in the viewable area, regardless of the operating company.
3. The user can pan and zoom the map to explore different areas.
4. Tapping on a station pin displays a small callout with the station's name and address.

## Story 3.3: View Station Details
**As an** EV driver,
**I want** to view the details of a specific charging station,
**so that** I can check the availability and types of chargers before I go there.

**Acceptance Criteria:**
1. From the map, a user can navigate to a detailed screen for a selected station.
2. The station detail screen displays its full address, operating hours, and a list of all its individual chargers.
3. Each charger in the list shows its real-time status (e.g., Available, In Use, Out of Order), power rating (e.g., 50kW), and price.

## Story 3.4: Initiate & Stop Charging via QR Code
**As an** EV driver,
**I want** to start and stop a charging session by scanning a QR code on the charger,
**so that** I can easily and quickly charge my vehicle.

**Acceptance Criteria:**
1. A "Scan to Charge" button is prominently displayed within the app's main interface.
2. Tapping the button opens the phone's camera to scan a QR code.
3. Upon scanning a valid QR code on an "Available" charger, a confirmation screen is shown.
4. After confirmation, the charging session begins, and the app displays an "Active Session" screen.
5. The "Active Session" screen shows real-time data, including time elapsed and energy delivered (kWh).
6. The user can stop the charging session from the "Active Session" screen.