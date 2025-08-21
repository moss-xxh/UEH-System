# Frontend Architecture

## Component Architecture

  * **Component Organization**
      * We will organize components into three main directories within `apps/web/src/components/`:
    <!-- end list -->
    ```
    /components
    ├── /features    // Components with business logic (e.g., StationList, AddChargerForm)
    ├── /layouts     // Page layout components (e.g., DashboardLayout, AuthLayout)
    └── /ui          // General-purpose, reusable UI elements (e.g., StyledButton, StatCard)
    ```
  * **Component Template**
      * All components will be written as typed functional components.
    <!-- end list -->
    ```typescript
    import { Box, Heading } from "@chakra-ui/react";

    interface MyComponentProps {
      title: string;
    }

    export const MyComponent = ({ title }: MyComponentProps) => {
      return (
        <Box>
          <Heading size="md">{title}</Heading>
        </Box>
      );
    };
    ```

---

## State Management Architecture

  * **State Structure**
      * Global state will be managed with Zustand. Stores will be organized by domain in `apps/web/src/stores/`.
    <!-- end list -->
    ```
    /stores
    ├── useAuthStore.ts      // Manages user session, token, and profile
    └── useStationStore.ts   // Manages station and charger data
    ```
  * **State Management Patterns**
      * **Global State (Zustand):** For state that is shared across many components (e.g., user authentication status).
      * **Local State (`useState`):** For state that is confined to a single component (e.g., form input values).

---

## Routing Architecture

  * **Route Organization**
      * We will use the Next.js App Router. Routes will be defined by the directory structure inside `apps/web/src/app/`.
    <!-- end list -->
    ```
    /app
    ├── /login               // Route for /login
    ├── /dashboard           // Route for /dashboard
    │   ├── /stations        // Route for /dashboard/stations
    │   │   ├── /[stationId] // Route for /dashboard/stations/some-id
    │   │   └── page.tsx
    │   └── layout.tsx       // Layout for all dashboard pages
    └── layout.tsx           // Root layout
    ```
  * **Protected Route Pattern**
      * A layout component (`/dashboard/layout.tsx`) will wrap all protected pages. This layout will check for a valid authentication token from `useAuthStore` and redirect to `/login` if the user is not authenticated.

---

## Frontend Services Layer

  * **API Client Setup**
      * A central `axios` instance will be configured to automatically include the base URL and the authentication token in all requests.
    <!-- end list -->
    ```typescript
    // In /lib/api.ts
    import axios from 'axios';
    import { useAuthStore } from '@/stores/useAuthStore';

    const apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
    });

    apiClient.interceptors.request.use(config => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    export default apiClient;
    ```
  * **Service Example**
      * API calls will be encapsulated in service files within `apps/web/src/services/`.
    <!-- end list -->
    ```typescript
    // In /services/stationService.ts
    import apiClient from '@/lib/api';
    import { Station } from 'shared-types'; // From our shared package

    export const getStations = (): Promise<Station[]> => {
      return apiClient.get('/stations').then(res => res.data);
    };
    ```