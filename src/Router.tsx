import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Modal = lazy(() => import("./components/Modal"));
const CreateEmployee = lazy(() => import("./pages/CreateEmployee"));
const EmployeeList = lazy(() => import("./pages/EmployeeList"));

// Define the main application router
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/employee-list" element={<EmployeeList />} />
    </Routes>
    <Modal />
  </Router>
);

export default AppRouter;
