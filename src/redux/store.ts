import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import modalReducer from "./modalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine the reducers into a single reducer
const reducer = combineReducers({
  employee: employeeReducer,
  modal: modalReducer,
});

// Create a persisted reducer using the persistConfig and combined reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for middleware
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
