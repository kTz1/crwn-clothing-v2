import { AnyAction } from "redux-saga";

// the matchable type is a generic type that takes a function type AC(action creator) as an argument
// and returns a new type that has the same properties as the function type AC
// but also has a type property that is the return type of the function AC
// and a match function that takes an action as an argument and returns a boolean indicating whether the action matches the type of the action creator.
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

// this overload is for when the action creator does not take any arguments
// it takes an action creator function that returns an action with a type property
// and returns a new function that has the same properties as the action creator
// but also has a type property that is the return type of the action creator
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// this overload is for when the action creator takes arguments
// it takes an action creator function that takes any number of arguments and returns an action with a type property
// and returns a new function that has the same properties as the action creator
// but also has a type property that is the return type of the action creator
// and a match function that takes an action as an argument and returns a boolean indicating whether the action matches the type of the action creator
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// this function is the implementation of the above overloads
// it uses a type assertion to specify the return type based on the arguments passed
// it also uses Object.assign to copy the properties of the action creator to the new function
// and add the type and match properties to it
// it is used to create action creators that can be matched with actions in the reducer function
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

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
