import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/Main.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/employee-list",
    element: <EmployeeList />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
