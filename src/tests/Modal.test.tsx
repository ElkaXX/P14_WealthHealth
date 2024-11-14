import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Modal from "../components/Modal";
import { RootState } from "../redux/store";
import { closeModal } from "../redux/modalSlice";

// Create a mock store
const mockStore = configureStore<RootState>();

describe("Modal Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    const initialState: RootState = {
      employee: {
        list: [],
      },
      modal: { isOpen: true, title: "Employee created!" },
      _persist: {
        version: 1,
        rehydrated: true,
      },
    };
    store = mockStore(initialState);
  });

  test("renders modal when isOpen is true", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    // Check that the modal window title is displayed
    expect(screen.getByText("Employee created!")).toBeInTheDocument();
    // Check that the close button is displayed
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    store = mockStore({
      employee: {
        list: [],
      },
      modal: { isOpen: false, title: "" },
      _persist: {
        version: 1,
        rehydrated: true,
      },
    });

    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    // Check that the modal window title is not displayed
    expect(screen.queryByText("Employee created!")).not.toBeInTheDocument();
  });

  test("dispatches closeModal action when close button is clicked", () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    // Find the close button and click on it
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    // Check that the closeModal action was called
    expect(store.getActions()).toContainEqual(closeModal());
  });
});
