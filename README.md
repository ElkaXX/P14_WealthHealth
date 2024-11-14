# The WealthHealth (HRnet) - General Architecture Documentation

The HRnet application is a web-based tool for managing employee records. It provides an intuitive interface that allows users to add and view employee data, with integrated date selection using the datepicker-plugin-wh to simplify and standardize date input.

# Key Requirements

User-friendly interface for adding new employees.
Employee list with filtering and sorting capabilities.
Reliable data persistence, ensuring data remains after page refreshes.
Performance optimization and compatibility with modern browsers.

# Main Components of the Architecture

- 1. User Interface (UI)
     The user interface displays employee data and allows users to add, edit, and view information. The main UI pages include:

- Create Employee: Enables adding a new employee to the system.
- Employee List: Shows a searchable and filterable list of employees.

- 2. State Management (Redux and redux-persist)
     The application uses Redux for centralized state management of employee data. Data persistence across page reloads is ensured with redux-persist, which stores Redux state in localStorage.

- 3. Routing (React Router)
     Routing is handled by React Router, allowing seamless navigation between pages:

Create Employee page
Employee List page

- 4. Styling (CSS)
     The application’s styling is defined with CSS, providing consistent, modern UI aesthetics across components.

# Technologies

- <React>: Used to create a modular, component-based user interface.
- <Redux>: Manages global application state, especially for handling employee data.
- <redux-persist>: Ensures that state (like employee data) persists in localStorage across page reloads, providing a more reliable user experience.
- <React Router>: Manages navigation between different pages, such as "Create Employee" and "Employee List."
- <TypeScript>: Enhances code quality and readability by adding static types to JavaScript, reducing errors and improving development efficiency.
- <CSS>: Provides consistent styling across the application, contributing to a modern and user-friendly interface.
- <datepicker-plugin-wh>: A custom plugin developed specifically for date inputs, simplifying and standardizing date selection within the application.

# Project implementation: Detailed technical documentation. • Technology stack:

# React + TypeScript + Vite + Redux and redux-persist

# Setup

1. # Clone the Repository
   Clone the project repository to your local machine and navigate to the project directory:

```bash

git clone https://github.com/ElkaXX/P14_WealthHealth.git

```

- Naviguer dans le dossier du projet :

```bash

cd WealthHealth

```

2. # Install Dependencies
   Install all necessary packages:

```bash

npm install
```

3. # Run the Application
   Start the development server:

```bash

npm run dev
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

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

npm i --save-dev @types/react
npm i datepicker-plugin-wh
npm install @reduxjs/toolkit react-redux  
npm create vite@latest WealthHealth -- --template react-ts
npm run preview
