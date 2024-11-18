# The WealthHealth (HRnet) - General Architecture Documentation

## Table of Contents

1. [Project Description](#project-description)
2. [Key Requirements](#key-requirements)
3. [Main Components of the Architecture](#main-components-of-the-architecture)
4. [Technologies](#technologies)
5. [Project Setup](#project-setup)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Create a New React + TypeScript Project](#create-a-new-react--typescript-project)
6. [Running the Application](#running-the-application)
   - [Preview the Production Build](#preview-the-production-build)
7. [Installing and Using datepicker-plugin-wh](#installing-and-using-datepicker-plugin-wh)
   - [Integration](#integration)
8. [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)
9. [Project Structure](#project-structure)
10. [Testing the Application](#testing-the-application)
    - [Test Setup](#test-setup)
    - [Running Tests](#running-tests)
    - [Test Coverage](#test-coverage)
    - [Adding New Tests](#adding-new-tests)
11. [Dependencies and Versioning](#dependencies-and-versioning)
    - [Production Dependencies](#production-dependencies)
    - [Development Dependencies](#development-dependencies)
12. [Troubleshooting](#troubleshooting)
13. [FAQ](#faq)
14. [Contact Information](#contact-information)

## Project Description

The HRnet application is a web-based tool for managing employee records. It provides an intuitive interface that allows users to add and view employee data, with integrated date selection using the datepicker-plugin-wh to simplify and standardize date input.

## Key Requirements

User-friendly interface for adding new employees.
Employee list with filtering and sorting capabilities.
Reliable data persistence, ensuring data remains after page refreshes.
Performance optimization and compatibility with modern browsers.

## Main Components of the Architecture

1. **User Interface (UI)**

- The user interface displays employee data and allows users to add, edit, and view information. The main UI pages include:
- Create Employee: Enables adding a new employee to the system.
- Employee List: Shows a searchable and filterable list of employees.

2. **State Management (Redux and redux-persist)**

- The application uses Redux for centralized state management of employee data. Data persistence across page reloads is ensured with redux-persist, which stores Redux state in localStorage.

3. **Routing (React Router)**

- Routing is handled by React Router, allowing seamless navigation between pages:
- `CreateEmployee` page
- `EmployeeList` page

4. **Styling (CSS)**

- The application’s styling is defined with CSS, providing consistent, modern UI aesthetics across components.

# Technologies

- **React** ^18.3.1: Used to create a modular, component-based user interface.
- **Redux**: Manages global application state, especially for handling employee data.
- **redux-persist**: Ensures that state (like employee data) persists in localStorage across page reloads, providing a more reliable user experience.
- **React Router**: Manages navigation between different pages, such as "Create Employee" and "Employee List."
- **TypeScript**: Enhances code quality and readability by adding static types to JavaScript, reducing errors and improving development efficiency.
- **CSS**: Provides consistent styling across the application, contributing to a modern and user-friendly interface.
- **datepicker-plugin-wh**: A custom plugin developed specifically for date inputs, simplifying and standardizing date selection within the application.

## Project Setup

1. **Clone the Repository**
   Clone the project repository to your local machine and navigate to the project directory:

```bash

git clone https://github.com/ElkaXX/P14_WealthHealth.git

cd WealthHealth
```

2. ## Install Dependencies
   Install all necessary packages:

```bash

npm install
npm i --save-dev @types/react
npm install @reduxjs/toolkit react-redux
```

3. ## Create a New React + TypeScript Project

```bash

npm create vite@latest WealthHealth -- --template react-ts
```

# Run the Application

Start the development server:

```bash

npm run dev
```

After running this command, the application will be available at: http://localhost:5173/
[Development Mode]: Use this mode for active development and debugging with instant feedback from hot-reloading.

# Preview the Production Build

```bash

npm run preview
```

After running this command, the application will be available at: http://localhost:4173/
[Preview Mode]: Use this mode to test performance and behavior as it would appear in production.

# Installing and Using datepicker-plugin-wh

The `datepicker-plugin-wh` plugin simplifies and standardizes date input within the HRnet application. It's used in the CreateEmployee form for fields like "Date of Birth" and "Start Date."

```bash

npm i datepicker-plugin-wh
```

# Integration

1. Import the Plugin
   Open the file where the date picker will be used `CreateEmployee.tsx` in this case and import the `DatePicker` component:

```js
import { DatePicker } from "datepicker-plugin-wh";
```

2. Using the Plugin in the Form
   Replace traditional input fields for date selection with the `DatePicker` component. Here's how it's implemented in `CreateEmployee.tsx`:

```js
<DatePicker
  id="date-of-birth"
  label="Date of Birth"
  value={formData.dateOfBirth}
  onChange={handleDateChange("dateOfBirth")}
/>
// DatePicker "start-date"...
```

This template provides a minimal setup to get `React` working in `Vite` with HMR and some `ESLint` rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Project Structure

├── src
│ ├── components # React components
│ ├── consts # Constants used in the project
│ ├── css # CSS files
│ ├── pages # Page components
│ ├── redux # Redux store and slices
│ ├── tests # Test files
│ ├── types # TypeScript types
│ ├── main.tsx # Entry point of the application
│ ├── Router.tsx # Routing configuration
│ └── vite-env.d.ts # Vite environment definitions
├── babel.config.js # Babel configuration
├── eslint.config.js # ESLint configuration
├── index.html # HTML template
├── jest.config.ts # Jest configuration
├── jest.setup.ts # Jest setup file
├── package-lock.json # Lockfile for npm dependencies
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
├── tsconfig.app.json # TypeScript configuration for the app
├── tsconfig.app.tsbuildinfo # TypeScript build info
└── tsconfig.json # General TypeScript configuration

# Testing the Application

The `WealthHealth` application is tested using:

- **Jest**
- **React Testing Library**

## Test Setup

1. **Mock Store**
   The tests utilize a mocked **Redux store** (`redux-mock-store`) to simulate application state and dispatch actions without requiring a real backend or persistent storage.
2. **React Router Mocking**
   React Router is mocked using **MemoryRouter** to test navigation between the `Create Employee` and `Employee List` pages.
3. **Tools Used**:

- **Jest and Babel**:
  To enable testing for TypeScript and modern JavaScript (ES6+) features in the project, we configure Jest with Babel. This ensures seamless integration of **Jest** with **TypeScript** and advanced JavaScript syntax.

```bash

npm install --save-dev babel-jest @babel/preset-env @babel/preset-typescript

```

After installing the dependencies, create a `babel.config.js` file in the root of the project with the following content:

```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```

**React Testing Library**: For rendering components and simulating user interactions.

```bash

npm npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**redux-mock-store**: To simulate Redux state and actions during tests.

```bash

npm install redux-mock-store --save-dev
```

## Running Tests

To run the tests locally, use the following command:

```bash

npm run test
```

## Test Coverage

The test suite includes the following components and scenarios:

1. **CreateEmployee Component**
   - Verifies that the `CreateEmployee` form renders correctly.
   - Ensures navigation to the `Employee List` page via the navigation link.
   - Tests that the form updates fields properly and dispatches actions to save employee data and open a modal upon submission.
   - Ensures the form resets to its initial state after submission.

### Example Test Case:

```js
test("updates form fields and submits employee data", () => {
  renderWithRouter(<CreateEmployee />);

  const firstNameInput = screen.getByLabelText("First Name");
  fireEvent.change(firstNameInput, { target: { value: "John" } });
  expect(firstNameInput).toHaveValue("John");

  fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
  expect(dispatch).toHaveBeenCalledWith(
    createEmployee(
      expect.objectContaining({
        firstName: "John",
      }),
    ),
  );
});
```

2. **Modal** Component

- Confirms that the modal displays the correct title and close button when open.
- Ensures the modal does not render when the isOpen flag in the Redux store is false.
- Verifies that clicking the close button dispatches the closeModal action.

### Example Test Case:

```js
test("dispatches closeModal action when close button is clicked", () => {
  render(
    <Provider store={store}>
      <Modal />
    </Provider>,
  );

  fireEvent.click(screen.getByRole("button", { name: /close/i }));
  expect(store.getActions()).toContainEqual(closeModal());
});
```

## Adding New Tests

To add tests for additional components or functionality:

- Create a new test file in the **tests** directory or next to the component (e.g., ComponentName.test.tsx).
- Import the necessary utilities (render, screen, fireEvent, etc.) and mock dependencies.
- Follow the pattern in `CreateEmployee.test.tsx`, `EmployeeList.test.tsx` , `Modal.test.tsx` for consistency.

# Dependencies and Versioning

Below is a list of the key dependencies used in the project, along with their respective versions.
This ensures transparency regarding the tools and libraries required for development and production.

## Production Dependencies

These dependencies are required for the application to run:

**React: ^18.3.1**
Used for building the user interface with a component-based architecture.

**React Router DOM: ^6.28.0**
Handles client-side routing between pages in a single-page application.

**Redux Toolkit: ^2.3.0**
Provides simplified configuration and usage of Redux for state management.

**React Redux: ^9.1.2**
Facilitates connecting React components to the Redux store.

**Redux Persist: ^6.0.0**
Enables persistence of the Redux store across page reloads.

**datepicker-plugin-wh: ^1.0.6**
A custom plugin for standardized date inputs in forms.

## Development Dependencies

These dependencies are used during development and testing:

**Vite: ^5.4.11**
A fast build tool and development server for modern web projects.

**TypeScript: ^5.6.3**
Adds static typing to JavaScript for improved code quality and maintainability.

**Jest: ^29.7.0**
A powerful testing framework for writing unit and integration tests.

**Babel Jest: ^29.7.0**
Transforms JavaScript and TypeScript files during tests.

**ESLint: ^9.14.0**
A tool for identifying and fixing problems in JavaScript and TypeScript code.

**@vitejs/plugin-react: ^4.3.3**
A Vite plugin to enable React Fast Refresh and other optimizations.

**@testing-library/react: ^16.0.1**
Provides utilities to test React components by simulating user interactions.

**@testing-library/jest-dom: ^6.6.3**
Adds custom Jest matchers for assertions on DOM nodes.

**Redux Mock Store: ^1.5.4**
Mocks Redux state in tests for verifying actions and state changes.

**Identity Object Proxy: ^3.0.0**
Mocks CSS module imports for testing.

# Troubleshooting

If you encounter issues during setup or testing:

1.  **Tests Failing Due to Mocks**
    Ensure that `redux-mock-store` is correctly installed.
2.  **Issues with redux-persist**
    Clear `localStorage` to resolve unexpected state issues:

```bash

localStorage.clear();
```

# FAQ

**Why is my state not persisting after refresh?**
Ensure `redux-persist` is properly configured and that `localStorage` is not disabled in your browser.

# Contact Information

For any questions or suggestions, please contact:

Name: Yuliya BERT

GitHub: [My GitHub Profile](https://github.com/ElkaXX/P14_WealthHealth)
