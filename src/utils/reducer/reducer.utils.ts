import { T } from "react-router/dist/development/fog-of-war-Cm1iXIp7";
import { AnyAction } from "redux-saga";

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// utility function to create an action object with a type and payload
// it takes a type and a payload as arguments and returns an object with the type and payload properties
// it is used to create actions that can be dispatched to the Redux store
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

// this overload is for when the payload is void
// it takes a type and no payload as arguments and returns an object with just the type property
// it is used when we want to create an action that does not have a payload
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// this function is the implementation of the above overloads
// it takes a type and an optional payload as arguments
// it returns an object with the type and payload properties
// it uses a type assertion to specify the return type based on the arguments passed
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
