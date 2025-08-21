# Epic 4: Payments & History

**Epic Goal:** Integrate a payment system and provide both company operators and drivers with access to their charging and transaction histories.

## Story 4.1: End-User Payment Method Management
**As an** EV driver,
**I want** to add and manage my credit/debit card information in the app,
**so that** I can seamlessly pay for my charging sessions.

**Acceptance Criteria:**
1. There is a "Payment" or "Wallet" section in the user's profile.
2. The user can add a new credit/debit card using a secure form.
3. Card information is securely sent to and tokenized by a third-party payment gateway (e.g., Stripe); no raw card data is stored on our servers.
4. The user can see a list of their saved payment methods (e.g., "Visa ending in 4242").
5. The user can set one payment method as their default.
6. The user can delete a saved payment method.

## Story 4.2: Post-Charging Payment Processing
**As a** charging company,
**I want** the system to automatically charge the user's default payment method after a session is complete,
**so that** I can collect revenue for the energy provided.

**Acceptance Criteria:**
1. Immediately after a charging session ends, the system calculates the final cost based on the energy consumed and the charger's price.
2. The system automatically triggers a charge against the user's default payment method via the payment gateway.
3. A record of the successful transaction is created and linked to the charging session.
4. If the payment fails, the charging session is marked as "Payment Due," and the user is notified in the app to update their payment method.

## Story 4.3: End-User Charging History & Receipts
**As an** EV driver,
**I want** to view my charging history and access detailed receipts,
**so that** I can track my spending and energy usage.

**Acceptance Criteria:**
1. A "History" section in the mobile app lists all past charging sessions in reverse chronological order.
2. Each item in the list displays the date, station location, and total cost.
3. Tapping a session opens a detailed receipt view.
4. The receipt includes the start/end time, duration, total energy delivered (kWh), a cost breakdown, and the payment method used.

## Story 4.4: Company Portal Charging History
**As a** charging company user,
**I want** to view a detailed history of all charging sessions across my network,
**so that** I can monitor usage, revenue, and station performance.

**Acceptance Criteria:**
1. A "Charging Sessions" or "History" page in the company portal lists all sessions that occurred at that company's stations.
2. The list can be filtered by date range and by station.
3. Each session entry shows the user (anonymized ID), station/charger, duration, energy delivered, and revenue collected.
4. The company user can export the filtered history data as a CSV file.