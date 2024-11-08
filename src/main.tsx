import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRouter from "./Router";

import "./css/Global.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouter />
        </Suspense>
      </PersistGate>
    </Provider>
  </StrictMode>
);
