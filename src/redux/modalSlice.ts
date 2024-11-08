import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
  title: string;
}

const initialState: ModalState = {
  isOpen: false,
  title: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ title: string }>) => {
      state.isOpen = true;
      state.title = action.payload.title;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
