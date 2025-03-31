import { createSelector } from "reselect";
import { CategoryState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

// selector that takes the state as an argument and returns the categories slice of the state
// it is used to access the categories state in a more readable way
// it is a pure function that does not modify the state
// it is used to create memoized selectors that can improve performance
const selectCategoryReducer = (state): CategoryState => state.categories;

// memoization selector optimization
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// memoized selector that takes the categories slice and returns the categories
// it uses the createSelector function from reselect to create a memoized selector
// it takes the categories slice as an argument and returns the categories array
// it is used to create a selector that can be used in components to access the categories
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

// loading selector
export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
