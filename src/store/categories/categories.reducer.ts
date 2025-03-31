import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import { CategoryAction } from "./categories.action";

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
// it returns a new state based on the action type and payload
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction
) => {
  const { type } = action;

  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
