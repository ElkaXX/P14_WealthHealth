import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types";

export interface EmployeeState {
  list: Employee[];
}

const initialState: EmployeeState = {
  list: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<Employee>) => {
      state.list = [...state.list, action.payload];
    },
  },
});

export const { createEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
