/* eslint-disable no-undef */
//import { compose, legacy_createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
//import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";

//const persistConfig = {
//  key: "root",
//  storage,
//  blacklist: ["user"],
//};

//const persistedReducer = persistReducer(persistConfig, rootReducer);

// for development - use redux-logger or middleware logger
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);
//const composeEnhancer =
//  (process.env.NODE_ENV !== "production" &&
//    window &&
//    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//  compose;
//const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
});

//export const persistor = persistStore(store);
