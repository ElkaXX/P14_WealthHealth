import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state interface for the modal
export interface ModalState {
  isOpen: boolean;
  title: string;
}

// Set the initial state for the modal slice
const initialState: ModalState = {
  isOpen: false, // Modal is initially closed
  title: "",
};

// Create the modal slice using createSlice from Redux Toolkit
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Define the reducer for opening the modal
    openModal: (state, action: PayloadAction<{ title: string }>) => {
      state.isOpen = true;
      state.title = action.payload.title;
    },
    // Define the reducer for closing the modal
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
