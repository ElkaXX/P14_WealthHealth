import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import { AppDispatch } from "../redux/store";
import CreateEmployee from "../pages/CreateEmployee";
import { createEmployee } from "../redux/employeeSlice";
import { openModal } from "../redux/modalSlice";

const mockStore = configureStore([]);
const initialState = {
  employee: { list: [] },
  modal: { isOpen: false, title: "" },
};

describe("CreateEmployee Component", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    dispatch = store.dispatch;
  });

  const renderWithRouter = (component: React.ReactNode) =>
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={component} />
            <Route
              path="/employee-list"
              element={<div>Employee List Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

  test("renders the CreateEmployee form and navigates to employee list", () => {
    renderWithRouter(<CreateEmployee />);

    expect(screen.getByText("HRnet")).toBeInTheDocument();
    expect(screen.getByText("Create Employee")).toBeInTheDocument();

    const navLink = screen.getByText("View Current Employees");
    fireEvent.click(navLink);
    expect(screen.getByText("Employee List Page")).toBeInTheDocument();
  });

  test("updates form fields and submits employee data", () => {
    renderWithRouter(<CreateEmployee />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput).toHaveValue("Doe");

    const departmentSelect = screen.getByLabelText("Department");
    fireEvent.change(departmentSelect, { target: { value: "Engineering" } });
    expect(departmentSelect).toHaveValue("Engineering");

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    expect(dispatch).toHaveBeenCalledWith(
      createEmployee(
        expect.objectContaining({
          firstName: "John",
          lastName: "Doe",
          department: "Engineering",
        }),
      ),
    );
    expect(dispatch).toHaveBeenCalledWith(
      openModal({ title: "Employee created!" }),
    );
  });

  test("clears the form after submission", () => {
    renderWithRouter(<CreateEmployee />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    expect(firstNameInput).toHaveValue(""); // Form should reset after submission
  });
});
