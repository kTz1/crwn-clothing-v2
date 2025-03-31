import { AnyAction } from "redux-saga";
import { Category } from "./categories.types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

// type that represents the state of categories
export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

// reducer function that takes the current state and an action as arguments
// and returns a new state based on the action type
// it uses a matchable pattern to check the action type and update the state accordingly
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoryState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
