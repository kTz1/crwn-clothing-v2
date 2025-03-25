import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App.jsx";
import { store } from "./store/store";
import { stripePromise } from "./utils/stripe/stripe.utils";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
