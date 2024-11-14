import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, EmployeeState } from "../types";

// Set the initial state for the employee slice
const initialState: EmployeeState = {
  list: [],
};

// Create the employee slice using createSlice from Redux Toolkit
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // Define the reducer for creating an employee
    createEmployee: (state, action: PayloadAction<Employee>) => {
      state.list = [...state.list, action.payload]; // Add the new employee to the list
    },
  },
});

export const { createEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
