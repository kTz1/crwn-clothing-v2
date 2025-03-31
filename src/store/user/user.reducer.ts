import { AnyAction } from "redux-saga";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// reducer function that takes the current state and an action as arguments
// and returns a new state based on the action type
// it uses a matchable pattern to check the action type and update the state accordingly
export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};
