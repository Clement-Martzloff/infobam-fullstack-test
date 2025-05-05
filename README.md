# Infobam Vehicle Showcase

The application displays a list of vehicles with filtering and sorting capabilities, demonstrating standard team development practices, proper git workflow, clear documentation, and maintainable code.

## Objective

The goal is to build a responsive web application that allows users to browse a list of vehicles, filter them by manufacturer, type, and year, sort them by price and year, and view detailed information for each vehicle.

## Technical Stack

- **Framework:** Next.js (React Framework)
- **Language:** TypeScript
- **Styling:** (Assuming Tailwind CSS or similar based on `globals.css` and `components.json`)
- **Data:** Provided mock data (or potential backend implementation)

## Getting Started

To run this project locally, follow these steps:

1.  **Prerequisites:** Ensure you have Node.js (v18 or later recommended) and a package manager (npm, yarn, or pnpm) installed.
2.  **Clone the repository:** Clone your forked repository to your local machine.
    ```bash
    git clone <your-fork-url>
    cd infobam-fullstack-test
    ```
3.  **Install dependencies:**
    ```bash
    npm install # or yarn install or pnpm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```
5.  Open your browser and visit `http://localhost:3000`.

## Why Server Components?

This project leverages Next.js Server Components for data fetching and rendering the initial vehicle list. While Next.js API Routes could have been used to create a separate API layer, Server Components offer several advantages for this specific application:

1.  **Simplified Data Fetching:** Data can be fetched directly within the components that need it, leading to a more straightforward and co-located data fetching logic compared to fetching data client-side via API routes.
2.  **Reduced Client-Side Bundle Size:** Logic and dependencies used for data fetching and initial rendering remain on the server, decreasing the amount of code the browser needs to download and execute.
3.  **Direct Data Access:** Server Components can directly access data sources (like the mock data file or a database), eliminating the need for an intermediate API layer for simple data retrieval and filtering operations as required by this test.

## Architectural Patterns

The project structure follows principles of **Clean Architecture**.

- **Core:** Contains the domain logic, including entities (`Vehicle`), interfaces for repositories (`IVehicleRepository`, `IVehicleFilterRepository`), and use cases (`vehicleUseCases`, `vehicleFilterUseCases`). This layer is independent of any framework or infrastructure concerns.
- **Infrastructure:** Implements the interfaces defined in the Core layer. This includes mock data repositories (`MockVehicleRepository`, `MockVehicleFilterRepository`) and Next.js specific server functions (`vehicleServerFunctions`, `vehicleFilterServerFunctions`) that interact with the domain layer.
- **Presentation (src/app):** Contains the Next.js application code, including pages, components (both Server and Client Components), and hooks. This layer is responsible for the user interface and interacts with the Use Cases layer via the Infrastructure layer implementations.

This separation of concerns makes the application more maintainable, testable, and adaptable to changes in infrastructure or presentation frameworks.

## Client-Side State and Interaction with Server Components

The application manages the state related to filtering, sorting, and pagination on the client side. This state is then synchronized with the URL search parameters.

- **Staged State:** The client-side components (e.g., filter dialog, sort selector, pagination controls) maintain the user's selected filters, sort order, and current page in their local state or using React hooks/context. This state can be considered "staged" as it represents the user's current selections before they are applied to fetch new data.
- **URL Synchronization:** When the user applies filters, changes the sort order, or navigates to a different page, the client-side state is used to update the URL search parameters. Libraries like `nuqs` facilitate this synchronization.
- **Server Component Data Fetching:** Next.js Server Components on the page read the updated URL search parameters. These parameters are then passed down to the data fetching logic (implemented in the Infrastructure layer), which retrieves the appropriate subset of data from the data source (mock data in this case). The Server Component then renders the UI based on the fetched data.

## Use of NUQS

The project utilizes the `nuqs` library to manage URL search parameters. `nuqs` provides a type-safe and easy-to-use API for synchronizing component state with the URL query string in Next.js App Router applications.

## Use of React Suspense

The application utilizes React Suspense for data fetching in Server Components. Suspense allows components to "wait" for data or other asynchronous operations to complete before rendering.

Benefits of using Suspense:

- **Streaming Server Rendering:** Suspense works with Next.js's streaming server rendering, allowing parts of the page that are ready to be sent to the client while other parts are still loading data on the server.

## Required Features

- Responsive design (mobile, tablet, desktop)
- Display a paginated vehicle list
- Filter vehicles by manufacturer, type, and year
- Sort vehicles by price and year
- Display detailed vehicle information for a single vehicle
- Implement proper git workflow (feature branches, clear commits, PRs)

## Development Practices

- **Git Workflow:** Feature branches for each component/functionality, atomic commits with clear messages, work submitted via Pull Requests.
- **Code Organization:** Following Clean Architecture principles, proper TypeScript usage, reusable components.
- **Documentation:** Documentation of major decisions in PR descriptions and potentially inline code documentation.

## Potential Improvements & What is Left to Build

Based on the evaluation criteria and common development practices, here are some areas for potential improvement and features that could be added:

- **Enhanced Error Handling:** Implement more robust error handling across the application, providing user-friendly feedback for various scenarios (e.g., data fetching failures, invalid input).
- **Comprehensive Testing:** Expand test coverage to include:
  - More unit tests for core logic (use cases, utility functions).
  - End-to-end tests using a framework like Playwright or Cypress to simulate user flows (filtering, sorting, pagination, viewing details).
- **Improved Loading States:** Implement more sophisticated loading indicators for data fetching operations to provide better feedback to the user.
- **Accessibility (a11y):** Ensure the application is fully accessible according to WCAG guidelines.
- **Performance Optimizations:** Investigate and implement further performance optimizations, such as code splitting, image optimization, and data caching strategies (e.g., using React Cache or a dedicated caching library).
- **Scalability:** Discuss and potentially implement aspects related to scaling, such as migrating from mock data to a real database, implementing server-side caching, or exploring serverless function deployments.
- **Advanced Filtering/Sorting:** Add more complex filtering options (e.g., price range slider, multiple fuel types) and sorting criteria.
- **State Management:** While Server Components handle data fetching, explore options for managing complex client-side state if the application grows (e.g., Zustand, Jotai, or React Context for shared UI state).
- **Code Documentation:** Add detailed JSDoc/TSDoc comments to components, hooks, and utility functions.
- **CI/CD Pipeline:** Set up a basic Continuous Integration and Continuous Deployment pipeline to automate testing and deployment.
