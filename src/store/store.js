/* eslint-disable no-undef */
import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// for development - use redux-logger or middleware
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
