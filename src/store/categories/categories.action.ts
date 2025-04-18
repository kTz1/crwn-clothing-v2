import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

// *Action Types
// type that represents the action of fetching categories
// it extends the Action type and has a payload of type Category[]
export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

// type that represents the action of fetching categories successfully
// it extends the ActionWithPayload type and has a payload of type Category[]
export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

// type that represents the action of failing to fetch categories
// it extends the ActionWithPayload type and has a payload of type Error
export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

// *Matchable Action Creators
// function that creates an action to start fetching categories
// it returns an action object with the type FETCH_CATEGORIES_START
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

// function that creates an action to indicate that categories have been fetched successfully
// it takes an array of categories as an argument and returns an action object with the type FETCH_CATEGORIES_SUCCESS
// and the payload of categoriesArray
export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

// this action is dispatched when the categories have been successfully fetched from the database
// it takes an array of categories as an argument and returns an action object with the type FETCH_CATEGORIES_SUCCESS
// and the payload of categoriesArray
export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
