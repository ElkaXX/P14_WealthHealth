import { createBrowserRouter } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee.tsx";
import EmployeeList from "./pages/EmployeeList.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateEmployee />,
  },
  {
    path: "/employee-list",
    element: <EmployeeList />,
  },
]);
